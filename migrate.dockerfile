# syntax=docker/dockerfile:1
FROM node:24.12.0-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including devDependencies for drizzle-kit and tsx)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code (needed for schema and drizzle config)
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Run migrations
CMD sh -c "pnpm db:generate && pnpm db:migrate"
