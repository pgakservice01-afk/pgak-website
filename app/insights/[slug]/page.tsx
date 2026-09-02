import type { Metadata } from "next";
import { waHref } from "@/lib/whatsapp";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import {
  formatDate,
  getAllInsights,
  getInsight,
  getRelatedInsights,
} from "@/lib/insights";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { AUTHOR, pageMeta } from "@/lib/seo";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getInsight(params.slug);
  if (!post) return {};
  return pageMeta({
    // " | PGAK" rather than " — PGAK Insights": the longer suffix spent 16 of
    // the ~60 characters Google shows on brand nobody searches for yet.
    title: `${post.metaTitle ?? post.title} | PGAK`,
    description: post.metaDescription ?? post.excerpt,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    ...(post.image ? { image: post.image } : {}),
  });
}

export default function InsightPost({ params }: Props) {
  const post = getInsight(params.slug);
  if (!post) notFound();

  const path = `/insights/${post.slug}`;
  const related = getRelatedInsights(post.slug);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: post.category, path },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path,
            name: post.title,
            description: post.excerpt,
            datePublished: post.date,
          }),
          articleSchema({
            headline: post.title,
            description: post.excerpt,
            path,
            datePublished: post.date,
            dateModified: post.updated,
            image: post.image,
          }),
          ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
          breadcrumbSchema(trail),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <article className="sec">
          <div className="wrap">
            <div className="mx-auto max-w-[720px]">
              <Breadcrumbs trail={trail} />
              <Link
                href="/insights"
                className="mt-4 inline-flex text-[0.85rem] text-ink-faint transition-colors hover:text-accent"
              >
                ← All insights
              </Link>

              <div className="mt-7 flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.14em]">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
                  {post.category}
                </span>
                <span className="text-ink-faint">
                  {formatDate(post.date)}
                  {post.updated ? ` · Updated ${formatDate(post.updated)}` : ""}
                  {" · "}
                  {post.readTime} min read
                </span>
              </div>

              <h1 className="display mt-5 text-[clamp(1.9rem,4.2vw,2.9rem)]">
                {post.title}
              </h1>

              <p className="mt-3 text-[0.9rem] text-ink-faint">
                By{" "}
                <Link
                  href="/about"
                  className="text-ink-soft transition-colors hover:text-accent"
                >
                  {AUTHOR.name}
                </Link>
                {" — "}
                {AUTHOR.jobTitle}
              </p>

              {post.image && (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={post.image}
                    alt={`${post.title} — article cover image`}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    // Above the fold on an article page: this is the LCP
                    // element, so it must not be lazy-loaded.
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              <div
                className="article-body mt-9"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              {related.length > 0 && (
                <section className="mt-14 border-t border-line pt-8">
                  <h2 className="display text-[1.35rem]">Keep reading</h2>
                  <ul className="mt-5 flex flex-col gap-4">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/insights/${p.slug}`}
                          className="group flex items-baseline gap-2.5"
                        >
                          <span className="text-accent">→</span>
                          <span>
                            <span className="text-ink-soft transition-colors group-hover:text-accent">
                              {p.title}
                            </span>
                            <span className="mt-0.5 block text-[0.82rem] text-ink-faint">
                              {p.category} · {p.readTime} min read
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-14 rounded-[22px] border border-line bg-panel p-8 text-center">
                <h3 className="font-display text-[1.4rem] font-medium">
                  Your cameras can see. We make them think.
                </h3>
                <p className="mx-auto mt-2 max-w-[440px] text-[0.95rem] text-ink-soft">
                  PGAK turns the cameras you already own into intelligent
                  guardians — on your existing setup, live in a day.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href="#dealer" className="btn btn-primary">
                    Get a free AI audit →
                  </a>
                  <a
                    href={waHref("Hi PGAK, I'd like a free audit of my existing cameras.")}
                    target="_blank"
                    rel="noopener"
                    data-cta="post-whatsapp"
                    className="btn btn-ghost"
                  >
                    Or WhatsApp us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Convert in place — post CTAs target this on-page form. */}
        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
