FROM node:22-slim AS base

# OpenSSL 1.1 설치 (Prisma가 필요로 함)
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

FROM base AS builder
WORKDIR /app

# 필요 패키지 설치
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i --frozen-lockfile

# 소스 복사 및 환경 변수 주입
COPY . .
ARG VAL_DATABASE_URL
ARG VAL_OPENAPI_KEY
ARG VAL_DEFAULT_YEAR
RUN sed -i "s|VAL_DATABASE_URL|$VAL_DATABASE_URL|" ecosystem.config.js
RUN sed -i "s|VAL_OPENAPI_KEY|$VAL_OPENAPI_KEY|" ecosystem.config.js
RUN sed -i "s|VAL_DEFAULT_YEAR|$VAL_DEFAULT_YEAR|" ecosystem.config.js

# Prisma generate 및 빌드
RUN pnpm prisma generate
RUN pnpm build

FROM base AS runner
WORKDIR /app

RUN npm install -g pm2

COPY --from=builder /app .

# 런타임에서 다시 prisma generate 해도 되지만 일반적으로는 빌더 단계에서 한 번이면 충분
# 필요 없다면 이 줄 제거 가능
RUN pnpm prisma generate

EXPOSE 3000

CMD ["npm", "run", "pm2:op"]