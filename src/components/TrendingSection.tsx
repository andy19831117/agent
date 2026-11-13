import Link from "next/link";
import { getTrendingUseCases } from "@/data/usecases";
import { platforms } from "@/data/platforms";

export function TrendingSection() {
  const trending = getTrendingUseCases(6);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-50">
            本周热门
          </h2>
          <p className="text-sm text-slate-400">社区点赞与编辑推荐综合排序</p>
        </div>
        <a
          href="#usecases"
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          查看全部
        </a>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {trending.map((u, i) => {
          const plats = platforms
            .filter((p) => u.platforms.includes(p.slug))
            .slice(0, 3)
            .map((p) => p.name)
            .join(" · ");
          return (
            <Link
              key={u.id}
              href={`/usecase/${u.slug}`}
              className="surface-card surface-card-hover group min-w-0 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 font-bold text-indigo-200">
                  {i + 1}
                </span>
                <span className="text-slate-500">▲ {u.upvotes}</span>
              </div>
              <h3 className="mt-2.5 line-clamp-2 min-w-0 break-words text-sm font-semibold text-slate-100 transition group-hover:text-indigo-200">
                {u.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
                {u.summary}
              </p>
              <p className="mt-2.5 truncate text-xs text-slate-500">{plats}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
