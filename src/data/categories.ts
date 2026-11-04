import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "efficiency",
    name: "效率办公",
    description: "邮件、会议、文档、日程与个人工作流自动化",
    icon: "⚡",
  },
  {
    slug: "career",
    name: "职场求职",
    description: "简历、面试、薪资谈判与职场沟通助手",
    icon: "💼",
  },
  {
    slug: "content",
    name: "内容创作",
    description: "短视频、图文、脚本与多平台分发",
    icon: "✍️",
  },
  {
    slug: "ecommerce",
    name: "电商运营",
    description: "选品、客服、投放与店铺日常运营",
    icon: "🛒",
  },
  {
    slug: "education",
    name: "学习教育",
    description: "备考、笔记、答疑与个性化学习路径",
    icon: "📚",
  },
  {
    slug: "life",
    name: "生活办事",
    description: "出行、政务、理财与日常事务助手",
    icon: "🏠",
  },
  {
    slug: "devtools",
    name: "开发者工具",
    description: "编码、调试、文档与 Agent 编排",
    icon: "🛠️",
  },
  {
    slug: "enterprise",
    name: "企业协作",
    description: "审批、知识库、客服与跨部门流程",
    icon: "🏢",
  },
  {
    slug: "security",
    name: "安全防护",
    description: "权限边界、提示注入与 Agent 出站控制",
    icon: "🔒",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
