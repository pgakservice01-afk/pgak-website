"use client";

import Icon, { type IconName } from "@/components/Icon";
import HeroScene from "@/components/HeroScene";

// Landing hero. The left column carries the real, accessible marketing copy and
// CTAs (unchanged brand text); the right column runs HeroScene — a looping,
// self-contained cinematic that shows what PGAK does (person walks in → camera
// locks on → AI identifies an unknown visitor → instant phone alert → the PGAK
// device links it all in real time). Layout, palette and copy are preserved;
// only the static hero artwork was upgraded to a live animation.

const STATS: { ic: IconName; big: string; small: string }[] = [
  { ic: "radar", big: "Under 3 sec", small: "Threat detection" },
  { ic: "filter", big: "90%", small: "Fewer false alerts" },
  { ic: "ai-node", big: "24×7", small: "Smart monitoring" },
  { ic: "camera", big: "No new", small: "hardware needed" },
];

export default function ImageHero() {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-bg">
      {/* Always-present heading for SEO / screen readers */}
      <h1 className="sr-only">
        Your cameras can see. We make them think. PGAK turns the cameras you
        already own into intelligent guardians — detecting threats in seconds,
        cutting false alarms, and giving you real peace of mind, 24×7.
      </h1>

      <div className="wrap grid min-h-screen items-center gap-12 pb-16 pt-[120px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ── Left: brand copy + CTAs + stats (unchanged content) ── */}
        <div>
          <span className="eyebrow mb-5">AI-powered security intelligence</span>
          <h2 className="display max-w-[14ch] text-[clamp(2.6rem,7vw,5rem)] leading-[1.02]">
            Your cameras can see.
            <br />
            We make them <span className="italic text-accent">think.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[1.1rem] text-ink-soft">
            PGAK turns the cameras you already own into{" "}
            <span className="text-ink underline decoration-accent/50 underline-offset-4">
              intelligent
            </span>{" "}
            guardians — detecting threats in seconds, cutting false alarms, and
            giving you real peace of mind, 24×7.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#demo" className="btn btn-primary">
              Book a free demo →
            </a>
            <a href="#how" className="btn btn-ghost">
              See how it works
            </a>
          </div>

          <div className="mt-12 grid max-w-[760px] grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.big} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent">
                  <Icon name={s.ic} size={20} strokeWidth={1.7} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.98rem] font-semibold text-ink">
                    {s.big}
                  </span>
                  <span className="block text-[0.8rem] text-ink-soft">
                    {s.small}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: cinematic animated scene ── */}
        <div className="relative">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
