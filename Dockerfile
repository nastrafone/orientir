# syntax=docker/dockerfile:1

# ---------- зависимости ----------
FROM node:24-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ---------- сборка ----------
FROM node:24-alpine AS builder
WORKDIR /app
# Адрес сайта нужен на этапе сборки: из него строятся sitemap.xml, robots.txt и Open Graph.
ARG SITE_URL=https://example.com
ENV SITE_URL=$SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- запуск ----------
FROM node:24-alpine AS runner
WORKDIR /app
ARG SITE_URL=https://example.com
ENV SITE_URL=$SITE_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001 -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
