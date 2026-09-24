import type { Metadata } from "next";
import Link from "next/link";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import PartnerApply from "@/components/sections/PartnerApply";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, pageMeta } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import {
  FAQS,
  FIT,
  GUARANTEES,
  PAIN,
  STACK,
  STACK_TOTAL,
  STEPS,
  TERMS,
} from "@/lib/partners";

/**
 * /partners — the dealer recruitment page.
 *
 * ── Who this page is written for ──
 * Not a customer. Every other commercial page on this site talks to a factory
 * owner or an HR head; this one talks to the person who *sells* them cameras,
 * and that is a completely different reader. They already know what a CCTV
 * system is, they already have customers, and they are sceptical of anything
 * that smells like a franchise pitch — because they have been shown several.
 *
 * So the page leads with their problem (shrinking hardware margin, one-time
 * revenue) rather than with our product, and the offer is built around the one
 * thing they cannot get anywhere else: recurring income from customers they
 * have already sold to once.
 *
 * ── The two rules it must not break ──
 * 1. NO PUBLISHED RATE. /pricing deliberately never prints PGAK's per-camera
 *    figure, because a single number is wrong for half the people reading it.
 *    This page holds the same line: it states the partner's SHARE
 *    (`TERMS.recurringMarginPct`), never the price the customer pays, and the
 *    earnings section is built on structure rather than on invented rupees.
 * 2. A DEALER IS NOT A LEAD. The application opens a WhatsApp thread and never
 *    touches /api/leads — see the long note in components/sections/PartnerApply.tsx.
 *
 * ⚠️ Every commercial figure comes from `TERMS` in lib/partners.ts, confirmed
 * by the owner on 2026-09-24. Changing one there changes a public promise.
 */
const PATH = "/partners";

export const metadata: Metadata = pageMeta({
  title: "CCTV Dealer Partner Program in India | Become a PGAK Partner",
  description:
    `Add AI to the cameras you already sell. ${TERMS.joiningFee} to join, no stock to buy, protected territory and ${TERMS.recurringMarginPct}% recurring margin every month. Apply for the PGAK partner program.`,
  path: PATH,
  keywords: [
    "CCTV dealer partner program India",
    "become a CCTV dealer",
    "AI CCTV dealership",
    "CCTV reseller program",
    "video analytics channel partner",
    "security system integrator partnership India",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Partner program", path: PATH },
];

/**
 * One-time versus recurring, stated in units of *deals* rather than rupees —
 * the no-published-rate rule (see the file header) means the page cannot print
 * a subscription figure, and it does not need one: the point is the shape of
 * the curve, not its height.
 *
 * Rendered as cards rather than a comparison table on purpose. A three-column
 * table is the obvious markup and it collapses at 375px — measured: 151px rows
 * with every cell wrapping to six lines in a 114px column. This page will be
 * opened from a WhatsApp forward on a phone more often than on a desktop, and
 * this is the section the whole argument turns on, so it has to read there.
 */
const ANNUITY = [
  { m: "Month 1", boxes: "1 deal paid, once", pgak: "1 site paying you" },
  { m: "Month 6", boxes: "1 deal paid, once", pgak: "6 sites paying you" },
  { m: "Month 12", boxes: "1 deal paid, once", pgak: "12 sites paying you" },
  { m: "Month 36", boxes: "1 deal paid, once", pgak: "36 sites paying you" },
] as const;

export default function PartnersPage() {
  const wa = waHref(
    "Hi PGAK, I'd like to apply for the PGAK Partner Program. My company and city: ",
  );

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK Partner Program for CCTV dealers",
            description:
              "Channel partner program for CCTV dealers, installers and system integrators in India: protected territory, recurring monthly margin, co-branded camera audits and no stock to buy.",
          }),
          breadcrumbSchema(TRAIL),
          faqSchema([...FAQS]),
        ]}
      />
      <Nav />
      <main id="main-content" className="pt-[74px]">
        {/* ───────────────────────────────────────────────── hero */}
        <section className="sec pb-10">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">
              PGAK Partner Program · {TERMS.partnersPerBelt === 1 ? "One partner" : `${TERMS.partnersPerBelt} partners`} per pincode belt
            </p>
            <h1 className="display mt-4 max-w-[19ch] text-[clamp(2.1rem,5vw,3.4rem)]">
              Stop selling boxes once. Start getting paid every month.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-relaxed text-ink-soft">
              You already sell cameras, recorders and cable. PGAK is AI software
              that runs on the cameras your customers <em>already own</em> — any
              brand, nothing new to install. You sell it, you keep your hardware
              margin, and you earn{" "}
              <strong className="text-ink">{TERMS.recurringMarginPct}% of the subscription every single month</strong>{" "}
              for as long as that customer stays. {TERMS.joiningFee} to join.
              Nothing to stock.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#apply" data-cta="partners-hero-apply" className="btn btn-primary btn-wrap">
                Apply for my territory →
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="partners-hero-whatsapp"
                className="btn btn-ghost"
              >
                Ask on WhatsApp
              </a>
              <a href={`tel:${BUSINESS.phoneE164}`} data-cta="partners-hero-call" className="link-more">
                Or call {BUSINESS.phone}
              </a>
            </div>

            <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { big: TERMS.joiningFee, label: "Joining fee, deposit and stock commitment" },
                { big: `${TERMS.recurringMarginPct}%`, label: "Of the subscription, paid to you monthly" },
                { big: `${TERMS.demoReadyHours} h`, label: "From approval to a live demo on your phone" },
                { big: `${TERMS.dealProtectionDays} days`, label: "Deal registration protection, in writing" },
              ].map((s) => (
                <li key={s.label} className="rounded-[16px] border border-line bg-panel p-5">
                  <p className="font-display text-[1.7rem] font-semibold leading-none text-accent">{s.big}</p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────────────────────────────────── the problem */}
        <section className="sec pt-6">
          <div className="wrap">
            <p className="eyebrow">Before the pitch</p>
            <h2 className="display mt-4 max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.4rem)]">
              We know exactly what this trade looks like right now.
            </h2>
            <p className="mt-5 max-w-[62ch] text-ink-soft">
              PGAK sells through dealers and installs alongside them every week.
              None of this will be news to you — but it is worth putting on
              paper, because the rest of this page only matters if it is true.
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {PAIN.map((p) => (
                <li key={p.h} className="rounded-[16px] border border-line bg-panel p-6">
                  <h3 className="text-[1.05rem] font-semibold text-ink">{p.h}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">{p.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[62ch] text-[1.02rem] leading-relaxed text-ink">
              Every one of those problems has the same root: you are selling
              something anyone can buy, once. The fix is not a better price from
              your distributor. It is selling something they cannot buy
              anywhere else, that keeps paying you after the van leaves.
            </p>
          </div>
        </section>

        {/* ──────────────────────────────── what you'd be selling */}
        <section className="sec pt-0">
          <div className="wrap">
            <div className="rounded-[22px] border border-line bg-panel p-8 sm:p-10">
              <p className="eyebrow">What you would actually be selling</p>
              <h2 className="display mt-4 text-[clamp(1.5rem,3vw,2.1rem)]">
                Software that makes a customer&rsquo;s existing cameras think.
              </h2>
              <p className="mt-4 max-w-[68ch] text-ink-soft">
                No new cameras. No rip-and-replace. PGAK connects to the DVR or
                NVR that is already on the wall and adds the things your
                customers keep asking you for: intruder alerts that fire while
                it is happening, face-recognition attendance at the gate,
                number-plate logging, and every site on one screen.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  ["AI intruder detection", "/ai-intruder-detection"],
                  ["Face recognition attendance", "/face-recognition-attendance-system"],
                  ["ANPR number plate recognition", "/anpr-number-plate-recognition"],
                  ["Multi-site monitoring", "/multi-site-cctv-monitoring"],
                  ["Video analytics software", "/video-analytics-software"],
                  ["Smart perimeter protection", "/smart-perimeter-protection"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-2.5 text-[0.95rem] text-ink-soft transition-colors hover:text-accent"
                    >
                      <span aria-hidden="true" className="text-accent">
                        →
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[68ch] text-[0.94rem] leading-relaxed text-ink-faint">
                Which means the pitch you make is not &ldquo;buy a new system&rdquo;.
                It is &ldquo;keep everything you bought from me, and I will make
                it do four things it cannot do today&rdquo;. That is a far easier
                conversation, and it is one only you can have — because you are
                the person who installed it.
              </p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────── one-time vs recurring */}
        <section className="sec pt-0">
          <div className="wrap">
            <p className="eyebrow">The part that changes your business</p>
            <h2 className="display mt-4 max-w-[24ch] text-[clamp(1.6rem,3.4vw,2.4rem)]">
              You are not selling twelve more deals. You are building twelve annuities.
            </h2>
            <p className="mt-5 max-w-[62ch] text-ink-soft">
              Sell one site a month for three years. Here is what the two
              business models look like in month thirty-six — same effort, same
              customers, same city.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ANNUITY.map((r) => (
                <li key={r.m} className="rounded-[16px] border border-line bg-panel p-6">
                  <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">{r.m}</p>
                  <div className="mt-4">
                    <p className="text-[0.74rem] uppercase tracking-wide text-ink-faint">
                      Hardware only
                    </p>
                    <p className="mt-1 text-[0.95rem] text-ink-soft">{r.boxes}</p>
                  </div>
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="text-[0.74rem] uppercase tracking-wide text-accent">
                      Hardware + PGAK
                    </p>
                    <p className="mt-1 font-display text-[1.15rem] font-semibold leading-snug text-ink">
                      {r.pgak}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-[64ch] text-[0.96rem] leading-relaxed text-ink-soft">
              The hardware column is not smaller. It is identical — you sell
              exactly what you sell today. The difference is the column beside
              it, which did not exist before and does not stop. And because PGAK
              runs on cameras that are already installed, your first sales are
              to customers whose numbers are already in your phone.
            </p>
            <p className="mt-4 max-w-[64ch] text-[0.94rem] leading-relaxed text-ink-faint">
              We do not print a per-camera rate on this website, for customers
              or for partners, because the honest number depends on the site.
              On the partner call we run the arithmetic with your own deal
              sizes, on a site you have actually quoted.
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────────── value stack */}
        <section className="sec pt-0">
          <div className="wrap">
            <p className="eyebrow">Everything an approved partner gets</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)]">
              The whole programme, itemised.
            </h2>
            <p className="mt-5 max-w-[62ch] text-ink-soft">
              Priced the way you would have to buy or build each piece on your
              own. You pay {TERMS.joiningFee} for all of it.
            </p>

            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {STACK.map((s) => (
                <li key={s.t} className="flex gap-4 rounded-[16px] border border-line bg-panel p-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/[0.08] text-[0.85rem] font-semibold text-accent"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-medium text-ink">{s.t}</p>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">{s.d}</p>
                    <p className="mt-2 text-[0.8rem] text-ink-faint">
                      Worth <span className="text-ink-soft">{s.worth}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-[16px] border border-accent/25 bg-accent/[0.06] p-6">
              <div>
                <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
                  What this would cost you to assemble alone
                </p>
                <p className="font-display text-[1.6rem] text-ink">
                  <span className="text-ink-faint line-through">{STACK_TOTAL}</span>{" "}
                  <span className="text-accent">→ {TERMS.joiningFee}</span>
                </p>
                <p className="mt-1 text-[0.85rem] text-ink-soft">
                  We are paid out of what your customer pays for the software —
                  which means we are paid after you are.
                </p>
              </div>
              <a href="#apply" data-cta="partners-stack-apply" className="btn btn-primary btn-wrap">
                Apply for my territory →
              </a>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────── risk reversal */}
        <section className="sec pt-0">
          <div className="wrap">
            <p className="eyebrow">What it costs you if we are wrong</p>
            <h2 className="display mt-4 max-w-[24ch] text-[clamp(1.6rem,3.4vw,2.4rem)]">
              Your customer relationship is your business. We do not gamble it.
            </h2>
            <p className="mt-5 max-w-[64ch] text-ink-soft">
              The real question a dealer asks is not &ldquo;is the product
              good?&rdquo; It is &ldquo;what happens to me if it does not work at
              my customer&rsquo;s site?&rdquo; Three answers.
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {GUARANTEES.map((g, i) => (
                <li key={g.t} className="rounded-[16px] border border-line bg-panel p-6">
                  <span className="font-display text-[1.6rem] font-semibold leading-none text-accent">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[1.02rem] font-semibold text-ink">{g.t}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{g.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────────────────────────────────────── the steps */}
        <section className="sec pt-0">
          <div className="wrap">
            <p className="eyebrow">Your first thirty days</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)]">
              How it goes from here.
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.h} className="rounded-[16px] border border-line bg-panel p-6">
                  <span className="font-display text-[1.6rem] font-semibold leading-none text-accent">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[1.02rem] font-semibold text-ink">{s.h}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ────────────────────────────────────────── qualification */}
        <section className="sec pt-0">
          <div className="wrap">
            <p className="eyebrow">Before you spend two minutes applying</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)]">
              We turn people down, and we would rather do it now.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border border-accent/25 bg-accent/[0.05] p-6">
                <h3 className="text-[1.05rem] font-semibold text-ink">This is built for you if&hellip;</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {FIT.yes.map((y) => (
                    <li key={y} className="flex gap-3 text-[0.93rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                        ✓
                      </span>
                      {y}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-line p-6">
                <h3 className="text-[1.05rem] font-semibold text-ink">Please do not apply if&hellip;</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {FIT.no.map((n) => (
                    <li key={n} className="flex gap-3 text-[0.93rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 text-ink-faint">
                        ✕
                      </span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────── territory */}
        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[780px] rounded-[22px] border border-line bg-panel p-8 text-center sm:p-10">
              <p className="eyebrow eyebrow-center">Why we cannot approve everyone</p>
              <h2 className="display mt-4 text-[clamp(1.5rem,3vw,2.1rem)]">
                A protected belt is only worth something if it is protected.
              </h2>
              <p className="mx-auto mt-4 max-w-[58ch] text-ink-soft">
                We appoint {TERMS.partnersPerBelt === 1 ? "one partner" : `${TERMS.partnersPerBelt} partners`} per pincode
                belt and route every enquiry from that belt to them. The
                arithmetic is unavoidable: once a belt is taken, it is closed
                until that partner stops. We check yours on the call and tell
                you either way in that conversation — not in three weeks.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href="#apply" data-cta="partners-territory-apply" className="btn btn-primary btn-wrap">
                  Check if my belt is open →
                </a>
                <Link href="/areas-we-serve" className="btn btn-ghost">
                  See where we already run
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────── faqs */}
        <section className="sec pt-0">
          <div className="wrap">
            <h2 className="display text-[clamp(1.6rem,3.2vw,2.3rem)]">
              What dealers ask us first
            </h2>
            <div className="mt-6 max-w-[780px]">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-[1.02rem] font-medium text-ink">
                    {f.q}
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[66ch] text-[0.95rem] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-[0.9rem] text-ink-soft">
              Still deciding what you would be selling?{" "}
              <Link href="/solutions" className="text-accent underline underline-offset-4">
                See the solutions
              </Link>
              ,{" "}
              <Link href="/features" className="text-accent underline underline-offset-4">
                the capabilities
              </Link>{" "}
              or{" "}
              <Link href="/insights/case-studies" className="text-accent underline underline-offset-4">
                sites already running it
              </Link>
              .
            </p>
          </div>
        </section>

        <PartnerApply />
      </main>
      <Footer />
    </>
  );
}
