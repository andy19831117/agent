import faqCopy from "./faq.json";

/**
 * Authoritative FAQ copy is `faq.json`.
 * Home always renders `home` (3 items, all expanded).
 * Usecase pages render only the three slugs listed below.
 * Visible Q&A and FAQPage JSON-LD are both built from these arrays.
 */

export type FaqItem = {
  q: string;
  a: string;
};

export const USECASE_FAQ_SLUGS = [
  "xiaohongshu-note-batch-agent",
  "short-video-script-agent",
  "feishu-meeting-summary-agent",
] as const satisfies readonly (keyof typeof faqCopy.usecases)[];

export type UsecaseFaqSlug = (typeof USECASE_FAQ_SLUGS)[number];

const EXPECTED_USECASE_COUNTS: Record<UsecaseFaqSlug, number> = {
  "xiaohongshu-note-batch-agent": 4,
  "short-video-script-agent": 4,
  "feishu-meeting-summary-agent": 5,
};

function assertFaqCopy(): void {
  if (faqCopy.home.length !== 3) {
    throw new Error(
      `Home FAQ must list exactly 3 questions, got ${faqCopy.home.length}.`,
    );
  }

  for (const slug of USECASE_FAQ_SLUGS) {
    const count = faqCopy.usecases[slug].length;
    const expected = EXPECTED_USECASE_COUNTS[slug];
    if (count !== expected) {
      throw new Error(
        `${slug} FAQ must list exactly ${expected} questions, got ${count}.`,
      );
    }
  }
}

assertFaqCopy();

export const homeFaq: readonly FaqItem[] = faqCopy.home;

export function isUsecaseFaqSlug(slug: string): slug is UsecaseFaqSlug {
  return (USECASE_FAQ_SLUGS as readonly string[]).includes(slug);
}

/** Full Q&A list for a wired usecase slug; undefined for every other page. */
export function getUsecaseFaq(slug: string): readonly FaqItem[] | undefined {
  if (!isUsecaseFaqSlug(slug)) return undefined;
  return faqCopy.usecases[slug];
}

export type FaqPageJsonLd = {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
};

/** FAQPage entity list is the visible `q` / `a` strings, with nothing added. */
export function toFaqPageJsonLd(items: readonly FaqItem[]): FaqPageJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
