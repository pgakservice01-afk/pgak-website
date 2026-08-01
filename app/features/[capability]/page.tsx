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
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { CAPABILITIES, getCapability } from "@/lib/capabilities";
import { SOLUTIONS } from "@/lib/solutions";

/**
 * Detailed page per AI capability. Statically generated from
 * lib/capabilities.ts — adding a capability there creates a new indexable
 * page with schema, breadcrumbs and internal links, no route file needed.
 */

export function generateStaticParams() {
  return CAPABILITIES.map((c) => ({ capability: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { capability: string };
}): Metadata {
  const c = getCapability(params.capability);
  if (!c) return {};
  return pageMeta({
    title: c.title,
    description: c.description,
    path: `/features/${c.slug}`,
    keywords: [c.primaryKeyword, ...c.relatedKeywords],
  });
}

export default function CapabilityPage({
  params,
}: {
  params: { capability: string };
}) {
  const c = getCapability(params.capability);
  if (!c) notFound();

  const path = `/features/${c.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: c.navLabel, path },
  ];

  const solutions = c.solutions
    .map((slug) => SOLUTIONS.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const siblings = CAPABILITIES.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ path, name: c.h1, description: c.description }),
          serviceSchema({
            name: c.primaryKeyword,
            description: c.description,
            path,
          }),
          breadcrumbSchema(trail),
          faqSchema(c.faqs),
        ]}
      />

      <Nav />

      <main className="pt-[74px]">
        <section className="sec pb-10">
          <div className="wrap">
            <Breadcrumbs trail={trail} />
            <p className="eyebrow mt-6">Capability</p>
            <h1 className="display mt-4 max-w-[17ch] text-[clamp(2rem,4.4vw,3.1rem)]">
              {c.h1}
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              {c.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#demo" className="btn btn-primary">
                See it on your cameras →
              </Link>
              <Link href="/features" className="btn btn-ghost">
                All features
              </Link>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- how it works */}
        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              How {c.primaryKeyword.toLowerCase()} works
            </h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-2">
              {c.steps.map((st, i) => (
                <li key={st.h3} className="card flex gap-5 p-7">
                  <span
                    aria-hidden="true"
                    className="display shrink-0 text-[1.4rem] text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-semibold">{st.h3}</h3>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                      {st.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------- use cases + honest limits */}
        <section className="sec">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Where it earns its keep
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {c.useCases.map((u) => (
                  <li key={u} className="flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                What it won&rsquo;t do
              </h2>
              <p className="mt-3 text-[0.94rem] text-ink-faint">
                Every AI vendor lists strengths. These are the limits, so you can
                plan around them instead of discovering them.
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {c.limits.map((l) => (
                  <li key={l} className="flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="text-ink-faint">
                      —
                    </span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FAQ */}
        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              {c.navLabel} — common questions
            </h2>
            <div className="mt-8 max-w-[76ch]">
              {c.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-6">
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

        {/* -------------------------------------------------- internal links */}
        <section className="sec">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Solutions built on this
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {solutions.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      className="flex items-baseline gap-2 text-ink-soft transition-colors hover:text-accent"
                    >
                      <span className="text-accent">→</span>
                      <span>{s.primaryKeyword}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Other capabilities
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {siblings.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/features/${x.slug}`}
                      className="flex items-baseline gap-2 text-ink-soft transition-colors hover:text-accent"
                    >
                      <span className="text-accent">→</span>
                      <span>{x.navLabel}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
