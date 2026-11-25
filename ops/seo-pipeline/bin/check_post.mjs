#!/usr/bin/env node
// Publish gate for ONE new insight. Nothing is committed unless this passes.
//
//   node bin/check_post.mjs <slug> [--others slugA,slugB]
//
// Exit 0 = PASS, 1 = FAIL. Every FAIL line says exactly what to fix.
// Parses with the site's own gray-matter, so a file that passes here parses
// identically in the Next.js build.
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  CONFIG, STATE_DIR, REPO, INSIGHTS_DIR, DRAFTS_DIR, matter, loadSharp, todayIST, git,
  listPosts, topicScore, fetchText,
} from "./lib.mjs";

const args = process.argv.slice(2);
const slug = args[0];
const othersArg = args.indexOf("--others");
const others = othersArg > -1 && args[othersArg + 1] ? args[othersArg + 1].split(",").filter(Boolean) : [];
if (!slug) {
  console.error("usage: node bin/check_post.mjs <slug> [--others a,b]");
  process.exit(2);
}

const fails = [];
const warns = [];
const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);
const today = todayIST();

// ── A. slug and file ────────────────────────────────────────────────────────
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(`slug "${slug}" must be lowercase words joined by single hyphens`);
if (slug.length > 75) fail(`slug is ${slug.length} chars; keep it <= 75`);
const slugWords = slug.split("-").length;
if (slugWords < 3 || slugWords > 10) fail(`slug has ${slugWords} words; use 3-10`);

const mdPath = join(INSIGHTS_DIR, `${slug}.md`);
if (!existsSync(mdPath)) {
  console.log(`FAIL: ${mdPath} does not exist`);
  console.log("RESULT: FAIL (1)");
  process.exit(1);
}
let tracked = true;
try {
  git(["cat-file", "-e", `origin/${CONFIG.branch}:content/insights/${slug}.md`], { stdio: "ignore" });
} catch {
  tracked = false;
}
if (tracked) fail(`content/insights/${slug}.md already exists on origin/${CONFIG.branch} — this is not a new post; choose another slug`);
if (existsSync(join(DRAFTS_DIR, `${slug}.md`))) fail(`a draft with slug "${slug}" exists in content/insights/_drafts — topic reserved; choose another`);

let sitemapPaths = new Set();
try {
  const inv = JSON.parse(readFileSync(join(STATE_DIR, "inventory.json"), "utf8"));
  sitemapPaths = new Set(inv.sitemap_paths || []);
  if (!sitemapPaths.size) fail("state/inventory.json has no sitemap paths — re-run ops/seo-pipeline/bin/preflight.sh");
} catch {
  fail("state/inventory.json missing — run ops/seo-pipeline/bin/preflight.sh first");
}
if (sitemapPaths.has(`/insights/${slug}`)) fail(`/insights/${slug} is already in the live sitemap`);

// ── B. frontmatter ──────────────────────────────────────────────────────────
const raw = readFileSync(mdPath, "utf8");
if (!raw.startsWith("---\n")) fail("file must start with a '---' frontmatter line");
if (/\r/.test(raw)) fail("file contains Windows line endings (\\r); use \\n only");
let data = {};
let body = "";
try {
  const parsed = matter(raw);
  data = parsed.data;
  body = parsed.content;
} catch (e) {
  fail(`frontmatter YAML does not parse: ${e.message}`);
}

const ALLOWED = new Set(["title", "metaTitle", "date", "category", "excerpt", "metaDescription", "readTime", "image", "imageCaption", "faqs"]);
const REQUIRED = ["title", "metaTitle", "date", "category", "excerpt", "metaDescription", "readTime", "image", "faqs"];
for (const k of Object.keys(data)) if (!ALLOWED.has(k)) fail(`frontmatter key "${k}" is not allowed on a new post (allowed: ${[...ALLOWED].join(", ")})`);
for (const k of REQUIRED) if (data[k] === undefined || data[k] === null || data[k] === "") fail(`frontmatter "${k}" is required`);

const str = (k, min, max) => {
  const v = data[k];
  if (v === undefined) return "";
  if (typeof v !== "string") {
    fail(`"${k}" must be a quoted string (YAML parsed it as ${v instanceof Date ? "a date" : typeof v})`);
    return String(v);
  }
  const n = v.trim().length;
  if (n < min || n > max) fail(`"${k}" is ${n} chars; must be ${min}-${max}`);
  return v.trim();
};

// The title is the page H1 (site audit: under 70). metaTitle + " | PGAK" must be 50-60 characters.
const title = str("title", 25, 69);
const metaTitle = str("metaTitle", 43, 53);
if (/pgak/i.test(metaTitle)) fail(`metaTitle must not contain "PGAK" — the page template already appends " | PGAK" (live bug otherwise: "... | PGAK | PGAK")`);
if (typeof data.date !== "string") fail(`date must be a quoted string "YYYY-MM-DD"`);
else if (data.date !== today) fail(`date is "${data.date}" but today (IST) is "${today}"`);
const category = str("category", 3, 40);
if (category && !CONFIG.categories.includes(category)) fail(`category "${category}" is not one of: ${CONFIG.categories.join(", ")}`);
str("excerpt", 80, 220);
str("metaDescription", 120, 155);
if (data.imageCaption !== undefined) str("imageCaption", 10, 160);

const expectedImage = `/insights/covers/${slug}.webp`;
if (data.image !== undefined && data.image !== expectedImage) fail(`image must be exactly "${expectedImage}"`);
const imgFile = join(REPO, "public", "insights", "covers", `${slug}.webp`);
if (!existsSync(imgFile)) fail(`cover image missing: public/insights/covers/${slug}.webp`);
else {
  const size = statSync(imgFile).size;
  if (size > CONFIG.cover.max_bytes) fail(`cover is ${size} bytes; must be <= ${CONFIG.cover.max_bytes}`);
  try {
    const meta = await loadSharp()(imgFile).metadata();
    if (meta.format !== "webp") fail(`cover format is ${meta.format}; must be webp`);
    if (meta.width !== CONFIG.cover.width || meta.height !== CONFIG.cover.height)
      fail(`cover is ${meta.width}x${meta.height}; must be ${CONFIG.cover.width}x${CONFIG.cover.height}`);
  } catch (e) {
    fail(`cover image unreadable: ${e.message}`);
  }
}

const faqs = Array.isArray(data.faqs) ? data.faqs : [];
if (data.faqs !== undefined && !Array.isArray(data.faqs)) fail("faqs must be a YAML list of {q, a}");
if (faqs.length < 3 || faqs.length > 5) fail(`faqs has ${faqs.length} items; use 3-5`);
const seenQ = new Set();
faqs.forEach((f, i) => {
  if (!f || typeof f.q !== "string" || typeof f.a !== "string") return fail(`faqs[${i}] needs string q and a (quote them)`);
  const q = f.q.trim();
  const a = f.a.trim();
  if (!q.endsWith("?")) fail(`faqs[${i}].q must end with "?"`);
  if (q.length < 15 || q.length > 120) fail(`faqs[${i}].q is ${q.length} chars; 15-120`);
  if (a.length < 60 || a.length > 450) fail(`faqs[${i}].a is ${a.length} chars; 60-450`);
  if (seenQ.has(q.toLowerCase())) fail(`faqs[${i}] duplicates another question`);
  seenQ.add(q.toLowerCase());
});

// ── C. body ─────────────────────────────────────────────────────────────────
const lines = body.split("\n");
const norm = (s) => s.replace(/\s+/g, " ").trim();
const bodyNoCode = body.replace(/```[\s\S]*?```/g, "");
if (/^#\s/m.test(bodyNoCode)) fail("body contains an H1 ('# ...'); the page already renders the title as H1 — use '##'");
const h2 = [...bodyNoCode.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
if (h2.length < 4 || h2.length > 12) fail(`body has ${h2.length} H2 headings; use 4-12`);
if (new Set(h2.map((h) => h.toLowerCase())).size !== h2.length) fail("two H2 headings are identical");
if (h2.some((h) => h.toLowerCase() === title.toLowerCase())) fail("an H2 repeats the title");
const words = bodyNoCode.replace(/[#*_>`\[\]\(\)]/g, " ").split(/\s+/).filter(Boolean).length;
if (words < 750 || words > 1700) fail(`body is ${words} words; must be 750-1700`);
if (typeof data.readTime === "number") {
  const est = Math.max(1, Math.round(words / 220));
  if (!Number.isInteger(data.readTime) || data.readTime < 3 || Math.abs(data.readTime - est) > 2)
    fail(`readTime ${data.readTime} should be an integer near ${est} (words/220), minimum 3`);
} else if (data.readTime !== undefined) fail("readTime must be a number");

const CTA = "[Ask for a free feasibility check](#dealer).";
const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
const ctaCount = lines.filter((l) => l.trim() === CTA).length;
if (ctaCount !== 1) fail(`body must contain the CTA line exactly once: ${CTA} (found ${ctaCount})`);
if (nonEmpty[nonEmpty.length - 1] !== CTA) fail("the CTA line must be the last line of the article");

// FAQ answers must be visible on the page (Google rule) — the template does not render faqs.
const faqIdx = lines.findIndex((l) => /^##\s+Frequently asked questions\s*$/i.test(l.trim()));
if (faqIdx === -1) fail('body needs a "## Frequently asked questions" section repeating every FAQ (q as "### ", a as the paragraph below)');
else {
  const faqBody = norm(lines.slice(faqIdx).join("\n"));
  faqs.forEach((f, i) => {
    if (typeof f?.q !== "string") return;
    if (!lines.slice(faqIdx).some((l) => norm(l) === `### ${norm(f.q)}`)) fail(`faqs[${i}] question is not a "### " heading in the FAQ section`);
    if (!faqBody.includes(norm(f.a))) fail(`faqs[${i}] answer does not appear word-for-word in the FAQ section`);
  });
}

// Links
const linkRe = /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const internal = new Set();
const external = [];
for (const m of bodyNoCode.matchAll(linkRe)) {
  const [, bang, text, href] = m;
  if (bang) {
    const src = href.startsWith("/") ? join(REPO, "public", href) : null;
    if (!src || !existsSync(src)) fail(`inline image ${href} does not exist in /public`);
    if (!text.trim()) fail(`inline image ${href} has empty alt text`);
    continue;
  }
  if (!text.trim()) fail(`link to ${href} has empty anchor text`);
  if (href.startsWith("#")) {
    if (href !== "#dealer") fail(`anchor link ${href} is not allowed (only #dealer)`);
  } else if (href.startsWith("/")) {
    const p = href.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";
    if (p === `/insights/${slug}`) fail("article links to itself");
    else if (!sitemapPaths.has(p)) fail(`internal link ${href} is not a live page in the sitemap`);
    else internal.add(p);
  } else if (/^https?:\/\//.test(href)) {
    if (!href.startsWith("https://")) fail(`external link must be https: ${href}`);
    if (/\/\/(www\.)?pgak\.co\.in/i.test(href)) fail(`use a relative link for PGAK pages, not ${href}`);
    else external.push(href);
  } else fail(`link "${href}" must start with /, # or https://`);
}
if (internal.size < 2) fail(`only ${internal.size} distinct internal links to live PGAK pages; need >= 2 relevant ones`);
if (external.length > 6) fail(`${external.length} external links; keep <= 6, only authoritative sources`);
for (const href of [...new Set(external)]) {
  try {
    const r = await fetchText(href, 20000);
    if (r.status >= 400) fail(`external link returns HTTP ${r.status}: ${href}`);
  } catch (e) {
    fail(`external link unreachable: ${href} (${e.name === "AbortError" ? "timeout" : e.message})`);
  }
}

if (/<\s*(script|iframe|style|form)\b/i.test(body)) fail("raw <script>/<iframe>/<style>/<form> HTML is not allowed in the body");

// Claims, hype and fear
const text = `${title}\n${data.excerpt ?? ""}\n${data.metaDescription ?? ""}\n${body}\n${faqs.map((f) => `${f?.q} ${f?.a}`).join("\n")}`;
const BANNED = [
  [/guarantee/i, "guarantee"], [/\b100\s?%/, "100%"], [/\b99(\.\d+)?\s?%/, "99%"], [/\bbest in (india|the market|class)\b/i, "best in ..."],
  [/\bno\.?\s?1\b/i, "No. 1"], [/\bnumber one\b/i, "number one"], [/\bzero false\b/i, "zero false ..."], [/\bnever miss(es)?\b/i, "never miss"],
  [/\beliminat\w* (all )?(theft|crime|risk|fraud)/i, "eliminates theft/crime"], [/\bfoolproof\b/i, "foolproof"], [/\bunhackable\b/i, "unhackable"],
  [/\b(fully|completely|totally) secure\b/i, "fully secure"], [/\bcertified by\b/i, "certified by"], [/\bawarded\b/i, "awarded"],
  [/\bour (clients|customers) (saw|reported|saved|cut|reduced)\b/i, "customer outcome claim"], [/\btestimonial/i, "testimonial"],
  [/\bterrif(y|ying|ied)\b|\bnightmare\b|\bhorrif/i, "fear language"],
];
for (const [re, label] of BANNED) if (re.test(text)) fail(`unsupported claim / tone: "${label}" — remove or rephrase`);
const SLOP = ["delve", "unlock", "seamless", "leverage", "robust", "cutting-edge", "game-changer", "game changer", "revolutionary", "revolutionise", "revolutionize",
  "in today's", "fast-paced", "ever-evolving", "elevate", "empower", "harness", "synergy", "landscape", "tapestry", "testament", "paramount", "furthermore", "moreover"];
for (const w of SLOP) if (new RegExp(`\\b${w.replace(/[-']/g, "[-']")}\\b`, "i").test(text)) fail(`AI-sounding word "${w}" — rewrite in plain English`);
const dashes = (body.match(/—/g) || []).length;
if (dashes > 6) warn(`${dashes} em dashes; prefer full stops and commas (reads less machine-written)`);

// Statistics / prices need a source in the same paragraph
for (const para of bodyNoCode.split(/\n\s*\n/)) {
  const p = para.trim();
  if (!p || p.startsWith("#")) continue;
  const hasExt = /\]\(https:\/\//.test(p);
  if (/\d+(\.\d+)?\s?(%|per ?cent)/i.test(p) && !hasExt) fail(`percentage without a linked source: "${p.slice(0, 90)}..."`);
  if (/\b(stud(y|ies)|survey|research|report|data)\s+(shows?|finds?|found|says|suggests?)\b|\baccording to\b/i.test(p) && !hasExt)
    fail(`research claim without a linked source: "${p.slice(0, 90)}..."`);
  if (/(₹|\brs\.?\s?)\s?\d|\b\d+(\.\d+)?\s?(lakh|crore)s?\b/i.test(p) && !hasExt && !/\]\(\/pricing/.test(p))
    fail(`price/amount without a source or /pricing link: "${p.slice(0, 90)}..."`);
}

// ── D. duplication ──────────────────────────────────────────────────────────
const pool = [...listPosts(INSIGHTS_DIR).filter((p) => p.slug !== slug && !others.includes(p.slug)).map((p) => ({ ...p, where: "live" })),
  ...listPosts(DRAFTS_DIR).map((p) => ({ ...p, where: "draft" }))];
const mine = `${title} ${slug.replace(/-/g, " ")}`;
for (const p of pool) {
  const s = topicScore(mine, `${p.title} ${p.slug.replace(/-/g, " ")}`);
  if (s >= 0.5) fail(`too close to existing ${p.where} post "${p.slug}" (${p.title}) — topic similarity ${s.toFixed(2)}`);
  else if (s >= 0.35) warn(`related to ${p.where} post "${p.slug}" (${s.toFixed(2)}) — make sure the search intent is clearly different`);
}
for (const o of others) {
  const f = join(INSIGHTS_DIR, `${o}.md`);
  if (!existsSync(f)) continue;
  const od = matter(readFileSync(f, "utf8")).data;
  const s = topicScore(mine, `${od.title} ${o.replace(/-/g, " ")}`);
  if (s >= 0.35) fail(`too close to today's other new post "${o}" (${s.toFixed(2)})`);
}

// ── report ──────────────────────────────────────────────────────────────────
console.log(`check_post ${slug}: ${words} words, ${h2.length} H2, ${internal.size} internal links, ${external.length} external, ${faqs.length} FAQs`);
for (const w of warns) console.log(`WARN: ${w}`);
for (const f of fails) console.log(`FAIL: ${f}`);
console.log(fails.length ? `RESULT: FAIL (${fails.length})` : "RESULT: PASS");
process.exit(fails.length ? 1 : 0);
