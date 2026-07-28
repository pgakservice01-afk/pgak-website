"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { INDUSTRIES, SITES, type Industry } from "@/lib/trust";

/**
 * "Protected sites" — an industry-filterable showcase of real-world deployments
 * (inspired by how large industrial firms present their flagship projects).
 * Filter chips let a visitor jump straight to proof for a site like theirs, so
 * the evidence feels personally relevant. Content is data-driven from
 * lib/trust.ts — swap in your own verified figures anytime.
 */
const ICON: Record<Industry, IconName> = {
  Home: "shield-lock",
  Retail: "star",
  Office: "devices",
  Warehouse: "factory",
  Factory: "factory",
  Society: "shield-lock",
};

type Filter = "All" | Industry;

export default function ProtectedSites() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? SITES : SITES.filter((s) => s.industry === filter);

  return (
    <section id="sites" className="sec">
      <div className="wrap">
        <Reveal className="mx-auto mb-10 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Protected sites</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            Real sites. Real outcomes.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            From homes to factory floors — see what changed after PGAK. Filter
            to a site like yours.
          </p>
        </Reveal>

        {/* filter chips */}
        <Reveal className="mb-9 flex flex-wrap justify-center gap-2.5">
          {(["All", ...INDUSTRIES] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-all ${
                filter === f
                  ? "border-accent bg-accent text-[#04201a]"
                  : "border-line text-ink-soft hover:border-accent/50 hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s, i) => (
            <Reveal
              key={s.title + s.location}
              delay={(i % 3) * 0.05}
              className="card flex flex-col p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-wide text-accent">
                  <Icon name={ICON[s.industry]} size={14} strokeWidth={1.8} />
                  {s.industry}
                </span>
                <span className="text-[0.78rem] text-ink-faint">
                  {s.cameras} cameras
                </span>
              </div>

              <h3 className="text-[1.1rem] font-semibold text-ink">{s.title}</h3>
              <p className="text-[0.82rem] text-ink-faint">{s.location}</p>

              <div className="my-5 flex items-baseline gap-2">
                <span className="font-display text-[2.2rem] leading-none text-accent">
                  {s.metric}
                </span>
                <span className="text-[0.82rem] text-ink-soft">
                  {s.metricLabel}
                </span>
              </div>

              <p className="mt-auto text-[0.9rem] leading-relaxed text-ink-soft">
                {s.note}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.78rem] text-ink-faint">
          Representative deployments. A PGAK partner shares figures relevant to
          your site during your free audit.
        </p>
      </div>
    </section>
  );
}
