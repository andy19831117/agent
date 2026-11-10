import type { CategorySlug, PlatformSlug, UseCase } from "@/data/types";

/** Cards per homepage page. */
export const USECASE_PAGE_SIZE = 24;

/**
 * Fields the homepage list, filter bar, and cards are allowed to see.
 * Short card metadata (platforms, trending, source link) stays so the card
 * looks the same. Long-form body fields stay on the detail page.
 */
export interface UseCaseListItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  categories: CategorySlug[];
  platforms: PlatformSlug[];
  upvotes: number;
  trending?: boolean;
  sourceUrl: string;
  sourceLabel: string;
}

export const USECASE_LIST_KEYS = [
  "id",
  "slug",
  "title",
  "summary",
  "tags",
  "categories",
  "platforms",
  "upvotes",
  "trending",
  "sourceUrl",
  "sourceLabel",
] as const satisfies readonly (keyof UseCaseListItem)[];

export type HomeSort = "trending" | "upvotes" | "newest";

export interface HomeQuery {
  q: string;
  category: CategorySlug | "";
  platform: PlatformSlug | "";
  sort: HomeSort;
  page: number;
}

export type HomeSearchParams = {
  q?: string | string[];
  category?: string | string[];
  platform?: string | string[];
  sort?: string | string[];
  page?: string | string[];
  subscribed?: string | string[];
};

const SORTS = new Set<HomeSort>(["trending", "upvotes", "newest"]);

export function toUseCaseListItem(usecase: UseCase): UseCaseListItem {
  return {
    id: usecase.id,
    slug: usecase.slug,
    title: usecase.title,
    summary: usecase.summary,
    tags: usecase.tags,
    categories: usecase.categories,
    platforms: usecase.platforms,
    upvotes: usecase.upvotes,
    ...(usecase.trending ? { trending: true } : {}),
    sourceUrl: usecase.sourceUrl,
    sourceLabel: usecase.sourceLabel,
  };
}

export function paginateUseCaseList<T>(
  items: readonly T[],
  page: number,
  pageSize = USECASE_PAGE_SIZE
): { page: number; pageCount: number; total: number; items: T[] } {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Number.isFinite(page)
    ? Math.min(Math.max(1, Math.floor(page)), pageCount)
    : 1;
  const start = (current - 1) * pageSize;
  return {
    page: current,
    pageCount,
    total,
    items: items.slice(start, start + pageSize),
  };
}

export function paginationItems(
  current: number,
  pageCount: number
): Array<number | "ellipsis"> {
  if (pageCount < 1) return [];
  const wanted = new Set<number>([1, pageCount]);
  for (let p = current - 2; p <= current + 2; p += 1) {
    if (p >= 1 && p <= pageCount) wanted.add(p);
  }
  const sorted = [...wanted].sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];
  for (const p of sorted) {
    const prev = items[items.length - 1];
    if (typeof prev === "number" && p - prev > 1) items.push("ellipsis");
    items.push(p);
  }
  return items;
}

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function parsePage(value: string): number {
  if (!/^[1-9]\d*$/.test(value)) return 1;
  const n = Number(value);
  return Number.isSafeInteger(n) ? n : 1;
}

export function parseHomeQuery(
  raw: HomeSearchParams,
  slugs: { categories: readonly string[]; platforms: readonly string[] }
): HomeQuery {
  const category = first(raw.category);
  const platform = first(raw.platform);
  const sort = first(raw.sort);
  return {
    q: first(raw.q).trim(),
    category: slugs.categories.includes(category) ? (category as CategorySlug) : "",
    platform: slugs.platforms.includes(platform) ? (platform as PlatformSlug) : "",
    sort: SORTS.has(sort as HomeSort) ? (sort as HomeSort) : "trending",
    page: parsePage(first(raw.page)),
  };
}

/** Canonical query string for a parsed home query. Omits defaults. */
export function homeQueryKey(query: HomeQuery): string {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.platform) params.set("platform", query.platform);
  if (query.sort !== "trending") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  return params.toString();
}

export function buildHomeHref(
  query: HomeQuery,
  options?: { hash?: string; subscribed?: string }
): string {
  const params = new URLSearchParams(homeQueryKey(query));
  if (options?.subscribed) params.set("subscribed", options.subscribed);
  const qs = params.toString();
  const path = qs ? `/?${qs}` : "/";
  return options?.hash ? `${path}#${options.hash}` : path;
}
