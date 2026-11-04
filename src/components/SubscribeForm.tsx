"use client";

import { FormEvent, useState } from "react";
import { NEWSLETTER_NAME } from "@/lib/newsletter-name";

type Phase = "idle" | "pending" | "confirmed" | "error";
type SubscribeStatus = "confirmed" | "invalid" | "unavailable";

function statusCopy(status?: SubscribeStatus): { phase: Phase; message: string } {
  if (status === "confirmed") {
    return {
      phase: "confirmed",
      message: `订阅已确认。《${NEWSLETTER_NAME}》会发到这个邮箱，可随时退订。`,
    };
  }
  if (status === "invalid") {
    return { phase: "error", message: "确认链接无效或已过期，请重新订阅。" };
  }
  if (status === "unavailable") {
    return { phase: "error", message: "订阅服务暂时不可用，请稍后再试。" };
  }
  return { phase: "idle", message: "" };
}

export function SubscribeForm({ initialStatus }: { initialStatus?: SubscribeStatus }) {
  const initial = statusCopy(initialStatus);
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>(initial.phase);
  const [message, setMessage] = useState(initial.message);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;
      if (response.ok && data?.ok) {
        setPhase("pending");
        setMessage(
          `确认邮件已发出。请打开邮件并点击确认，完成后才会开始接收《${NEWSLETTER_NAME}》。`,
        );
        setEmail("");
      } else {
        setPhase("error");
        setMessage(data?.message || "订阅没有成功，请稍后再试。");
      }
    } catch {
      setPhase("error");
      setMessage("网络异常，订阅没有成功，请稍后再试。");
    } finally {
      setSubmitting(false);
    }
  }

  const messageClass =
    phase === "error" ? "text-rose-300" : "text-cyan-300";

  return (
    <section
      id="subscribe"
      className="relative overflow-hidden rounded-2xl border border-indigo-400/25 bg-gradient-to-br from-indigo-950/80 via-slate-900/70 to-cyan-950/50 p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"
        aria-hidden
      />
      <h2 className="relative text-lg font-semibold text-slate-50">
        订阅《{NEWSLETTER_NAME}》
      </h2>
      <p className="relative mt-1 text-sm text-slate-300">
        留下邮箱即可接收《{NEWSLETTER_NAME}》。我们会先发确认邮件，点确认后才会加入名单，可随时退订。
      </p>
      <form
        onSubmit={onSubmit}
        className="relative mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor="subscribe-email" className="sr-only">
          邮箱
        </label>
        <input
          id="subscribe-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="你的邮箱"
          aria-invalid={phase === "error"}
          className="input-dark w-full rounded-xl px-3 py-2.5 text-sm sm:max-w-xs"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary rounded-xl px-4 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {submitting ? "提交中…" : "订阅"}
        </button>
      </form>
      {message ? (
        <p role="status" className={`relative mt-4 text-sm font-medium ${messageClass}`}>
          {message}
        </p>
      ) : null}
    </section>
  );
}
