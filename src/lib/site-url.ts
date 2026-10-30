/**
 * Canonical origin for sitemap.xml and robots.txt.
 *
 * Set NEXT_PUBLIC_SITE_URL=https://agent-usecases-cn.vercel.app on Vercel.
 * When that variable is missing, production builds use the canonical
 * production origin. Local `next dev` uses localhost.
 *
 * VERCEL_URL is the per-deployment hostname, not the production alias,
 * so it is not used as the production fallback.
 */
export const PRODUCTION_SITE_URL = "https://agent-usecases-cn.vercel.app";

const LOCAL_DEV_SITE_URL = "http://localhost:3000";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return stripTrailingSlash(configured);

  if (process.env.NODE_ENV !== "production") {
    return LOCAL_DEV_SITE_URL;
  }

  return PRODUCTION_SITE_URL;
}
