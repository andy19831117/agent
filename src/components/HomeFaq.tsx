import { homeFaq } from "@/data/faq";
import { FaqJsonLd } from "@/components/FaqJsonLd";

export function HomeFaq() {
  return (
    <section id="faq" aria-labelledby="home-faq-heading" className="space-y-4">
      <div>
        <h2
          id="home-faq-heading"
          className="text-lg font-semibold tracking-tight text-slate-50"
        >
          常见问题
        </h2>
        <p className="text-sm text-slate-400">
          本站定位、一条用例怎么用，以及是否官方认证。
        </p>
      </div>
      <dl>
        {homeFaq.map((item, index) => (
          <div
            key={item.q}
            className={
              index === 0 ? undefined : "mt-4 border-t border-white/10 pt-4"
            }
          >
            <dt className="text-sm font-semibold text-slate-100">{item.q}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-slate-400">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
      <FaqJsonLd items={homeFaq} />
    </section>
  );
}
