"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient premium layer — a fixed, pointer-events-none overlay that adds:
 *   • two slow drifting gradient blobs (brand teal/cyan)
 *   • floating "AI" particles
 *   • a soft glow that eases toward the cursor
 *
 * All very low-opacity so text stays readable, theme-aware via tokens, and
 * fully disabled for reduced-motion users.
 */
const PARTICLES = [
  { l: 8, t: 18, s: 3, d: 0, dur: 9 },
  { l: 22, t: 62, s: 2, d: 1.4, dur: 11 },
  { l: 37, t: 30, s: 3, d: 2.2, dur: 8 },
  { l: 54, t: 12, s: 2, d: 0.7, dur: 12 },
  { l: 66, t: 48, s: 3, d: 1.9, dur: 10 },
  { l: 78, t: 22, s: 2, d: 2.7, dur: 9 },
  { l: 88, t: 60, s: 3, d: 0.5, dur: 11 },
  { l: 15, t: 82, s: 2, d: 1.1, dur: 8 },
  { l: 45, t: 74, s: 3, d: 2.4, dur: 12 },
  { l: 60, t: 88, s: 2, d: 1.7, dur: 10 },
  { l: 92, t: 40, s: 3, d: 3, dur: 9 },
  { l: 30, t: 45, s: 2, d: 0.9, dur: 11 },
];

export default function AmbientFX() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(m.matches);
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const el = glowRef.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 190}px, ${y - 190}px, 0)`;
      raf =
        Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5
          ? requestAnimationFrame(loop)
          : 0;
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
    >
      <div
        className="absolute -left-[12%] -top-[12%] h-[46vw] w-[46vw] rounded-full opacity-[0.10] blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--c-accent-2)), transparent 70%)",
          animation: reduce ? undefined : "pgak-blob 24s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-[12%] -right-[12%] h-[42vw] w-[42vw] rounded-full opacity-[0.10] blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--c-accent)), transparent 70%)",
          animation: reduce
            ? undefined
            : "pgak-blob 28s ease-in-out infinite reverse",
        }}
      />

      {!reduce &&
        PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              width: p.s,
              height: p.s,
              background: "rgb(var(--c-accent))",
              boxShadow: "0 0 8px rgb(var(--c-accent))",
              opacity: 0,
              animation: `pgak-particle ${p.dur}s ease-in-out ${p.d}s infinite`,
            }}
          />
        ))}

      {!reduce && (
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[380px] w-[380px] rounded-full opacity-[0.07] blur-[70px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--c-accent)), transparent 65%)",
          }}
        />
      )}
    </div>
  );
}
