import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  decodeContactCode,
  encodeContactCode,
  signPendingConfirm,
  signSubscribeToken,
  SUBSCRIBE_TTL_MS,
  verifyPendingConfirm,
  verifySubscribeToken,
} from "@/lib/subscribe-token";

const secret = "test-secret-0123456789";
const email = "reader@example.com";
const now = 1_700_000_000_000;

describe("subscribe token", () => {
  it("round-trips a legacy HMAC token", () => {
    const token = signSubscribeToken(email, secret, now);
    assert.equal(verifySubscribeToken(token, secret, now), email);
    assert.equal(verifySubscribeToken(token, secret, now + SUBSCRIBE_TTL_MS - 1), email);
  });

  it("rejects a tampered signature, the wrong secret, and an expired token", () => {
    const token = signSubscribeToken(email, secret, now);
    const [payload, signature] = token.split(".");
    const flipped = (signature.startsWith("A") ? "B" : "A") + signature.slice(1);
    assert.equal(verifySubscribeToken(`${payload}.${flipped}`, secret, now), null);
    assert.equal(verifySubscribeToken(token, `${secret}-other`, now), null);
    assert.equal(verifySubscribeToken(token, secret, now + SUBSCRIBE_TTL_MS + 1), null);
  });

  it("repairs quoted-printable soft breaks and zero-width characters", () => {
    const token = signSubscribeToken(email, secret, now);
    const wrapped = `${token.slice(0, 40)}=\r\n${token.slice(40)}`;
    const spaced = `${token.slice(0, 20)} \n${token.slice(20)}`;
    const zeroWidth = `${token.slice(0, 10)}\u200b${token.slice(10)}`;
    assert.equal(verifySubscribeToken(wrapped, secret, now), email);
    assert.equal(verifySubscribeToken(spaced, secret, now), email);
    assert.equal(verifySubscribeToken(zeroWidth, secret, now), email);
  });

  it("round-trips a contact id into a 22-character code", () => {
    const contactId = "479e3145-dd38-476b-932c-529ceb705947";
    const code = encodeContactCode(contactId);
    assert.ok(code);
    assert.equal(code.length, 22);
    assert.doesNotMatch(code, /[.=+/]/);
    assert.equal(decodeContactCode(code), contactId);
    assert.equal(decodeContactCode("not-a-code"), null);
    assert.equal(encodeContactCode("not-a-uuid"), null);
  });

  it("checks the pending-confirm MAC before expiry", () => {
    const contactId = "479e3145-dd38-476b-932c-529ceb705947";
    const exp = now + SUBSCRIBE_TTL_MS;
    const stored = signPendingConfirm(contactId, email, exp, secret);
    assert.equal(verifyPendingConfirm(stored, contactId, email, secret, now), "ok");
    assert.equal(verifyPendingConfirm(stored, contactId, email, secret, exp + 1), "expired");
    assert.equal(verifyPendingConfirm(`${exp}.aaaa`, contactId, email, secret, now), "bad_signature");
    assert.equal(verifyPendingConfirm("nope", contactId, email, secret, now), "malformed");
  });
});
