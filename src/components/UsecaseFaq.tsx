import { getUsecaseFaq } from "@/data/faq";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd } from "@/components/FaqJsonLd";

/** Renders nothing unless `slug` is one of the three FAQ-backed usecases. */
export function UsecaseFaq({ slug }: { slug: string }) {
  const items = getUsecaseFaq(slug);
  if (!items) return null;

  return (
    <section
      aria-labelledby="usecase-faq-heading"
      className="surface-card rounded-2xl p-6"
    >
      <h2
        id="usecase-faq-heading"
        className="text-base font-semibold text-slate-100"
      >
        常见问题
      </h2>
      <div className="mt-3">
        <FaqAccordion items={items} />
      </div>
      <FaqJsonLd items={items} />
    </section>
  );
}
