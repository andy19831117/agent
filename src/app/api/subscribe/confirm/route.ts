import { NextResponse } from "next/server";
import { confirmRedirectStatus, confirmSubscription, readNewsletterConfig } from "@/lib/newsletter";
import { getSiteUrl } from "@/lib/site-url";

export async function POST(request: Request) {
  const config = readNewsletterConfig();
  const siteUrl = config?.siteUrl ?? getSiteUrl();

  let credential = "";
  try {
    const form = await request.formData();
    const code = String(form.get("code") ?? "");
    const token = String(form.get("token") ?? "");
    credential = code || token;
  } catch {
    credential = "";
  }

  if (!config) {
    console.error(JSON.stringify({ scope: "subscribe", failure: "resend", step: "config", status: 503 }));
    return NextResponse.redirect(statusUrl(siteUrl, "unavailable"), 303);
  }

  const result = await confirmSubscription(credential, config);
  return NextResponse.redirect(statusUrl(siteUrl, confirmRedirectStatus(result)), 303);
}

function statusUrl(siteUrl: string, status: "confirmed" | "invalid" | "unavailable"): URL {
  const url = new URL("/", siteUrl);
  url.searchParams.set("subscribed", status);
  url.hash = "subscribe";
  return url;
}
