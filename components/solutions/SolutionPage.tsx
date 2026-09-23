import Link from "next/link";
import { waHref } from "@/lib/whatsapp";
import QuickLead from "@/components/sections/QuickLead";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import JourneyChooser from "@/components/sections/JourneyChooser";
import BuyerDecisionPack from "@/components/solutions/BuyerDecisionPack";
import WhoIsPgak from "@/components/sections/WhoIsPgak";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { buyerDecisionFor } from "@/lib/buyerDecision";
import { getAllInsights } from "@/lib/insights";
import { SOLUTIONS, type Solution } from "@/lib/solutions";

/**
 * Shared template for every /{solution} landing page. Each page file supplies
 * only its slug; all copy, keywords, FAQs and internal links come from
 * lib/solutions.ts so the structure stays identical across the cluster.
 *
 * Heading discipline: exactly one <h1> (the solution's primary keyword),
 * sections are <h2>, and section points are <h3>.
 */
export default function SolutionPage({ solution }: { solution: Solution }) {
  const s = solution;
  const isNew = s.journey === "new-install";
  const decision = buyerDecisionFor(s.slug);
  const path = `/${s.slug}`;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: s.navLabel, path },
  ];

  const related = s.related
    .map((slug) => SOLUTIONS.find((x) => x.slug === slug))
    .filter((x): x is Solution => Boolean(x));

  const allPosts = getAllInsights();
  const posts = s.insights
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path,
            name: s.h1,
            description: s.description,
          }),
          serviceSchema({
            name: s.primaryKeyword,
            description: s.description,
            path,
          }),
          breadcrumbSchema(trail),
          faqSchema(s.faqs),
        ]}
      />

      <Nav />

      <main id="main-content" data-money-page={s.slug} className="pt-[74px]">
        {/* ---------------------------------------------------------- hero */}
        <section className="sec pb-10">
          <div className="wrap">
            <Breadcrumbs trail={trail} />

            <p className="eyebrow mt-6">{s.eyebrow}</p>
            <h1 className="display mt-4 max-w-[28ch] text-[clamp(2.1rem,4.8vw,3.4rem)]">
              {s.h1}
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              {s.intro}
            </p>

            {isNew ? (
              <>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="#plan" data-cta="solution-plan-new" data-intent="new-installation" className="btn btn-primary">
                    Plan a new installation →
                  </Link>
                  <a href={waHref("Hi PGAK, I am planning a new CCTV installation and would like to discuss the site.")} data-cta="solution-whatsapp" className="btn btn-ghost">WhatsApp about a new site</a>
                </div>
                <p className="mt-5 max-w-[70ch] text-sm text-ink-soft">
                  Already have cameras?{" "}
                  <Link href="/free-audit" data-cta="solution-existing-audit" className="text-accent underline underline-offset-2">
                    Check what they can do with a free assessment
                  </Link>
                  .
                </p>
              </>
            ) : (
              <>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="#dealer" data-cta="solution-assessment" data-intent="assessment" className="btn btn-primary">
                    Get Free Camera Audit →
                  </Link>
                  <a href={waHref(`Hi PGAK, I want to evaluate ${s.primaryKeyword} for our business. Please help assess our existing CCTV cameras.`)} data-cta="solution-whatsapp" className="btn btn-ghost">WhatsApp about this solution</a>
                </div>

                <div className="mt-7 max-w-[640px]"><QuickLead cta={`solution-${s.slug}`} /></div>
                <p className="mt-5 max-w-[70ch] text-sm text-ink-soft">
                  Compatibility, detection quality and processing requirements are confirmed on your own camera feeds. Published scenarios are illustrative, not verified customer results.{" "}
                  {s.group !== "attendance" && (
                    <>
                      No cameras yet?{" "}
                      <Link href="/cctv-installation-company#plan" data-cta="solution-new-install" className="text-accent underline underline-offset-2">
                        Plan a new installation
                      </Link>
                      .
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------ the pain */}
        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.6rem,3vw,2.3rem)]">
              Sound familiar?
            </h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-2">
              {s.painPoints.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 rounded-[16px] border border-line bg-panel p-5 text-ink-soft"
                >
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- content */}
        <section className="sec">
          <div className="wrap flex flex-col gap-14">
            {s.sections.map((sec) => (
              <article key={sec.h2} className="max-w-[70ch]">
                <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                  {sec.h2}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">{sec.body}</p>

                {sec.points && (
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {sec.points.map((pt) => (
                      <div key={pt.h3} className="card p-6">
                        <h3 className="text-[1.02rem] font-semibold">{pt.h3}</h3>
                        <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                          {pt.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* The deciding facts, in crawlable HTML. Pages with a buyer-decision
            entry answer them in full (lib/buyerDecision.ts); the rest keep the
            shorter pre-deployment checklist. Never both: the same content twice
            helps nobody and dilutes the page. */}
        {decision ? (
          <BuyerDecisionPack
            decision={decision}
            heading={`${s.primaryKeyword}: what to know before you buy`}
            planHref={isNew ? "#plan" : "#dealer"}
            ctaLabel={isNew ? "Plan a new installation" : "Start with the free camera check"}
          />
        ) : (
        <section className="sec"><div className="wrap max-w-[76ch]">
          <h2 className="display text-3xl">What to check before deployment</h2>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            {(isNew ? [
              ["Site survey and coverage plan", "Agree the areas that must be covered — gates, boundaries, loading bays, entrances — and what each camera must be able to see or detect, before camera models are chosen."],
              ["Cabling, power and network", "Confirm cable routes, power points, network and where the recorder and processing unit will sit. These drive cost as much as the cameras do."],
              ["Recording and storage", "Decide how many days of footage you need to keep and size storage to that, rather than to a default disk."],
              ["Itemised quotation", "Ask for cameras, cabling, power, recorder, storage, AI setup, commissioning, handover and support as separate lines, with what is included and what is optional."],
            ] : [
              ["Camera and recorder streams", "Confirm RTSP access or ONVIF discovery, stream stability and the views that matter. Do not send camera passwords in the enquiry form."],
              ["On-site processing", "Ask which processing device is needed, how it is sized, what runs locally and what information leaves the site."],
              [s.group === "attendance" ? "Attendance acceptance" : "Alert acceptance", s.group === "attendance" ? "Test real entrance conditions and enrolled staff with consent. Agree how missed or disputed records will be corrected before payroll use." : "Test agreed zones in daytime and at night. Record useful alerts, nuisance alerts, missed events and end-to-end alert delay."],
              ["Complete commercial quote", "Confirm enabled cameras, sites, subscription, setup, hardware, taxes and support. Use the assessed scope to compare proposals."],
            ]).map(([term,description])=><div key={term} className="card p-5"><dt className="font-semibold">{term}</dt><dd className="mt-2 text-ink-soft">{description}</dd></div>)}
          </dl>
          <p className="mt-6"><Link href="/pricing" className="text-accent underline">Get a site-specific AI video analytics price</Link> or <Link href="/cctv-buying-checklist" className="text-accent underline">use the CCTV buying checklist</Link>.</p>
        </div></section>
        )}

        {/* ----------------------------------------------------------- FAQ */}
        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.6rem,3vw,2.3rem)]">
              {s.primaryKeyword} — common questions
            </h2>
            <div className="mt-8 max-w-[76ch]">
              {s.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-6 text-[1.02rem] font-medium">
                    <h3 className="text-[1.02rem] font-medium">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[68ch] leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ internal links */}
        <section className="sec">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Related solutions
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/${r.slug}`}
                      className="group flex items-baseline gap-2 text-ink-soft transition-colors hover:text-accent"
                    >
                      <span className="text-accent">→</span>
                      <span>
                        <span className="font-medium text-ink group-hover:text-accent">
                          {r.navLabel}
                        </span>{" "}
                        — {r.primaryKeyword}
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/solutions"
                    className="flex items-baseline gap-2 text-ink-soft transition-colors hover:text-accent"
                  >
                    <span className="text-accent">→</span>
                    <span>See all PGAK solutions</span>
                  </Link>
                </li>
              </ul>
            </div>

            {(posts.length > 0 || (s.caseStudies?.length ?? 0) > 0) && (
              <div>
                <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  Read more on this
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/insights/${p.slug}`}
                        className="flex items-baseline gap-2 text-ink-soft transition-colors hover:text-accent"
                      >
                        <span className="text-accent">→</span>
                        <span>{p.title}</span>
                      </Link>
                    </li>
                  ))}
                  {s.caseStudies?.map((cs) => (
                    <li key={cs.href}>
                      <Link
                        href={cs.href}
                        className="flex items-baseline gap-2 text-ink-soft transition-colors hover:text-accent"
                      >
                        <span className="text-accent">→</span>
                        <span>{cs.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ----------------------------------------------------------- CTA */}
        {s.group === "attendance" ? (
        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[720px] rounded-[22px] border border-line bg-panel p-10 text-center">
              <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">
                Start with a free audit of your own cameras.
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-ink-soft">
                Your number and camera count is all it takes. We call within one
                working hour and send the report within 48 hours.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="#dealer" data-cta="solution-bottom-assessment" className="btn btn-primary">
                  Get my free audit →
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
        ) : (
          <section className="sec pt-0">
            <div className="wrap">
              <JourneyChooser
                upgradeHref={isNew ? "/free-audit" : "#dealer"}
                newHref={isNew ? "#plan" : "/cctv-installation-company#plan"}
                ctaPrefix={`solution-${s.slug}-journey`}
              />
            </div>
          </section>
        )}

        {/* Convert in place — same pattern as the feature pages. The
            attendance pages ask the attendance question; everyone else gets
            the audit. */}
        <WhoIsPgak />
        {isNew ? (
          <DealerForm variant="new-install" id="plan" />
        ) : (
          <DealerForm variant={s.group === "attendance" ? "attendance" : "audit"} />
        )}
      </main>

      <Footer />
    </>
  );
}
