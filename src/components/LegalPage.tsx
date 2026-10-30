import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated = "YYYY-MM-DD",
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="px-4 py-10 sm:px-6">
      <article className="surface-card mx-auto max-w-3xl rounded-2xl px-5 py-6 sm:px-8 sm:py-8">
        <Link
          href="/"
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          ← 返回首页
        </Link>
        <h1 className="mt-4 text-xl font-bold text-slate-50 sm:text-2xl">{title}</h1>
        <p className="mt-2 text-xs text-slate-500">最后更新：{updated}</p>
        <div className="mt-6 space-y-6">{children}</div>
      </article>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-100">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-300">
        {children}
      </div>
    </section>
  );
}
