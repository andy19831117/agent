import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { categories } from "@/data/categories";
import { platforms } from "@/data/platforms";
import { usecases } from "@/data/usecases";
import type { UseCase } from "@/data/types";
import { filterUseCases } from "@/lib/filters";
import {
  USECASE_LIST_KEYS,
  USECASE_PAGE_SIZE,
  buildHomeHref,
  paginateUseCaseList,
  paginationItems,
  parseHomeQuery,
  toUseCaseListItem,
  type UseCaseListItem,
} from "@/lib/usecase-list";

const slugs = {
  categories: categories.map((category) => category.slug),
  platforms: platforms.map((platform) => platform.slug),
};

function item(overrides: Partial<UseCaseListItem> = {}): UseCaseListItem {
  return {
    id: "1",
    slug: "sample",
    title: "飞书会议纪要",
    summary: "生成行动项",
    tags: ["妙记"],
    categories: ["efficiency"],
    platforms: ["feishu"],
    upvotes: 10,
    sourceUrl: "https://example.com/source",
    sourceLabel: "来源独有词",
    ...overrides,
  };
}

describe("lean usecase list", () => {
  it("keeps only list fields and drops body content", () => {
    const full = {
      id: "7",
      slug: "body-drop",
      title: "标题",
      summary: "摘要",
      description: "BODY_DESCRIPTION_SENTINEL",
      categories: ["career"],
      platforms: ["wecom"],
      sourceUrl: "https://example.com/body",
      sourceLabel: "来源",
      upvotes: 4,
      tags: ["标签"],
      howItWorks: ["BODY_HOW_SENTINEL"],
      tips: ["BODY_TIPS_SENTINEL"],
      approach: "BODY_APPROACH_SENTINEL",
      outcomes: ["BODY_OUTCOMES_SENTINEL"],
      caveats: ["BODY_CAVEATS_SENTINEL"],
      prompts: [{ title: "提示", body: "BODY_PROMPT_SENTINEL" }],
      primarySource: {
        url: "https://example.com/primary",
        label: "BODY_PRIMARY_SENTINEL",
        date: "2024-01-02",
      },
    } satisfies UseCase;

    const lean = toUseCaseListItem(full);
    const encoded = JSON.stringify(lean);
    for (const key of Object.keys(lean)) {
      assert.ok(
        (USECASE_LIST_KEYS as readonly string[]).includes(key),
        `unexpected list field ${key}`
      );
    }
    for (const sentinel of [
      "BODY_DESCRIPTION_SENTINEL",
      "BODY_HOW_SENTINEL",
      "BODY_TIPS_SENTINEL",
      "BODY_APPROACH_SENTINEL",
      "BODY_OUTCOMES_SENTINEL",
      "BODY_CAVEATS_SENTINEL",
      "BODY_PROMPT_SENTINEL",
      "BODY_PRIMARY_SENTINEL",
    ]) {
      assert.equal(encoded.includes(sentinel), false);
    }
    assert.equal("date" in lean, false);
  });

  it("projects the real catalog without body fields", () => {
    const allowed = new Set<string>(USECASE_LIST_KEYS);
    assert.ok(usecases.length > 24);
    for (const usecase of usecases) {
      const lean = toUseCaseListItem(usecase);
      for (const key of Object.keys(lean)) {
        assert.ok(allowed.has(key), `${usecase.slug} leaked ${key}`);
      }
      assert.equal(lean.id, usecase.id);
      assert.equal(lean.slug, usecase.slug);
      assert.equal(lean.title, usecase.title);
    }
  });
});

describe("homepage search", () => {
  const samples = [
    item(),
    item({
      id: "2",
      slug: "other",
      title: "别的标题",
      summary: "别的摘要",
      tags: ["其他"],
      categories: ["career"],
      platforms: ["wecom"],
      upvotes: 3,
      trending: true,
      sourceUrl: "https://example.com/other",
      sourceLabel: "另一来源",
    }),
  ];

  it("matches title, summary, tags, and category name or slug", () => {
    assert.deepEqual(
      filterUseCases(samples, { q: "会议纪要" }).map((entry) => entry.id),
      ["1"]
    );
    assert.deepEqual(
      filterUseCases(samples, { q: "行动项" }).map((entry) => entry.id),
      ["1"]
    );
    assert.deepEqual(
      filterUseCases(samples, { q: "妙记" }).map((entry) => entry.id),
      ["1"]
    );
    assert.deepEqual(
      filterUseCases(samples, { q: "效率办公" }).map((entry) => entry.id),
      ["1"]
    );
    assert.deepEqual(
      filterUseCases(samples, { q: "efficiency" }).map((entry) => entry.id),
      ["1"]
    );
  });

  it("does not match source labels or platform names", () => {
    assert.equal(filterUseCases(samples, { q: "来源独有词" }).length, 0);
    assert.equal(filterUseCases(samples, { q: "企业微信" }).length, 0);
  });

  it("does not match real body copy", () => {
    const lean = usecases.map(toUseCaseListItem);
    const searchable = lean.map((entry) =>
      [entry.title, entry.summary, ...entry.tags, ...entry.categories].join("\n").toLowerCase()
    );
    let secret = "";
    for (const usecase of usecases) {
      const chunks = [
        usecase.description,
        usecase.approach ?? "",
        ...usecase.howItWorks,
        ...usecase.tips,
        ...(usecase.outcomes ?? []),
        ...(usecase.caveats ?? []),
        ...(usecase.prompts ?? []).flatMap((prompt) => [prompt.title, prompt.body]),
        usecase.primarySource?.label ?? "",
      ];
      for (const chunk of chunks) {
        const line = chunk
          .split("\n")
          .map((part) => part.trim())
          .find((part) => part.length >= 20);
        if (!line) continue;
        const needle = line.toLowerCase();
        if (searchable.every((hay) => !hay.includes(needle))) {
          secret = line;
          break;
        }
      }
      if (secret) break;
    }
    assert.ok(secret, "expected a body phrase that is absent from lean fields");
    assert.equal(filterUseCases(lean, { q: secret }).length, 0);
    assert.ok(filterUseCases(lean, { q: usecases[0].title }).some((entry) => entry.id === usecases[0].id));
  });

  it("sorts trending, upvotes, and newest without mutating the input", () => {
    const input = [samples[0], samples[1]];
    const trending = filterUseCases(input, { sort: "trending" }).map((entry) => entry.id);
    assert.deepEqual(trending, ["2", "1"]);
    assert.deepEqual(
      filterUseCases(input, { sort: "upvotes" }).map((entry) => entry.id),
      ["1", "2"]
    );
    assert.deepEqual(
      filterUseCases(input, { sort: "newest" }).map((entry) => entry.id),
      ["2", "1"]
    );
    assert.deepEqual(
      input.map((entry) => entry.id),
      ["1", "2"]
    );
  });
});

describe("pagination and URL state", () => {
  it("defaults to 24 items per page", () => {
    assert.equal(USECASE_PAGE_SIZE, 24);
    const all = Array.from({ length: 50 }, (_, index) => item({ id: String(index + 1) }));
    const first = paginateUseCaseList(all, 1);
    const second = paginateUseCaseList(all, 2);
    const overflow = paginateUseCaseList(all, 9);
    assert.equal(first.items.length, 24);
    assert.equal(first.total, 50);
    assert.equal(first.pageCount, 3);
    assert.equal(second.items[0]?.id, "25");
    assert.equal(second.items.length, 24);
    assert.equal(overflow.page, 3);
    assert.equal(overflow.items.length, 2);
    assert.deepEqual(paginationItems(2, 3), [1, 2, 3]);
    assert.deepEqual(paginationItems(10, 40), [1, "ellipsis", 8, 9, 10, 11, 12, "ellipsis", 40]);
  });

  it("parses filters from the query and canonicalizes defaults", () => {
    const parsed = parseHomeQuery(
      { q: "  纪要 ", category: "efficiency", platform: "nope", sort: "newest", page: "2" },
      slugs
    );
    assert.deepEqual(parsed, {
      q: "纪要",
      category: "efficiency",
      platform: "",
      sort: "newest",
      page: 2,
    });
    assert.equal(
      buildHomeHref(
        { q: "", category: "efficiency", platform: "", sort: "newest", page: 2 },
        { subscribed: "confirmed" }
      ),
      "/?category=efficiency&sort=newest&page=2&subscribed=confirmed"
    );
    assert.equal(
      buildHomeHref(
        { q: "纪要", category: "efficiency", platform: "", sort: "trending", page: 2 },
        { hash: "usecase-results" }
      ),
      "/?q=%E7%BA%AA%E8%A6%81&category=efficiency&page=2#usecase-results"
    );
  });
});

describe("client list boundary", () => {
  it("does not import the full catalog into client list UI", () => {
    const files = [
      "../components/SearchFilters.tsx",
      "../components/UseCaseCard.tsx",
      "../components/UseCaseResults.tsx",
      "./usecase-list.ts",
      "./filters.ts",
    ];
    for (const file of files) {
      const source = readFileSync(new URL(file, import.meta.url), "utf8");
      assert.equal(source.includes("@/data/usecases"), false, file);
      assert.equal(source.includes("usecase-catalog"), false, file);
      assert.equal(source.includes("howItWorks"), false, file);
      assert.equal(source.includes("primarySource"), false, file);
    }
  });
});
