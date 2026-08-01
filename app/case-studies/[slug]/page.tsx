import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  webPageSchema,
} from "@/lib/schema";
import { CASE_STUDIES, getCaseStudy } from "@/lib/caseStudies";
import { getSolution } from "@/lib/solutions";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return pageMeta({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/case-studies/${c.slug}`,
    keywords: c.keywords,
    type: "article",
  });
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();

  const path = `/case-studies/${c.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
    { name: c.sector, path },
  ];
  const solution = getSolution(c.solution);

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path,
            name: c.title,
            description: c.metaDescription,
          }),
          breadcrumbSchema(trail),
        ]}
      />

      <Nav />

      <main className="pt-[74px]">
        <article>
          <section className="sec pb-8">
            <div className="wrap max-w-[860px]">
              <Breadcrumbs trail={trail} />
              <p className="eyebrow mt-6">{c.context}</p>
              <h1 className="display mt-4 text-[clamp(2rem,4.4vw,3.1rem)]">
                {c.title}
              </h1>
              <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
                {c.summary}
              </p>

              <dl className="mt-9 grid gap-5 sm:grid-cols-3">
                {[
                  { k: "Sector", v: c.sector },
                  { k: "Location", v: c.city },
                  { k: "Cameras", v: c.cameras },
                ].map((row) => (
                  <div key={row.k} className="card p-6">
                    <dt className="text-[0.74rem] uppercase tracking-[0.16em] text-ink-faint">
                      {row.k}
                    </dt>
                    <dd className="mt-2 text-[0.95rem] text-ink-soft">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="sec-band sec">
            <div className="wrap max-w-[860px]">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                The challenge
              </h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {c.challenge.map((ch) => (
                  <li key={ch} className="flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="text-accent">
                      →
                    </span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="sec">
            <div className="wrap max-w-[860px]">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                What we did
              </h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {c.approach.map((a) => (
                  <div key={a.h3} className="card p-7">
                    <h3 className="text-[1.02rem] font-semibold">{a.h3}</h3>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                      {a.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="sec-band sec">
            <div className="wrap max-w-[860px]">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                What changed
              </h2>
              <ul className="mt-7 grid gap-5 sm:grid-cols-3">
                {c.outcomes.map((o) => (
                  <li key={o.label} className="card p-6">
                    <p className="display text-[1.7rem] text-accent">{o.value}</p>
                    <p className="mt-1.5 text-[0.9rem] text-ink-soft">{o.label}</p>
                  </li>
                ))}
              </ul>

              <blockquote className="mt-10 rounded-[18px] border border-line bg-panel p-8">
                <p className="display text-[clamp(1.1rem,2.2vw,1.4rem)] leading-snug">
                  &ldquo;{c.quote.text}&rdquo;
                </p>
                <footer className="mt-4 text-[0.9rem] text-ink-faint">
                  — {c.quote.attribution}
                </footer>
              </blockquote>

              {c.anonymised && (
                <p className="mt-6 text-[0.86rem] text-ink-faint">
                  Anonymised at the customer&rsquo;s request. Figures describe
                  outcomes at this site and are not independently audited.
                </p>
              )}
            </div>
          </section>
        </article>

        <section className="sec">
          <div className="wrap max-w-[860px]">
            <div className="rounded-[22px] border border-line bg-panel p-10 text-center">
              <h2 className="display text-[clamp(1.5rem,3vw,2.1rem)]">
                {solution
                  ? `Read more about ${solution.primaryKeyword}`
                  : "See what this would look like on your site"}
              </h2>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {solution && (
                  <Link href={`/${solution.slug}`} className="btn btn-primary">
                    {solution.navLabel} →
                  </Link>
                )}
                <Link href="/case-studies" className="btn btn-ghost">
                  All case studies
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
