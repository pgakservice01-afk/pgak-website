#!/usr/bin/env node
/**
 * Ping IndexNow so Bing, Yandex, Naver and Microsoft Copilot pick up new or
 * changed pages in minutes instead of waiting for a crawl. Google ignores
 * IndexNow — use Search Console's "Request indexing" there.
 *
 * Usage:
 *   node scripts/indexnow.mjs                       # every URL in the sitemap
 *   node scripts/indexnow.mjs /insights/new-post    # just these paths
 *
 * The key file must stay published at /<KEY>.txt — that's what proves to the
 * search engines that whoever submits URLs controls this domain.
 */

const HOST = "www.pgak.co.in";
const KEY = "289fe00c23024b6d9a697fbcf48b59c6";
const ORIGIN = `https://${HOST}`;

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${ORIGIN}${p.startsWith("/") ? p : `/${p}`}`))
  : await sitemapUrls();

if (!urlList.length) {
  console.error("No URLs to submit.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean accepted; 422 usually means the key file isn't live yet.
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URL(s)`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
