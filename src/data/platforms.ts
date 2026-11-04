import type { Platform } from "./types";

export const platforms: Platform[] = [
  { slug: "wechat", name: "微信", kind: "im" },
  { slug: "wecom", name: "企业微信", kind: "im" },
  { slug: "feishu", name: "飞书", kind: "im" },
  { slug: "dingtalk", name: "钉钉", kind: "im" },
  { slug: "xiaohongshu", name: "小红书", kind: "social" },
  { slug: "douyin", name: "抖音", kind: "social" },
  { slug: "shipinhao", name: "视频号", kind: "social" },
  { slug: "tongyi", name: "通义千问", kind: "llm" },
  { slug: "wenxin", name: "文心一言", kind: "llm" },
  { slug: "doubao", name: "豆包", kind: "llm" },
  { slug: "kimi", name: "Kimi", kind: "llm" },
  { slug: "deepseek", name: "DeepSeek", kind: "llm" },
  { slug: "claude", name: "Claude", kind: "llm" },
  { slug: "chatgpt", name: "ChatGPT", kind: "llm" },
  { slug: "grok", name: "Grok Bot", kind: "llm" },
  { slug: "coze", name: "扣子 Coze", kind: "builder" },
  { slug: "dify", name: "Dify", kind: "builder" },
  { slug: "n8n", name: "n8n", kind: "builder" },
  { slug: "github", name: "GitHub", kind: "builder" },
];

export function getPlatform(slug: string): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}
