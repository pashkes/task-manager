# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS base
WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/ ./apps
COPY libs/ ./libs
RUN npm ci

COPY . .

ENV CI=1
ENV NX_DAEMON=false

RUN npx nx build api

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/dist/apps/api ./dist
COPY --from=base /app/node_modules ./node_modules
EXPOSE 3001
# Nx tsc output keeps src/ structure → dist/apps/api/src/main.js; we copy contents to ./dist
CMD ["node", "dist/src/main.js"]
