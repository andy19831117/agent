import type { FaqItem } from "@/data/faq";

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <details
          key={item.q}
          open={index === 0}
          className="group border-t border-white/10 first:border-t-0"
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-semibold text-slate-100">
              {item.q}
            </span>
            <span
              aria-hidden
              className="inline-flex h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path
                  d="M5.5 7.5 10 12l4.5-4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-slate-400">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
