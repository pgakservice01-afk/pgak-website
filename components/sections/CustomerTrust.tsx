import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";

/**
 * Customer Trust — "customers trust real proof". Six categories of hard
 * evidence (reviews, photos, videos, factory case studies, certifications,
 * success stories) plus one featured case study with real deployment numbers.
 *
 * Everything here is placeholder-ready: swap the copy and stats for your own
 * verified proof as it comes in. Keep it truthful — this section only works if
 * every claim is real.
 */
const PROOFS: { ic: IconName; t: string; d: string; href?: string }[] = [
  {
    ic: "star",
    t: "Customer Reviews",
    d: "Real, verified ratings from home, shop and factory owners across India.",
    href: "/trust/reviews",
  },
  {
    ic: "photo",
    t: "Installation Photos",
    d: "See exactly how our cameras and edge devices are fitted on real sites.",
    href: "/trust/photos",
  },
  {
    ic: "video",
    t: "Videos",
    d: "Walkthroughs and live-detection clips showing the system in action.",
    href: "/trust/videos",
  },
  {
    ic: "factory",
    t: "Factory Case Studies",
    d: "In-depth breakdowns of large industrial and warehouse deployments.",
  },
  {
    ic: "certificate",
    t: "Security Certifications",
    d: "Compliance and data-protection standards our platform is built to meet.",
  },
  {
    ic: "chart",
    t: "Success Stories",
    d: "Measurable outcomes — theft cut, response times slashed, losses stopped.",
  },
];

const CASE_STUDY = {
  location: "Warehouse in Punjab",
  summary:
    "A high-value distribution warehouse retrofitted its existing CCTV with PGAK intelligence — no rip-and-replace.",
  stats: [
    { value: "120", label: "Cameras connected" },
    { value: "90%", label: "Theft reduced" },
    { value: "3 days", label: "From sign-up to live" },
  ],
};

export default function CustomerTrust() {
  return (
    <section id="trust" className="sec bg-bg-2">
      <div className="wrap">
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Customer trust</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            Customers trust real proof.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            Not promises — evidence. Reviews, photos, videos, case studies and
            certifications from sites we protect every day.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROOFS.map((p, i) => (
            <Reveal
              key={p.t}
              delay={(i % 3) * 0.06}
              className={`glass group relative p-8 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-30px_#7cf5c4] ${
                p.href ? "cursor-pointer" : ""
              }`}
            >
              <div className="mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_10px_24px_-12px_#7cf5c4] transition-transform duration-300 group-hover:scale-105">
                <Icon name={p.ic} size={24} strokeWidth={1.8} />
              </div>
              <h4 className="mb-2 text-[1.2rem] font-semibold">{p.t}</h4>
              <p className="text-[0.93rem] text-ink-soft">{p.d}</p>
              {p.href && (
                <Link
                  href={p.href}
                  className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-accent after:absolute after:inset-0 group-hover:translate-x-0.5"
                >
                  View <span aria-hidden>→</span>
                </Link>
              )}
            </Reveal>
          ))}
        </div>

        {/* Featured case study */}
        <Reveal
          delay={0.1}
          className="card mt-8 flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div className="max-w-[420px]">
            <span className="eyebrow mb-4">Featured case study</span>
            <h3 className="display mt-3 text-[clamp(1.5rem,3vw,2rem)]">
              {CASE_STUDY.location}
            </h3>
            <p className="mt-3 text-[0.98rem] text-ink-soft">
              {CASE_STUDY.summary}
            </p>
          </div>

          <div className="grid flex-none grid-cols-3 gap-6 sm:gap-10">
            {CASE_STUDY.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-none text-accent">
                  {s.value}
                </div>
                <div className="mt-2 text-[0.8rem] text-ink-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
