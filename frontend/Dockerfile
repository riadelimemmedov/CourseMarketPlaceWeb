#? Stage 1: Build dependencies
FROM node:18-alpine AS deps

#? Install libc6-compat
RUN apk add --no-cache libc6-compat

#? Set working directory
WORKDIR /app

#? Copy package.json and package-lock.json
COPY package.json package-lock.json ./

#? Install npm dependencies for development
RUN npm install --dev

#? Stage 2: Build application
FROM node:18-alpine AS builder

#? Set working directory
WORKDIR /app

#? Copy node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

#? Copy the entire application
COPY . .

#? Set environment variable to disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

#? Build the application
RUN npm run build

#? Stage 3: Create a minimal image for running the application
FROM node:18-alpine AS runner

#? Set working directory
WORKDIR /app

#? Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

#? Add a system group for nodejs with GID 1001
RUN addgroup --system --gid 1001 nodejs

#? Add a system user for Next.js with UID 1001 and belonging to the nodejs group
RUN adduser --system --uid 1001 nextjs

#? Copy the .next directory from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

#? Copy node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules

#? Copy package.json from the builder stage
COPY --from=builder /app/package.json ./package.json

#? Switch to the nextjs user
USER nextjs

#? Expose port 3000
EXPOSE 3000

#? Set environment variable for the application port
ENV PORT 3000

#? Command to start the application
CMD ["npm", "start"]
