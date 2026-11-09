# Stage 1: Dependencies and source for lint
FROM node:20.18.0-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g pnpm@9.15.9

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Required because CI runs lint directly from this stage.
COPY . .

# Stage 2: Builder
FROM deps AS builder

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# Stage 3: Runner (Production)
FROM node:20.18.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Requires output: "standalone" in the Next.js configuration.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
