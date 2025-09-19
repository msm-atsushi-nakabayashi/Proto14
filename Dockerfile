# マルチステージビルドを使用
# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY proto14-platform/package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# 依存関係をインストール（devDependenciesを含む）
COPY proto14-platform/package*.json ./
RUN npm ci

COPY proto14-platform/ .

# Next.jsの静的ファイルをビルド
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 必要なファイルのみコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# ユーザーを変更
USER nextjs

# ポート3000を公開
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Next.jsサーバーを起動
CMD ["node", "server.js"]