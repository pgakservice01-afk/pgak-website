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

export type InsightMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: string;
  excerpt: string;
  readTime: number; // minutes
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

function toMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string
): InsightMeta {
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01"),
    category: String(data.category ?? "Insights"),
    excerpt: String(data.excerpt ?? content.trim().slice(0, 160)),
    readTime: Number(data.readTime) || Math.max(1, Math.round(words / 220)),
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
