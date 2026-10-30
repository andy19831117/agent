"use client";

import { useMemo, useState, type ReactNode } from "react";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import type { CategorySlug, PlatformSlug } from "@/data/types";
import { filterUseCases } from "@/lib/filters";
import { UseCaseCard } from "./UseCaseCard";

const fieldClass =
  "input-dark w-full rounded-xl px-3 py-2.5 text-sm sm:py-2";

type SortKey = "trending" | "upvotes" | "newest";

interface FilterState {
  q: string;
  category: CategorySlug | "";
  platform: PlatformSlug | "";
  sort: SortKey;
}

const defaultFilters: FilterState = {
  q: "",
  category: "",
  platform: "",
  sort: "trending",
};

/** Content filters only. Sort is not a filter for hide / 「已筛选」. */
function hasContentFilter(state: FilterState) {
  return Boolean(state.q.trim() || state.category || state.platform);
}

function sameFilters(a: FilterState, b: FilterState) {
  return (
    a.q === b.q &&
    a.category === b.category &&
    a.platform === b.platform &&
    a.sort === b.sort
  );
}

export function SearchFilters({
  hero,
  children,
}: {
  hero?: ReactNode;
  children?: ReactNode;
}) {
  const [draft, setDraft] = useState<FilterState>(defaultFilters);
  const [applied, setApplied] = useState<FilterState>(defaultFilters);

  const results = useMemo(() => filterUseCases(applied), [applied]);

  const appliedHasContent = hasContentFilter(applied);
  const showClear = hasContentFilter(draft) || appliedHasContent;
  const draftDirty = !sameFilters(draft, applied);

  function applyFilters() {
    setApplied({ ...draft });
  }

  function clearFilters() {
    setDraft(defaultFilters);
    setApplied(defaultFilters);
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="space-y-4">
        {hero}
        <div id="usecases" className="scroll-mt-20">
          <form
            className="surface-card rounded-2xl p-3 sm:p-4"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
          >
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div>
                <label className="sr-only" htmlFor="search">
                  搜索用例
                </label>
                <input
                  id="search"
                  value={draft.q}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, q: e.target.value }))
                  }
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
                    value={draft.category}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        category: e.target.value as CategorySlug | "",
                      }))
                    }
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
                    value={draft.platform}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        platform: e.target.value as PlatformSlug | "",
                      }))
                    }
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
                    value={draft.sort}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        sort: e.target.value as SortKey,
                      }))
                    }
                    aria-label="排序"
                    className={fieldClass}
                  >
                    <option value="trending">热门优先</option>
                    <option value="upvotes">点赞最多</option>
                    <option value="newest">最新添加</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-400">
                  共{" "}
                  <span className="font-semibold text-slate-100">
                    {results.length}
                  </span>{" "}
                  个用例
                  {appliedHasContent ? "（已筛选）" : ""}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  {showClear && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="order-2 text-xs text-indigo-300 hover:text-indigo-200 hover:underline sm:order-1"
                    >
                      清除筛选
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`btn-primary order-1 w-full rounded-xl px-4 py-2.5 text-sm font-semibold sm:order-2 sm:w-auto ${
                      draftDirty ? "ring-2 ring-amber-200/90" : ""
                    }`}
                  >
                    应用筛选
                  </button>
                </div>
              </div>
              {draftDirty && (
                <p className="text-xs text-amber-200/90" role="status">
                  条件已改，点「应用筛选」后更新列表
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Hide trending + category only after a content filter is applied.
          Draft edits and sort-only applies keep these sections visible. */}
      {!appliedHasContent && children}

      <section aria-label="用例列表" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50">
              全部用例
            </h2>
            <p className="text-sm text-slate-400">按已应用的筛选条件显示</p>
          </div>
          <a
            href="#usecases"
            className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
          >
            回到筛选
          </a>
        </div>
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-sm text-slate-400">
            没有匹配的用例，试试其他关键词或清除筛选。
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((u) => (
              <UseCaseCard key={u.id} usecase={u} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
