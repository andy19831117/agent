import Link from "next/link";
import { siteContact, sponsorMailHref } from "@/data/contact";
import { sponsorAudiences, sponsorFaqs, sponsorTiers } from "@/data/sponsors";

export function SponsorsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <div>
        <Link
          href="/"
          className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
        >
          ← 返回首页
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
          赞助合作
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          把工具曝光给正在找可落地方案的中文 Agent 用户。本站不售卖站内内容版权。
        </p>
      </div>

      <section aria-labelledby="sponsor-fit">
        <h2 id="sponsor-fit" className="text-lg font-semibold text-slate-50">
          谁适合投
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          适合希望被场景库读者看到的产品与团队。
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {sponsorAudiences.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sponsor-tiers">
        <h2 id="sponsor-tiers" className="text-lg font-semibold text-slate-50">
          合作档位
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <article
              key={tier.id}
              className={`surface-card flex h-full flex-col rounded-2xl p-5 ${
                tier.featured ? "sponsor-tier-featured" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-50">{tier.name}</h3>
                {tier.mark === "推荐" ? (
                  <span className="rounded-full border border-indigo-400/50 bg-indigo-500/15 px-2 py-0.5 text-[11px] font-semibold text-indigo-200">
                    推荐
                  </span>
                ) : null}
                {tier.mark === "季度" ? (
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-100">
                    季度
                  </span>
                ) : null}
              </div>
              <p className="mt-3">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-300">
                  {tier.period}
                </span>
              </p>
              <p className="mt-4 whitespace-nowrap text-2xl font-bold tracking-tight text-slate-50">
                {tier.price}
              </p>
              <p className="mt-1 text-xs text-slate-500">占位价，可洽谈</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-300">
                {tier.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a
                href={sponsorMailHref(`赞助洽谈·${tier.name}`)}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-3 py-2 text-sm text-slate-100 hover:border-indigo-400/50 hover:text-indigo-200"
              >
                洽谈此档
              </a>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="sponsor-spec" className="surface-card rounded-2xl p-5 sm:p-6">
        <h2 id="sponsor-spec" className="text-lg font-semibold text-slate-50">
          展示规范
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-300">
          <li>Logo 使用浅色版本，方便在深色页面上辨认。</li>
          <li>首页条主文案不超过 20 字，副文案不超过 36 字，按钮不超过 8 字。</li>
          <li>素材审核大约 1–2 个工作日。</li>
          <li>禁止夸大宣传、医疗功效承诺，以及未上线功能的虚假承诺。</li>
        </ul>
      </section>

      <section aria-labelledby="sponsor-delivery" className="surface-card rounded-2xl p-5 sm:p-6">
        <h2 id="sponsor-delivery" className="text-lg font-semibold text-slate-50">
          履约
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-300">
          <li>现阶段提供上线截图和实际展示天数。</li>
          <li>访问统计埋点上线后，再补充曝光、点击和点击率。</li>
          <li>不承诺站外注册、成交或其他转化。</li>
        </ul>
      </section>

      <section id="contact" aria-labelledby="sponsor-contact" className="surface-card rounded-2xl p-5 sm:p-6">
        <h2 id="sponsor-contact" className="text-lg font-semibold text-slate-50">
          联系
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          邮箱：
          <a
            href={`mailto:${siteContact.email}`}
            className="text-indigo-300 hover:text-indigo-200"
          >
            {siteContact.email}
          </a>
        </p>
        <p className="mt-2 text-sm text-slate-300">电话：{siteContact.phone}</p>
        <p className="mt-2 text-sm text-slate-300">微信：{siteContact.wechat}</p>
        <a
          href={sponsorMailHref("赞助合作意向")}
          className="btn-primary mt-5 inline-flex rounded-full px-4 py-2 text-sm font-medium"
        >
          留言合作意向
        </a>
      </section>

      <section aria-labelledby="sponsor-faq">
        <h2 id="sponsor-faq" className="text-lg font-semibold text-slate-50">
          常见问题
        </h2>
        <dl className="mt-4 space-y-4">
          {sponsorFaqs.map((item) => (
            <div key={item.q} className="border-t border-white/10 pt-4">
              <dt className="text-sm font-semibold text-slate-100">{item.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-400">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
