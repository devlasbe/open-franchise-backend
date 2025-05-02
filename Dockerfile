FROM node:22-alpine AS base

FROM base AS builder
  RUN apk add --no-cache libc6-compat
  WORKDIR /app
  COPY package.json pnpm-lock.yaml ./
  RUN corepack enable pnpm 
  RUN pnpm i --frozen-lockfile
  COPY . .
  ARG VAL_DATABASE_URL
  ARG VAL_OPENAPI_KEY
  ARG VAL_DEFAULT_YEAR
  RUN sed -i "s|VAL_DATABASE_URL|$VAL_DATABASE_URL|" ecosystem.config.js
  RUN sed -i "s|VAL_OPENAPI_KEY|$VAL_OPENAPI_KEY|" ecosystem.config.js
  RUN sed -i "s|VAL_DEFAULT_YEAR|$VAL_DEFAULT_YEAR|" ecosystem.config.js
  RUN npm run prisma:generate
  RUN pnpm build

FROM base AS runner
  WORKDIR /app
  RUN npm install -g pm2
  COPY --from=builder /app .
  RUN npm run prisma:generate
  EXPOSE 3000
  CMD ["npm", "run", "pm2:op"]