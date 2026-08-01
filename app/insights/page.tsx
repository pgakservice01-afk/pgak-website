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

const PATH = "/insights";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Insights — Guides on Intruder Detection, Attendance & Setup | PGAK",
  description:
    "Straight-talking guides from the PGAK team on AI CCTV cameras, intruder detection, camera-based attendance, camera placement and real security for Indian homes, shops and factories.",
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
              description: p.excerpt,
            })),
          },
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
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
                already own — plus deployment stories from real sites.
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
                  Case studies
                </h2>
                <Link
                  href="/insights/case-studies"
                  className="text-[0.92rem] text-accent hover:underline"
                >
                  All case studies →
                </Link>
              </div>
              <p className="mt-2.5 max-w-[60ch] text-ink-soft">
                What actually changed on real sites — what was being lost, what
                we did about it, and how many cameras it took.
              </p>

              <ul className="mt-7 grid gap-5 md:grid-cols-2">
                {CASE_STUDIES.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/insights/case-studies/${c.slug}`}
                      className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                    >
                      <p className="text-[0.74rem] uppercase tracking-[0.16em] text-ink-faint">
                        {c.context}
                      </p>
                      <h3 className="font-display mt-3 text-[1.15rem] font-medium leading-snug transition-colors group-hover:text-accent">
                        {c.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-ink-soft">
                        {c.summary}
                      </p>
                      <span className="mt-5 text-[0.88rem] text-accent">
                        Read the deployment →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="sec pb-0 pt-4">
          <div className="wrap">
            <div className="mx-auto max-w-[1080px]">
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                Guides &amp; explainers
              </h2>
            </div>
          </div>
        </section>

        <section className="pb-[110px]">
          <div className="wrap">
            <div className="mx-auto grid max-w-[1080px] gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
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
                  <h2 className="font-display text-[1.25rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-[0.8rem]">
                    <span className="text-ink-faint">{formatDate(p.date)}</span>
                    <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                      Read →
                    </span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <p className="text-center text-ink-soft">
                First posts landing soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
