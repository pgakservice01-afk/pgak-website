"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * Proof-in-numbers strip — the "why believe us" section.
 *
 * Every figure here is a product truth, not a marketing invention. When you
 * have real deployment counts you're happy to publish (sites protected,
 * cameras connected, cities), add them here — real traction numbers convert
 * better than product specs. Example:
 *   { value: 40, suffix: "+", label: "Sites protected", note: "homes, shops & factories" },
 */
const STATS: Stat[] = [
  {
    value: 3,
    prefix: "< ",
    suffix: " sec",
    label: "From threat to alert",
    note: "on your phone, with a snapshot",
  },
  {
    value: 90,
    suffix: "%",
    label: "Fewer false alarms",
    note: "AI filters wind, shadows & pets",
  },
  {
    value: 24,
    suffix: "×7",
    label: "Always watching",
    note: "never blinks, never sleeps",
  },
  {
    value: 0,
    prefix: "₹",
    label: "New hardware needed",
    note: "runs on the cameras you own",
  },
  {
    value: 100,
    suffix: "%",
    label: "Footage stays yours",
    note: "end-to-end encrypted",
  },
  {
    value: 1,
    suffix: " day",
    label: "From sign-up to live",
    note: "no wiring, no downtime",
  },
];

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

export default function NumbersStrip() {
  return (
    <section className="border-y border-line bg-bg-2 py-[72px]">
      <div className="wrap">
        <Reveal className="mb-12 text-center">
          <span className="eyebrow eyebrow-center mb-4">The numbers</span>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)]">
            Intelligence you can measure.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <div className="font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-none text-accent">
                {s.prefix}
                <CountUp target={s.value} />
                {s.suffix}
              </div>
              <div className="mt-2.5 text-[0.92rem] font-semibold text-ink">
                {s.label}
              </div>
              <div className="mt-1 text-[0.8rem] text-ink-faint">{s.note}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Counts 0 → target the first time it scrolls into view. */
function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (target === 0) {
      setN(0);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{n}</span>;
}
