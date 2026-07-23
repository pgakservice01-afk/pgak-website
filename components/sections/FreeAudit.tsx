"use client";

import Reveal from "@/components/Reveal";
import { fbTrack } from "@/lib/fbpixel";

const WA_HREF = `https://wa.me/916283993600?text=${encodeURIComponent(
  "Hi PGAK! I'd like my free AI readiness audit. I have __ cameras at my __ (home / shop / factory)."
)}`;

/**
 * Value-stacked free offer — the strongest conversion pattern on the page.
 * Each line is a real deliverable PGAK can produce from an existing feed
 * (camera scoring, FR readiness, coverage mapping, false-alarm analysis,
 * attendance feasibility). Keep the ₹ values believable and the promise
 * honest: remote, on their existing cameras, report in 48 hours.
 */
const ITEMS = [
  {
    t: "Per-camera placement & feed-quality score (0–100)",
    d: "Height, angle, lighting and stream health — camera by camera.",
    v: "₹4,999",
  },
  {
    t: "Face-recognition readiness report",
    d: "Which cameras can actually identify a person — and what to change.",
    v: "₹2,999",
  },
  {
    t: "Blind-spot & coverage map of your site",
    d: "Where an intruder could walk through unseen today.",
    v: "₹3,499",
  },
  {
    t: "False-alarm analysis",
    d: "Why your current system cries wolf — and what the AI would filter.",
    v: "₹1,999",
  },
  {
    t: "CCTV-based attendance feasibility check",
    d: "Can your gate cameras replace biometric machines? We'll tell you.",
    v: "₹2,499",
  },
];

export default function FreeAudit() {
  return (
    <section id="audit" className="sec relative overflow-hidden">
      <div className="absolute -top-40 left-[15%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#0fb89a44,transparent_70%)] opacity-40 blur-[90px]" />
      <div className="wrap relative z-[2]">
        <Reveal className="mx-auto mb-12 max-w-[720px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Free — no obligation</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            Get a free AI readiness audit of your cameras.
          </h2>
          <p className="mt-4 text-[1.05rem] text-ink-soft">
            Before you spend a rupee, know exactly what your existing setup can
            do. We analyse your feeds remotely and send you a clear report —
            within 48 hours.
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-[820px] rounded-[22px] border border-line bg-panel p-7 sm:p-10">
          <div className="mb-2 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Everything you get —{" "}
            <span className="text-accent">free</span>
          </div>

          <div>
            {ITEMS.map((it) => (
              <div
                key={it.t}
                className="flex items-start justify-between gap-5 border-b border-dashed border-line py-4 last:border-none"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent/15 text-[0.7rem] text-accent">
                    ✓
                  </span>
                  <div>
                    <div className="text-[0.97rem] font-semibold text-ink">
                      {it.t}
                    </div>
                    <div className="mt-0.5 text-[0.84rem] text-ink-faint">
                      {it.d}
                    </div>
                  </div>
                </div>
                <div className="whitespace-nowrap text-[0.95rem] text-ink-faint line-through decoration-danger/70">
                  {it.v}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4">
            <div>
              <div className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
                Total value
              </div>
              <div className="font-display text-[1.5rem] text-ink">
                <span className="text-ink-faint line-through decoration-danger/70">
                  ₹15,995
                </span>{" "}
                <span className="text-accent">→ FREE</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener"
                onClick={() =>
                  fbTrack("Contact", { content_name: "Free Audit — WhatsApp" })
                }
                className="btn btn-primary"
              >
                Claim my free audit →
              </a>
              <a href="#dealer" className="btn btn-ghost">
                Or request a call-back
              </a>
            </div>
          </div>

          <p className="mt-4 text-center text-[0.82rem] text-ink-faint">
            Done remotely on your existing feed · report in 48 hours · zero
            pressure to buy anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
