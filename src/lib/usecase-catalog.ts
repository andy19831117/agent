import { cache } from "react";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import { usecases } from "@/data/usecases";
import { filterUseCases } from "@/lib/filters";
import {
  paginateUseCaseList,
  parseHomeQuery,
  toUseCaseListItem,
  type HomeQuery,
  type HomeSearchParams,
  type UseCaseListItem,
} from "@/lib/usecase-list";

const slugLists = {
  categories: categories.map((category) => category.slug),
  platforms: platforms.map((platform) => platform.slug),
};

let lean: readonly UseCaseListItem[] | undefined;

/** Full catalog projected once. Import this only from server components. */
export function getLeanUseCases(): readonly UseCaseListItem[] {
  if (!lean) lean = usecases.map(toUseCaseListItem);
  return lean;
}

export const loadHomeCatalog = cache(function loadHomeCatalog(raw: HomeSearchParams): {
  query: HomeQuery;
  items: UseCaseListItem[];
  page: number;
  pageCount: number;
  total: number;
} {
  const parsed = parseHomeQuery(raw, slugLists);
  const filtered = filterUseCases(getLeanUseCases(), parsed);
  const paged = paginateUseCaseList(filtered, parsed.page);
  const query: HomeQuery = { ...parsed, page: paged.page };
  return {
    query,
    items: paged.items,
    page: paged.page,
    pageCount: paged.pageCount,
    total: paged.total,
  };
});
