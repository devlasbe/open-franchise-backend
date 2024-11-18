FROM node:22-alpine AS base

FROM base AS builder
  RUN apk add --no-cache libc6-compat
  WORKDIR /app
  COPY package.json pnpm-lock.yaml ./
  RUN corepack enable pnpm 
  RUN pnpm i --frozen-lockfile
  COPY . .
  ARG VAL_DATABASE_URL
  RUN sed "s/VAL_DATABASE_URL/$VAL_DATABASE_URL/" ecosystem.config.js
  RUN pnpm build

FROM base AS runner
  WORKDIR /app
  RUN npm install -g pm2
  COPY --from=builder /app .
  EXPOSE 3000
  CMD ["npm", "run", "pm2:op"]