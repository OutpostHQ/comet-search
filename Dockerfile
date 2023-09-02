FROM node:18-alpine AS base

RUN if ! command -v pnpm &> /dev/null; then \
    npm install -g pnpm; \
fi

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm build

FROM base AS production

COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "dev"]
