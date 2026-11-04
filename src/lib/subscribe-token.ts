import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 48 * 60 * 60 * 1000;

export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function signSubscribeToken(
  email: string,
  secret: string,
  now = Date.now(),
): string {
  const payload = encode(JSON.stringify({ e: email, exp: now + TTL_MS }));
  return `${payload}.${signPayload(payload, secret)}`;
}

export function verifySubscribeToken(
  token: string,
  secret: string,
  now = Date.now(),
): string | null {
  if (!secret || token.length > 2048) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  if (!payload || !signature) return null;

  const expected = signPayload(payload, secret);
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length) return null;
  if (!timingSafeEqual(actualBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { e?: unknown; exp?: unknown };
    if (typeof parsed.e !== "string" || typeof parsed.exp !== "number") {
      return null;
    }
    if (!Number.isFinite(parsed.exp) || parsed.exp < now) return null;
    return normalizeEmail(parsed.e);
  } catch {
    return null;
  }
}
