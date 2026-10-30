import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorTopBar } from "@/components/SponsorTopBar";
import { siteContact } from "@/data/contact";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Agent场景库";
const siteDescription =
  "精选面向中文用户的 AI Agent 真实用例：效率办公、职场求职、内容创作、电商运营、学习教育、生活办事、开发者工具与企业协作。";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "AI Agent",
    "智能体",
    "Agent场景库",
    "用例",
    "飞书",
    "企微",
    "小红书",
    "DeepSeek",
    "自动化",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    locale: "zh_CN",
    type: "website",
    siteName: siteTitle,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-slate-100">
        <SponsorTopBar />
        <Header />
        <main className="relative flex-1">{children}</main>
        <SiteFooter
          email={siteContact.email}
          phone={siteContact.phone}
          wechat={siteContact.wechat}
        />
      </body>
    </html>
  );
}
