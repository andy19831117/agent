import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-slate-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400 text-sm font-bold text-slate-950 shadow-[0_0_20px_-4px_rgba(129,140,248,0.8)]">
            库
          </span>
          <span>
            Agent场景库
            <span className="ml-1.5 hidden text-xs font-normal text-slate-400 sm:inline">
              中文 AI Agent 用例精选
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-slate-300 sm:gap-2">
          <Link
            href="/#usecases"
            className="rounded-lg px-2 py-1.5 hover:bg-white/5 hover:text-white"
          >
            用例
          </Link>
          <Link
            href="/#categories"
            className="hidden rounded-lg px-2 py-1.5 hover:bg-white/5 hover:text-white sm:inline"
          >
            分类
          </Link>
          <Link
            href="/sponsors"
            className="rounded-lg px-2 py-1.5 hover:bg-white/5 hover:text-white"
          >
            赞助
          </Link>
          <Link
            href="/#subscribe"
            className="btn-primary ml-1 rounded-full px-3 py-1.5 text-sm font-medium"
          >
            订阅
          </Link>
        </nav>
      </div>
    </header>
  );
}
