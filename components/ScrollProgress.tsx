"use client";

import { useEffect, useState } from "react";

/**
 * Thin scroll-progress bar pinned to the very top of the viewport. A subtle
 * engagement cue (inspired by premium editorial/enterprise sites) that also
 * signals page length. Purely decorative — hidden from assistive tech.
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px]"
    >
      <div
        className="h-full bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_10px_rgba(124,245,196,0.7)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
