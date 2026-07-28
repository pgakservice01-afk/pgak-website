import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { formatDate, getAllInsights, getInsight } from "@/lib/insights";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getInsight(params.slug);
  if (!post) return {};
  const url = `https://pgak.co.in/insights/${post.slug}`;
  return {
    title: `${post.title} — PGAK Insights`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "PGAK",
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function InsightPost({ params }: Props) {
  const post = getInsight(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "PGAK" },
    publisher: { "@type": "Organization", name: "PGAK", url: "https://pgak.co.in" },
    mainEntityOfPage: `https://pgak.co.in/insights/${post.slug}`,
  };

  return (
    <>
      <Nav />
      <main className="pt-[74px]">
        <article className="sec">
          <div className="wrap">
            <div className="mx-auto max-w-[720px]">
              <Link
                href="/insights"
                className="text-[0.85rem] text-ink-faint transition-colors hover:text-accent"
              >
                ← All insights
              </Link>

              <div className="mt-7 flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.14em]">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
                  {post.category}
                </span>
                <span className="text-ink-faint">
                  {formatDate(post.date)} · {post.readTime} min read
                </span>
              </div>

              <h1 className="display mt-5 text-[clamp(1.9rem,4.2vw,2.9rem)]">
                {post.title}
              </h1>

              {post.image && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              )}

              <div
                className="article-body mt-9"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              <div className="mt-14 rounded-[22px] border border-line bg-panel p-8 text-center">
                <h3 className="font-display text-[1.4rem] font-medium">
                  Your cameras can see. We make them think.
                </h3>
                <p className="mx-auto mt-2 max-w-[440px] text-[0.95rem] text-ink-soft">
                  PGAK turns the cameras you already own into intelligent
                  guardians — on your existing setup, live in a day.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href="/#audit" className="btn btn-primary">
                    Get a free AI audit →
                  </a>
                  <a href="/#demo" className="btn btn-ghost">
                    Book a demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
