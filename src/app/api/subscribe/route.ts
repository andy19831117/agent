import { readNewsletterConfig, requestSubscription } from "@/lib/newsletter";
import { normalizeEmail } from "@/lib/subscribe-token";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "请输入有效邮箱。" },
      { status: 400 },
    );
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email?: unknown }).email ?? "")
      : "";
  if (!normalizeEmail(email)) {
    return Response.json(
      { ok: false, message: "请输入有效邮箱。" },
      { status: 400 },
    );
  }

  const config = readNewsletterConfig();
  if (!config) {
    console.error("Newsletter is not configured");
    return Response.json(
      { ok: false, message: "订阅服务暂时不可用，请稍后再试。" },
      { status: 503 },
    );
  }

  const result = await requestSubscription(email, config);
  if (!result.ok) {
    return Response.json(
      { ok: false, message: result.message },
      { status: result.status },
    );
  }

  return Response.json({ ok: true, pending: true });
}
