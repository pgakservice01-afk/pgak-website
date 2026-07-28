"use client";

import { useEffect, useState } from "react";

/**
 * Professional loading screen — shown once on first load, then fades out.
 * Theme-aware (uses bg-bg token) and mounted in the layout so it never
 * re-triggers on client-side navigation.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const finish = () => {
      setFade(true);
      window.setTimeout(() => setGone(true), 550);
    };
    const t = window.setTimeout(finish, 1000);
    return () => window.clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] grid place-items-center bg-bg transition-opacity duration-500 ${
        fade ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 rounded-full border-2 border-line" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 m-auto h-8 w-8"
            aria-hidden="true"
          >
            <path
              d="M50 22 C60 22 68 25 75 28 C77 29 78 30 78 33 L78 50 C78 66 66 78 50 84 C34 78 22 66 22 50 L22 33 C22 30 23 29 25 28 C32 25 40 22 50 22 Z"
              fill="none"
              stroke="rgb(var(--c-accent))"
              strokeWidth="5"
            />
            <g fill="rgb(var(--c-accent))">
              <path d="M50 34 L63.9 42 L50 43.5 Z" />
              <path d="M63.9 42 L63.9 58 L55.6 46.8 Z" />
              <path d="M63.9 58 L50 66 L55.6 53.2 Z" />
              <path d="M50 66 L36.1 58 L50 56.5 Z" />
              <path d="M36.1 58 L36.1 42 L44.4 53.2 Z" />
              <path d="M36.1 42 L50 34 L44.4 46.8 Z" />
            </g>
          </svg>
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-ink-faint">
          PGAK
        </span>
      </div>
    </div>
  );
}
