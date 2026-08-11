"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LangProvider";
import {
  authedFetch,
  clearSession,
  ensureRefreshToken,
  getAccessToken,
  SessionExpired,
} from "@/lib/pgakAuth";

/**
 * The camera wall.
 *
 * Every tile plays LIVE VIDEO, continuously, and is expected to keep doing so
 * for days unattended. A snapshot still is fetched first and kept as the
 * fallback: it paints in well under a second while HLS is still negotiating,
 * and it is what stays on screen if a stream cannot start at all. A last good
 * picture tells an operator more than a black rectangle.
 * (Until 2026-08-08 tiles were stills-only at an 8s cadence and video opened
 * only on click. The owner's call: a product sold as "live view" must show
 * moving pictures in the grid.)
 *
 * The one rule this file exists to keep: TILE STATE IS DERIVED FROM WHAT
 * ACTUALLY HAPPENED. A tile is only green because video really advanced or a
 * frame really arrived — never because hls.js said "manifest parsed", which is
 * true of a stream that then delivers nothing. There is no hardcoded status
 * anywhere, deliberately: a wall that shows green dots for dead cameras is
 * worse than no wall, because someone will trust it.
 *
 * ── Why the token gets rewritten per request ──
 * The live-view token sits in the URL PATH (`/live/<token>/<uuid>/index.m3u8`,
 * see api/app/services/live_streams.py) so segment requests inherit it. It is
 * short-lived — LIVE_TOKEN_TTL_SEC defaults to 300s and `exp` is bucketed, so a
 * url is good for 300-600s and then dies. On a wall left running that is fatal:
 * every tile would break within ten minutes. Re-calling /live and
 * loadSource()-ing the new url would work but re-buffers each tile every few
 * minutes — across 30 staggered tiles that is a visible hiccup somewhere on the
 * wall every ~10 seconds. Instead we hold the freshest url in a ref, re-mint it
 * well inside the window, and rewrite the token path segment on every playlist
 * and fragment request. Playback is never interrupted.
 */

// Cloud API root, including the /api/v1 prefix — same variable LiveClient uses.
const API = process.env.NEXT_PUBLIC_PGAK_API || "";

// Tiles per page — and therefore the number of SIMULTANEOUS LIVE STREAMS this
// wall asks the cloud for. The single most load-bearing number in the file.
//
// 30, because the first live-view-only customer is a 30-camera site that wants
// the whole site on one screen. That is affordable ONLY because those cameras
// are onboarded on their SUB streams (640x360-720x480, 5.8-8.6 Mpx/s each,
// versus 51.8 for a 1080p main): 30 subs is ~18 Mbps off the site and, where
// the sub is already H.264, zero GPU — the ingest just copies it.
//
// Do NOT raise this for a full-AI customer without measuring. There, each tile
// is a reader on a source the worker already pulls at FULL resolution, and the
// L4's NVENC encoder was measured at 87-100% with only 14 such cameras.
const PAGE_SIZE = 30;

// Snapshot cadence — the FALLBACK still, not the video. 8s, not 3s, and the
// reason is upstream: a recorder serves snapshots one at a time (measured
// ~450-500ms each on a Dahua), so a page of tiles asking faster than it can
// answer produces stale tiles that look like a camera fault when it is really
// us over-asking. At PAGE_SIZE 30 that is 3.75 req/s, which is already at the
// edge of what one recorder answers — and it is why the poll drops to >=30s as
// soon as video is genuinely playing. Raise it only after measuring the site's
// own recorder.
const REFRESH_MS = 8000;
const SLOW_MS = 30000;     // ...after IDLE_MS with no interaction
const IDLE_MS = 5 * 60 * 1000;
const STALE_AFTER = 3;     // missed refreshes before a tile is called stale
const DOWN_AFTER = 3;      // consecutive failures before it is called down

// Re-mint each tile's live url this often. The API's token is good for 300-600s
// (LIVE_TOKEN_TTL_SEC=300, exp bucketed), so 120s means we always hold a valid
// token with a wide margin and never race the boundary.
const TOKEN_REFRESH_MS = 120000;

// A tile is "playing" only while video actually advances. HTMLMediaElement fires
// timeupdate ~4x/second; if nothing arrives for this long the picture on screen
// is frozen no matter what the player reports, so we stop trusting it and let
// the snapshot fallback take over.
const VIDEO_STALL_MS = 6000;

// Backoff between attempts to (re)start a stream that failed. Capped so a camera
// that is genuinely down is retried occasionally rather than hammered — one dead
// camera must not generate load for the other twenty-nine.
const RETRY_MIN_MS = 3000;
const RETRY_MAX_MS = 60000;

type Camera = {
  id: string;
  name: string;
  location: string | null;
  is_active: boolean;
  is_online: boolean;
};

type Health = "unknown" | "connecting" | "live" | "stale" | "down";

/* ─────────────────────────── one tile ─────────────────────────── */

function Tile({
  cam,
  index,
  intervalMs,
  onOpen,
  onAuthExpired,
  onHealth,
}: {
  cam: Camera;
  index: number;
  intervalMs: number;
  onOpen: () => void;
  onAuthExpired: () => void;
  onHealth: (id: string, h: Health) => void;
}) {
  const { t } = useLang();
  const [src, setSrc] = useState<string | null>(null);
  const [health, setHealth] = useState<Health>("unknown");
  const [playing, setPlaying] = useState(false);

  // Refs so neither loop restarts just because a frame arrived.
  const lastFrameAt = useRef(0);
  const fails = useRef(0);
  const sawTooEarly = useRef(false);
  const objectUrl = useRef<string | null>(null);
  const alive = useRef(true);
  // Live video
  const videoRef = useRef<HTMLVideoElement>(null);
  const liveUrl = useRef<string | null>(null);   // freshest tokenised url
  const lastProgressAt = useRef(0);              // last time video really moved
  const playingRef = useRef(false);

  const compute = useCallback((): Health => {
    const now = Date.now();
    // Video advancing is the strongest evidence a camera is alive, so it wins.
    // Note this is `timeupdate`, i.e. the picture genuinely moved — not
    // MANIFEST_PARSED, which is also true of a stream that then delivers
    // nothing. That distinction is the whole point of this function.
    if (lastProgressAt.current && now - lastProgressAt.current < VIDEO_STALL_MS) {
      return "live";
    }
    if (!lastFrameAt.current) {
      if (sawTooEarly.current) return "connecting";
      return fails.current >= 2 ? "down" : "unknown";
    }
    if (fails.current >= DOWN_AFTER) return "down";
    if (now - lastFrameAt.current > intervalMs * STALE_AFTER) return "stale";
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
        // authedFetch renews the access token on 401 and retries, sharing one
        // in-flight refresh with every other tile. Twelve tiles expiring in the
        // same second must not become twelve rotations.
        const res = await authedFetch(`/cameras/${cam.id}/snapshot`, {
          signal: ac.signal,
        });

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
        if (e instanceof SessionExpired) { onAuthExpired(); return; }
        if ((e as Error)?.name === "AbortError") return;
        fails.current += 1;
      }
      if (!alive.current) return;
      const h = compute();
      setHealth(h);
      onHealth(cam.id, h);
      // Back off a failing camera instead of hammering a recorder that is
      // already struggling; recover immediately once a frame lands.
      // While live video is genuinely playing the still is only a warm fallback
      // for the moment the stream freezes, so poll it rarely — otherwise every
      // tile would pay for BOTH a stream and a snapshot every 8 seconds, and on
      // a live-only camera each snapshot is a fresh ffmpeg grab upstream.
      const wait = fails.current
        ? Math.min(intervalMs * Math.min(fails.current, 4), 30000)
        : playingRef.current
          ? Math.max(intervalMs, 30000)
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
  }, [cam.id, intervalMs, index, compute, onAuthExpired, onHealth]);

  /* ── live video: start it, keep it tokenised, keep it honest ── */
  useEffect(() => {
    let hls: import("hls.js").default | null = null;
    let cancelled = false;
    let retryT: ReturnType<typeof setTimeout> | undefined;
    let tokenT: ReturnType<typeof setInterval> | undefined;
    let backoff = RETRY_MIN_MS;

    const mintUrl = async (): Promise<string | null> => {
      const res = await authedFetch(`/cameras/${cam.id}/live`);
      if (res.status === 425) { sawTooEarly.current = true; return null; }
      if (!res.ok) throw new Error(`live ${res.status}`);
      const { hls_url } = (await res.json()) as { hls_url: string };
      return hls_url;
    };

    // Replace the token path segment with the freshest one we hold. Called for
    // every playlist and fragment request, which is what makes the stream
    // survive token expiry without ever reloading the source.
    const retoken = (u: string): string => {
      const fresh = liveUrl.current;
      if (!fresh) return u;
      const m = /\/live\/([^/]+)\//.exec(fresh);
      if (!m) return u;
      return u.replace(/\/live\/[^/]+\//, `/live/${m[1]}/`);
    };

    const teardown = () => {
      if (hls) { try { hls.destroy(); } catch { /* already gone */ } hls = null; }
      const v = videoRef.current;
      if (v) { try { v.pause(); } catch { /* detached */ } }
      playingRef.current = false;
      setPlaying(false);
    };

    async function start() {
      if (cancelled || (typeof document !== "undefined" && document.hidden)) return;
      try {
        const url = await mintUrl();
        if (cancelled) return;
        if (!url) {                       // 425 — camera still coming online
          retryT = setTimeout(start, RETRY_MIN_MS);
          return;
        }
        liveUrl.current = url;
        const video = videoRef.current;
        if (!video) return;

        // Safari plays HLS natively but resolves the playlist itself, so the
        // per-request rewrite cannot apply. It reloads once per token window
        // instead — a brief hiccup, only on Safari.
        if (video.canPlayType("application/vnd.apple.mpegurl") === "probably") {
          video.src = url;
          void video.play().catch(() => {});
          return;
        }

        const { default: Hls } = await import("hls.js");
        if (cancelled || !videoRef.current) return;
        // No MSE (rare) — the snapshot fallback carries the tile rather than
        // leaving a black rectangle.
        if (!Hls.isSupported()) return;

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const Base = (Hls as any).DefaultConfig.loader;
        class TokenLoader extends Base {
          load(context: any, config: any, callbacks: any) {
            if (context?.url) context.url = retoken(context.url);
            super.load(context, config, callbacks);
          }
        }
        const inst = new Hls({
          enableWorker: true,
          // NOT low-latency, deliberately — and this is the opposite choice to
          // the Focus player below. LL-HLS fetches a partial segment roughly
          // every 0.28s, so 30 tiles would sit at ~105 requests/second through
          // Caddy and MediaMTX, sustained, 24/7. Ordinary HLS is ~15 req/s for
          // the same wall: 7x lighter, at a 5-10s delay nobody notices on a
          // monitoring grid. Click a tile and Focus opens it at ~1s, which is
          // where latency actually matters.
          // (The server still serves lowLatency HLS; an ordinary client simply
          // reads the full #EXTINF segments and ignores the parts.)
          lowLatencyMode: false,
          // ── Tuned for CONTINUITY, not latency (owner's call 2026-08-09):
          // "10-15 seconds delay is fine, but it must not buffer or lag."
          //
          // So sit a long way BEHIND the live edge on purpose. Distance from the
          // edge is runway: the further back we play, the longer a stream that
          // briefly produces slower than real time can be absorbed without the
          // picture ever stopping. hls.js defaults to ~3 target durations (~6s),
          // which is close enough to the edge that a small dip starves it — that
          // is what made tiles die after 15-20s under low-latency mode.
          //
          // Set in SECONDS, not segment counts, because segment length is not
          // fixed: an AI camera's ingest forces 2s keyframes while a live-only
          // camera is copied at its own ~4s GOP, so a count would mean very
          // different delays on different boxes.
          liveSyncDuration: 12,
          // Only jump forward if we fall this far behind. Must stay well above
          // liveSyncDuration — a tight value makes hls.js seek to the edge to
          // "catch up", which is itself a visible jump AND lands us back in the
          // starvation zone we just left.
          liveMaxLatencyDuration: 30,
          // Has to be able to actually HOLD the cushion above; 12s of buffer
          // while trying to stay 12s back leaves nothing in hand. ~600 kbps sub
          // streams x 30s x 30 tiles is on the order of 65 MB, which is fine.
          maxBufferLength: 30,
          backBufferLength: 10,
          pLoader: TokenLoader as any,
          fLoader: TokenLoader as any,
        });
        /* eslint-enable @typescript-eslint/no-explicit-any */
        hls = inst;

        inst.on(Hls.Events.ERROR, (_e, data) => {
          if (!data.fatal) return;        // hls.js self-heals non-fatal errors
          // Rebuild from scratch after a backoff. Recovering in place leaves a
          // dead player often enough that it isn't worth it on a display nobody
          // is watching, and one dead camera must not generate load for the
          // other eleven — hence the cap.
          teardown();
          if (cancelled) return;
          retryT = setTimeout(start, backoff);
          backoff = Math.min(backoff * 2, RETRY_MAX_MS);
        });
        inst.on(Hls.Events.FRAG_BUFFERED, () => { backoff = RETRY_MIN_MS; });

        inst.loadSource(url);
        inst.attachMedia(videoRef.current);
        void videoRef.current.play().catch(() => {});
      } catch (e) {
        if (e instanceof SessionExpired) { onAuthExpired(); return; }
        if (cancelled) return;
        retryT = setTimeout(start, backoff);
        backoff = Math.min(backoff * 2, RETRY_MAX_MS);
      }
    }

    // Keep a valid token in hand at all times. This is the loop that makes 24/7
    // work; without it every tile dies at the first expiry.
    tokenT = setInterval(() => {
      if (cancelled || (typeof document !== "undefined" && document.hidden)) return;
      void (async () => {
        try {
          const u = await mintUrl();
          if (u && !cancelled) liveUrl.current = u;
        } catch (e) {
          if (e instanceof SessionExpired) onAuthExpired();
          // Otherwise leave the old token: it is still valid for a while and the
          // next tick may well succeed.
        }
      })();
    }, TOKEN_REFRESH_MS);

    // A hidden tab shows nothing, and 12 idle muxers on the cloud are pure
    // waste — stop streaming entirely and pick it back up on return.
    const onVis = () => {
      if (typeof document === "undefined") return;
      if (document.hidden) teardown();
      else if (!hls) { backoff = RETRY_MIN_MS; void start(); }
    };
    document.addEventListener("visibilitychange", onVis);

    // Stagger starts so a page of tiles does not hit the cloud as one burst of
    // stream setups — the same reason the snapshot poll is staggered.
    retryT = setTimeout(start, (index % PAGE_SIZE) * 400);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
      if (retryT) clearTimeout(retryT);
      if (tokenT) clearInterval(tokenT);
      teardown();
      const v = videoRef.current;
      if (v) { v.removeAttribute("src"); try { v.load(); } catch { /* detached */ } }
    };
  }, [cam.id, index, onAuthExpired]);

  /* ── health from real playback progress, on a faster tick than the poll ── */
  useEffect(() => {
    const v = videoRef.current;
    const bump = () => {
      lastProgressAt.current = Date.now();
      if (!playingRef.current) { playingRef.current = true; setPlaying(true); }
    };
    v?.addEventListener("timeupdate", bump);
    const tick = setInterval(() => {
      if (!alive.current) return;
      // Frozen picture: the element may still claim to be playing, so trust the
      // clock instead and fall back to the still.
      if (playingRef.current &&
          Date.now() - lastProgressAt.current > VIDEO_STALL_MS) {
        playingRef.current = false;
        setPlaying(false);
      }
      const h = compute();
      setHealth(h);
      onHealth(cam.id, h);
    }, 2000);
    return () => {
      v?.removeEventListener("timeupdate", bump);
      clearInterval(tick);
    };
  }, [cam.id, compute, onHealth]);

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
          picture tells an operator far more than a black rectangle. It also
          covers the seconds before the stream starts, and reappears the moment
          video freezes — see the opacity rule on the video below. */}
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover transition-opacity duration-200"
        />
      )}

      {/* Live video, over the still. Revealed ONLY while frames are genuinely
          advancing, so a stalled or black player can never hide a good picture.
          muted + playsInline + autoPlay is what browsers require to autoplay at
          all; pointer-events-none keeps the click on the tile button. */}
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        preload="none"
        className={`pointer-events-none absolute inset-0 h-full w-full bg-black object-cover transition-opacity duration-300 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />

      {!src && !playing && (
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
  onClose,
  onAuthExpired,
}: {
  cam: Camera;
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
        const res = await authedFetch(`/cameras/${cam.id}/live`);

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
        // ON here, deliberately, where it is OFF for the grid tiles: this is one
        // stream that someone has chosen to watch, so ~1s beats ~8s and the
        // extra request rate is a single player's worth. Worth ~11 seconds
        // against plain HLS, and it costs nothing if the server ever serves
        // plain HLS again.
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
        if (e instanceof SessionExpired) { onAuthExpired(); return; }
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
  }, [cam.id, t, onAuthExpired]);

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
    clearSession();
    window.location.href = "/live";
  }, []);

  // Gate on the token before anything else renders, then mint a refresh token
  // so a display left on in a room keeps working past the 15-minute access
  // token instead of dropping to the sign-in page four times an hour.
  useEffect(() => {
    const tok = getAccessToken();
    if (!tok) { window.location.href = "/live"; return; }
    setToken(tok);
    void ensureRefreshToken();
  }, []);

  // Camera list.
  useEffect(() => {
    if (!token) return;
    const ac = new AbortController();
    (async () => {
      try {
        const res = await authedFetch("/cameras", { signal: ac.signal });
        if (!res.ok) {
          setError(t("Could not load your cameras.", "आपके कैमरे लोड नहीं हो सके।"));
          return;
        }
        // CameraList is { items: [...] } — see api/app/schemas/camera.py.
        const data = (await res.json()) as { items?: Camera[] };
        setCams((data.items ?? []).filter((c) => c.is_active));
      } catch (e) {
        if (e instanceof SessionExpired) { signOut(); return; }
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
            {/* Up to PAGE_SIZE tiles at once. 6 columns on a large screen puts
                a 30-camera site on one 5-row grid, which is the layout that
                customer is buying; narrower screens fall back gracefully. */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
              {shown.map((cam, i) => (
                <Tile
                  key={cam.id}
                  cam={cam}
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
          onClose={() => setFocused(null)}
          onAuthExpired={signOut}
        />
      )}
    </main>
  );
}
