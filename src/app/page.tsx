import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HomeFaq } from "@/components/HomeFaq";
import { SearchFilters } from "@/components/SearchFilters";
import { SubscribeForm } from "@/components/SubscribeForm";
import { TrendingSection } from "@/components/TrendingSection";
import { UseCaseResults } from "@/components/UseCaseResults";
import { categories } from "@/data/categories";
import { getSiteUrl } from "@/lib/site-url";
import { getLeanUseCases, loadHomeCatalog } from "@/lib/usecase-catalog";
import type { HomeSearchParams } from "@/lib/usecase-list";

export const metadata: Metadata = {
  alternates: {
    canonical: getSiteUrl(),
  },
};

type HomePageProps = {
  searchParams: Promise<HomeSearchParams>;
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
      <div className="space-y-10 sm:space-y-12">
        <div className="space-y-4">
          <HomeHero />
          <Suspense fallback={<FilterBarFallback />}>
            <HomeFilterBar searchParams={searchParams} />
          </Suspense>
        </div>

        <div className="space-y-10 sm:space-y-12">
          <TrendingSection />
          <CategoryGrid />
        </div>

        <Suspense fallback={<ResultsFallback />}>
          <HomeResults searchParams={searchParams} />
        </Suspense>
      </div>

      <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
        <HomeFaq />
        <Suspense fallback={<SubscribeForm />}>
          <HomeSubscribe searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

function HomeHero() {
  const total = getLeanUseCases().length;
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/60 via-slate-900/40 to-cyan-950/30 px-4 py-5 sm:px-6 sm:py-6">
      <div className="hero-glow -right-10 -top-16 sm:right-8" aria-hidden />
      <div
        className="hero-glow -bottom-24 left-10 opacity-60"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative z-[1] space-y-2.5 text-center sm:space-y-3 sm:text-left">
        <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200 sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
          Agent场景库 · 中文 AI Agent 用例精选
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">发现可落地的智能体场景</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:mx-0 sm:text-[15px]">
          面向个人效率、独立开发者与企业自动化的真实 Agent
          用法。覆盖微信/企微、飞书、钉钉、小红书、视频号与通义、文心、豆包、Kimi、DeepSeek
          等。
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs sm:justify-start sm:gap-2.5 sm:text-sm">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-200 backdrop-blur sm:px-3">
            <span className="font-semibold text-cyan-300">{total}+</span> 精选用例
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-200 backdrop-blur sm:px-3">
            <span className="font-semibold text-indigo-300">{categories.length}</span> 大分类
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-200 backdrop-blur sm:px-3">
            简体中文
          </span>
        </div>
      </div>
    </section>
  );
}

async function HomeFilterBar({ searchParams }: HomePageProps) {
  const catalog = loadHomeCatalog(await searchParams);
  return <SearchFilters query={catalog.query} total={catalog.total} />;
}

async function HomeResults({ searchParams }: HomePageProps) {
  const raw = await searchParams;
  const catalog = loadHomeCatalog(raw);
  const subscribed = firstParam(raw.subscribed);
  return (
    <UseCaseResults
      items={catalog.items}
      query={catalog.query}
      pageCount={catalog.pageCount}
      subscribed={subscribed || undefined}
    />
  );
}

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function FilterBarFallback() {
  const total = getLeanUseCases().length;
  return (
    <div id="usecases" className="scroll-mt-20">
      <div className="surface-card rounded-2xl p-3 sm:p-4">
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <div className="input-dark h-11 w-full rounded-xl sm:h-10" />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="input-dark h-11 rounded-xl sm:h-10" />
            <div className="input-dark h-11 rounded-xl sm:h-10" />
            <div className="input-dark h-11 rounded-xl sm:h-10" />
          </div>
          <p className="text-sm text-slate-400">
            共 <span className="font-semibold text-slate-100">{total}</span> 个用例
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultsFallback() {
  return (
    <section
      id="usecase-results"
      aria-label="用例列表"
      className="scroll-mt-20 space-y-4"
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-50">全部用例</h2>
          <p className="text-sm text-slate-400">按上方条件实时筛选</p>
        </div>
        <a
          href="#usecases"
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          回到筛选
        </a>
      </div>
      <p className="text-sm text-slate-400">正在加载用例…</p>
    </section>
  );
}

async function HomeSubscribe({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.subscribed) ? params.subscribed[0] : params.subscribed;
  const initialStatus =
    raw === "confirmed" || raw === "invalid" || raw === "unavailable" ? raw : undefined;
  return <SubscribeForm initialStatus={initialStatus} />;
}
