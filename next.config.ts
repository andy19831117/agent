import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ECS 镜像使用 standalone 产物。不改现有 Vercel 构建路径。
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
