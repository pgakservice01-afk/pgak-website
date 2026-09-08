import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import WhoIsPgak from "@/components/sections/WhoIsPgak";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
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

      <main className="pt-[74px]">
        {/* ---------------------------------------------------------- hero */}
        <section className="sec pb-10">
          <div className="wrap">
            <Breadcrumbs trail={trail} />

            <p className="eyebrow mt-6">{s.eyebrow}</p>
            <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,4.8vw,3.4rem)]">
              {s.h1}
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              {s.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#dealer" className="btn btn-primary">
                Book a free demo →
              </Link>
              <Link href="/#audit" className="btn btn-ghost">
                Get a free camera audit
              </Link>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {s.stats.map((st) => (
                <li key={st.label} className="card p-6">
                  <p className="display text-[1.9rem] text-accent">{st.value}</p>
                  <p className="mt-1.5 text-[0.9rem] text-ink-soft">{st.label}</p>
                </li>
              ))}
            </ul>
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
                <Link href="#dealer" className="btn btn-primary">
                  Get my free audit →
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Convert in place — same pattern as the feature pages. The
            attendance pages ask the attendance question; everyone else gets
            the audit. */}
        <WhoIsPgak />
        <DealerForm variant={s.group === "attendance" ? "attendance" : "audit"} />
      </main>

      <Footer />
    </>
  );
}
