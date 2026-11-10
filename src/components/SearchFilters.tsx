"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import type { CategorySlug, PlatformSlug } from "@/data/types";
import { buildHomeHref, type HomeQuery, type HomeSort } from "@/lib/usecase-list";

const fieldClass = "input-dark w-full rounded-xl px-3 py-2.5 text-sm sm:py-2";

const USECASE_RESULTS_ID = "usecase-results";
const SEARCH_DEBOUNCE_MS = 200;

function scrollToUseCaseResults() {
  const target = document.getElementById(USECASE_RESULTS_ID);
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function SearchFilters({
  query,
  total,
}: {
  query: HomeQuery;
  total: number;
}) {
  const router = useRouter();
  const [q, setQ] = useState(query.q);
  const [category, setCategory] = useState<CategorySlug | "">(query.category);
  const [platform, setPlatform] = useState<PlatformSlug | "">(query.platform);
  const [sort, setSort] = useState<HomeSort>(query.sort);
  const [seenQuery, setSeenQuery] = useState(query);
  const timer = useRef<number | null>(null);

  if (
    query.q !== seenQuery.q ||
    query.category !== seenQuery.category ||
    query.platform !== seenQuery.platform ||
    query.sort !== seenQuery.sort
  ) {
    setSeenQuery(query);
    if (timer.current === null) setQ(query.q);
    setCategory(query.category);
    setPlatform(query.platform);
    setSort(query.sort);
  }

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function replaceQuery(next: HomeQuery) {
    const subscribed = new URLSearchParams(window.location.search).get("subscribed") ?? "";
    router.replace(
      buildHomeHref(next, subscribed ? { subscribed } : undefined),
      { scroll: false }
    );
  }

  function cancelPendingSearch() {
    if (timer.current === null) return;
    window.clearTimeout(timer.current);
    timer.current = null;
  }

  function onSearchChange(value: string) {
    setQ(value);
    cancelPendingSearch();
    timer.current = window.setTimeout(() => {
      timer.current = null;
      replaceQuery({
        q: value,
        category,
        platform,
        sort,
        page: 1,
      });
    }, SEARCH_DEBOUNCE_MS);
  }

  function onCategoryChange(value: CategorySlug | "") {
    setCategory(value);
    cancelPendingSearch();
    replaceQuery({ q, category: value, platform, sort, page: 1 });
  }

  function onPlatformChange(value: PlatformSlug | "") {
    setPlatform(value);
    cancelPendingSearch();
    replaceQuery({ q, category, platform: value, sort, page: 1 });
  }

  function onSortChange(value: HomeSort) {
    setSort(value);
    cancelPendingSearch();
    replaceQuery({ q, category, platform, sort: value, page: 1 });
  }

  function clearFilters() {
    setQ("");
    setCategory("");
    setPlatform("");
    cancelPendingSearch();
    replaceQuery({ q: "", category: "", platform: "", sort, page: 1 });
  }

  const hasFilters = Boolean(q || category || platform);

  return (
    <div id="usecases" className="scroll-mt-20">
      <div className="surface-card rounded-2xl p-3 sm:p-4">
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <div>
            <label className="sr-only" htmlFor="search">
              搜索用例
            </label>
            <input
              id="search"
              value={q}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索用例：会议纪要、客服、小红书、简历…"
              className={fieldClass}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div>
              <label
                className="sr-only sm:not-sr-only sm:mb-1 sm:block sm:text-xs sm:font-medium sm:text-slate-400"
                htmlFor="category"
              >
                分类
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value as CategorySlug | "")}
                aria-label="分类"
                className={fieldClass}
              >
                <option value="">全部分类</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="sr-only sm:not-sr-only sm:mb-1 sm:block sm:text-xs sm:font-medium sm:text-slate-400"
                htmlFor="platform"
              >
                Agent / 平台
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => onPlatformChange(e.target.value as PlatformSlug | "")}
                aria-label="Agent / 平台"
                className={fieldClass}
              >
                <option value="">全部平台</option>
                {platforms.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="sr-only sm:not-sr-only sm:mb-1 sm:block sm:text-xs sm:font-medium sm:text-slate-400"
                htmlFor="sort"
              >
                排序
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value as HomeSort)}
                aria-label="排序"
                className={fieldClass}
              >
                <option value="trending">热门优先</option>
                <option value="upvotes">点赞最多</option>
                <option value="newest">最新添加</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-400">
              共{" "}
              <span className="font-semibold text-slate-100">{total}</span>{" "}
              个用例
              {hasFilters ? "（已筛选）" : ""}
            </p>
            {hasFilters && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-indigo-300 hover:text-indigo-200 hover:underline"
                >
                  清除筛选
                </button>
                <button
                  type="button"
                  onClick={scrollToUseCaseResults}
                  className="btn-primary rounded-full px-3.5 py-1.5 text-sm font-medium"
                >
                  查看结果
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
