"use client";

import { useEffect, useRef, useState } from "react";
import HeroScene from "@/components/HeroScene";

/**
 * Hero visual switch: plays a looped humanoid video on connections that can
 * afford it, and the built-in animated scene (HeroScene) everywhere else.
 *
 * ── Why it is gated rather than always-on ──
 * `public/hero/humanoid.mp4` is 1.2 MB, and this element sits above the fold,
 * so `autoPlay` pulls the whole file during the initial page load. Most of this
 * site's traffic is Indian mobile, where that saturates the connection while
 * every other asset queues behind it — and it is real money off the visitor's
 * data plan. HeroScene costs *zero* bytes to show: it is DOM and CSS, and its
 * JS is already in the homepage bundle either way (this module imports it
 * unconditionally for the failure path). Before this gate, a phone paid for
 * that bundled JS *and* the 4.6 MB, and still saw an empty box until the first
 * frame decoded, because POSTER was never filled in.
 *
 * So the server renders HeroScene — always meaningful, always instant — and the
 * client upgrades to the video only on a wide viewport without Save-Data. Both
 * sit in the same `aspect-video` box, so the upgrade costs no layout shift.
 *
 * ── Asset work, done 2026-09-02 ──
 * Both items this comment used to list as "needs ffmpeg" are now applied.
 *   1. POSTER is filled in (public/hero/humanoid.webp, 17 KB), so desktop no
 *      longer shows a blank box while the first frame decodes.
 *   2. Re-encoded 4.76 MB -> 1.20 MB, a 75% cut, with no resolution change:
 *        ffmpeg -i humanoid.mp4 -c:v libx264 -crf 32 -preset veryslow -an \
 *               -pix_fmt yuv420p -movflags +faststart out.mp4
 *      The source was 848x478 all along, so the old advice to scale to 720p
 *      would have *upscaled* it; the 4.76 MB was simply a wasteful encode.
 *      Frames were compared side by side before and after: the overlay text
 *      stays legible and only dark gradients soften slightly, which is fine
 *      for a decorative loop.
 *
 * The mobile gate below stays. At 1.2 MB the file is close to the ~1 MB this
 * comment once set as the bar for dropping it, but not under it, and mobile is
 * exactly the audience paying for those bytes.
 *
 * The video is muted + inline + looped (so it autoplays where allowed), pauses
 * when scrolled off-screen, and honours reduced-motion. If the file is ever
 * missing or fails, it falls back to the animated scene automatically.
 */
const VIDEO_SRC = "/hero/humanoid.mp4";
const POSTER = "/hero/humanoid.webp";

/**
 * Below this width the video is never requested. 768px is Tailwind's `md`, the
 * breakpoint the rest of the hero already changes layout at.
 */
const VIDEO_MIN_WIDTH = 768;

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Starts false so the server, and every first client paint, render
  // HeroScene. Only a capable client flips it.
  const [videoAllowed, setVideoAllowed] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(m.matches);
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${VIDEO_MIN_WIDTH}px)`);
    const apply = () => {
      // `connection` is Chromium-only; absent elsewhere, which reads as
      // "no objection" rather than "slow" — the width gate still applies.
      const conn = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      setVideoAllowed(wide.matches && !conn?.saveData);
    };
    apply();
    wide.addEventListener("change", apply);
    return () => wide.removeEventListener("change", apply);
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

  if (!VIDEO_SRC || failed || !videoAllowed) return <HeroScene />;

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
