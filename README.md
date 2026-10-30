# Agent场景库

面向中文用户的 AI Agent **真实用例目录** MVP（本地草稿）。品牌为原创「Agent场景库」，与第三方目录站点无关。

## 功能（MVP）

- 首页：搜索、分类筛选、Agent/平台筛选、热门卡片、赞助条占位、订阅占位
- 用例卡片：标题、摘要、平台、分类、来源链接、点赞（前端静态）、分享占位
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

## 如何新增用例

1. 编辑 `src/data/usecases.ts`，按现有对象追加一条（`slug` 全局唯一）。
2. `categories` / `platforms` 字段使用 `src/data/types.ts` 中已有 slug。
3. `sourceUrl` 仅填可公开访问的官网/文档链接；摘要与正文请原创中文，勿粘贴受版权保护的全文。
4. 如需新分类或平台，先改 `src/data/categories.ts` 或 `src/data/platforms.ts`，再更新类型联合。

## 技术栈

- Next.js App Router + TypeScript + Tailwind CSS v4

## 说明

- 本仓库为 **本机草稿**，请勿擅自关联 GitHub / Cursor Origin 远程（除非产品负责人明确要求）。
- 点赞与订阅均为前端占位，未接后端。
