/** Sister sites linked from the home FAQ and the footer. */
export const sisterSites = [
  {
    name: "提示词场景库",
    href: "https://prompts.eastoracle.top",
  },
  {
    name: "Agent岗位库",
    href: "https://agents.eastoracle.top",
  },
  {
    name: "Agent技能库",
    href: "https://skills.eastoracle.top",
  },
] as const;

export type SisterSite = (typeof sisterSites)[number];

/** Captures each sister-site name so FAQ answers can turn those names into links. */
export const sisterSiteNamePattern = new RegExp(
  `(${sisterSites.map((site) => site.name).join("|")})`,
);
