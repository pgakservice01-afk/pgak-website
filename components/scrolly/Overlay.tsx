"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * Overlay — parallax text beats layered over the ScrollyCanvas (z-10).
 * Per the guide: 0% center · 30% left · 60% right. Each beat fades in/out and
 * drifts as scroll progress advances, so the copy "rides" the canvas story.
 */
export default function Overlay({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  // Beat 1 — centred (visible immediately as a title card, then fades out)
  const o1 = useTransform(progress, [0, 0.14, 0.22], [1, 1, 0]);
  const y1 = useTransform(progress, [0, 0.22], [0, -40]);

  // Beat 2 — left
  const o2 = useTransform(progress, [0.3, 0.38, 0.52, 0.6], [0, 1, 1, 0]);
  const x2 = useTransform(progress, [0.3, 0.6], [-44, 8]);

  // Beat 3 — right
  const o3 = useTransform(progress, [0.64, 0.74, 0.96, 1], [0, 1, 1, 1]);
  const x3 = useTransform(progress, [0.64, 1], [44, 0]);

  // Scroll hint (only while the first beat is showing)
  const hintO = useTransform(progress, [0, 0.04, 0.1], [0, 1, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Directional scrims — darken the side the active beat's copy sits on so
          text stays legible over the busy canvas (detection boxes/labels). */}
      <motion.div
        style={{ opacity: o2 }}
        className="absolute inset-0 bg-gradient-to-r from-bg via-bg/45 to-transparent"
      />
      <motion.div
        style={{ opacity: o3 }}
        className="absolute inset-0 bg-gradient-to-l from-bg via-bg/45 to-transparent"
      />

      {/* Beat 1 — centred */}
      <motion.div
        style={{ opacity: o1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <span className="eyebrow eyebrow-center mb-5 drop-shadow">
          AI-Powered Security Intelligence
        </span>
        <h1 className="display max-w-[16ch] text-[clamp(2.6rem,7vw,5rem)] text-ink [text-shadow:0_2px_40px_rgba(0,0,0,0.6)]">
          Security that <em className="not-italic text-accent">acts</em> before
          it&rsquo;s too late.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[1.05rem] text-ink-soft [text-shadow:0_2px_20px_rgba(0,0,0,0.7)]">
          Most cameras only record what already happened. PGAK turns the cameras
          you already own into intelligent guardians.
        </p>
      </motion.div>

      {/* Beat 2 — left */}
      <motion.div
        style={{ opacity: o2, x: x2 }}
        className="absolute inset-y-0 left-0 flex w-full max-w-[640px] flex-col justify-center px-6 sm:px-[8vw]"
      >
        <span className="eyebrow mb-4">Real intelligence</span>
        <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] text-ink [text-shadow:0_2px_40px_rgba(0,0,0,0.7)]">
          It doesn&rsquo;t just record.
          <br />
          It <em className="not-italic text-accent">understands.</em>
        </h2>
        <p className="mt-5 max-w-[44ch] text-[1.02rem] text-ink-soft [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
          PGAK tells a family member from a stranger, a delivery from a
          break-in, a pet from a prowler — so every alert actually means
          something.
        </p>
      </motion.div>

      {/* Beat 3 — right */}
      <motion.div
        style={{ opacity: o3, x: x3 }}
        className="absolute inset-y-0 right-0 flex w-full max-w-[640px] flex-col items-end justify-center px-6 text-right sm:px-[8vw]"
      >
        <span className="eyebrow mb-4">Acts in seconds</span>
        <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] text-ink [text-shadow:0_2px_40px_rgba(0,0,0,0.7)]">
          Threats flagged in
          <br />
          under <em className="not-italic text-accent">three seconds.</em>
        </h2>
        <p className="mt-5 max-w-[44ch] text-[1.02rem] text-ink-soft [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
          A clear, instant notification on your phone — with context — before a
          situation ever escalates.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap justify-end gap-3.5">
          <a href="#demo" className="btn btn-primary">
            Book a free demo →
          </a>
          <a href="#how" className="btn btn-ghost">
            See how it works
          </a>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: hintO }}
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-faint"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-9 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </div>
  );
}
