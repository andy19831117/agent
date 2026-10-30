import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "免责声明",
  description: "用例由编辑整理，不构成投资、医疗或法律建议。",
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="免责声明" updated="YYYY-MM-DD">
      <LegalSection title="内容性质">
        <p>
          本站用例由编辑整理，不是各平台或模型厂商的官方说明，也不代表官方认证或背书。
        </p>
      </LegalSection>
      <LegalSection title="不构成专业建议">
        <p>站内内容不构成投资、医疗或法律建议。</p>
      </LegalSection>
      <LegalSection title="操作与发布">
        <p>你在各平台中的配置、操作与发布由你自行负责。</p>
      </LegalSection>
      <LegalSection title="核验">
        <p>每条用例附有可点击的来源链接，供你自行核对原文。</p>
      </LegalSection>
    </LegalPage>
  );
}
