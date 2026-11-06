import { createHash } from "node:crypto";
import { confirmationUrl, renderConfirmationEmail } from "@/lib/confirm-email";
import { NEWSLETTER_NAME } from "@/lib/newsletter-name";
import { getSiteUrl } from "@/lib/site-url";
import {
  decodeContactCode,
  encodeContactCode,
  inspectSubscribeToken,
  normalizeEmail,
  normalizeSubscribeToken,
  signPendingConfirm,
  SUBSCRIBE_TTL_MS,
  verifyPendingConfirm,
  type TokenFailure,
} from "@/lib/subscribe-token";

const SEGMENT_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const CONFIRM_PROPERTY = "confirm_token";

export type NewsletterConfig = {
  apiKey: string;
  segmentId: string;
  from: string;
  tokenSecret: string;
  siteUrl: string;
};

export type SubscribeResult =
  | { ok: true }
  | { ok: false; status: number; message: string; reason: "invalid" | "unavailable" };

export type ConfirmPreview =
  | { status: "ready"; email: string; code: string }
  | { status: "invalid" }
  | { status: "unavailable" };

type FetchLike = typeof fetch;

export function confirmRedirectStatus(
  result: SubscribeResult,
): "confirmed" | "invalid" | "unavailable" {
  if (result.ok) return "confirmed";
  return result.reason === "invalid" ? "invalid" : "unavailable";
}

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

function logSubscribe(
  failure: "verify" | "resend",
  fields: Record<string, string | number>,
) {
  console.error(JSON.stringify({ scope: "subscribe", failure, ...fields }));
}

type ResendResult = { ok: boolean; status: number; body: string };

async function resend(
  config: NewsletterConfig,
  path: string,
  init: { method: string; body?: string; idempotencyKey?: string },
  fetchImpl: FetchLike,
): Promise<ResendResult> {
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
  const body = await response.text().catch(() => "");
  return { ok: response.ok, status: response.status, body };
}

function parseJson(body: string): unknown {
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

function readStringField(value: unknown, key: string): string | null {
  if (!value || typeof value !== "object" || !(key in value)) return null;
  const field = (value as Record<string, unknown>)[key];
  return typeof field === "string" && field.length > 0 ? field : null;
}

function failure(status: number): SubscribeResult {
  if (status === 429) {
    return { ok: false, status: 429, reason: "unavailable", message: "请求过于频繁，请稍后再试。" };
  }
  return { ok: false, status: 502, reason: "unavailable", message: "订阅没有成功，请稍后再试。" };
}

function invalid(message = "确认链接无效或已过期。"): SubscribeResult {
  return { ok: false, status: 400, reason: "invalid", message };
}

async function hasConfirmProperty(
  config: NewsletterConfig,
  fetchImpl: FetchLike,
): Promise<boolean | null> {
  let after = "";
  for (let page = 0; page < 5; page += 1) {
    const path = after
      ? `/contact-properties?limit=100&after=${encodeURIComponent(after)}`
      : "/contact-properties?limit=100";
    const listed = await resend(config, path, { method: "GET" }, fetchImpl);
    if (!listed.ok) {
      logSubscribe("resend", { step: "list_properties", status: listed.status });
      return null;
    }
    const parsed = parseJson(listed.body);
    const data =
      parsed && typeof parsed === "object" && Array.isArray((parsed as { data?: unknown }).data)
        ? (parsed as { data: unknown[] }).data
        : [];
    for (const item of data) {
      if (readStringField(item, "key") === CONFIRM_PROPERTY) return true;
    }
    const hasMore = Boolean(
      parsed && typeof parsed === "object" && (parsed as { has_more?: unknown }).has_more,
    );
    const lastId = data.length > 0 ? readStringField(data[data.length - 1], "id") : null;
    if (!hasMore || !lastId) return false;
    after = lastId;
  }
  return false;
}

async function ensureConfirmProperty(
  config: NewsletterConfig,
  fetchImpl: FetchLike,
): Promise<boolean> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const found = await hasConfirmProperty(config, fetchImpl);
    if (found === true) return true;
    if (found === null) return false;
    const created = await resend(
      config,
      "/contact-properties",
      {
        method: "POST",
        body: JSON.stringify({ key: CONFIRM_PROPERTY, type: "string" }),
      },
      fetchImpl,
    );
    if (created.ok) return true;
    logSubscribe("resend", { step: "create_property", status: created.status });
  }
  return false;
}

async function findContact(
  config: NewsletterConfig,
  idOrEmail: string,
  fetchImpl: FetchLike,
): Promise<{ status: number; id: string | null; email: string | null; token: string | null }> {
  const loaded = await resend(
    config,
    `/contacts/${encodeURIComponent(idOrEmail)}`,
    { method: "GET" },
    fetchImpl,
  );
  if (!loaded.ok) return { status: loaded.status, id: null, email: null, token: null };
  const parsed = parseJson(loaded.body);
  return {
    status: loaded.status,
    id: readStringField(parsed, "id"),
    email: readStringField(parsed, "email"),
    token: readProperty(parsed, CONFIRM_PROPERTY),
  };
}

function readProperty(value: unknown, key: string): string | null {
  if (!value || typeof value !== "object" || !("properties" in value)) return null;
  const properties = (value as { properties?: unknown }).properties;
  if (!properties || typeof properties !== "object") return null;
  const raw = (properties as Record<string, unknown>)[key];
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object" && "value" in raw) {
    const propertyValue = (raw as { value?: unknown }).value;
    if (typeof propertyValue === "string") return propertyValue;
  }
  return null;
}

async function storePendingToken(
  config: NewsletterConfig,
  email: string,
  exp: number,
  fetchImpl: FetchLike,
): Promise<{ ok: true; contactId: string } | SubscribeResult> {
  let contact = await findContact(config, email, fetchImpl);
  if (contact.status !== 200 && contact.status !== 404) {
    logSubscribe("resend", { step: "get_contact", status: contact.status });
    return failure(contact.status);
  }

  if (contact.status === 404) {
    const created = await resend(
      config,
      "/contacts",
      {
        method: "POST",
        body: JSON.stringify({ email, unsubscribed: true }),
      },
      fetchImpl,
    );
    if (created.status === 409) {
      contact = await findContact(config, email, fetchImpl);
    } else if (!created.ok) {
      logSubscribe("resend", { step: "create_contact", status: created.status });
      return failure(created.status);
    } else {
      const createdId = readStringField(parseJson(created.body), "id");
      contact = { status: 200, id: createdId, email, token: null };
    }
  }

  if (!contact.id || !encodeContactCode(contact.id)) {
    logSubscribe("resend", { step: "contact_id", status: contact.status });
    return failure(502);
  }

  const macEmail = normalizeEmail(contact.email ?? "") ?? email;
  const confirmToken = signPendingConfirm(contact.id, macEmail, exp, config.tokenSecret);
  const patched = await resend(
    config,
    `/contacts/${contact.id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ properties: { [CONFIRM_PROPERTY]: confirmToken } }),
    },
    fetchImpl,
  );
  if (!patched.ok) {
    logSubscribe("resend", { step: "store_confirm_token", status: patched.status });
    return failure(patched.status);
  }
  return { ok: true, contactId: contact.id };
}

export async function requestSubscription(
  rawEmail: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike = fetch,
  now = Date.now(),
): Promise<SubscribeResult> {
  const email = normalizeEmail(rawEmail);
  if (!email) return { ok: false, status: 400, reason: "invalid", message: "请输入有效邮箱。" };

  if (!(await ensureConfirmProperty(config, fetchImpl))) {
    return { ok: false, status: 502, reason: "unavailable", message: "确认邮件没有发出，请稍后再试。" };
  }

  const pending = await storePendingToken(config, email, now + SUBSCRIBE_TTL_MS, fetchImpl);
  if (!("contactId" in pending)) return pending;

  const code = encodeContactCode(pending.contactId);
  if (!code) {
    logSubscribe("resend", { step: "contact_code", status: 502 });
    return { ok: false, status: 502, reason: "unavailable", message: "确认邮件没有发出，请稍后再试。" };
  }

  let rendered: { text: string; html: string };
  try {
    rendered = renderConfirmationEmail(
      confirmationUrl(config.siteUrl, code),
      NEWSLETTER_NAME,
    );
  } catch {
    logSubscribe("resend", { step: "confirm_link", status: 502 });
    return { ok: false, status: 502, reason: "unavailable", message: "确认邮件没有发出，请稍后再试。" };
  }

  const day = new Date(now).toISOString().slice(0, 10);
  // v2: the message body changed to the short link. Reusing the old daily key would 409.
  const idempotencyKey = `sub2-${createHash("sha256").update(`${email}:${day}`).digest("hex").slice(0, 32)}`;
  const sent = await resend(
    config,
    "/emails",
    {
      method: "POST",
      idempotencyKey,
      body: JSON.stringify({
        from: config.from,
        to: [email],
        subject: `请确认订阅《${NEWSLETTER_NAME}》`,
        text: rendered.text,
        html: rendered.html,
      }),
    },
    fetchImpl,
  );

  if (!sent.ok) {
    logSubscribe("resend", { step: "send_email", status: sent.status });
    return sent.status === 429
      ? failure(429)
      : { ok: false, status: 502, reason: "unavailable", message: "确认邮件没有发出，请稍后再试。" };
  }
  return { ok: true };
}

type LoadedPending =
  | { ok: true; email: string; contactId: string }
  | { ok: false; reason: "invalid" | "unavailable"; detail: TokenFailure | "not_found" | "resend"; status: number };

async function loadPending(
  contactId: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike,
  now: number,
): Promise<LoadedPending> {
  const contact = await findContact(config, contactId, fetchImpl);
  if (contact.status === 404) {
    logSubscribe("verify", { step: "confirm", reason: "not_found", status: 404 });
    return { ok: false, reason: "invalid", detail: "not_found", status: 404 };
  }
  if (contact.status !== 200 || !contact.email || !contact.token) {
    if (contact.status !== 200) {
      logSubscribe("resend", { step: "get_contact", status: contact.status });
      return { ok: false, reason: "unavailable", detail: "resend", status: contact.status };
    }
    logSubscribe("verify", { step: "confirm", reason: "malformed", status: 200 });
    return { ok: false, reason: "invalid", detail: "malformed", status: 400 };
  }

  const email = normalizeEmail(contact.email);
  if (!email) {
    logSubscribe("verify", { step: "confirm", reason: "malformed", status: 200 });
    return { ok: false, reason: "invalid", detail: "malformed", status: 400 };
  }
  const verdict = verifyPendingConfirm(contact.token, contactId, email, config.tokenSecret, now);
  if (verdict !== "ok") {
    logSubscribe("verify", { step: "confirm", reason: verdict, status: 400 });
    return { ok: false, reason: "invalid", detail: verdict, status: 400 };
  }
  return { ok: true, email, contactId };
}

export async function previewConfirmation(
  code: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike = fetch,
  now = Date.now(),
): Promise<ConfirmPreview> {
  const contactId = decodeContactCode(normalizeSubscribeToken(code));
  if (!contactId) {
    logSubscribe("verify", { step: "preview", reason: "malformed", status: 400 });
    return { status: "invalid" };
  }
  const loaded = await loadPending(contactId, config, fetchImpl, now);
  if (!loaded.ok) return { status: loaded.reason === "unavailable" ? "unavailable" : "invalid" };
  return { status: "ready", email: loaded.email, code: normalizeSubscribeToken(code) };
}

async function addEmailToSegment(
  email: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike,
): Promise<SubscribeResult> {
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
    logSubscribe("resend", { step: "create_contact", status: created.status });
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
    logSubscribe("resend", { step: "update_contact", status: patched.status });
    return failure(patched.status);
  }

  const added = await resend(
    config,
    `/contacts/${encoded}/segments/${config.segmentId}`,
    { method: "POST" },
    fetchImpl,
  );
  if (!added.ok && added.status !== 409) {
    logSubscribe("resend", { step: "add_segment", status: added.status });
    return failure(added.status);
  }
  return { ok: true };
}

async function confirmContact(
  contactId: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike,
  now: number,
): Promise<SubscribeResult> {
  const loaded = await loadPending(contactId, config, fetchImpl, now);
  if (!loaded.ok) {
    return loaded.reason === "unavailable" ? failure(loaded.status) : invalid();
  }

  const patched = await resend(
    config,
    `/contacts/${loaded.contactId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ unsubscribed: false }),
    },
    fetchImpl,
  );
  if (!patched.ok) {
    logSubscribe("resend", { step: "update_contact", status: patched.status });
    return failure(patched.status);
  }

  const added = await resend(
    config,
    `/contacts/${loaded.contactId}/segments/${config.segmentId}`,
    { method: "POST" },
    fetchImpl,
  );
  if (!added.ok && added.status !== 409) {
    logSubscribe("resend", { step: "add_segment", status: added.status });
    return failure(added.status);
  }
  return { ok: true };
}

export async function confirmSubscription(
  credential: string,
  config: NewsletterConfig,
  fetchImpl: FetchLike = fetch,
  now = Date.now(),
): Promise<SubscribeResult> {
  const normalized = normalizeSubscribeToken(credential);
  const contactId = decodeContactCode(normalized);
  if (contactId) return confirmContact(contactId, config, fetchImpl, now);

  const inspected = inspectSubscribeToken(normalized, config.tokenSecret, now);
  if (!inspected.ok) {
    logSubscribe("verify", { step: "confirm", reason: inspected.reason, status: 400 });
    return invalid();
  }
  return addEmailToSegment(inspected.email, config, fetchImpl);
}
