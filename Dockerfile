# Use official bun image
FROM oven/bun:latest AS base
WORKDIR /app

# Copy the pre-built build folder
COPY build/ ./build/

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Run with bun
CMD ["bun", "build/index.js"]
