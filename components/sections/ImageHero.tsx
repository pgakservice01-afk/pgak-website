"use client";

import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "@/components/Icon";

// Landing hero. Primary state = the supplied composed hero artwork at
// /public/hero-landing.png (drop the file there before deploy). Until that file
// exists — or if it ever fails to load — a clean, fully-functional text hero is
// shown instead, so the page is never broken.

const STATS: { ic: IconName; big: string; small: string }[] = [
  { ic: "radar", big: "Under 3 sec", small: "Threat detection" },
  { ic: "filter", big: "90%", small: "Fewer false alerts" },
  { ic: "ai-node", big: "24×7", small: "Smart monitoring" },
  { ic: "camera", big: "No new", small: "hardware needed" },
];

export default function ImageHero() {
  const [imgOk, setImgOk] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Catch the case where the image already failed to load before React attached
  // the onError handler (SSR hydration race) — e.g. the file isn't there yet.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setImgOk(false);
  }, []);

  return (
    <section id="top" className="relative w-full overflow-hidden bg-bg">
      {/* Always-present heading for SEO / screen readers */}
      <h1 className="sr-only">
        Your cameras can see. We make them think. PGAK turns the cameras you
        already own into intelligent guardians — detecting threats in seconds,
        cutting false alarms, and giving you real peace of mind, 24×7.
      </h1>

      {/* Phones: fully-responsive text hero — legible copy + large tappable CTAs.
          (A single baked-text landscape image is too cramped on a 375px screen.) */}
      <div className="md:hidden">
        <FallbackHero />
      </div>

      {/* Tablet / desktop: the supplied composed hero artwork.
          Falls back to the text hero if the image file is ever missing. */}
      <div className="hidden md:block">
        {imgOk ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src="/hero-landing.png"
              alt="PGAK AI security — a CCTV camera feeding the PGAK edge device and the PGAK phone app dashboard with live feeds and alerts, a family relaxing at home in the background."
              className="block h-auto w-full select-none"
              onError={() => setImgOk(false)}
            />
            {/* Clickable hotspots over the baked-in buttons (tuned to the artwork) */}
            <a
              href="#demo"
              aria-label="Book a free demo"
              className="absolute left-[2.4%] top-[66.5%] h-[7.5%] w-[15.5%] rounded-full focus:outline focus:outline-2 focus:outline-accent"
            />
            <a
              href="#how"
              aria-label="See how it works"
              className="absolute left-[18.6%] top-[66.5%] h-[7.5%] w-[16.5%] rounded-full focus:outline focus:outline-2 focus:outline-accent"
            />
          </div>
        ) : (
          <FallbackHero />
        )}
      </div>
    </section>
  );
}

function FallbackHero() {
  return (
    <div className="wrap flex min-h-screen flex-col justify-center pb-16 pt-[120px]">
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
              <span className="block text-[0.8rem] text-ink-soft">{s.small}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
