import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { formatDate, getAllInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights — PGAK | CCTV intelligence, attendance & camera setup",
  description:
    "Straight-talking guides from the PGAK team on AI CCTV, camera-based attendance, camera placement and real security for Indian homes, shops and factories.",
  alternates: { canonical: "https://pgak.co.in/insights" },
  openGraph: {
    title: "PGAK Insights",
    description:
      "Straight-talking guides on AI CCTV, attendance and camera setup.",
    url: "https://pgak.co.in/insights",
    siteName: "PGAK",
    type: "website",
  },
};

export default function InsightsIndex() {
  const posts = getAllInsights();

  return (
    <>
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
                already own. New posts daily.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-[110px]">
          <div className="wrap">
            <div className="mx-auto grid max-w-[1080px] gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insights/${p.slug}`}
                  className="card group flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
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
