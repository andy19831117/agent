import Link from "next/link";
import { UseCaseCard } from "@/components/UseCaseCard";
import {
  buildHomeHref,
  paginationItems,
  type HomeQuery,
  type UseCaseListItem,
} from "@/lib/usecase-list";

const pageChip =
  "inline-flex min-w-9 items-center justify-center rounded-lg border px-2.5 py-1 text-sm font-medium tabular-nums transition";

export function UseCaseResults({
  items,
  query,
  pageCount,
  subscribed,
}: {
  items: readonly UseCaseListItem[];
  query: HomeQuery;
  pageCount: number;
  subscribed?: string;
}) {
  return (
    <section
      id="usecase-results"
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
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-sm text-slate-400">
          没有匹配的用例，试试其他关键词或清除筛选。
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((usecase) => (
              <UseCaseCard key={usecase.id} usecase={usecase} />
            ))}
          </div>
          <UseCasePagination
            query={query}
            pageCount={pageCount}
            subscribed={subscribed}
          />
        </>
      )}
    </section>
  );
}

function UseCasePagination({
  query,
  pageCount,
  subscribed,
}: {
  query: HomeQuery;
  pageCount: number;
  subscribed?: string;
}) {
  const pages = paginationItems(query.page, pageCount);
  const hrefFor = (page: number) =>
    buildHomeHref(
      { ...query, page },
      {
        hash: "usecase-results",
        ...(subscribed ? { subscribed } : {}),
      }
    );

  return (
    <nav aria-label="分页" className="flex flex-wrap items-center justify-center gap-2">
      {query.page > 1 ? (
        <Link
          href={hrefFor(query.page - 1)}
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          上一页
        </Link>
      ) : (
        <span className="text-sm text-slate-500">上一页</span>
      )}
      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`gap-${index}`} className="px-1 text-sm text-slate-500" aria-hidden>
            …
          </span>
        ) : item === query.page ? (
          <span
            key={item}
            aria-current="page"
            className={`${pageChip} border-indigo-400/50 bg-indigo-500/20 text-indigo-200`}
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item)}
            aria-label={`第 ${item} 页`}
            className={`${pageChip} border-white/10 bg-white/5 text-slate-300 hover:border-indigo-400/40 hover:text-indigo-200`}
          >
            {item}
          </Link>
        )
      )}
      {query.page < pageCount ? (
        <Link
          href={hrefFor(query.page + 1)}
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          下一页
        </Link>
      ) : (
        <span className="text-sm text-slate-500">下一页</span>
      )}
    </nav>
  );
}
