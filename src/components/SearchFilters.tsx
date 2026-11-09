"use client";

import { useMemo, useState, type ReactNode } from "react";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import type { CategorySlug, PlatformSlug } from "@/data/types";
import { filterUseCases } from "@/lib/filters";
import { UseCaseCard } from "./UseCaseCard";

const fieldClass =
  "input-dark w-full rounded-xl px-3 py-2.5 text-sm sm:py-2";

const USECASE_RESULTS_ID = "usecase-results";

function scrollToUseCaseResults() {
  const target = document.getElementById(USECASE_RESULTS_ID);
  if (!target) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function SearchFilters({
  hero,
  children,
}: {
  hero?: ReactNode;
  children?: ReactNode;
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<CategorySlug | "">("");
  const [platform, setPlatform] = useState<PlatformSlug | "">("");
  const [sort, setSort] = useState<"trending" | "upvotes" | "newest">("trending");

  const results = useMemo(
    () => filterUseCases({ q, category, platform, sort }),
    [q, category, platform, sort]
  );

  const hasFilters = Boolean(q || category || platform);

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="space-y-4">
        {hero}
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
                  onChange={(e) => setQ(e.target.value)}
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
                    onChange={(e) =>
                      setCategory(e.target.value as CategorySlug | "")
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
                    value={platform}
                    onChange={(e) =>
                      setPlatform(e.target.value as PlatformSlug | "")
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
                    value={sort}
                    onChange={(e) =>
                      setSort(
                        e.target.value as "trending" | "upvotes" | "newest"
                      )
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-slate-400">
                  共{" "}
                  <span className="font-semibold text-slate-100">
                    {results.length}
                  </span>{" "}
                  个用例
                  {hasFilters ? "（已筛选）" : ""}
                </p>
                {hasFilters && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setQ("");
                        setCategory("");
                        setPlatform("");
                      }}
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
      </div>

      {children}

      <section
        id={USECASE_RESULTS_ID}
        aria-label="用例列表"
        className="scroll-mt-20 space-y-4"
      >
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50">
              全部用例
            </h2>
            <p className="text-sm text-slate-400">按上方条件实时筛选</p>
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
