"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

/**
 * Before / After comparison — the same camera feed, two realities. Drag (or use
 * arrow keys) to wipe between an ordinary CCTV that only *records* and PGAK that
 * *detects and alerts*. Pure CSS/SVG, no image assets. Reinforces the core PGAK
 * message ("your DVR records the theft; it doesn't stop it") without changing
 * any written content.
 */
export default function BeforeAfter() {
  const [pos, setPos] = useState(55); // % revealed of the PGAK (left) side

  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Records vs. acts</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            Same camera. Two very different outcomes.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            Drag the handle. Ordinary CCTV just records two figures — it has no
            idea who they are. PGAK tells your staff from a stranger: the known
            person passes quietly, the unknown one triggers an instant alert.
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-[900px]">
          <div className="relative aspect-video select-none overflow-hidden rounded-2xl border border-line">
            {/* base layer = ordinary CCTV (right side stays this) */}
            <Scene mode="before" />

            {/* overlay layer = PGAK, revealed from the left up to `pos` */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Scene mode="after" />
            </div>

            {/* corner labels */}
            <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-accent/90 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wide text-[#04201a]">
              PGAK
            </span>
            <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wide text-ink-soft">
              Ordinary CCTV
            </span>

            {/* handle */}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-accent shadow-[0_0_12px_rgba(124,245,196,0.9)]"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-accent bg-bg text-accent shadow-[0_6px_20px_-4px_#000]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
                </svg>
              </span>
            </div>

            {/* accessible control: pointer drag + keyboard */}
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Wipe between ordinary CCTV and PGAK"
              className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-[0.85rem]">
            <span className="font-semibold text-accent">
              PGAK — detects &amp; alerts
            </span>
            <span className="text-ink-faint">Ordinary CCTV — just records</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Scene({ mode }: { mode: "before" | "after" }) {
  const after = mode === "after";
  return (
    <div
      className="absolute inset-0"
      style={{
        background: after
          ? "radial-gradient(120% 90% at 50% 0%, rgba(62,216,224,0.16), transparent 55%), linear-gradient(160deg,#0f2830,#0a1014)"
          : "linear-gradient(160deg,#141821,#0b0d12)",
      }}
    >
      {/* room floor + doorway */}
      <svg
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{
          filter: after ? "none" : "grayscale(1) brightness(0.72) contrast(1.05)",
        }}
      >
        {/* perspective floor line */}
        <path d="M0 165 L400 165" stroke="rgba(159,180,182,0.25)" strokeWidth="1" />
        <path d="M60 225 L150 165 M340 225 L250 165" stroke="rgba(159,180,182,0.14)" strokeWidth="1" />
        {/* doorway */}
        <rect x="292" y="70" width="70" height="95" rx="2" fill="rgba(0,0,0,0.35)" stroke="rgba(159,180,182,0.25)" strokeWidth="1.5" />
        {/* known person (left) — staff/family, walking in normally */}
        <g
          transform="translate(-62,0)"
          fill={after ? "#26424b" : "#2a2f38"}
          stroke={after ? "#7CF5C4" : "transparent"}
          strokeOpacity="0.5"
          strokeWidth="1.2"
        >
          <circle cx="196" cy="96" r="12" />
          <path d="M182 112 Q196 106 210 112 L213 166 Q196 172 179 166 Z" />
          <path d="M182 118 L170 150 L175 154 L188 126 Z" />
          <path d="M210 118 L222 150 L217 154 L204 126 Z" />
          <path d="M186 164 L184 200 L192 200 L195 166 Z" />
          <path d="M206 164 L208 200 L200 200 L197 166 Z" />
        </g>
        {/* unknown person (right) — entering from the doorway */}
        <g
          transform="translate(55,0)"
          fill={after ? "#26424b" : "#2a2f38"}
          stroke={after ? "#3ed8e0" : "transparent"}
          strokeOpacity="0.5"
          strokeWidth="1.2"
        >
          <circle cx="196" cy="96" r="12" />
          <path d="M182 112 Q196 106 210 112 L213 166 Q196 172 179 166 Z" />
          <path d="M182 118 L170 150 L175 154 L188 126 Z" />
          <path d="M210 118 L222 150 L217 154 L204 126 Z" />
          <path d="M186 164 L184 200 L192 200 L195 166 Z" />
          <path d="M206 164 L208 200 L200 200 L197 166 Z" />
        </g>
      </svg>

      {/* scanlines for the ordinary feed */}
      {!after && (
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.35)_4px)]" />
      )}

      {/* HUD */}
      {after ? (
        <>
          {/* known person — recognised, no alarm */}
          <div className="absolute left-[26%] top-[36%] h-[53%] w-[15%] rounded-md border-2 border-[#7CF5C4] shadow-[0_0_16px_rgba(124,245,196,0.45)]">
            <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-[#7CF5C4] px-1.5 py-0.5 text-[0.6rem] font-bold text-[#04201a]">
              KNOWN · STAFF 99%
            </span>
          </div>
          {/* unknown person — flagged, alert fired */}
          <div className="absolute left-[55%] top-[36%] h-[53%] w-[15%] rounded-md border-2 border-[#ff5b5b] shadow-[0_0_16px_rgba(255,91,91,0.5)]">
            <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-[#ff5b5b] px-1.5 py-0.5 text-[0.6rem] font-bold text-[#2a0d05]">
              UNKNOWN · 98%
            </span>
          </div>
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#ff5b5b]/20 px-2.5 py-1 text-[0.66rem] font-semibold text-[#ff8a6b]">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-[#ff5b5b]" />
            Alert sent · 1.9s
          </span>
          <span className="absolute bottom-3 left-[38%] flex items-center gap-1.5 rounded-full bg-[#7CF5C4]/15 px-2.5 py-1 text-[0.66rem] font-semibold text-[#7CF5C4]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7CF5C4]" />
            Known · no alarm
          </span>
        </>
      ) : (
        <>
          <span className="absolute left-3 bottom-3 flex items-center gap-1.5 text-[0.66rem] font-semibold text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5b5b]" /> REC · 02:14:07
          </span>
          <span className="absolute right-3 bottom-3 text-[0.62rem] text-ink-faint">
            no alerts · footage only
          </span>
        </>
      )}
    </div>
  );
}
