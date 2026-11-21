#!/usr/bin/env node
// Inventory of what already exists, so no run duplicates a topic or slug.
//
//   node bin/inventory.mjs                 -> writes state/inventory.json, prints a summary
//   node bin/inventory.mjs --check-topic "Proposed title" ["main keyword phrase"]
//                                          -> lists the closest existing posts (live + drafts)
//
// Posts "published today" = insight files ADDED to origin/main today (IST),
// by anyone (this pipeline, Codex, a person), that still exist. The daily
// quota tops up to config.posts_per_day so two automations never double-post.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  CONFIG, STATE_DIR, INSIGHTS_DIR, DRAFTS_DIR, listPosts, todayIST, git,
  sitemapUrls, pathOf, topicScore,
} from "./lib.mjs";

const args = process.argv.slice(2);
const live = listPosts(INSIGHTS_DIR);
const drafts = listPosts(DRAFTS_DIR);

if (args[0] === "--check-topic") {
  const title = args[1] || "";
  const kw = args[2] || "";
  const scored = [...live.map((p) => ({ ...p, where: "live" })), ...drafts.map((p) => ({ ...p, where: "draft" }))]
    .map((p) => {
      const hay = `${p.title} ${p.slug.replace(/-/g, " ")}`;
      const sTitle = topicScore(title, hay);
      const sKw = kw ? topicScore(kw, hay) : 0;
      return { where: p.where, slug: p.slug, title: p.title, score: +Math.max(sTitle, sKw).toFixed(2) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  const verdict = scored[0] && scored[0].score >= 0.5 ? "TOO_CLOSE" : scored[0] && scored[0].score >= 0.35 ? "CHECK_ANGLE" : "OK";
  console.log(JSON.stringify({ proposed: title, keyword: kw, verdict, closest: scored }, null, 2));
  process.exit(0);
}

const today = todayIST();
let todayAdded = [];
try {
  const log = git([
    "log", `origin/${CONFIG.branch}`, `--since=${today}T00:00:00+05:30`, "--diff-filter=A",
    "--name-only", "--format=__C__%H|%an|%s", "--", "content/insights",
  ]);
  let cur = null;
  for (const line of log.split("\n")) {
    if (line.startsWith("__C__")) {
      const [sha, author, ...subj] = line.slice(5).split("|");
      cur = { sha, author, subject: subj.join("|") };
    } else if (cur && /^content\/insights\/[a-z0-9-]+\.md$/.test(line.trim())) {
      const slug = line.trim().replace(/^content\/insights\//, "").replace(/\.md$/, "");
      if (existsSync(join(INSIGHTS_DIR, `${slug}.md`)) && !todayAdded.some((x) => x.slug === slug)) {
        todayAdded.push({ slug, author: cur.author, sha: cur.sha.slice(0, 7) });
      }
    }
  }
} catch (e) {
  console.error("git log failed:", e.message);
  process.exit(2);
}

let sitemap = [];
let sitemapError = null;
try {
  sitemap = await sitemapUrls();
} catch (e) {
  sitemapError = String(e.message || e);
}

const inv = {
  generated_at: new Date().toISOString(),
  today,
  weekday: new Intl.DateTimeFormat("en-GB", { timeZone: CONFIG.timezone, weekday: "long" }).format(new Date()),
  head: git(["rev-parse", "--short", "HEAD"]),
  posts_per_day: CONFIG.posts_per_day,
  today_added: todayAdded,
  quota_remaining: Math.max(0, CONFIG.posts_per_day - todayAdded.length),
  live_count: live.length,
  draft_count: drafts.length,
  parse_errors: [...live, ...drafts].filter((p) => p.parseError).map((p) => ({ slug: p.slug, error: p.parseError })),
  sitemap_count: sitemap.length,
  sitemap_error: sitemapError,
  sitemap_paths: sitemap.map(pathOf),
  live: live.map(({ slug, title, category, date, faqs, h2 }) => ({ slug, title, category, date, faqs, h2 })),
  drafts: drafts.map(({ slug, title }) => ({ slug, title })),
};

const stateDir = STATE_DIR;
if (!existsSync(stateDir)) mkdirSync(stateDir, { recursive: true });
writeFileSync(join(stateDir, "inventory.json"), JSON.stringify(inv, null, 2));

const recent = [...live].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 15);
console.log(`Date (IST): ${inv.today} ${inv.weekday} | origin/main @ ${inv.head}`);
console.log(`Live posts: ${inv.live_count} | Drafts (topics reserved): ${inv.draft_count} | Sitemap URLs: ${inv.sitemap_count}${sitemapError ? ` (ERROR: ${sitemapError})` : ""}`);
console.log(`Insights added to main today: ${todayAdded.length}${todayAdded.length ? " -> " + todayAdded.map((x) => `${x.slug} (${x.author})`).join(", ") : ""}`);
console.log(`QUOTA_REMAINING=${inv.quota_remaining}`);
if (inv.parse_errors.length) console.log(`PARSE_ERRORS=${JSON.stringify(inv.parse_errors)}`);
console.log("15 most recent live posts:");
for (const p of recent) console.log(`  ${p.date}  ${p.slug}  [${p.category}]`);
console.log("Full lists (live titles, draft titles, sitemap paths): ops/seo-pipeline/.state/inventory.json");
