import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { usecases } from "@/data/usecases";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Stable lastmod. `new Date()` is request-time IO when cacheComponents is
 * enabled, which leaves /sitemap.xml dynamic and can fail the prerender
 * with a 500. The catalog is static data, so one fixed timestamp is enough.
 */
const LAST_MODIFIED = "2026-10-30T00:00:00.000Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: base, lastModified: LAST_MODIFIED, changeFrequency: "daily", priority: 1 },
    {
      url: `${base}/sponsors`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/privacy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/disclaimer`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...categories.map((c) => ({
      url: `${base}/category/${c.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...usecases.map((u) => ({
      url: `${base}/usecase/${u.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
