import { toFaqPageJsonLd, type FaqItem } from "@/data/faq";

/**
 * Native JSON-LD script (not next/script). The payload is the same `items`
 * rendered as visible Q&A. `<` is escaped so the script cannot break out.
 */
export function FaqJsonLd({ items }: { items: readonly FaqItem[] }) {
  const jsonLd = toFaqPageJsonLd(items);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
