# ---------- Base image ----------
FROM node:20-alpine AS builder

WORKDIR /app

# ---------- Install deps ----------
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# ---------- Copy source ----------
COPY . .

# ---------- Build ----------
RUN npm run build


# ---------- Production image ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

# ---------- Start ----------
CMD ["npm", "run", "start"]
