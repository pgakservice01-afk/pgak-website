/**
 * Crawl every URL in a site's sitemap and record what a crawler sees:
 * status, final URL, title, description, H1, canonical, robots (meta and
 * header), JSON-LD types, and how many crawled pages link to each URL.
 *
 *   node scripts/seo-crawl.mjs https://www.pgak.co.in out.tsv
 *   node scripts/seo-crawl.mjs https://<preview>.vercel.app out.tsv
 *
 * For a preview, sitemap URLs (which name production) are rewritten onto the
 * preview origin so the two crawls compare page for page. Read-only: GET only,
 * six requests at a time, identifies itself in the user agent.
 */
import { writeFile } from "node:fs/promises";

const base = (process.argv[2] ?? "https://www.pgak.co.in").replace(/\/$/, "");
const out = process.argv[3] ?? "crawl.tsv";
const PROD = "https://www.pgak.co.in";
const UA = "pgak-seo-crawl/1.0 (+https://www.pgak.co.in)";

const get = async (url) => {
  const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
  return { res, text: await res.text() };
};

const pick = (re, s) => (s.match(re)?.[1] ?? "").replace(/\s+/g, " ").trim();
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const { text: sm } = await get(`${base}/sitemap.xml`);
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(PROD, base));
console.error(`${urls.length} URLs in ${base}/sitemap.xml`);

const rows = [];
const inlinks = new Map();
let i = 0;
async function worker() {
  while (i < urls.length) {
    const url = urls[i++];
    try {
      const { res, text } = await get(url);
      const path = new URL(url).pathname;
      const links = new Set(
        [...text.matchAll(/<a\b[^>]*href="([^"#?]+)/g)]
          .map((m) => m[1])
          .filter((h) => h.startsWith("/") || h.startsWith(PROD) || h.startsWith(base))
          .map((h) => h.replace(PROD, "").replace(base, "") || "/")
          .map((h) => (h.length > 1 ? h.replace(/\/$/, "") : h)),
      );
      for (const l of links) if (l !== path) inlinks.set(l, (inlinks.get(l) ?? 0) + 1);
      rows.push({
        path,
        status: res.status,
        final: res.url.replace(base, "").replace(PROD, "") || "/",
        title: decode(pick(/<title[^>]*>([^<]*)<\/title>/i, text)),
        description: decode(pick(/<meta name="description" content="([^"]*)"/i, text)),
        h1: decode(pick(/<h1[^>]*>([\s\S]*?)<\/h1>/i, text).replace(/<[^>]+>/g, "")),
        h1count: (text.match(/<h1[\s>]/gi) ?? []).length,
        canonical: pick(/<link rel="canonical" href="([^"]*)"/i, text).replace(PROD, ""),
        robotsMeta: pick(/<meta name="robots" content="([^"]*)"/i, text),
        robotsHeader: res.headers.get("x-robots-tag") ?? "",
        jsonld: [...new Set([...text.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]))].sort().join(","),
        bytes: text.length,
        outlinks: links.size,
      });
    } catch (e) {
      rows.push({ path: url, status: "ERR", final: String(e).slice(0, 80) });
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

const cols = ["path", "status", "final", "title", "description", "h1", "h1count", "canonical", "robotsMeta", "robotsHeader", "jsonld", "bytes", "outlinks", "inlinks"];
rows.sort((a, b) => a.path.localeCompare(b.path));
const tsv = [cols.join("\t"), ...rows.map((r) => cols.map((c) => String(c === "inlinks" ? inlinks.get(r.path) ?? 0 : r[c] ?? "").replace(/\t/g, " ")).join("\t"))].join("\n");
await writeFile(out, tsv + "\n");

const bad = rows.filter((r) => r.status !== 200 || (r.canonical && r.canonical !== r.path) || /noindex/i.test(`${r.robotsMeta} ${r.robotsHeader}`) || r.h1count !== 1);
console.error(`wrote ${out}: ${rows.length} rows; ${bad.length} need a look (non-200, canonical elsewhere, noindex, or H1 count != 1)`);
for (const r of bad.slice(0, 40)) console.error(`  ${r.path} status=${r.status} canonical=${r.canonical} robots=${r.robotsMeta}|${r.robotsHeader} h1=${r.h1count}`);
