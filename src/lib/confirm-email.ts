/** Quoted-printable wraps at 76 columns. Stay under that so a soft break cannot land in the URL. */
export const CONFIRM_URL_LINE_MAX = 75;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function confirmationUrl(siteUrl: string, code: string): string {
  return `${siteUrl.replace(/\/+$/, "")}/c/${code}`;
}

/**
 * Plain text puts the URL on its own line. HTML puts it on its own `href` line
 * and again as the link text. Both lines stay within {@link CONFIRM_URL_LINE_MAX}
 * so a mail gateway that re-quotes the body cannot split the credential.
 */
export function renderConfirmationEmail(
  confirmUrl: string,
  newsletterName: string,
): { text: string; html: string } {
  if (confirmUrl.length === 0 || confirmUrl.length > CONFIRM_URL_LINE_MAX) {
    throw new Error("confirm url does not fit on one email line");
  }
  if (/[\s<>"']/.test(confirmUrl)) {
    throw new Error("confirm url contains characters that break an href line");
  }

  const text = [
    `请确认订阅《${newsletterName}》。`,
    "打开下面这一行链接，在页面里点击「确认订阅」才会加入名单：",
    confirmUrl,
    "",
    "如果不是你本人操作，忽略这封邮件即可。链接 48 小时内有效。可随时退订。",
  ].join("\n");

  const html = [
    `<div style="font-family:sans-serif;line-height:1.6;color:#0f172a">`,
    `<p>请确认订阅《${escapeHtml(newsletterName)}》。</p>`,
    `<p>打开下面的链接，在页面里点击「确认订阅」才会加入名单。</p>`,
    `<p><a`,
    `href="${confirmUrl}"`,
    `>${confirmUrl}</a></p>`,
    `<p>如果不是你本人操作，忽略这封邮件即可。链接 48 小时内有效。确认后可随时退订。</p>`,
    `</div>`,
  ].join("\n");

  for (const line of [...text.split("\n"), ...html.split("\n")]) {
    if (line.includes(confirmUrl) && line.length > CONFIRM_URL_LINE_MAX) {
      throw new Error("confirm url line exceeds quoted-printable safe length");
    }
  }

  return { text, html };
}
