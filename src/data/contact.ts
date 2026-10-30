/** Owner-approved public contact. Used by SiteFooter and /sponsors. */
export const siteContact = {
  email: "244197736@qq.com",
  wechat: "18127878372",
} as const;

export function sponsorMailHref(subject: string): string {
  return `mailto:${siteContact.email}?subject=${encodeURIComponent(subject)}`;
}
