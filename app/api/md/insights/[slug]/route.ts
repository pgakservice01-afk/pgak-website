import { getAllInsights, getInsightSource } from "@/lib/insights";
import { SITE_URL } from "@/lib/seo";

/**
 * /insights/<slug>.md — the article as clean Markdown, for readers and tools
 * that prefer it to HTML. next.config.mjs rewrites the public .md URL here.
 *
 * Same source file as the HTML page (lib/insights.ts), so there is one
 * reviewed text, not two. The HTTP Link header names the HTML page as
 * canonical: this is a representation of that page, not a second page to
 * rank. Drafts (preview deployments only) are also marked noindex.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const src = getInsightSource(slug);
  if (!src) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const { meta, markdown, draft } = src;
  const canonical = `${SITE_URL}/insights/${slug}`;
  const dated = meta.updated ? `Published ${meta.date}, updated ${meta.updated}` : `Published ${meta.date}`;
  const body = [
    `# ${meta.title}`,
    "",
    `> Canonical page: ${canonical}`,
    `> ${dated}. Category: ${meta.category}. Language: en-IN.`,
    `> Maintained by PGAK Innovations Pvt. Ltd. Source: the same reviewed text as the canonical page${process.env.VERCEL_GIT_COMMIT_SHA ? ` (revision ${process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)})` : ""}.`,
    ...(draft ? ["> Draft: not reviewed or published."] : []),
    "",
    markdown,
    "",
    `---`,
    `Site map of all PGAK pages and their Markdown versions: ${SITE_URL}/sitemap.md`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonical}>; rel="canonical"`,
      ...(draft ? { "X-Robots-Tag": "noindex" } : {}),
    },
  });
}
