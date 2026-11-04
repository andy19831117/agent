import { NextResponse } from "next/server";
import { confirmSubscription, readNewsletterConfig } from "@/lib/newsletter";
import { getSiteUrl } from "@/lib/site-url";

export async function POST(request: Request) {
  const config = readNewsletterConfig();
  const siteUrl = config?.siteUrl ?? getSiteUrl();

  let token = "";
  try {
    const form = await request.formData();
    token = String(form.get("token") ?? "");
  } catch {
    token = "";
  }

  if (!config) {
    console.error("Newsletter is not configured");
    return NextResponse.redirect(statusUrl(siteUrl, "unavailable"), 303);
  }

  const result = await confirmSubscription(token, config);
  const status = result.ok ? "confirmed" : result.status === 400 ? "invalid" : "unavailable";
  return NextResponse.redirect(statusUrl(siteUrl, status), 303);
}

function statusUrl(siteUrl: string, status: "confirmed" | "invalid" | "unavailable"): URL {
  const url = new URL("/", siteUrl);
  url.searchParams.set("subscribed", status);
  url.hash = "subscribe";
  return url;
}
