"use client";

import { useEffect, useRef, useState } from "react";
import HeroScene from "@/components/HeroScene";

/**
 * Hero visual switch: plays a looped humanoid video when one is provided,
 * otherwise shows the built-in animated scene (HeroScene).
 *
 * ── To turn the video on ──
 *   1. Add your clip at:   public/hero/humanoid.mp4   (H.264, muted, ~5–10s
 *      loop, ideally < 3 MB; a .webm alongside is a nice bonus)
 *   2. Add a still frame:  public/hero/humanoid.jpg   (shown instantly while
 *      the video loads — avoids any blank gap)
 *   3. Set VIDEO_SRC below to "/hero/humanoid.mp4".
 *
 * The video is muted + inline + looped (so it autoplays on mobile), pauses when
 * scrolled off-screen, and honours reduced-motion. If the file is ever missing
 * or fails, it falls back to the animated scene automatically.
 */
const VIDEO_SRC = "/hero/humanoid.mp4";
const POSTER = ""; // add public/hero/humanoid.jpg for an instant first frame

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(m.matches);
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  // Pause when off-screen; play (unless reduced-motion) when in view.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduced) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  if (!VIDEO_SRC || failed) return <HeroScene />;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[28px] border border-line bg-bg-2 shadow-[0_50px_120px_-50px_#000]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        {...(POSTER ? { poster: POSTER } : {})}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload="metadata"
        onError={() => setFailed(true)}
        aria-label="PGAK AI detecting an unknown visitor on a live camera feed"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* enhancement overlays — blend the clip into PGAK's dark, teal-lit UI */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 6%, rgba(62,216,224,0.16), transparent 55%)," +
            "radial-gradient(120% 90% at 12% 96%, rgba(124,245,196,0.12), transparent 55%)," +
            "linear-gradient(180deg, rgba(10,16,20,0.10) 0%, transparent 30%, transparent 62%, rgba(8,14,18,0.55) 100%)",
        }}
      />
      {/* soft inner vignette + edge line for a 'live feed' feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_90px_10px_rgba(4,8,10,0.55),inset_0_0_0_1px_rgba(124,245,196,0.10)]"
      />
      {/* faint scan sweep */}
      <span
        aria-hidden="true"
        className="pgak-heroscan pointer-events-none absolute inset-x-0 top-0 h-16 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(124,245,196,0.18), transparent)",
        }}
      />

      {/* corner label to match the product HUD language */}
      <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-accent" />
        PGAK AI · Live
      </span>
    </div>
  );
}
