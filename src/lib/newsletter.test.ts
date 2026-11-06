import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { CONFIRM_URL_LINE_MAX, confirmationUrl, renderConfirmationEmail } from "@/lib/confirm-email";
import { NEWSLETTER_NAME } from "@/lib/newsletter-name";
import {
  confirmRedirectStatus,
  confirmSubscription,
  previewConfirmation,
  requestSubscription,
  type NewsletterConfig,
} from "@/lib/newsletter";
import { signSubscribeToken } from "@/lib/subscribe-token";

const config: NewsletterConfig = {
  apiKey: "re_test_key",
  segmentId: "11111111-1111-4111-8111-111111111111",
  from: "hello@news.eastoracle.top",
  tokenSecret: "test-secret-0123456789",
  siteUrl: "https://agent-usecases-cn.vercel.app",
};

const now = 1_700_000_000_000;

type Contact = {
  id: string;
  email: string;
  unsubscribed: boolean;
  properties: Record<string, string>;
  segments: Set<string>;
};

function uuid(n: number): string {
  const hex = n.toString(16).padStart(32, "0");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function createResend() {
  const properties = new Map<string, { id: string; key: string; type: string }>();
  const contacts = new Map<string, Contact>();
  const emails: { text: string; html: string }[] = [];
  let seq = 0;
  let failGets = 0;
  const calls: string[] = [];

  const fetchImpl: typeof fetch = async (input, init) => {
    const url = new URL(String(input));
    const method = (init?.method ?? "GET").toUpperCase();
    const parts = url.pathname.split("/").filter(Boolean).map((part) => decodeURIComponent(part));
    const body = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : {};
    calls.push(`${method} ${url.pathname}`);

    const json = (status: number, payload: unknown) =>
      new Response(JSON.stringify(payload), {
        status,
        headers: { "Content-Type": "application/json" },
      });

    if (parts[0] === "contact-properties" && method === "GET") {
      return json(200, { object: "list", has_more: false, data: [...properties.values()] });
    }
    if (parts[0] === "contact-properties" && method === "POST") {
      const key = String(body.key);
      if ([...properties.values()].some((property) => property.key === key)) {
        return json(422, { message: "exists" });
      }
      const id = `prop-${properties.size + 1}`;
      properties.set(id, { id, key, type: String(body.type) });
      return json(200, { object: "contact_property", id });
    }
    if (parts[0] === "emails" && method === "POST") {
      emails.push({ text: String(body.text), html: String(body.html) });
      return json(200, { id: "email-1" });
    }
    if (parts[0] !== "contacts") return json(404, { message: "nope" });

    if (method === "POST" && parts.length === 1) {
      const email = String(body.email).toLowerCase();
      if ([...contacts.values()].some((contact) => contact.email === email)) {
        return json(409, { message: "exists" });
      }
      const contact: Contact = {
        id: uuid(++seq),
        email,
        unsubscribed: Boolean(body.unsubscribed),
        properties: {},
        segments: new Set(
          Array.isArray(body.segments)
            ? body.segments.map((segment) => String((segment as { id?: string }).id))
            : [],
        ),
      };
      const rawProperties = body.properties;
      if (rawProperties && typeof rawProperties === "object") {
        for (const [key, value] of Object.entries(rawProperties)) {
          if (typeof value === "string") contact.properties[key] = value;
        }
      }
      contacts.set(contact.id, contact);
      return json(200, { object: "contact", id: contact.id });
    }

    const key = parts[1] ?? "";
    const contact =
      contacts.get(key) ?? [...contacts.values()].find((item) => item.email === key.toLowerCase());
    if (!contact) return json(404, { message: "not found" });

    if (failGets > 0 && method === "GET") {
      failGets -= 1;
      return json(500, { message: "down" });
    }

    if (method === "GET") {
      return json(200, {
        object: "contact",
        id: contact.id,
        email: contact.email,
        unsubscribed: contact.unsubscribed,
        properties: Object.fromEntries(
          Object.entries(contact.properties).map(([key, value]) => [key, { value, type: "string" }]),
        ),
      });
    }

    if (method === "PATCH") {
      if (typeof body.unsubscribed === "boolean") contact.unsubscribed = body.unsubscribed;
      const rawProperties = body.properties;
      if (rawProperties && typeof rawProperties === "object") {
        for (const [propKey, value] of Object.entries(rawProperties)) {
          if (typeof value === "string") contact.properties[propKey] = value;
          if (value === null) delete contact.properties[propKey];
        }
      }
      return json(200, { object: "contact", id: contact.id });
    }

    if (method === "POST" && parts[2] === "segments") {
      const segmentId = parts[3] ?? "";
      if (contact.segments.has(segmentId)) return json(409, { message: "exists" });
      contact.segments.add(segmentId);
      return json(200, { id: contact.id });
    }

    return json(404, { message: "nope" });
  };

  return {
    fetchImpl,
    contacts,
    emails,
    calls,
    failNextGets(count: number) {
      failGets = count;
    },
  };
}

function urlFromEmail(text: string): string {
  const line = text.split("\n").find((item) => item.startsWith("https://"));
  if (!line) throw new Error("missing confirm url");
  return line;
}

describe("confirmation email", () => {
  it("keeps the confirm URL on its own short lines", () => {
    const url = confirmationUrl(config.siteUrl, "R54xRd04R2uTLFKc63BZRw");
    assert.ok(url.length <= CONFIRM_URL_LINE_MAX);
    const rendered = renderConfirmationEmail(url, NEWSLETTER_NAME);
    for (const line of [...rendered.text.split("\n"), ...rendered.html.split("\n")]) {
      if (line.includes(url)) assert.ok(line.length <= CONFIRM_URL_LINE_MAX);
    }
    assert.ok(rendered.text.split("\n").includes(url));
    assert.ok(rendered.html.split("\n").includes(`href="${url}"`));
  });
});

describe("newsletter confirm", () => {
  const originalError = console.error;

  beforeEach(() => {
    console.error = () => {};
  });

  afterEach(() => {
    console.error = originalError;
  });

  it("emails one short code, then confirms that same code into the segment", async () => {
    const api = createResend();
    const requested = await requestSubscription("Reader@Example.com", config, api.fetchImpl, now);
    assert.deepEqual(requested, { ok: true });

    const contact = [...api.contacts.values()][0];
    assert.ok(contact);
    assert.equal(contact.unsubscribed, true);
    assert.equal(contact.segments.size, 0);
    assert.ok(contact.properties.confirm_token);

    const url = urlFromEmail(api.emails[0].text);
    const code = url.slice(url.lastIndexOf("/") + 1);
    assert.equal(url, confirmationUrl(config.siteUrl, code));
    assert.ok(api.emails[0].html.includes(`href="${url}"`));
    assert.equal(api.emails[0].text.includes("token="), false);

    const preview = await previewConfirmation(code, config, api.fetchImpl, now);
    assert.deepEqual(preview, { status: "ready", email: "reader@example.com", code });
    assert.equal(contact.unsubscribed, true);
    assert.equal(contact.segments.size, 0);

    const confirmed = await confirmSubscription(code, config, api.fetchImpl, now);
    assert.deepEqual(confirmed, { ok: true });
    assert.equal(confirmRedirectStatus(confirmed), "confirmed");
    assert.equal(contact.unsubscribed, false);
    assert.equal(contact.segments.has(config.segmentId), true);

    const again = await confirmSubscription(code, config, api.fetchImpl, now + 1_000);
    assert.equal(again.ok, true);
    assert.ok(contact.properties.confirm_token);
  });

  it("maps a bad code and a Resend outage to different results", async () => {
    const api = createResend();
    const callsBefore = api.calls.length;
    const malformed = await confirmSubscription("%%%", config, api.fetchImpl, now);
    assert.equal(malformed.ok, false);
    if (!malformed.ok) {
      assert.equal(malformed.reason, "invalid");
      assert.equal(malformed.status, 400);
    }
    assert.equal(confirmRedirectStatus(malformed), "invalid");
    assert.equal(api.calls.length, callsBefore);

    await requestSubscription("reader@example.com", config, api.fetchImpl, now);
    const url = urlFromEmail(api.emails[0].text);
    const code = url.slice(url.lastIndexOf("/") + 1);
    api.failNextGets(1);
    const outage = await confirmSubscription(code, config, api.fetchImpl, now);
    assert.equal(outage.ok, false);
    if (!outage.ok) assert.equal(outage.reason, "unavailable");
    assert.equal(confirmRedirectStatus(outage), "unavailable");
  });

  it("rejects a pending token with a bad MAC and an expired one", async () => {
    const api = createResend();
    await requestSubscription("reader@example.com", config, api.fetchImpl, now);
    const contact = [...api.contacts.values()][0];
    assert.ok(contact);
    const url = urlFromEmail(api.emails[0].text);
    const code = url.slice(url.lastIndexOf("/") + 1);

    contact.properties.confirm_token = "1.not-the-mac";
    const bad = await confirmSubscription(code, config, api.fetchImpl, now);
    assert.equal(bad.ok, false);
    if (!bad.ok) assert.equal(bad.reason, "invalid");
    assert.equal(contact.segments.size, 0);

    await requestSubscription("reader@example.com", config, api.fetchImpl, now);
    const expired = await confirmSubscription(code, config, api.fetchImpl, now + 49 * 60 * 60 * 1000);
    assert.equal(expired.ok, false);
    if (!expired.ok) assert.equal(expired.reason, "invalid");
    assert.equal(contact.segments.size, 0);
  });

  it("still accepts an intact legacy HMAC token, including one broken by a soft line break", async () => {
    const api = createResend();
    const token = signSubscribeToken("reader@example.com", config.tokenSecret, now);
    const broken = `${token.slice(0, 48)}=\n${token.slice(48)}`;
    const confirmed = await confirmSubscription(broken, config, api.fetchImpl, now);
    assert.deepEqual(confirmed, { ok: true });
    const contact = [...api.contacts.values()][0];
    assert.ok(contact);
    assert.equal(contact.email, "reader@example.com");
    assert.equal(contact.unsubscribed, false);
    assert.equal(contact.segments.has(config.segmentId), true);
  });
});
