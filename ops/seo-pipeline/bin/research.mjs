#!/usr/bin/env node
// Research record for today's posts. publish.sh refuses to publish without a passing `check`.
//
//   node ops/seo-pipeline/bin/research.mjs trends
//        fetches Google's "trending in India" feed and records the result in .state/trends.json
//   node ops/seo-pipeline/bin/research.mjs check slug1 [slug2 slug3]
//        checks .state/trends.json and .state/research.json (written by the run, see RUNBOOK step 2)
//
// Limit: this proves the feed was fetched and that the recorded result pages exist. It cannot prove
// a web search was run, so the run must record only results WebSearch really returned.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { STATE_DIR, todayIST, fetchText } from "./lib.mjs";

const TRENDS_URL = "https://trends.google.com/trending/rss?geo=IN";
const trendsFile = join(STATE_DIR, "trends.json");
const researchFile = join(STATE_DIR, "research.json");
const [cmd, ...slugs] = process.argv.slice(2);
if (!existsSync(STATE_DIR)) mkdirSync(STATE_DIR, { recursive: true });

if (cmd === "trends") {
  const out = { date: todayIST(), status: "blocked", http: 0, titles: [] };
  try {
    const r = await fetchText(TRENDS_URL, 25000);
    out.http = r.status;
    out.titles = [...r.text.matchAll(/<item>[\s\S]*?<title>([^<]+)<\/title>/g)].map((m) => m[1].trim());
    if (r.status === 200 && out.titles.length) out.status = "checked";
  } catch (e) {
    out.error = String(e.message || e);
  }
  writeFileSync(trendsFile, JSON.stringify(out, null, 2));
  console.log(`TRENDS ${out.status} (HTTP ${out.http}): ${out.titles.length} trending searches`);
  for (const t of out.titles) console.log(`  ${t}`);
  process.exit(0);
}

if (cmd !== "check" || !slugs.length) {
  console.error("usage: research.mjs trends | research.mjs check slug1 [slug2 slug3]");
  process.exit(2);
}

const fails = [];
const load = (f, what) => {
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch (e) {
    fails.push(`${what} missing or not valid JSON (${f})`);
    return null;
  }
};
const today = todayIST();

const trends = load(trendsFile, "Trends record (run: research.mjs trends)");
if (trends && trends.date !== today) fails.push(`Trends record is from ${trends.date}, not today (${today})`);

const rec = load(researchFile, "research record");
if (rec) {
  if (rec.date !== today) fails.push(`research record is from ${rec.date}, not today (${today})`);
  if (!Array.isArray(rec.news_searches) || !rec.news_searches.some((q) => typeof q === "string" && q.trim().length > 5))
    fails.push("news_searches: record at least one recent-news WebSearch query");
  for (const slug of slugs) {
    const p = (Array.isArray(rec.posts) ? rec.posts : []).find((x) => x && x.slug === slug);
    if (!p) {
      fails.push(`${slug}: no entry in research record`);
      continue;
    }
    if (!p.keyword || String(p.keyword).trim().length < 4) fails.push(`${slug}: main keyword missing`);
    if (!p.query || String(p.query).trim().length < 4) fails.push(`${slug}: WebSearch query missing`);
    if (!p.intent || String(p.intent).trim().length < 20) fails.push(`${slug}: intent must say what kind of page ranks (20+ characters)`);
    const urls = [];
    for (const u of Array.isArray(p.results) ? p.results : []) {
      try {
        const x = new URL(String(u));
        if (x.protocol === "https:" && !/(^|\.)pgak\.co\.in$/i.test(x.hostname) && !urls.some((y) => y.href === x.href)) urls.push(x);
      } catch {
        fails.push(`${slug}: not a web address: ${u}`);
      }
    }
    if (urls.length < 3) {
      fails.push(`${slug}: ${urls.length} result pages recorded; need 3 or more (https, not our own site)`);
      continue;
    }
    if (new Set(urls.map((u) => u.hostname)).size < 2) fails.push(`${slug}: all result pages are from one site`);
    // A bot-blocked page (401/403/405/429) still exists; a missing page or unknown host does not.
    let real = 0;
    for (const u of urls.slice(0, 5)) {
      try {
        const r = await fetchText(u.href, 15000);
        if (r.status !== 404 && r.status !== 410) real++;
      } catch {
        // unreachable: not counted
      }
    }
    if (real < 2) fails.push(`${slug}: only ${real} of the recorded result pages could be found`);
  }
}

for (const f of fails) console.log(`FAIL: ${f}`);
if (trends) console.log(`Trends feed: ${trends.status}`);
console.log(`RESEARCH: ${fails.length ? `FAIL (${fails.length})` : "PASS"}`);
process.exit(fails.length ? 1 : 0);
