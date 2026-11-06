# Agent场景库

面向中文用户的 AI Agent **真实用例目录**。品牌为原创「Agent场景库」，与第三方目录站点无关。

## 功能

- 首页：搜索、分类筛选、Agent/平台筛选、热门卡片、赞助条、邮件订阅
- 用例卡片：标题、摘要、平台、分类、来源链接、点赞（前端静态）、分享（复制链接）
- 分类页 `/category/[slug]`、详情页 `/usecase/[slug]`
- `sitemap.xml` / `robots.txt`、赞助页 stub
- 种子数据 100+ 条中文用例，覆盖 8 个分类

## 本地运行

```bash
cd /workspace/agent-usecases-cn
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

生产构建：

```bash
npm run build
npm start
```

## 站点 URL（sitemap / robots）

在 Vercel 项目环境变量中设置（Production，以及需要独立预览域名的 Preview）：

```bash
NEXT_PUBLIC_SITE_URL=https://agent-usecases-cn.vercel.app
```

`src/app/sitemap.ts` 与 `src/app/robots.ts` 都通过 `src/lib/site-url.ts` 的 `getSiteUrl()` 取这个值。未设置时：生产构建（`NODE_ENV=production`，包括 Vercel）回退到 `https://agent-usecases-cn.vercel.app`；本地 `next dev` 回退到 `http://localhost:3000`。不要用 `VERCEL_URL` 当生产地址，那是单次部署的主机名，不是正式别名。

邮件订阅还需要服务端变量（见 `.env.example`，不要提交真实密钥）：

```bash
RESEND_API_KEY=
RESEND_SEGMENT_ID=
RESEND_FROM=
SUBSCRIBE_TOKEN_SECRET=
```

`POST /api/subscribe` 经 Resend 发确认邮件。邮件里的链接是短地址 `/c/…`（整行放得进 75 字符，避免邮件折行截断）。收件人打开后点击「确认订阅」，邮箱才写入 Segment。仍可用 `/subscribe/confirm?token=` 校验未过期的旧 HMAC 链接。未配置上述变量时，表单会提示订阅暂时不可用。发送域名请关闭点击跟踪，否则确认链接会被改写成超长跳转。

## 如何新增用例

1. 编辑 `src/data/usecases.ts`，按现有对象追加一条（`slug` 全局唯一）。
2. `categories` / `platforms` 字段使用 `src/data/types.ts` 中已有 slug。
3. `sourceUrl` 仅填可公开访问的官网/文档链接；摘要与正文请原创中文，勿粘贴受版权保护的全文。
4. 如需新分类或平台，先改 `src/data/categories.ts` 或 `src/data/platforms.ts`，再更新类型联合。

## 技术栈

- Next.js App Router + TypeScript + Tailwind CSS v4

## 说明

- 点赞为前端状态，刷新后不会保留。订阅走服务端 API，确认后写入 Resend Segment。
