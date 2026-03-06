# ── Stage 1: Base ────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app

# ── Stage 2: Development (hot-reload con next dev) ────────────────────────────
FROM base AS development
COPY package*.json ./
RUN npm install
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ── Stage 3: Instalación de dependencias (caché óptima) ───────────────────────
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ── Stage 4: Build (Next.js standalone) ───────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_API_BASE se bake en el build.
# En Heroku, se lee desde heroku config:set NEXT_PUBLIC_API_BASE=<url>
# Docker lo pasa automáticamente como ARG si existe en las config vars.
ARG NEXT_PUBLIC_API_BASE=http://localhost:4000
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
ENV NEXT_TELEMETRY_DISABLED=1

# Garantizar que el directorio public existe antes del build
RUN mkdir -p public && npm run build

# ── Stage 5: Production ───────────────────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# 0.0.0.0 para que el servidor escuche en todas las interfaces del contenedor
ENV HOSTNAME=0.0.0.0

# Usuario no-root para seguridad
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
# standalone contiene server.js + node_modules mínimos + .next/server
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Archivos estáticos del cliente
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Heroku asigna $PORT dinámicamente; Next.js standalone lo lee automáticamente
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- "http://localhost:${PORT:-3000}/" || exit 1

CMD ["node", "server.js"]
