FROM node:22-slim AS base

RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

FROM base AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i --frozen-lockfile

COPY . .
ARG VAL_DATABASE_URL
ARG VAL_OPENAPI_KEY
ARG VAL_DEFAULT_YEAR
ARG VAL_JWT_SECRET

RUN sed -i "s|VAL_DATABASE_URL|$VAL_DATABASE_URL|" ecosystem.config.js
RUN sed -i "s|VAL_OPENAPI_KEY|$VAL_OPENAPI_KEY|" ecosystem.config.js
RUN sed -i "s|VAL_DEFAULT_YEAR|$VAL_DEFAULT_YEAR|" ecosystem.config.js
RUN sed -i "s|VAL_JWT_SECRET|$VAL_JWT_SECRET|" ecosystem.config.js

RUN DATABASE_URL=${VAL_DATABASE_URL}
RUN pnpm prisma:generate
RUN pnpm build

FROM base AS runner
WORKDIR /app

RUN npm install -g pm2

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "run", "pm2:op"]