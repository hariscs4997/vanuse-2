# syntax=docker/dockerfile:experimental
# Install dependencies only when needed
FROM node:lts-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
RUN echo "YARN VERSION IN BUILDER: $(yarn --version)"
RUN --mount=type=cache,id=yarn,sharing=locked,target=/usr/local/share/.cache/yarn yarn install --immutable

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder

ARG APP_ENV=production
ARG NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=/api
ARG PORT=3000

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarn ./.yarn
RUN yarn build

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
WORKDIR /app

ENV APP_ENV=${APP_ENV} \
    NODE_ENV=${NODE_ENV} \
    PORT=${PORT} \
# This allows to access Graphql Playground
    APOLLO_PRODUCTION_INTROSPECTION=false

RUN apk --no-cache add curl

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images
VOLUME /app/.next/cache/images

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE ${PORT}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1

CMD ["yarn", "start"]
