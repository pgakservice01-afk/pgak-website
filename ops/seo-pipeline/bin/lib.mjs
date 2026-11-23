// Shared helpers for the PGAK SEO pipeline's Node scripts.
// Modules (gray-matter, sharp) are loaded from the website clone so parsing
// matches exactly what the live site does at build time.
import { createRequire } from "node:module";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

export const PIPELINE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
export const CONFIG = JSON.parse(readFileSync(join(PIPELINE_DIR, "config.json"), "utf8"));
export const REPO = join(PIPELINE_DIR, "..", "..");
export const STATE_DIR = join(PIPELINE_DIR, ".state");
export const INSIGHTS_DIR = join(REPO, "content", "insights");
export const DRAFTS_DIR = join(INSIGHTS_DIR, "_drafts");

const req = createRequire(join(REPO, "package.json"));
export const matter = req("gray-matter");
export function loadSharp() {
  return req("sharp");
}

/** Today's date in IST as YYYY-MM-DD. */
export function todayIST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CONFIG.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function isPostFile(f) {
  return f.endsWith(".md") && !f.startsWith("_") && !f.startsWith("HOW");
}

export function readPost(file) {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { raw, data, content };
}

export function listPosts(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(isPostFile)
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      try {
        const { data, content } = readPost(join(dir, f));
        const h2 = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
        return {
          slug,
          title: String(data.title ?? slug),
          metaTitle: data.metaTitle ? String(data.metaTitle) : undefined,
          category: String(data.category ?? ""),
          date: String(data.date ?? ""),
          excerpt: String(data.excerpt ?? ""),
          faqs: Array.isArray(data.faqs) ? data.faqs.map((x) => String(x?.q ?? "")) : [],
          h2,
        };
      } catch (e) {
        return { slug, title: slug, parseError: String(e.message || e) };
      }
    });
}

const STOP = new Set(
  ("a an and are as at be before by can do does for from how i in is it its of on or our should the their " +
    "this to what when where which who why will with without you your guide india indian checklist " +
    "explained simple practical complete best top ways tips system systems pgak").split(" ")
);

export function tokens(s) {
  return new Set(
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP.has(w))
      .map((w) => w.replace(/(ies)$/, "y").replace(/(?<=[a-z]{3})s$/, ""))
  );
}

// Words every PGAK post shares; they say nothing about the topic.
const DOMAIN = new Set(
  ("cctv camera cameras ai video security surveillance existing business businesses site sites " +
    "check checks before after need needs know your using use add adding make").split(" ")
);
function topicTokens(s) {
  return new Set(
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP.has(w) && !DOMAIN.has(w))
      .map((w) =>
        w.replace(/ies$/, "y").replace(/(?<=[a-z]{4})ing$/, "").replace(/(?<=[a-z]{3})s$/, "")
      )
  );
}
/**
 * Topic similarity 0..1 between two "title + slug" strings:
 * mean of overlap coefficient and Jaccard on topic words (generic CCTV words removed).
 * Calibrated: >= 0.5 same topic (block), 0.35-0.5 related (needs a clearly different intent).
 */
export function topicScore(a, b) {
  const A = topicTokens(a);
  const B = topicTokens(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  const overlap = inter / Math.min(A.size, B.size);
  const jac = inter / (A.size + B.size - inter);
  return (overlap + jac) / 2;
}

export function jaccard(a, b) {
  const A = tokens(a);
  const B = tokens(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
}

/** Character-bigram Dice coefficient: robust similarity for short titles. */
export function dice(a, b) {
  const grams = (s) => {
    const t = String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const g = new Map();
    for (let i = 0; i < t.length - 1; i++) {
      const k = t.slice(i, i + 2);
      g.set(k, (g.get(k) || 0) + 1);
    }
    return g;
  };
  const A = grams(a);
  const B = grams(b);
  let inter = 0;
  let total = 0;
  for (const v of A.values()) total += v;
  for (const v of B.values()) total += v;
  for (const [k, v] of A) inter += Math.min(v, B.get(k) || 0);
  return total ? (2 * inter) / total : 0;
}

export function git(args, opts = {}) {
  // with stdio "ignore" execFileSync returns null; a success must not look like a failure to callers
  return (execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", ...opts }) ?? "").trim();
}

export async function fetchText(url, timeoutMs = 30000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctl.signal, redirect: "follow", headers: { "user-agent": "PGAK-SEO-Pipeline/1.0" } });
    return { status: res.status, text: await res.text(), url: res.url, headers: res.headers };
  } finally {
    clearTimeout(t);
  }
}

// The site's Vercel firewall refuses some requests from cloud IPs at random
// (HTTP 403 + "x-vercel-mitigated: deny"). Retry those a few times.
export async function fetchSite(url, { tries = 5, waitMs = 8000, timeoutMs = 30000 } = {}) {
  let r;
  for (let i = 1; i <= tries; i++) {
    try {
      r = await fetchText(url, timeoutMs);
    } catch (e) {
      r = { status: 0, text: String(e), url, headers: new Headers() };
    }
    r.blocked = r.status === 403 && /deny|challenge/i.test(r.headers.get("x-vercel-mitigated") || "");
    if (!(r.blocked || r.status === 0 || r.status === 429 || r.status >= 500) || i === tries) return r;
    await new Promise((res) => setTimeout(res, waitMs));
  }
  return r;
}

// Live sitemap first; if the cloud is blocked, the sitemap from the site's own build
// (`npm run build` writes .next/server/app/sitemap.xml.body; preflight builds it when needed).
// The returned array carries .source = "live" | "build".
export async function sitemapUrls() {
  const parse = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const r = await fetchSite(`${CONFIG.site_origin}/sitemap.xml`);
  let urls;
  if (r.status === 200 && r.text.includes("<loc>")) {
    urls = parse(r.text);
    urls.source = "live";
    return urls;
  }
  const built = join(REPO, ".next", "server", "app", "sitemap.xml.body");
  if (existsSync(built)) {
    urls = parse(readFileSync(built, "utf8"));
    urls.source = "build";
    return urls;
  }
  throw new Error(`sitemap HTTP ${r.status}${r.blocked ? " (blocked by the site firewall)" : ""} and no built sitemap at ${built}`);
}

export function pathOf(url) {
  const u = new URL(url, CONFIG.site_origin);
  let p = u.pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}
