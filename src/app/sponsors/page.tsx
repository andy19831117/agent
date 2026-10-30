import type { Metadata } from "next";
import { SponsorsPage } from "@/components/SponsorsPage";

export const metadata: Metadata = {
  title: "赞助合作",
  description:
    "Agent场景库赞助档位：探索、成长与伙伴。占位价可洽谈，不售卖站内内容版权。",
};

export default function Page() {
  return <SponsorsPage />;
}
