# Next.js 16.4.3 requires Node >=20.9.0. Node 22 matches the major
# used to install this lockfile (npm lockfileVersion 3).
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Public site URL is inlined at `next build`. Override with --build-arg.
ARG NEXT_PUBLIC_SITE_URL=https://agent.eastoracle.top
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Default only. Docker sets HOSTNAME to the container id at runtime;
# the command below forces the standalone server onto all interfaces.
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "export HOSTNAME=0.0.0.0; exec node server.js"]
