/**
 * Public cooperation contact for SiteFooter and /sponsors.
 * 微信号没有单独字段（待填）。页面只写「微信同号/私信邮箱换」，不展示「待填」。
 */
export const siteContact = {
  email: "244197736@qq.com",
  phone: "18127878372",
  wechat: "微信同号/私信邮箱换",
} as const;

export function sponsorMailHref(subject: string): string {
  return `mailto:${siteContact.email}?subject=${encodeURIComponent(subject)}`;
}
