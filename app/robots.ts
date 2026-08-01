import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Everything on this site is meant to be indexed, so the rule is a plain
 * allow-all with a couple of paths that only produce crawl noise.
 *
 * Deliberately NOT blocking AI crawlers (GPTBot, ClaudeBot, PerplexityBot):
 * a growing share of "which AI CCTV should I buy" queries are now answered
 * inside an assistant, and being absent from that answer costs more than the
 * scraping does. Add a `disallow` block below if that judgement changes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next's internal build assets and API routes add nothing to the index.
        disallow: ["/api/", "/_next/static/chunks/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
