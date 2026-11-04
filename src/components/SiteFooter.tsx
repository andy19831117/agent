import Link from "next/link";

const linkClass = "text-sm text-slate-400 hover:text-indigo-300";

export function SiteFooter({
  email,
  wechat,
}: {
  email: string;
  wechat: string;
}) {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-medium text-slate-100">Agent场景库</p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            精选面向个人效率、独立开发者与企业自动化的中文 AI Agent 用例
          </p>
        </div>
        <nav
          aria-label="页脚"
          className="flex flex-wrap gap-x-4 gap-y-2 sm:max-w-xl sm:justify-end"
        >
          <Link href="/sponsors" className={linkClass}>
            赞助合作
          </Link>
          <Link href="/#subscribe" className={linkClass}>
            邮件订阅
          </Link>
          <Link href="/privacy" className={linkClass}>
            隐私政策
          </Link>
          <Link href="/disclaimer" className={linkClass}>
            免责声明
          </Link>
          <a href={`mailto:${email}`} className={linkClass}>
            邮箱 {email}
          </a>
          <span className="text-sm text-slate-400">微信 {wechat}</span>
        </nav>
      </div>
    </footer>
  );
}
