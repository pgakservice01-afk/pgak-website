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
 * Priorities are relative *within this site only*; Google treats them as a
 * weak hint. The ordering reflects commercial intent: solution and capability
 * pages above brand pages, brand pages above legal.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/features`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/roi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/insights/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/insights`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/areas-we-serve`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/brochure`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/trust/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/trust/photos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/trust/videos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const solutions: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const capabilities: MetadataRoute.Sitemap = CAPABILITIES.map((c) => ({
    url: `${SITE_URL}/features/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const locations: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: `${SITE_URL}${locationPath(l.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${SITE_URL}/insights/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const posts: MetadataRoute.Sitemap = getAllInsights().map((p) => ({
    url: `${SITE_URL}/insights/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.7,
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
