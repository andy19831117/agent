import { CategoryGrid } from "@/components/CategoryGrid";
import { HomeFaq } from "@/components/HomeFaq";
import { SearchFilters } from "@/components/SearchFilters";
import { SubscribePlaceholder } from "@/components/SubscribePlaceholder";
import { TrendingSection } from "@/components/TrendingSection";
import { usecases } from "@/data/usecases";
import { categories } from "@/data/categories";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
      <SearchFilters
        hero={
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/60 via-slate-900/40 to-cyan-950/30 px-4 py-5 sm:px-6 sm:py-6">
            <div
              className="hero-glow -right-10 -top-16 sm:right-8"
              aria-hidden
            />
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
                  <span className="font-semibold text-cyan-300">{usecases.length}+</span>{" "}
                  精选用例
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-200 backdrop-blur sm:px-3">
                  <span className="font-semibold text-indigo-300">
                    {categories.length}
                  </span>{" "}
                  大分类
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-200 backdrop-blur sm:px-3">
                  简体中文
                </span>
              </div>
            </div>
          </section>
        }
      >
        <div className="space-y-10 sm:space-y-12">
          <TrendingSection />
          <CategoryGrid />
        </div>
      </SearchFilters>

      <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
        <HomeFaq />
        <SubscribePlaceholder />
      </div>
    </div>
  );
}
