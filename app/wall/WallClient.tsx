"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LangProvider";

/**
 * The camera wall.
 *
 * Tiles are still frames polled from the cloud; clicking one opens live video.
 * That split is deliberate and it is what the mobile app already does: a still
 * per tile costs a fraction of a video stream, and nobody watches 30 moving
 * pictures at once anyway.
 *
 * The one rule this file exists to keep: TILE STATE IS DERIVED FROM WHAT
 * ACTUALLY HAPPENED. A tile is only green because a frame really arrived. There
 * is no hardcoded status anywhere, deliberately — a wall that shows green dots
 * for dead cameras is worse than no wall, because someone will trust it.
 */

// Cloud API root, including the /api/v1 prefix — same variable LiveClient uses.
const API = process.env.NEXT_PUBLIC_PGAK_API || "";

// Tiles per page. Deliberately bounded: for a camera with no AI pipeline the
// cloud has no cached frame and grabs one from the camera per request, so an
// unbounded grid turns into an unbounded amount of work upstream.
const PAGE_SIZE = 12;

// Tile cadence. 8s, not 3s, and the reason is upstream: a recorder serves
// snapshots one at a time (measured ~450-500ms each on a Dahua), so a page of
// tiles asking faster than it can answer produces stale tiles that look like a
// camera fault when it is really us over-asking. 12 tiles / 8s = 1.5 req/s sits
// inside that. Raise it only after measuring the site's own recorder.
const REFRESH_MS = 8000;
const SLOW_MS = 30000;     // ...after IDLE_MS with no interaction
const IDLE_MS = 5 * 60 * 1000;
const STALE_AFTER = 3;     // missed refreshes before a tile is called stale
const DOWN_AFTER = 3;      // consecutive failures before it is called down

type Camera = {
  id: string;
  name: string;
  location: string | null;
  is_active: boolean;
  is_online: boolean;
};

type Health = "unknown" | "connecting" | "live" | "stale" | "down";

class AuthExpired extends Error {}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

/** Any 401 means the 15-minute access token died. There is no refresh token in
 *  the browser by design, so the only honest move is to send them back to
 *  sign-in rather than leave a wall of broken tiles. */
function assertNotExpired(status: number) {
  if (status === 401 || status === 403) throw new AuthExpired();
}

/* ─────────────────────────── one tile ─────────────────────────── */

function Tile({
  cam,
  token,
  index,
  intervalMs,
  onOpen,
  onAuthExpired,
  onHealth,
}: {
  cam: Camera;
  token: string;
  index: number;
  intervalMs: number;
  onOpen: () => void;
  onAuthExpired: () => void;
  onHealth: (id: string, h: Health) => void;
}) {
  const { t } = useLang();
  const [src, setSrc] = useState<string | null>(null);
  const [health, setHealth] = useState<Health>("unknown");

  // Refs so the polling loop never restarts just because a frame arrived.
  const lastFrameAt = useRef(0);
  const fails = useRef(0);
  const sawTooEarly = useRef(false);
  const objectUrl = useRef<string | null>(null);
  const alive = useRef(true);

  const compute = useCallback((): Health => {
    if (!lastFrameAt.current) {
      if (sawTooEarly.current) return "connecting";
      return fails.current >= 2 ? "down" : "unknown";
    }
    if (fails.current >= DOWN_AFTER) return "down";
    if (Date.now() - lastFrameAt.current > intervalMs * STALE_AFTER) return "stale";
    return "live";
  }, [intervalMs]);

  useEffect(() => {
    alive.current = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const ac = new AbortController();

    async function poll() {
      // Nothing is on screen while the tab is hidden — polling it would spend
      // the customer's bandwidth and the cloud's CPU on frames nobody sees.
      if (typeof document !== "undefined" && document.hidden) {
        timer = setTimeout(poll, intervalMs);
        return;
      }
      try {
        const res = await fetch(`${API}/cameras/${cam.id}/snapshot`, {
          headers: authHeaders(token),
          signal: ac.signal,
          cache: "no-store",
        });
        assertNotExpired(res.status);

        if (res.status === 425) {
          // Camera is still coming online — that is not a fault, and calling it
          // one would have the operator chasing a camera that is simply booting.
          sawTooEarly.current = true;
          fails.current = 0;
        } else if (!res.ok) {
          fails.current += 1;
        } else {
          const blob = await res.blob();
          if (!alive.current) return;
          const url = URL.createObjectURL(blob);
          if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
          objectUrl.current = url;
          setSrc(url);
          lastFrameAt.current = Date.now();
          fails.current = 0;
          sawTooEarly.current = false;
        }
      } catch (e) {
        if (e instanceof AuthExpired) { onAuthExpired(); return; }
        if ((e as Error)?.name === "AbortError") return;
        fails.current += 1;
      }
      if (!alive.current) return;
      const h = compute();
      setHealth(h);
      onHealth(cam.id, h);
      // Back off a failing camera instead of hammering a recorder that is
      // already struggling; recover immediately once a frame lands.
      const wait = fails.current
        ? Math.min(intervalMs * Math.min(fails.current, 4), 30000)
        : intervalMs;
      timer = setTimeout(poll, wait);
    }

    // Stagger the first load across one window so a page of tiles does not
    // arrive at the cloud as one burst.
    timer = setTimeout(poll, (index % PAGE_SIZE) * (intervalMs / PAGE_SIZE));

    return () => {
      alive.current = false;
      ac.abort();
      if (timer) clearTimeout(timer);
      if (objectUrl.current) {
        URL.revokeObjectURL(objectUrl.current);
        objectUrl.current = null;
      }
    };
  }, [cam.id, token, intervalMs, index, compute, onAuthExpired, onHealth]);

  const dot =
    health === "live" ? "bg-accent"
    : health === "stale" ? "bg-[#d29922]"
    : health === "down" ? "bg-danger"
    : "bg-ink-faint";

  const ageSec = lastFrameAt.current
    ? Math.round((Date.now() - lastFrameAt.current) / 1000)
    : null;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative aspect-video overflow-hidden rounded-lg border bg-panel text-left transition-colors ${
        health === "down" ? "border-danger/40" : "border-line hover:border-accent"
      }`}
      aria-label={`${cam.name} — ${health}`}
    >
      {/* Last good frame stays on screen even when stale. A 40-second-old
          picture tells an operator far more than a black rectangle. */}
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover transition-opacity duration-200"
        />
      )}

      {!src && (
        <div className="absolute inset-0 grid place-items-center px-3 text-center">
          <span className="text-[0.72rem] tracking-wide text-ink-faint">
            {health === "connecting"
              ? t("Coming online…", "ऑनलाइन हो रहा है…")
              : health === "down"
                ? t("NO SIGNAL", "कोई सिग्नल नहीं")
                : t("Loading…", "लोड हो रहा है…")}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
        <span className="truncate text-[0.72rem] font-medium text-white">{cam.name}</span>
        {(health === "stale" || health === "down") && ageSec !== null && (
          <span className="ml-auto shrink-0 text-[0.68rem] tabular-nums text-[#d29922]">
            {ageSec}s
          </span>
        )}
      </div>
    </button>
  );
}

/* ─────────────────────────── focus player ─────────────────────────── */

function Focus({
  cam,
  token,
  onClose,
  onAuthExpired,
}: {
  cam: Camera;
  token: string;
  onClose: () => void;
  onAuthExpired: () => void;
}) {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    let hls: { destroy: () => void } | null = null;
    let cancelled = false;
    let retry: ReturnType<typeof setTimeout> | undefined;

    async function start() {
      try {
        const res = await fetch(`${API}/cameras/${cam.id}/live`, {
          headers: authHeaders(token),
          cache: "no-store",
        });
        assertNotExpired(res.status);

        if (res.status === 425) {
          setStatus(t("Camera is coming online…", "कैमरा ऑनलाइन हो रहा है…"));
          retry = setTimeout(start, 3000);
          return;
        }
        if (!res.ok) {
          setStatus(t("Could not start the stream.", "स्ट्रीम शुरू नहीं हो सकी।"));
          return;
        }

        const { hls_url } = (await res.json()) as { hls_url: string };
        if (cancelled || !videoRef.current) return;
        const video = videoRef.current;

        // Safari plays HLS natively; everything else needs hls.js. Imported
        // lazily so the ~500 KB only loads when someone actually opens a camera.
        if (video.canPlayType("application/vnd.apple.mpegurl") === "probably") {
          video.src = hls_url;
          await video.play().catch(() => {});
          setStatus("");
          return;
        }

        const { default: Hls } = await import("hls.js");
        if (cancelled || !videoRef.current) return;
        if (!Hls.isSupported()) {
          setStatus(t("This browser can't play the stream.",
                      "यह ब्राउज़र यह स्ट्रीम नहीं चला सकता।"));
          return;
        }
        // lowLatencyMode costs nothing when the server serves plain HLS and is
        // worth ~11 seconds when it serves LL-HLS.
        const inst = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls = inst;
        inst.on(Hls.Events.ERROR, (_e, data) => {
          if (data.fatal) {
            setStatus(t("Stream interrupted. Close and reopen to retry.",
                        "स्ट्रीम रुक गई। बंद करके दोबारा खोलें।"));
          }
        });
        inst.on(Hls.Events.MANIFEST_PARSED, () => {
          setStatus("");
          video.play().catch(() => {});
        });
        inst.loadSource(hls_url);
        inst.attachMedia(video);
      } catch (e) {
        if (e instanceof AuthExpired) { onAuthExpired(); return; }
        setStatus(t("Could not reach the server.", "सर्वर तक नहीं पहुँच सके।"));
      }
    }

    setStatus(t("Starting…", "शुरू हो रहा है…"));
    start();

    return () => {
      cancelled = true;
      if (retry) clearTimeout(retry);
      // Tear the stream down on close. Without this the cloud keeps muxing for
      // a viewer who has already walked away.
      if (hls) hls.destroy();
      const v = videoRef.current;
      if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    };
  }, [cam.id, token, t, onAuthExpired]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="font-display text-[1.05rem] text-ink">{cam.name}</span>
        {cam.location && (
          <span className="text-[0.85rem] text-ink-soft">{cam.location}</span>
        )}
        <button
          type="button"
          onClick={onClose}
          className="btn ml-auto border border-line px-3 py-1.5 text-[0.85rem]"
        >
          {t("Close", "बंद करें")} ✕
        </button>
      </div>
      <div className="relative flex-1 p-3">
        <video
          ref={videoRef}
          muted
          playsInline
          controls
          className="h-full w-full rounded-lg bg-black object-contain"
        />
        {status && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="rounded-lg bg-panel/90 px-4 py-2 text-[0.9rem] text-ink-soft">
              {status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── the wall ─────────────────────────── */

export default function WallClient() {
  const { t } = useLang();
  const [token, setToken] = useState<string | null>(null);
  const [cams, setCams] = useState<Camera[] | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [focused, setFocused] = useState<Camera | null>(null);
  const [health, setHealth] = useState<Record<string, Health>>({});
  const [intervalMs, setIntervalMs] = useState(REFRESH_MS);

  const signOut = useCallback(() => {
    try { sessionStorage.removeItem("pgak_token"); } catch {}
    window.location.href = "/live";
  }, []);

  // Gate on the token before anything else renders.
  useEffect(() => {
    let tok: string | null = null;
    try { tok = sessionStorage.getItem("pgak_token"); } catch {}
    if (!tok) { window.location.href = "/live"; return; }
    setToken(tok);
  }, []);

  // Camera list.
  useEffect(() => {
    if (!token) return;
    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API}/cameras`, {
          headers: authHeaders(token),
          signal: ac.signal,
          cache: "no-store",
        });
        if (res.status === 401 || res.status === 403) { signOut(); return; }
        if (!res.ok) {
          setError(t("Could not load your cameras.", "आपके कैमरे लोड नहीं हो सके।"));
          return;
        }
        const data = await res.json();
        const list: Camera[] = (Array.isArray(data) ? data : data.cameras ?? data.items ?? [])
          .filter((c: Camera) => c.is_active);
        setCams(list);
      } catch (e) {
        if ((e as Error)?.name !== "AbortError") {
          setError(t("Could not reach the server.", "सर्वर तक नहीं पहुँच सके।"));
        }
      }
    })();
    return () => ac.abort();
  }, [token, signOut, t]);

  // Idle: slow the tiles right down rather than keep paying for a wall nobody
  // is looking at. Any interaction restores the normal cadence immediately.
  useEffect(() => {
    let last = Date.now();
    const bump = () => {
      last = Date.now();
      setIntervalMs((cur) => (cur === REFRESH_MS ? cur : REFRESH_MS));
    };
    const evs = ["pointerdown", "keydown", "wheel", "touchstart", "mousemove"];
    evs.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    const tick = setInterval(() => {
      setIntervalMs(Date.now() - last >= IDLE_MS ? SLOW_MS : REFRESH_MS);
    }, 10000);
    return () => {
      evs.forEach((e) => window.removeEventListener(e, bump));
      clearInterval(tick);
    };
  }, []);

  const onHealth = useCallback((id: string, h: Health) => {
    setHealth((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }));
  }, []);

  const pages = cams ? Math.max(1, Math.ceil(cams.length / PAGE_SIZE)) : 1;
  const shown = useMemo(
    () => (cams ? cams.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE) : []),
    [cams, page],
  );

  // Counts cover ONLY the cameras on this page, because those are the only ones
  // being polled — a tile that unmounted stopped reporting, and carrying its
  // last-known state into a headline figure would be presenting stale health as
  // current. That is the exact dishonesty this wall exists to avoid.
  const counts = useMemo(() => {
    let live = 0, warn = 0, down = 0;
    for (const c of shown) {
      const h = health[c.id];
      if (h === "live") live++;
      else if (h === "stale" || h === "connecting") warn++;
      else if (h === "down") down++;
    }
    return { live, warn, down };
  }, [shown, health]);

  if (!token) return null;

  return (
    <main className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur">
        <a href="/" aria-label="PGAK — home">
          <Logo variant="compact" className="text-[1.05rem]" />
        </a>
        <span className="font-display text-[0.95rem] tracking-tight text-ink-soft">
          {t("Live view", "लाइव व्यू")}
        </span>

        {cams && cams.length > 0 && (
          <div className="flex items-center gap-3 text-[0.8rem] tabular-nums">
            <span className="text-ink-soft">
              {t("live", "लाइव")} <b className="text-accent">{counts.live}</b>
            </span>
            <span className="text-ink-soft">
              {t("waiting", "प्रतीक्षा")} <b className="text-[#d29922]">{counts.warn}</b>
            </span>
            <span className="text-ink-soft">
              {t("down", "बंद")} <b className="text-danger">{counts.down}</b>
            </span>
            {pages > 1 && (
              <span className="text-ink-faint">
                {t("on this page", "इस पेज पर")}
              </span>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={signOut}
          className="ml-auto text-[0.82rem] text-ink-soft underline-offset-2 hover:text-ink hover:underline"
        >
          {t("Sign out", "साइन आउट")}
        </button>
      </header>

      <div className="px-4 py-5">
        {!API && (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-[0.9rem] text-danger">
            {t("Live view isn't connected yet — NEXT_PUBLIC_PGAK_API is not set.",
               "लाइव व्यू अभी कनेक्ट नहीं है — NEXT_PUBLIC_PGAK_API सेट नहीं है।")}
          </p>
        )}

        {error && (
          <p role="alert" className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-[0.9rem] text-danger">
            {error}
          </p>
        )}

        {!cams && !error && API && (
          <p className="text-[0.9rem] text-ink-soft">{t("Loading cameras…", "कैमरे लोड हो रहे हैं…")}</p>
        )}

        {cams && cams.length === 0 && (
          <p className="text-[0.9rem] text-ink-soft">
            {t("No cameras on your account yet. Your installer adds them during setup.",
               "आपके अकाउंट में अभी कोई कैमरा नहीं है। इंस्टॉलर सेटअप के दौरान जोड़ता है।")}
          </p>
        )}

        {cams && cams.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {shown.map((cam, i) => (
                <Tile
                  key={cam.id}
                  cam={cam}
                  token={token}
                  index={i}
                  intervalMs={intervalMs}
                  onOpen={() => setFocused(cam)}
                  onAuthExpired={signOut}
                  onHealth={onHealth}
                />
              ))}
            </div>

            {pages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="btn border border-line px-3 py-1.5 text-[0.85rem] disabled:opacity-40"
                >
                  ← {t("Previous", "पिछला")}
                </button>
                <span className="text-[0.85rem] tabular-nums text-ink-soft">
                  {page + 1} / {pages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
                  disabled={page >= pages - 1}
                  className="btn border border-line px-3 py-1.5 text-[0.85rem] disabled:opacity-40"
                >
                  {t("Next", "अगला")} →
                </button>
              </div>
            )}

            {intervalMs === SLOW_MS && (
              <p className="mt-4 text-center text-[0.78rem] text-ink-faint">
                {t("Idle — refreshing slowly. Move the mouse to resume.",
                   "निष्क्रिय — धीरे रिफ्रेश हो रहा है। जारी रखने के लिए माउस हिलाएँ।")}
              </p>
            )}
          </>
        )}
      </div>

      {focused && (
        <Focus
          cam={focused}
          token={token}
          onClose={() => setFocused(null)}
          onAuthExpired={signOut}
        />
      )}
    </main>
  );
}
