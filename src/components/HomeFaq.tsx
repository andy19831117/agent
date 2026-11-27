import { Fragment, type ReactNode } from "react";
import { homeFaq } from "@/data/faq";
import { sisterSiteNamePattern, sisterSites } from "@/data/sister-sites";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const sisterLinkClass =
  "text-indigo-300 hover:text-indigo-200 hover:underline";

function renderAnswer(text: string): ReactNode {
  const parts = text.split(sisterSiteNamePattern);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    const site = sisterSites.find((item) => item.name === part);
    if (!site) return <Fragment key={index}>{part}</Fragment>;
    return (
      <a
        key={index}
        href={site.href}
        target="_blank"
        rel="noopener noreferrer"
        className={sisterLinkClass}
      >
        {site.name}
      </a>
    );
  });
}

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
          本站定位、一条用例怎么用、是否官方认证，以及和另外三个站的区别。
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
              {renderAnswer(item.a)}
            </dd>
          </div>
        ))}
      </dl>
      <FaqJsonLd items={homeFaq} />
    </section>
  );
}
