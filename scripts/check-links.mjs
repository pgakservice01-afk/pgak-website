/**
 * Link checker for the published site.
 *
 * Two lessons from the 2026-09-24 audit are baked in, because a naive checker
 * gets both of them wrong:
 *
 * 1. **It follows redirects to the final status.** The Bosch AVIOTEC PDF
 *    answered 301 and looked fine; the page it redirected to was a 404. A
 *    checker that stops at the first hop reports a healthy link that sends
 *    every reader to a dead end.
 *
 * 2. **A 403 is not proof of a dead link.** Three vendor help-centre articles
 *    answered 403 to this script and loaded perfectly in a real browser —
 *    Zendesk blocks datacentre traffic. Those are reported as UNVERIFIED, not
 *    broken, because "remove this link" is the wrong advice for a page that
 *    works for every human visitor.
 *
 * Usage:
 *   node scripts/check-links.mjs                    # production
 *   node scripts/check-links.mjs http://localhost:3000
 *
 * Exit: 0 clean, 1 broken links or long chains found.
 */

const BASE = (process.argv[2] ?? "https://www.pgak.co.in").replace(/\/$/, "");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";
const TIMEOUT_MS = 25_000;
/** WhatsApp always bounces wa.me → api.whatsapp.com. Not a defect. */
const IGNORE = [/wa\.me/, /api\.whatsapp\.com/];

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) await fn(items[i++]);
    }),
  );
}

async function head(url, redirect = "follow") {
  try {
    const r = await fetch(url, {
      headers: { "user-agent": UA },
      redirect,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return { status: r.status, url: r.url, ok: r.ok };
  } catch (e) {
    return { status: 0, url, error: e.message };
  }
}

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`, { headers: { "user-agent": UA } })).text();
const pages = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const sources = new Map(); // target -> Set(page)
const badPages = [];

await pool(pages, 12, async (page) => {
  const r = await fetch(page, { headers: { "user-agent": UA } }).catch(() => null);
  if (!r || !r.ok) return badPages.push([page, r ? r.status : "unreachable"]);
  const html = await r.text();
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    let href = m[1].trim();
    if (!/^https?:/i.test(href) && !href.startsWith("/")) continue;
    try {
      href = new URL(href, page).toString().split("#")[0];
    } catch {
      continue;
    }
    if (IGNORE.some((re) => re.test(href))) continue;
    if (!sources.has(href)) sources.set(href, new Set());
    sources.get(href).add(page.replace(BASE, "") || "/");
  }
});

const targets = [...sources.keys()];
const broken = [];
const unverified = [];
const chains = [];

await pool(targets, 8, async (url) => {
  const final = await head(url);
  if (final.status === 403 || final.status === 429) {
    unverified.push([url, final.status]);
    return;
  }
  if (final.status === 0 || final.status >= 400) {
    broken.push([url, final.status || final.error, final.url !== url ? final.url : null]);
    return;
  }
  // count hops only when it resolved, so a chain report is actionable
  const first = await head(url, "manual");
  if ([301, 302, 307, 308].includes(first.status) && final.url !== url) {
    chains.push([url, final.url]);
  }
});

const line = (s) => console.log(s);
line(`Link check — ${BASE}`);
line(`  pages crawled:   ${pages.length}`);
line(`  link targets:    ${targets.length}  (WhatsApp deep links excluded)`);
line(`  broken:          ${broken.length}`);
line(`  redirecting:     ${chains.length}`);
line(`  unverified(403): ${unverified.length}`);

if (badPages.length) {
  line(`\nSITEMAP PAGES NOT 200 (${badPages.length}):`);
  for (const [u, s] of badPages) line(`  ${s}  ${u}`);
}

if (broken.length) {
  line(`\nBROKEN — these send readers nowhere:`);
  for (const [u, s, finalUrl] of broken) {
    line(`  ${s}  ${u}`);
    if (finalUrl) line(`      after redirect to: ${finalUrl}`);
    line(`      linked from: ${[...sources.get(u)].slice(0, 4).join(", ")}`);
  }
}

if (chains.length) {
  line(`\nREDIRECTING — update to the final URL:`);
  for (const [u, f] of chains) {
    line(`  ${u}`);
    line(`      -> ${f}`);
    line(`      linked from: ${[...sources.get(u)].slice(0, 3).join(", ")}`);
  }
}

if (unverified.length) {
  line(`\nUNVERIFIED (403/429 to this script — check in a browser before touching):`);
  for (const [u, s] of unverified) line(`  ${s}  ${u}`);
}

process.exit(broken.length || badPages.length ? 1 : 0);
