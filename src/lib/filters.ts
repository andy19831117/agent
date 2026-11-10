import { categories } from "@/data/categories";
import type { CategorySlug, PlatformSlug } from "@/data/types";
import type { UseCaseListItem } from "@/lib/usecase-list";

export interface FilterParams {
  q?: string;
  category?: CategorySlug | "";
  platform?: PlatformSlug | "";
  sort?: "trending" | "upvotes" | "newest";
}

const categorySearchText = new Map(
  categories.map((category) => [category.slug, `${category.name} ${category.slug}`])
);

/**
 * Homepage search covers title, summary, tags, and categories (name + slug).
 * Body fields are not on `UseCaseListItem`, so they cannot match.
 */
function searchableText(item: UseCaseListItem): string {
  const categoryText = item.categories
    .map((slug) => categorySearchText.get(slug) ?? slug)
    .join(" ");
  return [item.title, item.summary, ...item.tags, categoryText].join(" ").toLowerCase();
}

export function filterUseCases(
  items: readonly UseCaseListItem[],
  params: FilterParams
): UseCaseListItem[] {
  const q = (params.q || "").trim().toLowerCase();
  let list: readonly UseCaseListItem[] = items;

  if (params.category) {
    const category = params.category;
    list = list.filter((item) => item.categories.includes(category));
  }
  if (params.platform) {
    const platform = params.platform;
    list = list.filter((item) => item.platforms.includes(platform));
  }
  if (q) {
    list = list.filter((item) => searchableText(item).includes(q));
  }

  const sorted = [...list];
  switch (params.sort) {
    case "upvotes":
      sorted.sort((a, b) => b.upvotes - a.upvotes);
      break;
    case "newest":
      sorted.sort((a, b) => Number(b.id) - Number(a.id));
      break;
    case "trending":
    default:
      sorted.sort((a, b) => {
        const ta = a.trending ? 1 : 0;
        const tb = b.trending ? 1 : 0;
        if (tb !== ta) return tb - ta;
        return b.upvotes - a.upvotes;
      });
      break;
  }

  return sorted;
}
