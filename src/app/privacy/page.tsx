import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "本站可能收集订阅邮箱与基础访问日志，不作他用。",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="隐私政策" updated="YYYY-MM-DD">
      <LegalSection title="我们可能收集的信息">
        <p>本站可能收集你在订阅时留下的邮箱，以及服务器产生的基础访问日志，例如访问时间和页面路径。</p>
      </LegalSection>
      <LegalSection title="不作他用">
        <p>这些信息只用于完成订阅和维护站点运行，不作其他用途。</p>
      </LegalSection>
      <LegalSection title="联系">
        <p>如需了解或更正上述信息，请通过页脚中的联系方式与我们联系。</p>
      </LegalSection>
    </LegalPage>
  );
}
