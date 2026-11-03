export type CategorySlug =
  | "efficiency"
  | "career"
  | "content"
  | "ecommerce"
  | "education"
  | "life"
  | "devtools"
  | "enterprise";

export type PlatformSlug =
  | "wechat"
  | "wecom"
  | "feishu"
  | "dingtalk"
  | "xiaohongshu"
  | "douyin"
  | "shipinhao"
  | "tongyi"
  | "wenxin"
  | "doubao"
  | "kimi"
  | "deepseek"
  | "claude"
  | "chatgpt"
  | "grok"
  | "coze"
  | "dify"
  | "n8n";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export interface Platform {
  slug: PlatformSlug;
  name: string;
  kind: "im" | "llm" | "social" | "builder";
}

/** One copyable prompt on the usecase detail page. */
export interface UseCasePrompt {
  title: string;
  body: string;
}

/**
 * Primary source for the narrative block.
 * `date` is a calendar date (`YYYY-MM-DD`) attached to that source.
 * `dateLabel` says what the date means, e.g. "文档更新" or "发布".
 */
export interface UseCasePrimarySource {
  url: string;
  label: string;
  date: string;
  dateLabel?: string;
}

export interface UseCase {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  categories: CategorySlug[];
  platforms: PlatformSlug[];
  sourceUrl: string;
  sourceLabel: string;
  upvotes: number;
  trending?: boolean;
  tags: string[];
  howItWorks: string[];
  tips: string[];
  /** 他们做了什么. Prose; a blank line starts a new paragraph. */
  approach?: string;
  /** 实际效果. One line per result. */
  outcomes?: string[];
  /** 值得知道. One line per caveat. */
  caveats?: string[];
  /** 可复制提示词. */
  prompts?: UseCasePrompt[];
  /** 一手来源 + 日期. Separate from the required header source. */
  primarySource?: UseCasePrimarySource;
}
