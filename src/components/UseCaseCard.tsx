"use client";

import Link from "next/link";
import { useState } from "react";
import { SponsorRecBadge } from "@/components/SponsorRecBadge";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import { recForUseCase, sponsorRecsEnabled } from "@/data/sponsors";
import type { Platform, UseCase } from "@/data/types";

export function UseCaseCard({ usecase }: { usecase: UseCase }) {
  const [votes, setVotes] = useState(usecase.upvotes);
  const [voted, setVoted] = useState(false);
  const [shared, setShared] = useState(false);

  const cats = categories.filter((c) => usecase.categories.includes(c.slug));
  const plats = platforms.filter((p) => usecase.platforms.includes(p.slug));
  const rec = sponsorRecsEnabled ? recForUseCase(usecase.slug) : undefined;
  const visiblePlats = platformsForCard(plats, rec?.platform);

  function upvote() {
    if (voted) return;
    setVoted(true);
    setVotes((v) => v + 1);
  }

  async function share() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/usecase/${usecase.slug}`
        : `/usecase/${usecase.slug}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* ignore */
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  return (
    <article className="surface-card surface-card-hover group relative flex flex-col overflow-hidden rounded-2xl p-5">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-cyan-400/15"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {usecase.trending && (
              <span className="badge-hot inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide">
                热门
              </span>
            )}
            {cats.slice(0, 1).map((c) => (
              <span
                key={c.slug}
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
              >
                {c.icon} {c.name}
              </span>
            ))}
          </div>
          <h3 className="text-base font-semibold leading-snug text-slate-50">
            <Link
              href={`/usecase/${usecase.slug}`}
              className="transition hover:text-indigo-300"
            >
              {usecase.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {usecase.summary}
          </p>
        </div>
        <button
          type="button"
          onClick={upvote}
          className={`flex shrink-0 flex-col items-center rounded-xl border px-2.5 py-1.5 text-xs transition ${
            voted
              ? "border-indigo-400/50 bg-indigo-500/20 text-indigo-200"
              : "border-white/10 bg-white/5 text-slate-300 hover:border-indigo-400/40 hover:text-indigo-200"
          }`}
          aria-label="点赞"
          aria-pressed={voted}
        >
          <span className="text-sm">▲</span>
          <span className="font-semibold tabular-nums">{votes}</span>
        </button>
      </div>

      <div className="relative mt-3.5 flex flex-wrap gap-1.5">
        {visiblePlats.map((p) => (
          <span key={p.slug} className="inline-flex items-center gap-1">
            <span className="badge-plat rounded-md px-2 py-0.5 text-xs">{p.name}</span>
            {rec?.platform === p.slug ? (
              <SponsorRecBadge tooltip={rec.tooltip} href={rec.href} />
            ) : null}
          </span>
        ))}
        {plats.length > 5 ? (
          <span className="badge-plat rounded-md px-2 py-0.5 text-xs">
            +{plats.length - 5}
          </span>
        ) : null}
      </div>
      <div className="relative mt-2 flex flex-wrap gap-1.5">
        {cats.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="badge-cat rounded-md px-2 py-0.5 text-xs transition hover:brightness-125"
          >
            {c.icon} {c.name}
          </Link>
        ))}
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-slate-400">
        <a
          href={usecase.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate transition hover:text-cyan-300"
        >
          来源：{usecase.sourceLabel} ↗
        </a>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={share}
            className="rounded-lg px-2 py-1 transition hover:bg-white/10 hover:text-slate-100"
          >
            {shared ? "已复制" : "分享"}
          </button>
          <Link
            href={`/usecase/${usecase.slug}`}
            className="rounded-lg bg-indigo-500/15 px-2.5 py-1 font-medium text-indigo-200 transition hover:bg-indigo-500/25"
          >
            详情
          </Link>
        </div>
      </div>
    </article>
  );
}

function platformsForCard(plats: Platform[], recPlatform?: string): Platform[] {
  const limit = 5;
  if (!recPlatform) return plats.slice(0, limit);
  const index = plats.findIndex((item) => item.slug === recPlatform);
  const picked = index >= 0 ? plats[index] : undefined;
  if (!picked || index < limit) return plats.slice(0, limit);
  return [...plats.slice(0, limit - 1), picked];
}
