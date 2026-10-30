import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import { getUseCaseBySlug, usecases } from "@/data/usecases";
import { UsecaseFaq } from "@/components/UsecaseFaq";
import { UseCaseActions } from "./UseCaseActions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return usecases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const usecase = getUseCaseBySlug(slug);
  if (!usecase) return { title: "用例未找到" };
  return {
    title: usecase.title,
    description: usecase.summary,
  };
}

export default async function UseCaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const usecase = getUseCaseBySlug(slug);
  if (!usecase) notFound();

  const cats = categories.filter((c) => usecase.categories.includes(c.slug));
  const plats = platforms.filter((p) => usecase.platforms.includes(p.slug));

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
      <div>
        <Link
          href="/#usecases"
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          ← 返回用例列表
        </Link>
        {usecase.trending && (
          <span className="badge-hot ml-3 inline-block rounded-full px-2 py-0.5 text-xs font-semibold">
            热门
          </span>
        )}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-50">
          {usecase.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-300">
          {usecase.summary}
        </p>
        <UseCaseActions
          slug={usecase.slug}
          initialUpvotes={usecase.upvotes}
          sourceUrl={usecase.sourceUrl}
          sourceLabel={usecase.sourceLabel}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {plats.map((p) => (
          <span key={p.slug} className="badge-plat rounded-lg px-2.5 py-1 text-sm">
            {p.name}
          </span>
        ))}
        {cats.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="badge-cat rounded-lg px-2.5 py-1 text-sm transition hover:brightness-125"
          >
            {c.icon} {c.name}
          </Link>
        ))}
      </div>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="text-base font-semibold text-slate-100">场景说明</h2>
        <p className="mt-3 leading-relaxed text-slate-300">
          {usecase.description}
        </p>
      </section>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="text-base font-semibold text-slate-100">怎么做</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-300">
          {usecase.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="text-base font-semibold text-slate-100">实用提示</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
          {usecase.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-2">
        {usecase.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400"
          >
            #{tag}
          </span>
        ))}
      </section>

      <UsecaseFaq slug={usecase.slug} />
    </div>
  );
}
