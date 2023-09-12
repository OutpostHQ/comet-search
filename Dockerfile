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
RUN apk add --no-cache bash curl && curl -1sLf \
'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
&& apk add infisical

ENV INFISICAL_API_URL="https://env.outpost.run/api"
ENV INFISICAL_TOKEN=""

COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./package.json

EXPOSE 3000

CMD ["infisical", "run", "--env=prod", "--", "pnpm", "dev"]
