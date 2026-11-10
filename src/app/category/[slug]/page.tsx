import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UseCaseCard } from "@/components/UseCaseCard";
import { categories, getCategory } from "@/data/categories";
import { getUseCasesByCategory } from "@/data/usecases";
import { toUseCaseListItem } from "@/lib/usecase-list";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "分类未找到" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const list = getUseCasesByCategory(slug).map(toUseCaseListItem);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div>
        <Link
          href="/#categories"
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          ← 全部分类
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-50">
          {category.icon} {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-slate-300">{category.description}</p>
        <p className="mt-2 text-sm text-cyan-300/90">{list.length} 个用例</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((u) => (
          <UseCaseCard key={u.id} usecase={u} />
        ))}
      </div>
    </div>
  );
}
