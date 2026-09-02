import type { MetadataRoute } from "next";
import { getAllInsights } from "@/lib/insights";
import { SOLUTIONS } from "@/lib/solutions";
import { CAPABILITIES } from "@/lib/capabilities";
import { LOCATIONS, locationPath } from "@/lib/locations";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap is generated from the same data files that generate the pages, so a
 * new solution, capability, city or case study is indexed the moment it ships —
 * there is no second list to forget to update.
 *
 * lastModified is emitted ONLY where a real date exists (insights posts, case
 * studies, and the /insights index). Everything else omits it: a build
 * timestamp on 50+ URLs teaches Google the signal is fake and gets the whole
 * sitemap's dates discounted. changefreq/priority are deprecated hints Google
 * ignores, so they're gone too.
 */

function postDate(p: { date: string; updated?: string }): Date {
  return new Date(`${p.updated ?? p.date}T00:00:00`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const insights = getAllInsights();
  const newestPost = insights.length ? postDate(insights[0]) : undefined;

  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/solutions` },
    { url: `${SITE_URL}/features` },
    { url: `${SITE_URL}/pricing` },
    { url: `${SITE_URL}/roi-calculator` },
    { url: `${SITE_URL}/insights/case-studies` },
    // The blog index genuinely changes with every published post.
    { url: `${SITE_URL}/insights`, ...(newestPost ? { lastModified: newestPost } : {}) },
    { url: `${SITE_URL}/areas-we-serve` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/brochure` },
    { url: `${SITE_URL}/privacy` },
    { url: `${SITE_URL}/terms` },
  ];

  const solutions: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
  }));

  const capabilities: MetadataRoute.Sitemap = CAPABILITIES.map((c) => ({
    url: `${SITE_URL}/features/${c.slug}`,
  }));

  const locations: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: `${SITE_URL}${locationPath(l.slug)}`,
  }));

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${SITE_URL}/insights/case-studies/${c.slug}`,
    lastModified: new Date(`${c.date}T00:00:00`),
  }));

  const posts: MetadataRoute.Sitemap = insights.map((p) => ({
    url: `${SITE_URL}/insights/${p.slug}`,
    lastModified: postDate(p),
  }));

  return [
    ...core,
    ...solutions,
    ...capabilities,
    ...locations,
    ...caseStudies,
    ...posts,
  ];
}
