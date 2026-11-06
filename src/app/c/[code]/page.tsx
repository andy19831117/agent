import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { ConfirmShell, ConfirmSubscribeCard } from "@/components/ConfirmSubscribeCard";
import { previewConfirmation, readNewsletterConfig } from "@/lib/newsletter";
import { NEWSLETTER_NAME } from "@/lib/newsletter-name";

export const metadata: Metadata = {
  title: `确认订阅《${NEWSLETTER_NAME}》`,
  robots: { index: false, follow: false },
};

export default function ShortConfirmPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  return (
    <Suspense fallback={<ConfirmShell />}>
      <ShortConfirmBody params={params} />
    </Suspense>
  );
}

async function ShortConfirmBody({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  await connection();
  const { code } = await params;
  const config = readNewsletterConfig();
  if (!config) return <ConfirmSubscribeCard state={{ kind: "unavailable" }} />;

  const preview = await previewConfirmation(code, config);
  if (preview.status === "unavailable") {
    return <ConfirmSubscribeCard state={{ kind: "unavailable" }} />;
  }
  if (preview.status !== "ready") {
    return <ConfirmSubscribeCard state={{ kind: "invalid" }} />;
  }
  return (
    <ConfirmSubscribeCard
      state={{ kind: "ready", email: preview.email, field: "code", value: preview.code }}
    />
  );
}
