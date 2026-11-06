import { createHmac, timingSafeEqual } from "node:crypto";

export const SUBSCRIBE_TTL_MS = 48 * 60 * 60 * 1000;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type TokenFailure = "malformed" | "bad_signature" | "expired";

export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

/**
 * Undo the damage mail clients do to a copied link without changing a clean token.
 * Quoted-printable soft breaks show up as `=` plus a newline. Our tokens never
 * contain `=` or whitespace, so stripping both is unambiguous.
 */
export function normalizeSubscribeToken(raw: string): string {
  return raw
    .replace(/[\u200b\u200c\u200d\ufeff]/g, "")
    .replace(/=\r\n/g, "")
    .replace(/=\n/g, "")
    .replace(/[\s=]/g, "");
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function macEqual(actual: string, expected: string): boolean {
  const actualBuf = Buffer.from(actual, "base64url");
  const expectedBuf = Buffer.from(expected, "base64url");
  if (actualBuf.length === 0 || actualBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(actualBuf, expectedBuf);
}

export function signSubscribeToken(
  email: string,
  secret: string,
  now = Date.now(),
): string {
  const payload = encode(JSON.stringify({ e: email, exp: now + SUBSCRIBE_TTL_MS }));
  return `${payload}.${signPayload(payload, secret)}`;
}

export function inspectSubscribeToken(
  token: string,
  secret: string,
  now = Date.now(),
): { ok: true; email: string } | { ok: false; reason: TokenFailure } {
  const normalized = normalizeSubscribeToken(token);
  if (!secret || normalized.length === 0 || normalized.length > 2048) {
    return { ok: false, reason: "malformed" };
  }
  const parts = normalized.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };
  const [payload, signature] = parts;
  if (!payload || !signature) return { ok: false, reason: "malformed" };

  const expected = signPayload(payload, secret);
  if (!macEqual(signature, expected)) return { ok: false, reason: "bad_signature" };

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { e?: unknown; exp?: unknown };
    if (typeof parsed.e !== "string" || typeof parsed.exp !== "number") {
      return { ok: false, reason: "malformed" };
    }
    if (!Number.isFinite(parsed.exp)) return { ok: false, reason: "malformed" };
    if (parsed.exp < now) return { ok: false, reason: "expired" };
    const email = normalizeEmail(parsed.e);
    if (!email) return { ok: false, reason: "malformed" };
    return { ok: true, email };
  } catch {
    return { ok: false, reason: "malformed" };
  }
}

export function verifySubscribeToken(
  token: string,
  secret: string,
  now = Date.now(),
): string | null {
  const inspected = inspectSubscribeToken(token, secret, now);
  return inspected.ok ? inspected.email : null;
}

/** 16-byte contact id, so the emailed URL stays inside one 75-character line. */
export function encodeContactCode(contactId: string): string | null {
  if (!UUID_RE.test(contactId)) return null;
  const code = Buffer.from(contactId.replaceAll("-", ""), "hex").toString("base64url");
  return code.length === 22 ? code : null;
}

export function decodeContactCode(code: string): string | null {
  if (!/^[A-Za-z0-9_-]{22}$/.test(code)) return null;
  const bytes = Buffer.from(code, "base64url");
  if (bytes.length !== 16) return null;
  const hex = bytes.toString("hex");
  const contactId = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  return UUID_RE.test(contactId) ? contactId : null;
}

export function signPendingConfirm(
  contactId: string,
  email: string,
  exp: number,
  secret: string,
): string {
  const mac = createHmac("sha256", secret)
    .update(`${contactId}.${exp}.${email}`)
    .digest("base64url");
  return `${exp}.${mac}`;
}

export function verifyPendingConfirm(
  stored: string,
  contactId: string,
  email: string,
  secret: string,
  now = Date.now(),
): "ok" | TokenFailure {
  const dot = stored.indexOf(".");
  if (dot <= 0) return "malformed";
  const expRaw = stored.slice(0, dot);
  const mac = stored.slice(dot + 1);
  if (!/^\d+$/.test(expRaw) || !mac) return "malformed";
  const exp = Number(expRaw);
  if (!Number.isSafeInteger(exp)) return "malformed";
  const expected = createHmac("sha256", secret)
    .update(`${contactId}.${exp}.${email}`)
    .digest("base64url");
  if (!macEqual(mac, expected)) return "bad_signature";
  if (exp < now) return "expired";
  return "ok";
}
