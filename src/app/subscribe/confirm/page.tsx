import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { ConfirmShell, ConfirmSubscribeCard } from "@/components/ConfirmSubscribeCard";
import { readNewsletterConfig } from "@/lib/newsletter";
import { NEWSLETTER_NAME } from "@/lib/newsletter-name";
import { normalizeSubscribeToken, verifySubscribeToken } from "@/lib/subscribe-token";

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
  const raw = Array.isArray(params.token) ? params.token[0] : params.token;
  const token = raw ? normalizeSubscribeToken(raw) : "";
  const config = readNewsletterConfig();
  const email =
    config && token ? verifySubscribeToken(token, config.tokenSecret) : null;

  if (!config) return <ConfirmSubscribeCard state={{ kind: "unavailable" }} />;
  if (!email || !token) return <ConfirmSubscribeCard state={{ kind: "invalid" }} />;
  return (
    <ConfirmSubscribeCard
      state={{ kind: "ready", email, field: "token", value: token }}
    />
  );
}
