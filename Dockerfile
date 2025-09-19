# マルチステージビルドを使用
FROM node:20-alpine AS builder
WORKDIR /app

# 依存関係をインストール
COPY proto14-platform/package*.json ./
RUN npm ci

# ソースコードをコピー
COPY proto14-platform/ .

# publicフォルダを作成（存在しない場合）
RUN mkdir -p ./public

# Next.jsの静的ファイルをビルド
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 本番用イメージ
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# グループとユーザーを作成
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# standaloneモードでビルドしたファイルをコピー
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# ユーザーを変更
USER nextjs

# ポート3000を公開
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.jsサーバーを起動
CMD ["node", "server.js"]