import Link from "next/link";
import Reveal from "@/components/Reveal";
import PostCover from "@/components/insights/PostCover";
import { formatDate, getAllInsights } from "@/lib/insights";

/** Latest 3 posts on the homepage — authority + SEO internal linking. */
export default function InsightsTeaser() {
  const posts = getAllInsights().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="insights" className="sec">
      <div className="wrap">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="eyebrow mb-4">From the blog</span>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
              Straight talk on real security.
            </h2>
            <p className="mt-3 max-w-[46ch] text-[1.02rem] text-ink-soft">
              Guides from the PGAK team on AI CCTV, camera-based attendance and
              getting real protection from the cameras you already own.
            </p>
          </div>
          <Link
            href="/insights"
            className="btn btn-ghost"
          >
            All insights →
          </Link>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/insights/${p.slug}`}
                className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <PostCover
                  image={p.image}
                  category={p.category}
                  title={p.title}
                  className="border-b border-line"
                />
                <div className="flex flex-1 flex-col p-7">
                <div className="mb-4 flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.14em]">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
                    {p.category}
                  </span>
                  <span className="text-ink-faint">{p.readTime} min</span>
                </div>
                <h3 className="font-display text-[1.2rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-ink-soft">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
