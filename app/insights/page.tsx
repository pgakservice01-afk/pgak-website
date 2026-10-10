import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import PostCover from "@/components/insights/PostCover";
import { formatDate, getAllInsights } from "@/lib/insights";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { CLUSTERS, clusterOf } from "@/lib/insight-clusters";

const PATH = "/insights";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Guides — Detection, Attendance & Setup | PGAK",
  description:
    "Straight-talking guides on AI CCTV, intruder detection, camera-based attendance and placement, for Indian homes, shops and factories.",
  path: PATH,
  keywords: [
    "AI CCTV guide",
    "CCTV camera tips India",
    "intruder detection explained",
    "camera based attendance",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Insights", path: PATH },
];

export default function InsightsIndex() {
  const posts = getAllInsights();

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK Insights",
            description:
              "Guides on AI CCTV, intruder detection, attendance and camera setup.",
          }),
          breadcrumbSchema(TRAIL),
          {
            "@type": "Blog",
            "@id": "https://www.pgak.co.in/insights#blog",
            name: "PGAK Insights",
            url: "https://www.pgak.co.in/insights",
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://www.pgak.co.in/insights/${p.slug}`,
              datePublished: p.date,
            })),
          },
        ]}
      />
      <Nav />
      <main id="main-content" className="pt-[74px]">
        <section className="sec pb-[60px]">
          <div className="wrap">
            <div className="mx-auto max-w-[680px] text-center">
              <span className="eyebrow eyebrow-center mb-4">Insights</span>
              <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
                Security, explained straight.
              </h1>
              <p className="mx-auto mt-4 max-w-[540px] text-[1.05rem] text-ink-soft">
                Guides from the PGAK team on intelligent CCTV, camera-based
                attendance and getting real protection from the cameras you
                already own — plus worked scenarios showing how a site like yours would use it.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- case studies */}
        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[1080px]">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                  Use-case scenarios
                </h2>
                <Link
                  href="/insights/case-studies"
                  className="text-[0.92rem] text-accent hover:underline"
                >
                  All scenarios →
                </Link>
              </div>
              <p className="mt-2.5 max-w-[60ch] text-ink-soft">
                Worked scenarios — what a site is losing, how PGAK would be set
                up on its existing cameras, and how many it takes. Illustrative:
                the figures are modelled, not measured at a named customer.
              </p>

              <ul className="mt-7 grid gap-5 md:grid-cols-2">
                {CASE_STUDIES.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/insights/case-studies/${c.slug}`}
                      className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                    >
                      <p className="text-[0.74rem] uppercase tracking-[0.16em] text-ink-faint">
                        Illustrative scenario · {c.context}
                      </p>
                      <h3 className="font-display mt-3 text-[1.15rem] font-medium leading-snug transition-colors group-hover:text-accent">
                        {c.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-ink-soft">
                        {c.summary}
                      </p>
                      <span className="mt-5 text-[0.88rem] text-accent">
                        Read the scenario →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/*
          Six newest as cards, then every article as a plain link under its
          topic. The hub used to render all posts as image cards (~509 KiB of
          HTML on 2026-10-08); this keeps every article one server-rendered
          link away from /insights without the weight, and gives each topic
          its own anchor.
        */}
        <section className="sec pb-0 pt-4">
          <div className="wrap">
            <div className="mx-auto max-w-[1080px]">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">Latest</h2>
            </div>
          </div>
        </section>

        <section className="pb-12 pt-6">
          <div className="wrap">
            <div className="mx-auto grid max-w-[1080px] gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 6).map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/insights/${p.slug}`}
                  className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <PostCover
                    image={p.image}
                    category={p.category}
                    title={p.title}
                    priority={i < 3}
                    className="border-b border-line"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-4 flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.14em]">
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
                        {p.category}
                      </span>
                      <span className="text-ink-faint">{p.readTime} min read</span>
                    </div>
                    <h3 className="font-display text-[1.25rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-[0.8rem]">
                      <span className="text-ink-faint">{formatDate(p.date)}</span>
                      <span className="text-accent">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {posts.length === 0 && (
              <p className="text-center text-ink-soft">First posts landing soon.</p>
            )}
          </div>
        </section>

        <section className="pb-[110px]" aria-labelledby="topics-h">
          <div className="wrap">
            <div className="mx-auto max-w-[1080px]">
              <h2 id="topics-h" className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                Every guide, by topic
              </h2>
              <nav aria-label="Topics" className="mt-4 flex flex-wrap gap-2 text-[0.88rem]">
                {CLUSTERS.map((c) => (
                  <a key={c.id} href={`#topic-${c.id}`} className="rounded-full border border-line px-3 py-1 hover:border-accent">
                    {c.name}
                  </a>
                ))}
              </nav>
              {CLUSTERS.map((c) => {
                const inCluster = posts.filter((p) => clusterOf(p.slug, p.category) === c.id);
                if (inCluster.length === 0) return null;
                return (
                  <section key={c.id} id={`topic-${c.id}`} className="mt-10 scroll-mt-24">
                    <h3 className="text-[1.15rem] font-semibold">
                      {c.name} <span className="text-[0.85rem] font-normal text-ink-faint">· {inCluster.length}</span>
                    </h3>
                    <ul className="mt-3 grid gap-x-8 gap-y-3 md:grid-cols-2">
                      {inCluster.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/insights/${p.slug}`} className="font-medium text-ink hover:text-accent">
                            {p.title}
                          </Link>
                          <p className="mt-0.5 line-clamp-2 text-[0.86rem] text-ink-soft">{p.excerpt}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
