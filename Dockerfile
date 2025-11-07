# Use Node 20 (Next.js 16 requires >=20)
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
# Set a temporary DATABASE_URL during build (doesn't affect runtime)
ENV DATABASE_URL="postgresql://placeholder_user:placeholder_pass@localhost:5432/placeholder_db?schema=public"
RUN npx prisma generate


# Build the Next.js app
RUN npm run build

# -------------------------
# Production stage
# -------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
