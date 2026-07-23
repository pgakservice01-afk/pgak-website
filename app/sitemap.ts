import type { MetadataRoute } from "next";
import { getAllInsights } from "@/lib/insights";

const BASE = "https://pgak.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllInsights().map((p) => ({
    url: `${BASE}/insights/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/insights`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...posts,
  ];
}
