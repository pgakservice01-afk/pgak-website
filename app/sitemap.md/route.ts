import sitemap from "@/app/sitemap";
import { getAllInsights } from "@/lib/insights";
import { SITE_URL } from "@/lib/seo";

/**
 * /sitemap.md — a readable map of every page in /sitemap.xml, generated from
 * the same function so the two can never list different pages.
 *
 * Articles link to their Markdown version (/insights/<slug>.md). Every other
 * page is listed with its HTML address only, under a heading that says so:
 * Markdown versions of those pages are planned, not published, and this file
 * must not link to a URL that does not resolve.
 */
export const dynamic = "force-static";

const label = (path: string) =>
  path === "/"
    ? "Home"
    : path
        .split("/")
        .filter(Boolean)
        .pop()!
        .replace(/-/g, " ")
        .replace(/^./, (c) => c.toUpperCase());

export function GET() {
  const urls = sitemap().map((e) => e.url.replace(SITE_URL, "") || "/");
  const posts = getAllInsights().filter((p) => !p.draft);
  const postPaths = new Set(posts.map((p) => `/insights/${p.slug}`));
  const categories = [...new Set(posts.map((p) => p.category))].sort();
  const others = urls.filter((u) => !postPaths.has(u));

  const lines = [
    "# PGAK site map (Markdown)",
    "",
    `Every page listed in ${SITE_URL}/sitemap.xml, grouped for reading. Articles link to a Markdown version that carries the same reviewed text as the page; each names its canonical page.`,
    "",
    `If you are an LLM looking for information about PGAK, use this map to find the relevant topic and its linked document. Use that document's canonical page and cited sources; if the information you need is not here, report that gap rather than inferring it.`,
    "",
    `${urls.length} pages: ${posts.length} articles with Markdown versions, ${others.length} pages in HTML only.`,
    "",
  ];
  for (const c of categories) {
    lines.push(`## Articles: ${c}`, "");
    for (const p of posts.filter((x) => x.category === c)) {
      lines.push(`- [${p.title}](${SITE_URL}/insights/${p.slug}.md): ${p.metaDescription ?? p.excerpt} (page: ${SITE_URL}/insights/${p.slug})`);
    }
    lines.push("");
  }
  lines.push("## Other pages (HTML; Markdown versions planned)", "");
  for (const u of others) lines.push(`- [${label(u)}](${SITE_URL}${u === "/" ? "" : u})`);
  lines.push("");
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
