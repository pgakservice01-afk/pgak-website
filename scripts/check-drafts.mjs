/**
 * Validates every article draft in content/insights/_drafts against the
 * writer guide and the brief ledger, then writes the 100-row article ledger.
 *
 *   node scripts/check-drafts.mjs            # report + write ledger
 *
 * Checks: frontmatter keys and draft flag, no reviewer invented, meta title
 * ≤ 60 and description ≤ 155, FAQs present and repeated in the body, the
 * "Straight answer" opener, one /free-audit CTA, every internal link resolves
 * to a real route (or a live article — never an unpublished draft), every
 * #scenario-Cxx anchor sits on its host page, and no forbidden claim.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const DRAFTS = path.join(ROOT, "content/insights/_drafts");
const LIVE = path.join(ROOT, "content/insights");
const LEDGER_TSV = path.join(ROOT, "docs/pgak-growth-implementation-log/article-briefs.tsv");

const live = new Set(fs.readdirSync(LIVE).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)));
const drafts = fs.readdirSync(DRAFTS).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));

// Routes: static app folders plus the dynamic families.
const routes = new Set();
(function walk(dir, base) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith("_") || e.name === "api") continue;
    const p = `${base}/${e.name}`;
    if (fs.existsSync(path.join(dir, e.name, "page.tsx"))) routes.add(p);
    walk(path.join(dir, e.name), p);
  }
})(path.join(ROOT, "app"), "");
routes.add("/");
const src = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
for (const m of src("lib/feature-guides.ts").matchAll(/^'([a-z0-9-]+)': \{/gm)) routes.add(`/features/guides/${m[1]}`);
for (const m of src("lib/capabilities.ts").matchAll(/^\s+slug: "([a-z0-9-]+)"/gm)) routes.add(`/features/${m[1]}`);
for (const m of src("lib/caseStudies.ts").matchAll(/^\s+slug: "([a-z0-9-]+)"/gm)) routes.add(`/insights/case-studies/${m[1]}`);
for (const s of live) routes.add(`/insights/${s}`);

const hosts = {};
for (const m of src("lib/calc/scenarios.ts").matchAll(/"(C\d\d)", "[^"]+", "[a-z-]+", "([^"]+)"/g)) hosts[m[1]] = m[2];
for (const m of src("lib/calc/scenarios.ts").matchAll(/id: "(C\d\d)",\n\s+feature: "[^"]+",\n\s+kind: "[a-z]+",\n\s+overlapGroup: "[a-z-]+",\n\s+hostPath: "([^"]+)"/g)) hosts[m[1]] = m[2];

const FORBIDDEN = [
  [/no new hardware/i, "absolute 'no new hardware'"],
  [/nothing (?:to|is) install/i, "absolute 'nothing to install'"],
  [/live in a day/i, "'live in a day'"],
  [/works with (?:any|every|all) camera/i, "'works with any camera'"],
  [/\bguarantee(?:s|d)? (?:to|that|you)\b/i, "guarantee"],
  [/studies show/i, "'studies show'"],
  [/\b(?:9\d|100)% (?:accura|reduc|fewer)/i, "unsupported percentage claim"],
];

const rows = [];
for (const slug of drafts.sort()) {
  const raw = fs.readFileSync(path.join(DRAFTS, `${slug}.md`), "utf8");
  const issues = [];
  let fm;
  try {
    fm = matter(raw);
  } catch (e) {
    rows.push({ slug, issues: [`frontmatter does not parse: ${String(e).slice(0, 80)}`] });
    continue;
  }
  const d = fm.data;
  const body = fm.content;
  for (const k of ["title", "metaTitle", "date", "category", "excerpt", "metaDescription", "reviewStatus"])
    if (!d[k]) issues.push(`missing ${k}`);
  if (d.draft !== true) issues.push("draft: true missing");
  if (d.reviewer) issues.push("reviewer set — none has reviewed yet");
  if (d.metaTitle && String(d.metaTitle).length > 60) issues.push(`metaTitle ${String(d.metaTitle).length} > 60`);
  if (d.metaDescription && String(d.metaDescription).length > 155) issues.push(`metaDescription ${String(d.metaDescription).length} > 155`);
  if (d.image && !fs.existsSync(path.join(ROOT, "public", String(d.image)))) issues.push(`image missing: ${d.image}`);
  if (!Array.isArray(d.faqs) || d.faqs.length < 2) issues.push("fewer than 2 FAQs");
  if (!/\*\*Straight answer/i.test(body)) issues.push("no 'Straight answer' opener");
  const ctas = (body.match(/\]\(\/free-audit\)/g) ?? []).length;
  if (ctas === 0) issues.push("no /free-audit CTA");
  // A forbidden phrase quoted as a red flag ("Works with any camera" in a
  // list of claims to distrust) is a warning to the reader, not a claim.
  const asClaim = (line, re) => {
    const m = line.match(re);
    if (!m) return false;
    const i = line.indexOf(m[0]);
    const before = line.slice(0, i);
    const quoted = /["“'‘]\s*$/.test(before) || /["“]/.test(before.slice(-3));
    const warning = /\b(?:expecting|red flag|beware|distrust|claims? like|be wary)\b/i.test(line);
    return !quoted && !warning;
  };
  for (const [re, label] of FORBIDDEN)
    if ([...body.split("\n"), String(d.excerpt ?? "")].some((line) => asClaim(line, re))) issues.push(`forbidden: ${label}`);
  for (const m of body.matchAll(/\]\((\/[^)\s#?]*)(#[^)\s]*)?\)/g)) {
    const p = m[1].replace(/\/$/, "") || "/";
    if (!routes.has(p)) {
      issues.push(drafts.includes(p.replace("/insights/", "")) ? `links unpublished draft ${p}` : `broken link ${p}`);
    }
    const anchor = m[2] ?? "";
    const sc = anchor.match(/^#scenario-(C\d\d)$/);
    if (sc && hosts[sc[1]] && hosts[sc[1]] !== p) issues.push(`${sc[1]} anchor on ${p}, host is ${hosts[sc[1]]}`);
  }
  const words = body.replace(/[#*|`>_-]/g, " ").split(/\s+/).filter(Boolean).length;
  const legal = /legal review|lawyer|counsel/i.test(String(d.reviewStatus));
  const unresolved = (String(d.reviewStatus).match(/UNRESOLVED/g) ?? []).length + (body.match(/<!--\s*UNRESOLVED/g) ?? []).length;
  rows.push({ slug, words, legal, unresolved, refresh: live.has(slug), issues });
}

// Ledger: one row per brief.
const briefs = fs.readFileSync(LEDGER_TSV, "utf8").trim().split("\n").slice(1).map((l) => l.split("\t"));
const bySlug = Object.fromEntries(rows.map((r) => [r.slug, r]));
const MERGED = { B080: "cctv-camera-offline-how-to-know", B098: "cctv-amc-what-should-it-include" };
const RENAMED = { B100: "factory-cctv-handover-checklist" };
const ledger = briefs.map(([id, pri, cluster, action, slug, query, demand, asset, calc]) => {
  if (MERGED[id]) return { id, pri, cluster, decision: `merged into ${MERGED[id]}`, slug: MERGED[id], status: bySlug[MERGED[id]] ? "covered by merge target" : "MISSING merge target", words: "", asset, calc, demand, issues: [] };
  const s = RENAMED[id] ?? slug;
  const r = bySlug[s];
  if (!r) return { id, pri, cluster, decision: action, slug: s, status: "MISSING", words: "", asset, calc, demand, issues: [] };
  const status = r.issues.length
    ? "needs fixes"
    : r.legal || cluster === "Privacy and governance"
      ? "draft — legal review required"
      : "ready for engineer review";
  return { id, pri, cluster, decision: RENAMED[id] ? "new (re-scoped)" : action, slug: s, status, words: r.words, asset, calc, demand, issues: r.issues, unresolved: r.unresolved };
});

const count = (st) => ledger.filter((l) => l.status === st).length;
const md = [
  "# Article ledger — B001–B100",
  "",
  `Generated ${new Date().toISOString().slice(0, 10)} by \`node scripts/check-drafts.mjs\`. Drafts live in \`content/insights/_drafts/\`; production never reads them. **Published: 0.**`,
  "",
  `Ready for engineer review: **${count("ready for engineer review")}** · Draft — legal review required: **${count("draft — legal review required")}** · Covered by merge: **${count("covered by merge target")}** · Needs fixes: **${count("needs fixes")}** · Missing: **${count("MISSING")}**.`,
  "",
  "No article is published-ready until a named PGAK engineer (and, where marked, a lawyer) has reviewed it. Demand evidence marked `hypothesis` is unvalidated; refresh fresh GSC queries and Keyword Planner (India + served districts) before release.",
  "",
  "| ID | P | Cluster | Decision | Slug | Words | Status | Calc | Original asset | Demand evidence | Unresolved | Checker issues |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|",
  ...ledger.map((l) => `| ${l.id} | ${l.pri} | ${l.cluster} | ${l.decision} | ${l.slug} | ${l.words} | ${l.status} | ${l.calc} | ${l.asset} | ${l.demand} | ${l.unresolved ?? ""} | ${l.issues.join("; ")} |`),
  "",
];
fs.writeFileSync(path.join(ROOT, "docs/pgak-growth-implementation-log/04-article-ledger.md"), md.join("\n"));

const bad = rows.filter((r) => r.issues.length);
console.log(`${rows.length} drafts; ${bad.length} with issues`);
for (const r of bad) console.log(`  ${r.slug}: ${r.issues.join("; ")}`);
console.log(`ledger: ready ${count("ready for engineer review")}, legal ${count("draft — legal review required")}, merged ${count("covered by merge target")}, fixes ${count("needs fixes")}, missing ${count("MISSING")}`);
