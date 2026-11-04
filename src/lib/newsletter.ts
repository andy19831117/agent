import { createHash } from "node:crypto";
import { getSiteUrl } from "@/lib/site-url";
import {
  normalizeEmail,
  signSubscribeToken,
  verifySubscribeToken,
} from "@/lib/subscribe-token";

const SEGMENT_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type NewsletterConfig = {
  apiKey: string;
  segmentId: string;
  from: string;
  tokenSecret: string;
  siteUrl: string;
};

export type SubscribeResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

type FetchLike = typeof fetch;

export function readNewsletterConfig(
  env: NodeJS.ProcessEnv = process.env,
): NewsletterConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim() ?? "";
  const segmentId = env.RESEND_SEGMENT_ID?.trim() ?? "";
  const from = env.RESEND_FROM?.trim() ?? "";
  const tokenSecret = env.SUBSCRIBE_TOKEN_SECRET?.trim() ?? "";
  const configuredSite = env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = (configuredSite || getSiteUrl()).replace(/\/+$/, "");

  if (!apiKey || !SEGMENT_ID_RE.test(segmentId)) return null;
  if (!isSafeFrom(from) || tokenSecret.length < 16) return null;
  if (!/^https?:\/\//.test(siteUrl)) return null;

  return { apiKey, segmentId, from, tokenSecret, siteUrl };
}

function isSafeFrom(from: string): boolean {
  return from.length > 3 && from.length <= 200 && !/[\r\n]/.test(from) && from.includes("@");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function resend(
  config: NewsletterConfig,
  path: string,
  init: { method: string; body?: string; idempotencyKey?: string },
  fetchImpl: FetchLike,
): Promise<{ ok: boolean; status: number }> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.apiKey}`,
    "User-Agent": "agent-usecases-cn",
  };
  if (init.body) headers["Content-Type"] = "application/json";
  if (init.idempotencyKey) headers["Idempotency-Key"] = init.idempotencyKey;

  const response = await fetchImpl(`https://api.resend.com${path}`, {
    method: init.method,
    headers,
    body: init.body,
  });
  await response.text().catch(() => "");
  return { ok: response.ok, status: response.status };
}

function failure(status: number): SubscribeResult {
  if (status === 429) {
    return { ok: false, status: 429, message: "请求过于频繁，请稍后再试。" };
  }
  return { ok: false, status: 502, message: "订阅没有成功，请稍后再试。" };
}

export async function requestSubscription(
  rawEmail: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike = fetch,
  now = Date.now(),
): Promise<SubscribeResult> {
  const email = normalizeEmail(rawEmail);
  if (!email) return { ok: false, status: 400, message: "请输入有效邮箱。" };

  const token = signSubscribeToken(email, config.tokenSecret, now);
  const confirmUrl = `${config.siteUrl}/subscribe/confirm?token=${encodeURIComponent(token)}`;
  const safeUrl = escapeHtml(confirmUrl);
  const day = new Date(now).toISOString().slice(0, 10);
  const idempotencyKey = `sub-${createHash("sha256").update(`${email}:${day}`).digest("hex").slice(0, 32)}`;

  const sent = await resend(
    config,
    "/emails",
    {
      method: "POST",
      idempotencyKey,
      body: JSON.stringify({
        from: config.from,
        to: [email],
        subject: "请确认订阅 Agent场景库",
        text: [
          "请确认订阅 Agent场景库的精选用例邮件。",
          "打开链接后点击「确认订阅」才会加入名单：",
          confirmUrl,
          "",
          "如果不是你本人操作，忽略这封邮件即可。链接 48 小时内有效。可随时退订。",
        ].join("\n"),
        html: `<div style="font-family:sans-serif;line-height:1.6;color:#0f172a">
<p>请确认订阅 Agent场景库的精选用例邮件。</p>
<p><a href="${safeUrl}">确认订阅</a></p>
<p>如果不是你本人操作，忽略这封邮件即可。链接 48 小时内有效。确认后可随时退订。</p>
</div>`,
      }),
    },
    fetchImpl,
  );

  if (!sent.ok) {
    console.error(`Resend confirmation email failed: ${sent.status}`);
    return sent.status === 429
      ? failure(429)
      : { ok: false, status: 502, message: "确认邮件没有发出，请稍后再试。" };
  }
  return { ok: true };
}

export async function confirmSubscription(
  token: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike = fetch,
  now = Date.now(),
): Promise<SubscribeResult> {
  const email = verifySubscribeToken(token, config.tokenSecret, now);
  if (!email) {
    return { ok: false, status: 400, message: "确认链接无效或已过期。" };
  }

  const encoded = encodeURIComponent(email);
  const created = await resend(
    config,
    "/contacts",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: config.segmentId }],
      }),
    },
    fetchImpl,
  );

  if (created.ok) return { ok: true };

  if (created.status !== 409) {
    console.error(`Resend create contact failed: ${created.status}`);
    return failure(created.status);
  }

  const patched = await resend(
    config,
    `/contacts/${encoded}`,
    {
      method: "PATCH",
      body: JSON.stringify({ unsubscribed: false }),
    },
    fetchImpl,
  );
  if (!patched.ok) {
    console.error(`Resend update contact failed: ${patched.status}`);
    return failure(patched.status);
  }

  const added = await resend(
    config,
    `/contacts/${encoded}/segments/${config.segmentId}`,
    { method: "POST" },
    fetchImpl,
  );
  if (!added.ok && added.status !== 409) {
    console.error(`Resend add segment failed: ${added.status}`);
    return failure(added.status);
  }

  return { ok: true };
}
