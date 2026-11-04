import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { readNewsletterConfig } from "@/lib/newsletter";
import { NEWSLETTER_NAME } from "@/lib/newsletter-name";
import { verifySubscribeToken } from "@/lib/subscribe-token";

export const metadata: Metadata = {
  title: `确认订阅《${NEWSLETTER_NAME}》`,
  robots: { index: false, follow: false },
};

export default function ConfirmSubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<ConfirmShell />}>
      <ConfirmBody searchParams={searchParams} />
    </Suspense>
  );
}

async function ConfirmBody({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  await connection();
  const params = await searchParams;
  const token = Array.isArray(params.token) ? params.token[0] : params.token;
  const config = readNewsletterConfig();
  const email =
    config && token ? verifySubscribeToken(token, config.tokenSecret) : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <article className="surface-card rounded-2xl px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="text-xl font-bold text-slate-50">
          确认订阅《{NEWSLETTER_NAME}》
        </h1>
        {!config ? (
          <p className="mt-3 text-sm leading-relaxed text-rose-300">
            订阅服务暂时不可用，请稍后再试。
          </p>
        ) : email && token ? (
          <>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              确认后，<span className="text-slate-100">{email}</span>{" "}
              会开始接收《{NEWSLETTER_NAME}》，可随时退订。
            </p>
            <form method="post" action="/api/subscribe/confirm" className="mt-5">
              <input type="hidden" name="token" value={token} />
              <button
                type="submit"
                className="btn-primary rounded-xl px-4 py-2.5 text-sm font-medium"
              >
                确认订阅
              </button>
            </form>
          </>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-rose-300">
            确认链接无效或已过期。请回到首页重新订阅。
          </p>
        )}
        <p className="mt-6">
          <Link
            href="/#subscribe"
            className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline"
          >
            返回订阅
          </Link>
        </p>
      </article>
    </div>
  );
}

function ConfirmShell() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <article className="surface-card rounded-2xl px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="text-xl font-bold text-slate-50">
          确认订阅《{NEWSLETTER_NAME}》
        </h1>
        <p className="mt-3 text-sm text-slate-400">正在核对确认链接…</p>
      </article>
    </div>
  );
}
