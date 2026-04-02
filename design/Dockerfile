# ── Build Stage ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy configuration files needed for build
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./

# Copy source code
COPY src ./src
COPY public ./public

# Build the application
RUN npm run build

# ── Production Stage ─────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
