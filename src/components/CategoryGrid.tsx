import Link from "next/link";
import { categories } from "@/data/categories";
import { usecases } from "@/data/usecases";

export function CategoryGrid() {
  return (
    <section id="categories" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50">
          场景分类
        </h2>
        <p className="text-sm text-slate-400">
          覆盖个人效率、独立开发与企业自动化
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categories.map((c) => {
          const count = usecases.filter((u) =>
            u.categories.includes(c.slug)
          ).length;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="surface-card surface-card-hover rounded-2xl p-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xl ring-1 ring-white/10">
                {c.icon}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-100">
                {c.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                {c.description}
              </p>
              <p className="mt-2.5 text-xs font-medium text-cyan-300/90">
                {count} 个用例
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
