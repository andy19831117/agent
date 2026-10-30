import type { PlatformSlug } from "@/data/types";

export const SPONSOR_REC_SITEWIDE_CAP = 5;

/**
 * Calendar date used for sponsor expiry. Kept as data so prerender does not
 * call the clock. Bump it, or set `enabled: false`, when a flight ends.
 */
export const SPONSOR_AS_OF = "2026-10-30";

export const SPONSOR_REC_TOOLTIP_MAX = 28;
export const SPONSOR_HEADLINE_MAX = 20;
export const SPONSOR_SUBLINE_MAX = 36;
export const SPONSOR_CTA_MAX = 8;

export const DEFAULT_REC_TOOLTIP = "赞助推荐 · 适用于本场景的工具";

export type SponsorTopBarModel =
  | { mode: "empty" }
  | {
      mode: "filled";
      logoSrc?: string;
      logoAlt: string;
      headline: string;
      subline?: string;
      cta: string;
      href: string;
      /** Inclusive last day, YYYY-MM-DD. A past date resolves to empty. */
      endsOn?: string;
    };

/** Live bar. Empty until a sponsor is configured. */
export const sponsorTopBar: SponsorTopBarModel = { mode: "empty" };

export interface SponsorRecPlacement {
  usecaseSlug: string;
  platform: PlatformSlug;
  tooltip: string;
  href?: string;
  /** Default off. Expired or over-cap placements are not rendered. */
  enabled: boolean;
  /** Inclusive last day, YYYY-MM-DD. */
  endsOn?: string;
  /** Lower numbers win. Omit to keep source order. */
  priority?: number;
}

/**
 * Soft placements. None are enabled. Cap is 5 usecases.
 */
export const sponsorRecPlacements: readonly SponsorRecPlacement[] = [];

/** Sitewide 「荐」角标。默认关闭。 */
export const SPONSOR_REC_ENABLED = false;

export const sponsorRecsEnabled =
  SPONSOR_REC_ENABLED && sponsorRecPlacements.some((item) => item.enabled);

export interface SponsorTier {
  id: "explore" | "growth" | "partner";
  name: string;
  period: string;
  price: string;
  featured: boolean;
  mark: "推荐" | "季度" | null;
  points: readonly string[];
}

export const sponsorTiers: readonly SponsorTier[] = [
  {
    id: "explore",
    name: "探索",
    period: "2 周",
    price: "¥1.5–3k",
    featured: false,
    mark: null,
    points: ["首页赞助条体验位", "赞助页 Logo 展示"],
  },
  {
    id: "growth",
    name: "成长",
    period: "1 月",
    price: "¥5–8k",
    featured: true,
    mark: "推荐",
    points: [
      "首页赞助条固定位",
      "1 条用例「荐」角标",
      "月度展示汇总（埋点上线后含 UV / 点击）",
    ],
  },
  {
    id: "partner",
    name: "伙伴",
    period: "1 季",
    price: "¥15–25k",
    featured: false,
    mark: "季度",
    points: [
      "首页赞助条优先",
      "最多 2 条用例「荐」角标",
      "联合选题素材包",
      "季度简报",
    ],
  },
];

export const sponsorAudiences = [
  "模型 / 平台",
  "效率工具",
  "开发者工具",
  "企业协作与自动化",
] as const;

export const sponsorFaqs = [
  {
    q: "能否指定分类？",
    a: "洽谈时可以说明希望优先露出的分类。不保证独占该分类，也不改写已发布用例的正文。",
  },
  {
    q: "能否在用例正文植入？",
    a: "不可以。合作露出只用首页赞助条，以及指定用例里某个平台标签旁的「荐」角标。每条用例最多 1 个角标，全站同时最多 5 条用例。",
  },
  {
    q: "退款与延期怎么算？",
    a: "本页为占位价，付款、退款与延期在洽谈时书面约定。未上线的档期可以改期。不承诺站外转化。",
  },
] as const;

export function clampChars(text: string, max: number): string {
  const chars = Array.from(text);
  if (chars.length <= max) return text;
  return chars.slice(0, max).join("");
}

export function isPastEndDate(endsOn: string, asOf = SPONSOR_AS_OF): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(endsOn)) return true;
  return endsOn < asOf;
}

export function resolveSponsorTopBar(
  model: SponsorTopBarModel,
  asOf = SPONSOR_AS_OF,
): SponsorTopBarModel {
  if (model.mode !== "filled") return { mode: "empty" };
  if (model.endsOn && isPastEndDate(model.endsOn, asOf)) return { mode: "empty" };
  return model;
}

let didWarnDroppedRecs = false;

/** Enabled, unexpired placements: at most one per usecase, at most five sitewide. */
export function selectVisibleRecs(
  placements: readonly SponsorRecPlacement[],
  asOf = SPONSOR_AS_OF,
): SponsorRecPlacement[] {
  const ranked = placements.map((placement, index) => ({ placement, index }));
  ranked.sort((a, b) => {
    const priorityA = a.placement.priority ?? a.index;
    const priorityB = b.placement.priority ?? b.index;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return a.index - b.index;
  });

  const seen = new Set<string>();
  const kept: SponsorRecPlacement[] = [];
  let droppedSameUsecase = 0;
  let droppedCap = 0;

  for (const { placement } of ranked) {
    if (!placement.enabled) continue;
    if (placement.endsOn && isPastEndDate(placement.endsOn, asOf)) continue;
    if (seen.has(placement.usecaseSlug)) {
      droppedSameUsecase += 1;
      continue;
    }
    if (kept.length >= SPONSOR_REC_SITEWIDE_CAP) {
      droppedCap += 1;
      continue;
    }
    seen.add(placement.usecaseSlug);
    kept.push(placement);
  }

  if (
    process.env.NODE_ENV !== "production" &&
    !didWarnDroppedRecs &&
    (droppedSameUsecase > 0 || droppedCap > 0)
  ) {
    didWarnDroppedRecs = true;
    console.warn(
      `[SponsorRecBadge] dropped ${droppedSameUsecase} extra badge(s) on the same usecase and ${droppedCap} over the sitewide cap of ${SPONSOR_REC_SITEWIDE_CAP}.`,
    );
  }

  return kept;
}

export function recForUseCase(
  usecaseSlug: string,
  asOf = SPONSOR_AS_OF,
): SponsorRecPlacement | undefined {
  return selectVisibleRecs(sponsorRecPlacements, asOf).find(
    (item) => item.usecaseSlug === usecaseSlug,
  );
}
