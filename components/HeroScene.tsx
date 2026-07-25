"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

/**
 * HeroScene — a self-contained, seamlessly looping 10-second cinematic that
 * dramatises exactly what PGAK does, in the site's own palette:
 *
 *   0–2s  Idle      — camera sweeps, LEDs breathe, phone alive, particles drift
 *   2–4s  Intruder  — a figure walks in from the right of the property
 *   4–6s  Detect    — camera locks, scan rays fire, box + AI panel analyse,
 *                     confidence counts 0 → 25 → 68 → 98.4%
 *   6–8s  Alert     — box blue→orange→red, pulse ring, phone notification,
 *                     badge + dashboard counters tick up, new event logged
 *   8–10s Connected — flowing particle links Camera → PGAK AI → Phone, with
 *                     capability labels fading through
 *
 * Performance: continuous motion runs on GPU-friendly CSS transforms/opacity;
 * only the handful of discrete text/number changes touch React state, driven by
 * one requestAnimationFrame clock. The whole thing pauses when off-screen
 * (IntersectionObserver) and collapses to a single static frame when the user
 * prefers reduced motion.
 *
 * "blue" in the brief maps to the brand cyan (#3ed8e0); alert escalation uses
 * amber → red, the only non-palette colours, because they carry meaning.
 */

type Phase = "none" | "blue" | "orange" | "red";
type Frame = {
  status: "idle" | "analyzing" | "unknown";
  confidence: number | null;
  progress: number; // 0..10 filled blocks
  box: Phase;
  unknown: number; // dashboard counter
  badge: number; // phone bell badge
  notif: boolean;
  buzz: boolean;
  recentNew: boolean;
  label: number; // active capability label, -1 = none
};

const LOOP = 10; // seconds

const LABELS = [
  "Face Recognition",
  "Threat Detection",
  "Real-time Alerts",
  "Cloud AI",
  "24×7 Monitoring",
];

// Ambient drifting particles (deterministic — no Math.random so SSR matches).
const PARTICLES = [
  { l: 12, t: 22, d: 0, s: 7 },
  { l: 26, t: 68, d: 1.2, s: 8.5 },
  { l: 40, t: 14, d: 2.1, s: 6.5 },
  { l: 58, t: 30, d: 0.6, s: 9 },
  { l: 70, t: 60, d: 1.8, s: 7.5 },
  { l: 84, t: 24, d: 2.6, s: 8 },
  { l: 33, t: 82, d: 0.9, s: 6.8 },
  { l: 50, t: 74, d: 1.5, s: 9.4 },
  { l: 64, t: 12, d: 2.3, s: 7.2 },
  { l: 18, t: 46, d: 3.0, s: 8.8 },
  { l: 90, t: 48, d: 1.1, s: 6.2 },
  { l: 46, t: 52, d: 2.0, s: 9.1 },
];

function derive(t: number): Frame {
  const analyzing = t >= 3.9 && t < 5.4;
  const unknown = t >= 5.4 && t < 9.4;
  const status: Frame["status"] = analyzing
    ? "analyzing"
    : unknown
      ? "unknown"
      : "idle";

  let confidence: number | null = null;
  if (t >= 4.15 && t < 9.4) {
    if (t < 4.55) confidence = 0;
    else if (t < 4.95) confidence = 25;
    else if (t < 5.4) confidence = 68;
    else confidence = 98.4;
  }

  const progress = analyzing
    ? Math.min(10, Math.max(0, Math.round(((t - 3.9) / 1.5) * 10)))
    : t >= 5.4 && t < 9.4
      ? 10
      : 0;

  let box: Phase = "none";
  if (t >= 4.15 && t < 6.0) box = "blue";
  else if (t >= 6.0 && t < 6.35) box = "orange";
  else if (t >= 6.35 && t < 9.35) box = "red";

  const unknownDetected = t >= 6.35 && t < 9.4;
  return {
    status,
    confidence,
    progress,
    box,
    unknown: unknownDetected ? 3 : 2,
    badge: t >= 6.1 && t < 9.4 ? 2 : 1,
    notif: t >= 6.1 && t < 9.35,
    buzz: t >= 6.1 && t < 6.55,
    recentNew: unknownDetected,
    label: t >= 7.9 && t < 9.8 ? Math.min(4, Math.floor((t - 7.9) / 0.36)) : -1,
  };
}

const IDLE = derive(0);

function same(a: Frame, b: Frame) {
  return (
    a.status === b.status &&
    a.confidence === b.confidence &&
    a.progress === b.progress &&
    a.box === b.box &&
    a.unknown === b.unknown &&
    a.badge === b.badge &&
    a.notif === b.notif &&
    a.buzz === b.buzz &&
    a.recentNew === b.recentNew &&
    a.label === b.label
  );
}

export default function HeroScene({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame>(IDLE);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  // Reduced-motion: render one representative "alert" frame, no animation.
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(m.matches);
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  // Pause fully when the hero scrolls out of view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Single rAF clock. `elapsed` only advances while visible so the CSS
  // animations (also paused via .is-paused) stay in lock-step after a pause.
  const elapsed = useRef(0);
  const last = useRef<number | null>(null);
  useEffect(() => {
    if (reduced) {
      setFrame(derive(7.0));
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (last.current == null) last.current = now;
      const dt = now - last.current;
      last.current = now;
      if (visible) {
        elapsed.current += dt;
        const t = (elapsed.current / 1000) % LOOP;
        setFrame((prev) => {
          const next = derive(t);
          return same(prev, next) ? prev : next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      last.current = null;
    };
  }, [reduced, visible]);

  const confText =
    frame.confidence == null
      ? ""
      : Number.isInteger(frame.confidence)
        ? `${frame.confidence}%`
        : `${frame.confidence.toFixed(1)}%`;

  return (
    <div
      ref={stageRef}
      className={`hs-stage ${!visible ? "is-paused" : ""} ${reduced ? "hs-static" : ""} ${className ?? ""}`}
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── backdrop: parallax depth + vignette ── */}
      <div className="hs-bg hs-bg-far" />
      <div className="hs-bg hs-bg-near" />
      <div className="hs-grid" />
      <div className="hs-vignette" />

      {/* ── ambient particles ── */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hs-particle"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            animationDelay: `${p.d}s`,
            animationDuration: `${p.s}s`,
          }}
        />
      ))}

      {/* ── connection + scan-ray overlay ── */}
      <svg
        className="hs-overlay"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* scan rays camera → intruder */}
        <g className="hs-rays">
          <line x1="10" y1="20" x2="50" y2="46" />
          <line x1="10" y1="20" x2="53" y2="40" />
          <line x1="10" y1="20" x2="47" y2="52" />
        </g>
        {/* flowing links camera → device → phone */}
        <g className="hs-links">
          <path className="hs-link" d="M10 20 L15 82" />
          <path className="hs-link" d="M15 82 L80 55" />
          <circle className="hs-flow hs-flow1" r="0.9" />
          <circle className="hs-flow hs-flow2" r="0.9" />
        </g>
      </svg>

      {/* ── CCTV camera (top-left) ── */}
      <div className="hs-camera">
        <svg viewBox="0 0 120 110" fill="none">
          <defs>
            <radialGradient id="hs-lens" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d6fff0" />
              <stop offset="45%" stopColor="#7CF5C4" />
              <stop offset="100%" stopColor="#7CF5C4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hs-cbody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c3640" />
              <stop offset="100%" stopColor="#0c1b21" />
            </linearGradient>
          </defs>
          {/* mount */}
          <g stroke="#65807f" strokeWidth="3" strokeLinecap="round">
            <path d="M20 14 L20 40" />
            <path d="M20 22 L40 30" />
          </g>
          {/* rotating head */}
          <g className="hs-cam-head" style={{ transformOrigin: "34px 30px" }}>
            <path
              d="M30 24 L96 40 L100 60 L34 46 Z"
              fill="url(#hs-cbody)"
              stroke="#9fb4b6"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path
              d="M28 20 L96 38"
              stroke="#9fb4b6"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="52" r="12" fill="#0a1014" stroke="#9fb4b6" strokeWidth="2.4" />
            <circle cx="100" cy="52" r="6" fill="url(#hs-lens)" />
            <circle cx="100" cy="52" r="2.2" fill="#04201a" />
            {/* breathing status LED */}
            <circle className="hs-cam-led" cx="40" cy="33" r="3.2" fill="#3ed8e0" />
          </g>
        </svg>
      </div>

      {/* ── PGAK AI edge device (lower-left) ── */}
      <div className="hs-device">
        <svg viewBox="0 0 140 140" fill="none">
          <defs>
            <radialGradient id="hs-amb" cx="50%" cy="42%" r="55%">
              <stop offset="0%" stopColor="#7CF5C4" stopOpacity="0.30" />
              <stop offset="55%" stopColor="#3ed8e0" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0a1014" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hs-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1c3640" />
              <stop offset="100%" stopColor="#0f2128" />
            </linearGradient>
            <linearGradient id="hs-left" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f2027" />
              <stop offset="100%" stopColor="#091317" />
            </linearGradient>
            <linearGradient id="hs-right" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16303a" />
              <stop offset="100%" stopColor="#0c1b21" />
            </linearGradient>
            <radialGradient id="hs-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d6fff0" />
              <stop offset="40%" stopColor="#7CF5C4" />
              <stop offset="100%" stopColor="#0fb89a" stopOpacity="0.15" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="140" height="140" fill="url(#hs-amb)" />
          <ellipse cx="70" cy="118" rx="42" ry="9" fill="#04080a" opacity="0.55" />
          <g className="hs-float" style={{ transformOrigin: "70px 74px" }}>
            <path d="M70 78 L104 60 L104 84 L70 102 Z" fill="url(#hs-right)" stroke="#7CF5C4" strokeOpacity="0.35" />
            <path d="M70 78 L36 60 L36 84 L70 102 Z" fill="url(#hs-left)" stroke="#7CF5C4" strokeOpacity="0.18" />
            <path d="M70 40 L104 60 L70 78 L36 60 Z" fill="url(#hs-top)" stroke="#7CF5C4" strokeOpacity="0.45" />
            <circle cx="94" cy="74" r="2" fill="#7CF5C4" />
            <circle cx="88" cy="77" r="2" fill="#3ed8e0" />
            <g style={{ transformOrigin: "70px 60px" }}>
              <circle className="hs-core" cx="70" cy="60" r="18" fill="url(#hs-core)" style={{ transformOrigin: "70px 60px" }} />
              <ellipse cx="70" cy="60" rx="10" ry="5.6" fill="none" stroke="#04201a" strokeOpacity="0.6" strokeWidth="1.4" />
              <ellipse cx="70" cy="60" rx="5" ry="3" fill="#eafff8" />
            </g>
          </g>
        </svg>
        <span className="hs-device-tag">PGAK&nbsp;AI</span>
      </div>

      {/* ── intruder + detection ── */}
      <div className="hs-actor">
        <div className="hs-actor-move">
          {/* pulse ring on alert */}
          <span className="hs-pulse" />

          {/* the person */}
          <svg className="hs-person" viewBox="0 0 60 150" fill="none">
            <defs>
              <linearGradient id="hs-fig" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#26424b" />
                <stop offset="100%" stopColor="#0e1c22" />
              </linearGradient>
            </defs>
            <g className="hs-bob" fill="url(#hs-fig)" stroke="#3ed8e0" strokeOpacity="0.35" strokeWidth="1">
              <circle cx="30" cy="18" r="11" />
              <path d="M18 34 Q30 28 42 34 L44 92 Q30 98 16 92 Z" />
              <path d="M18 40 L8 74 L13 78 L24 48 Z" />
              <path d="M42 40 L52 74 L47 78 L36 48 Z" />
              <g className="hs-legA"><path d="M22 90 L20 138 L27 138 L29 92 Z" /></g>
              <g className="hs-legB"><path d="M38 90 L40 138 L33 138 L31 92 Z" /></g>
            </g>
          </svg>

          {/* detection box */}
          <div className="hs-detect" data-phase={frame.box}>
            <span className="hs-corner tl" />
            <span className="hs-corner tr" />
            <span className="hs-corner bl" />
            <span className="hs-corner br" />
            <span className="hs-scanline" />
            <span className="hs-dpar hs-dpar1" />
            <span className="hs-dpar hs-dpar2" />
            <span className="hs-dpar hs-dpar3" />
          </div>

          {/* floating AI panel */}
          <div className={`hs-panel ${frame.status !== "idle" ? "on" : ""}`}>
            {frame.status === "unknown" ? (
              <>
                <div className="hs-panel-tag danger">UNKNOWN VISITOR</div>
                <div className="hs-panel-conf">
                  Confidence <b>{confText}</b>
                </div>
                <div className="hs-bar">
                  <span className="hs-bar-fill" style={{ width: "98.4%" }} />
                </div>
              </>
            ) : (
              <>
                <div className="hs-panel-tag">
                  <span className="hs-panel-dot" /> AI ANALYZING…
                </div>
                <div className="hs-panel-conf">
                  {confText ? (
                    <>
                      Match <b>{confText}</b>
                    </>
                  ) : (
                    "Scanning subject"
                  )}
                </div>
                <div className="hs-blocks">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={i < frame.progress ? "on" : ""}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── phone / PGAK app ── */}
      <div className={`hs-phone ${frame.buzz ? "buzz" : ""}`}>
        <div className="hs-phone-frame">
          <div className="hs-phone-screen">
            <span className="hs-notch" />

            {/* status bar */}
            <div className="hs-status">
              <span>9:41</span>
              <span className="hs-status-mid">PGAK</span>
              <span className="hs-bell">
                <Icon name="bell" size={12} strokeWidth={1.8} />
                <i className={`hs-badge ${frame.badge > 1 ? "hot" : ""}`}>
                  {frame.badge}
                </i>
              </span>
            </div>

            {/* slide-down alert */}
            <div className={`hs-alert ${frame.notif ? "show" : ""}`}>
              <span className="hs-alert-ic">
                <Icon name="bell" size={13} strokeWidth={2} />
              </span>
              <span className="hs-alert-body">
                <b>Unknown Visitor Detected</b>
                <i>Main Gate · 98.4%</i>
              </span>
            </div>

            {/* dashboard stat */}
            <div className="hs-dash">
              <span className="hs-dash-label">Unknown visitors</span>
              <span className="hs-dash-num">
                <span key={frame.unknown} className="hs-dash-flip">
                  {String(frame.unknown).padStart(2, "0")}
                </span>
                {frame.unknown > 2 && <em className="hs-dash-up">▲</em>}
              </span>
            </div>

            {/* live cam tile */}
            <div className="hs-cam-tile">
              <span className="hs-tile-tag">
                <i className="hs-tile-dot" /> CAM 02
              </span>
              <span
                className="hs-tile-box"
                data-on={frame.box === "red" ? "1" : "0"}
              />
              <span className="hs-tile-scan" />
            </div>

            {/* recent events */}
            <div className="hs-events">
              <div className={`hs-event danger ${frame.recentNew ? "show" : ""}`}>
                <span className="hs-ev-dot danger" />
                <span className="hs-ev-body">
                  <b>Unknown Visitor</b>
                  <i>Main Gate · Just now</i>
                </span>
              </div>
              <div className="hs-event">
                <span className="hs-ev-dot" />
                <span className="hs-ev-body">
                  <b>All clear overnight</b>
                  <i>12 cameras · 06:00</i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── capability labels (scene 5) ── */}
      <div className="hs-caps">
        {LABELS.map((l, i) => (
          <span
            key={l}
            className="hs-cap"
            style={{
              opacity: frame.label === i ? 1 : 0,
              transform:
                frame.label === i ? "translateY(0)" : "translateY(6px)",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

const CSS = `
.hs-stage{
  position:relative;width:100%;aspect-ratio:1/1;max-height:640px;
  border-radius:28px;overflow:hidden;isolation:isolate;
  background:
    radial-gradient(120% 90% at 78% 8%, rgba(62,216,224,0.10), transparent 60%),
    radial-gradient(120% 90% at 15% 90%, rgba(124,245,196,0.10), transparent 60%),
    linear-gradient(160deg,#0c161c 0%,#0a1216 60%,#081015 100%);
  border:1px solid rgba(159,180,182,0.12);
  box-shadow:0 50px 120px -50px #000, inset 0 1px 0 rgba(255,255,255,0.04);
}
.hs-stage.is-paused *{animation-play-state:paused !important;}

/* backdrop */
.hs-bg{position:absolute;inset:-4%;pointer-events:none;}
.hs-bg-far{
  background:radial-gradient(closest-side, rgba(62,216,224,0.06), transparent 70%);
  animation:hs-drift 18s ease-in-out infinite;
}
.hs-bg-near{
  background:radial-gradient(closest-side at 60% 70%, rgba(124,245,196,0.05), transparent 70%);
  animation:hs-drift 14s ease-in-out infinite reverse;
}
.hs-grid{
  position:absolute;inset:0;opacity:0.5;pointer-events:none;
  background-image:
    linear-gradient(rgba(159,180,182,0.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(159,180,182,0.05) 1px,transparent 1px);
  background-size:38px 38px;
  -webkit-mask-image:radial-gradient(120% 100% at 50% 40%,#000 30%,transparent 80%);
          mask-image:radial-gradient(120% 100% at 50% 40%,#000 30%,transparent 80%);
  animation:hs-drift 20s ease-in-out infinite;
}
.hs-vignette{position:absolute;inset:0;pointer-events:none;
  box-shadow:inset 0 0 140px 30px rgba(4,8,10,0.7);}
@keyframes hs-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(2%,-2%)}}

/* particles */
.hs-particle{
  position:absolute;width:3px;height:3px;border-radius:50%;
  background:#7CF5C4;box-shadow:0 0 6px 1px rgba(124,245,196,0.8);
  opacity:0;animation-name:hs-float;animation-timing-function:ease-in-out;
  animation-iteration-count:infinite;
}
@keyframes hs-float{
  0%{opacity:0;transform:translateY(6px) scale(0.8)}
  25%{opacity:0.7}
  50%{opacity:0.35;transform:translateY(-14px) scale(1)}
  75%{opacity:0.7}
  100%{opacity:0;transform:translateY(6px) scale(0.8)}
}

/* overlay svg (rays + links) */
.hs-overlay{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;}
.hs-rays line{
  stroke:#3ed8e0;stroke-width:1.4;vector-effect:non-scaling-stroke;
  stroke-linecap:round;filter:drop-shadow(0 0 4px rgba(62,216,224,0.9));
  opacity:0;animation:hs-ray 10s linear infinite;
}
.hs-rays line:nth-child(2){animation-delay:-0.12s}
.hs-rays line:nth-child(3){animation-delay:-0.24s}
@keyframes hs-ray{
  0%,40%{opacity:0;stroke-dasharray:2 6;stroke-dashoffset:60}
  44%{opacity:0.9}
  57%{opacity:0.5;stroke-dashoffset:0}
  60%,100%{opacity:0}
}
.hs-links{opacity:0.25;animation:hs-linkglow 10s ease-in-out infinite;}
@keyframes hs-linkglow{0%,74%{opacity:0.22}82%,96%{opacity:0.9}100%{opacity:0.22}}
.hs-link{
  stroke:#3ed8e0;stroke-width:1.2;vector-effect:non-scaling-stroke;fill:none;
  stroke-dasharray:3 5;filter:drop-shadow(0 0 3px rgba(62,216,224,0.7));
  animation:hs-dashmove 1s linear infinite;
}
@keyframes hs-dashmove{to{stroke-dashoffset:-16}}
.hs-flow{fill:#eafff8;filter:drop-shadow(0 0 4px #7CF5C4);}
.hs-flow1{animation:hs-flow1 1.6s linear infinite}
.hs-flow2{animation:hs-flow2 1.6s linear infinite .2s}
@keyframes hs-flow1{0%{cx:10;cy:20}100%{cx:15;cy:82}}
@keyframes hs-flow2{0%{cx:15;cy:82}100%{cx:80;cy:55}}

/* camera */
.hs-camera{position:absolute;left:3%;top:5%;width:26%;filter:drop-shadow(0 10px 20px rgba(0,0,0,0.5));}
.hs-cam-head{animation:hs-cam 10s ease-in-out infinite;}
@keyframes hs-cam{
  0%{transform:rotate(-8deg)}12%{transform:rotate(7deg)}26%{transform:rotate(-5deg)}
  36%{transform:rotate(16deg)}42%{transform:rotate(11deg)}
  86%{transform:rotate(11deg)}94%{transform:rotate(-4deg)}100%{transform:rotate(-8deg)}
}
.hs-cam-led{animation:hs-breathe 2.4s ease-in-out infinite;}
@keyframes hs-breathe{0%,100%{opacity:1;filter:drop-shadow(0 0 5px #3ed8e0)}50%{opacity:0.3;filter:drop-shadow(0 0 1px #3ed8e0)}}

/* device */
.hs-device{position:absolute;left:2%;bottom:4%;width:30%;text-align:center;}
.hs-float{animation:hs-floaty 6s ease-in-out infinite;}
@keyframes hs-floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.hs-core{animation:hs-glow 2.6s ease-in-out infinite;}
@keyframes hs-glow{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
.hs-device-tag{
  display:inline-block;margin-top:-6px;font-size:0.6rem;letter-spacing:0.22em;
  font-weight:700;color:#7CF5C4;opacity:0.8;
}

/* intruder + detection */
.hs-actor{position:absolute;left:34%;bottom:6%;width:22%;height:78%;}
.hs-actor-move{position:absolute;inset:0;animation:hs-walk 10s cubic-bezier(.4,0,.2,1) infinite;}
@keyframes hs-walk{
  0%{transform:translateX(150%);opacity:0}
  18%{transform:translateX(150%);opacity:0}
  22%{opacity:1}
  38%{transform:translateX(0);opacity:1}
  90%{transform:translateX(0);opacity:1}
  97%{transform:translateX(60%);opacity:0}
  100%{transform:translateX(150%);opacity:0}
}
.hs-person{position:absolute;left:50%;bottom:0;height:96%;transform:translateX(-50%);
  filter:drop-shadow(0 12px 20px rgba(0,0,0,0.5));}
.hs-bob{animation:hs-bob 0.6s ease-in-out infinite;transform-origin:center bottom;}
@keyframes hs-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}
.hs-legA{transform-origin:24px 90px;animation:hs-leg 0.6s ease-in-out infinite;}
.hs-legB{transform-origin:36px 90px;animation:hs-leg 0.6s ease-in-out infinite reverse;}
@keyframes hs-leg{0%,100%{transform:rotate(11deg)}50%{transform:rotate(-11deg)}}

.hs-detect{
  position:absolute;left:50%;top:4%;transform:translateX(-50%);
  width:120%;height:94%;border-radius:16px;
  border:1.5px solid var(--c);opacity:0;transition:opacity .35s ease, box-shadow .35s ease;
  box-shadow:0 0 0 1px rgba(0,0,0,0.2), 0 0 22px -2px var(--c), inset 0 0 20px -6px var(--c);
  --c:#3ed8e0;
}
.hs-detect[data-phase="blue"]{--c:#3ed8e0;opacity:1}
.hs-detect[data-phase="orange"]{--c:#ffb15e;opacity:1}
.hs-detect[data-phase="red"]{--c:#ff5b5b;opacity:1}
.hs-corner{position:absolute;width:14px;height:14px;border:2px solid var(--c);border-radius:3px;filter:drop-shadow(0 0 4px var(--c));}
.hs-corner.tl{left:-3px;top:-3px;border-right:0;border-bottom:0}
.hs-corner.tr{right:-3px;top:-3px;border-left:0;border-bottom:0}
.hs-corner.bl{left:-3px;bottom:-3px;border-right:0;border-top:0}
.hs-corner.br{right:-3px;bottom:-3px;border-left:0;border-top:0}
.hs-scanline{position:absolute;left:4%;right:4%;height:2px;border-radius:2px;
  background:linear-gradient(90deg,transparent,var(--c),transparent);
  box-shadow:0 0 10px var(--c);animation:hs-scan 1.8s ease-in-out infinite;}
@keyframes hs-scan{0%,100%{top:6%;opacity:.4}50%{top:92%;opacity:1}}
.hs-dpar{position:absolute;width:4px;height:4px;border-radius:50%;background:var(--c);
  box-shadow:0 0 6px var(--c);}
.hs-dpar1{animation:hs-orb1 3s linear infinite}
.hs-dpar2{animation:hs-orb2 3.4s linear infinite}
.hs-dpar3{animation:hs-orb3 2.6s linear infinite}
@keyframes hs-orb1{0%{left:-2%;top:0}25%{left:100%;top:10%}50%{left:98%;top:100%}75%{left:0;top:90%}100%{left:-2%;top:0}}
@keyframes hs-orb2{0%{left:100%;top:100%}50%{left:0;top:0}100%{left:100%;top:100%}}
@keyframes hs-orb3{0%{left:50%;top:-2%}50%{left:50%;top:102%}100%{left:50%;top:-2%}}

.hs-pulse{position:absolute;left:50%;top:50%;width:40%;height:40%;
  border-radius:50%;border:2px solid #ff5b5b;transform:translate(-50%,-50%);
  opacity:0;animation:hs-pulsering 10s ease-out infinite;}
@keyframes hs-pulsering{
  0%,59%{opacity:0;transform:translate(-50%,-50%) scale(0.3)}
  61%{opacity:0.9}
  70%{opacity:0;transform:translate(-50%,-50%) scale(2.4)}
  100%{opacity:0;transform:translate(-50%,-50%) scale(2.4)}
}

/* AI panel */
.hs-panel{
  position:absolute;right:104%;top:16%;width:150px;padding:11px 12px;
  border-radius:13px;border:1px solid rgba(124,245,196,0.28);
  background:rgba(10,20,24,0.72);backdrop-filter:blur(10px);
  box-shadow:0 20px 40px -18px #000;
  opacity:0;transform:translateX(8px) scale(.96);transform-origin:right center;
  transition:opacity .3s ease, transform .3s ease;pointer-events:none;
}
.hs-panel.on{opacity:1;transform:translateX(0) scale(1);}
.hs-panel-tag{display:flex;align-items:center;gap:6px;font-size:0.62rem;font-weight:700;
  letter-spacing:0.12em;color:#7CF5C4;}
.hs-panel-tag.danger{color:#ff8a6b;letter-spacing:0.08em;}
.hs-panel-dot{width:6px;height:6px;border-radius:50%;background:#7CF5C4;
  box-shadow:0 0 6px #7CF5C4;animation:hs-breathe 1s ease-in-out infinite;}
.hs-panel-conf{margin-top:5px;font-size:0.7rem;color:#9fb4b6;}
.hs-panel-conf b{color:#eaf3f2;font-weight:700;}
.hs-blocks{display:flex;gap:2px;margin-top:8px;}
.hs-blocks span{flex:1;height:6px;border-radius:2px;background:rgba(159,180,182,0.18);transition:background .12s ease;}
.hs-blocks span.on{background:#7CF5C4;box-shadow:0 0 6px rgba(124,245,196,0.8);}
.hs-bar{margin-top:8px;height:6px;border-radius:3px;background:rgba(159,180,182,0.18);overflow:hidden;}
.hs-bar-fill{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#ff8a6b,#ff5b5b);
  box-shadow:0 0 8px rgba(255,91,91,0.7);}

/* phone */
.hs-phone{position:absolute;right:3%;bottom:5%;width:33%;max-width:220px;
  filter:drop-shadow(0 40px 60px rgba(0,0,0,0.55));animation:hs-floaty 7s ease-in-out infinite;}
.hs-phone.buzz{animation:hs-buzz .12s linear 4;}
@keyframes hs-buzz{0%,100%{transform:translateX(0)}25%{transform:translateX(-1.5px)}75%{transform:translateX(1.5px)}}
.hs-phone-frame{border-radius:26px;padding:6px;
  background:linear-gradient(160deg,#1b2e35,#080d10);border:1px solid rgba(255,255,255,0.08);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);}
.hs-phone-screen{position:relative;border-radius:21px;overflow:hidden;background:#0a1014;
  padding-bottom:10px;}
.hs-notch{position:absolute;left:50%;top:7px;width:44px;height:9px;border-radius:6px;
  background:rgba(0,0,0,0.8);transform:translateX(-50%);z-index:5;}
.hs-status{display:flex;align-items:center;justify-content:space-between;
  padding:11px 12px 6px;font-size:9px;color:#9fb4b6;font-weight:600;}
.hs-status-mid{letter-spacing:0.06em;}
.hs-bell{position:relative;color:#9fb4b6;display:inline-flex;}
.hs-badge{position:absolute;top:-5px;right:-6px;min-width:12px;height:12px;padding:0 2px;
  border-radius:6px;background:#3a4a4a;color:#eaf3f2;font-size:8px;font-style:normal;
  display:grid;place-items:center;transition:background .2s ease,transform .2s ease;}
.hs-badge.hot{background:#ff5b5b;transform:scale(1.12);box-shadow:0 0 8px rgba(255,91,91,0.8);}
.hs-alert{display:flex;gap:8px;align-items:center;margin:0 8px;padding:0 9px;
  border-radius:11px;border:1px solid rgba(255,138,107,0);background:rgba(255,91,91,0.12);
  max-height:0;opacity:0;overflow:hidden;transition:max-height .35s ease,opacity .3s ease,padding .35s ease;}
.hs-alert.show{max-height:52px;opacity:1;padding:9px;border-color:rgba(255,138,107,0.4);}
.hs-alert-ic{display:grid;place-items:center;width:24px;height:24px;flex:none;border-radius:8px;
  background:rgba(255,91,91,0.18);color:#ff8a6b;}
.hs-alert-body{display:flex;flex-direction:column;line-height:1.25;min-width:0;}
.hs-alert-body b{font-size:10px;color:#eaf3f2;font-weight:700;}
.hs-alert-body i{font-size:8.5px;color:#9fb4b6;font-style:normal;}
.hs-dash{margin:9px 10px 0;padding:9px 11px;border-radius:12px;
  border:1px solid rgba(159,180,182,0.12);background:rgba(255,255,255,0.03);
  display:flex;align-items:center;justify-content:space-between;}
.hs-dash-label{font-size:9px;color:#9fb4b6;text-transform:uppercase;letter-spacing:0.08em;}
.hs-dash-num{display:flex;align-items:center;gap:4px;font-family:var(--font-fraunces),serif;
  font-size:18px;font-weight:600;color:#eaf3f2;}
.hs-dash-flip{display:inline-block;animation:hs-flip .4s ease;}
@keyframes hs-flip{0%{transform:translateY(-60%);opacity:0}100%{transform:translateY(0);opacity:1}}
.hs-dash-up{color:#ff8a6b;font-size:9px;font-style:normal;animation:hs-flip .4s ease;}
.hs-cam-tile{position:relative;margin:9px 10px 0;height:56px;border-radius:11px;overflow:hidden;
  border:1px solid rgba(159,180,182,0.12);
  background:linear-gradient(135deg,#13252e,#0a1014);}
.hs-tile-tag{position:absolute;left:6px;top:5px;display:flex;align-items:center;gap:4px;
  font-size:7.5px;font-weight:700;color:#9fb4b6;}
.hs-tile-dot{width:5px;height:5px;border-radius:50%;background:#ff8a6b;animation:hs-breathe 1.4s ease-in-out infinite;}
.hs-tile-box{position:absolute;left:40%;top:26%;width:22%;height:58%;border-radius:4px;
  border:2px solid #3ed8e0;transition:border-color .3s ease;box-shadow:0 0 8px rgba(62,216,224,0.5);}
.hs-tile-box[data-on="1"]{border-color:#ff5b5b;box-shadow:0 0 8px rgba(255,91,91,0.6);}
.hs-tile-scan{position:absolute;left:0;right:0;height:1.5px;
  background:linear-gradient(90deg,transparent,rgba(124,245,196,0.7),transparent);
  animation:hs-tilescan 3.4s linear infinite;}
@keyframes hs-tilescan{0%{top:0}100%{top:100%}}
.hs-events{margin:9px 10px 0;display:flex;flex-direction:column;gap:6px;}
.hs-event{display:flex;gap:7px;align-items:center;padding:7px 8px;border-radius:10px;
  border:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.02);}
.hs-event.danger{max-height:0;opacity:0;padding-top:0;padding-bottom:0;overflow:hidden;
  transition:max-height .35s ease,opacity .3s ease,padding .35s ease;}
.hs-event.danger.show{max-height:42px;opacity:1;padding-top:7px;padding-bottom:7px;}
.hs-ev-dot{width:7px;height:7px;border-radius:50%;background:#3ed8e0;flex:none;}
.hs-ev-dot.danger{background:#ff5b5b;box-shadow:0 0 6px rgba(255,91,91,0.8);}
.hs-ev-body{display:flex;flex-direction:column;line-height:1.2;}
.hs-ev-body b{font-size:9.5px;color:#eaf3f2;font-weight:700;}
.hs-ev-body i{font-size:8px;color:#9fb4b6;font-style:normal;}

/* capability labels */
.hs-caps{position:absolute;left:0;right:0;top:10%;display:flex;flex-direction:column;
  align-items:center;gap:7px;pointer-events:none;}
.hs-cap{padding:5px 12px;border-radius:999px;font-size:0.66rem;font-weight:600;letter-spacing:0.04em;
  color:#eaf3f2;border:1px solid rgba(124,245,196,0.35);background:rgba(10,20,24,0.6);
  backdrop-filter:blur(8px);box-shadow:0 0 18px -6px rgba(124,245,196,0.6);
  transition:opacity .3s ease, transform .3s ease;}

/* static / reduced-motion */
.hs-static *{animation:none !important;}
.hs-static .hs-actor-move{transform:translateX(0);opacity:1;}
.hs-static .hs-links{opacity:0.8;}

@media (max-width:1023px){
  .hs-stage{aspect-ratio:4/3;max-height:none;}
  .hs-panel{width:120px}
}
`;
