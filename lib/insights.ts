import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Insights (blog) loader — reads markdown files from content/insights/ at
 * build time. Posting a new blog = dropping a .md file in that folder and
 * pushing to main (see BLOGGING.md). No CMS, no database.
 *
 * Frontmatter contract:
 *   ---
 *   title: "Your DVR records the theft. It doesn't stop it."
 *   date: "2026-07-23"          # YYYY-MM-DD — controls ordering
 *   category: "Security Basics" # short label shown on the card
 *   excerpt: "One-or-two lines shown on cards and in search results."
 *   readTime: 4                 # minutes (optional; estimated if missing)
 *   ---
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

export type InsightFaq = { q: string; a: string };

export type InsightMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  /** Real last-edit date (YYYY-MM-DD) — feeds sitemap lastmod + dateModified. */
  updated?: string;
  category: string;
  excerpt: string;
  /**
   * Search-result overrides. A headline that reads well above the article is
   * often too long for a SERP, where Google truncates around 60 characters for
   * the title and 155 for the snippet — so the H1 and the listing can differ.
   * Both are optional and fall back to `title` / `excerpt`.
   */
  metaTitle?: string;
  metaDescription?: string;
  readTime: number; // minutes
  /** Optional cover image, e.g. "/insights/my-post.jpg" in /public. */
  image?: string;
  /** Optional FAQ pairs — emitted as FAQPage JSON-LD; keep answers in the body too. */
  faqs?: InsightFaq[];
};

export type Insight = InsightMeta & {
  /** Rendered HTML body */
  html: string;
};

function isPostFile(f: string) {
  return f.endsWith(".md") && !f.startsWith("_") && !f.startsWith("HOW");
}

export function getAllInsights(): InsightMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(isPostFile)
    .map((file) => readMeta(file))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Sibling links for a post, used to build a crawlable mesh between articles.
 *
 * Every post used to be reachable only from /insights. When Google declined to
 * index that one hub, all 40 articles became undiscoverable at once. The first
 * pick here is deliberately the *next* post in canonical order, wrapping at the
 * end: that alone forms a closed ring through every article, so a crawler that
 * reaches any single post can walk to all the others without /insights. The
 * remaining picks prefer the same category, then rotate through the rest so
 * inbound links spread evenly instead of piling onto the newest few posts.
 */
export function getRelatedInsights(slug: string, limit = 4): InsightMeta[] {
  const all = getAllInsights();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1 || all.length < 2) return [];

  const picked: InsightMeta[] = [];
  const seen = new Set([slug]);
  const take = (p: InsightMeta) => {
    if (seen.has(p.slug) || picked.length >= limit) return;
    picked.push(p);
    seen.add(p.slug);
  };

  // 1. The ring link — guarantees every post has at least one inbound sibling.
  take(all[(i + 1) % all.length]);

  // 2. Same category, scanning outward from this post so neighbours differ.
  for (let n = 1; n < all.length; n++) {
    const p = all[(i + n) % all.length];
    if (p.category === all[i].category) take(p);
  }

  // 3. Top up, continuing the rotation rather than always taking the newest.
  for (let n = 2; n < all.length; n++) take(all[(i + n) % all.length]);

  return picked;
}

export function getInsight(slug: string): Insight | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return { ...toMeta(slug, data, content), html };
}

function readMeta(file: string): InsightMeta {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return toMeta(file.replace(/\.md$/, ""), data, content);
}

/**
 * A post is live the moment it ships, so it can never legitimately carry a
 * date in the future. The publishing routine has forward-dated batches before
 * (15 posts committed on 1 Sep were dated 3–9 Sep), and Google discards a
 * future lastmod outright — costing exactly the pages that most need the
 * freshness signal. Clamp at build time so the bug cannot reach the sitemap
 * or the Article schema again.
 */
function clampToToday(iso: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return iso > today ? today : iso;
}

function toMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string
): InsightMeta {
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    date: clampToToday(String(data.date ?? "1970-01-01")),
    category: String(data.category ?? "Insights"),
    excerpt: String(data.excerpt ?? content.trim().slice(0, 160)),
    metaTitle: data.metaTitle ? String(data.metaTitle) : undefined,
    metaDescription: data.metaDescription
      ? String(data.metaDescription)
      : undefined,
    readTime: Number(data.readTime) || Math.max(1, Math.round(words / 220)),
    image: data.image ? String(data.image) : undefined,
    updated: data.updated ? clampToToday(String(data.updated)) : undefined,
    faqs: Array.isArray(data.faqs)
      ? (data.faqs as Record<string, unknown>[]).map((f) => ({
          q: String(f.q ?? ""),
          a: String(f.a ?? ""),
        }))
      : undefined,
  };
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
