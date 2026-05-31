import Link from "next/link";

export default function DockerPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">Deploying</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Docker</h1>
        <p className="text-gray-500 leading-relaxed">
          Containerize your Next.js app for Kubernetes, AWS ECS, Google Cloud Run, Fly.io, or
          any Docker-compatible platform. Use{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">output: &apos;standalone&apos;</code>{" "}
          for the smallest possible image.
        </p>
      </div>

      {/* Enable standalone output */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Step 1 — Enable standalone output</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// next.config.ts
export default {
  output: "standalone",
  // ↑ Next.js traces only the files actually used,
  // copies them + minimal node_modules to .next/standalone
  // Reduces Docker image from ~1GB to ~200MB
} satisfies import("next").NextConfig;`}
        </pre>
      </div>

      {/* Dockerfile */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Step 2 — Dockerfile (multi-stage)</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# syntax=docker/dockerfile:1
FROM node:22-alpine AS base

# ── Install dependencies only when needed ─────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Build the app ──────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Don't run linters during Docker build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Production image (minimal) ─────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public         ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]`}
        </pre>
      </div>

      {/* Build and run */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Step 3 — Build and run</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# Build the image
docker build -t my-next-app .

# Run locally
docker run -p 3000:3000 \\
  -e DATABASE_URL=postgres://... \\
  -e NEXTAUTH_SECRET=... \\
  my-next-app

# Push to a registry
docker tag my-next-app registry.example.com/my-next-app:latest
docker push registry.example.com/my-next-app:latest`}
        </pre>
      </div>

      {/* docker-compose */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">docker-compose.yml (dev + prod)</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# docker-compose.yml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/myapp
      - NEXTAUTH_URL=http://localhost:3000
    env_file: [.env.local]
    depends_on: [db]

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}
        </pre>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">Docker tips</p>
        <ul className="space-y-1 text-xs list-disc list-inside">
          <li><code className="font-mono">output: &apos;standalone&apos;</code> cuts image size by ~80% — always use it.</li>
          <li>Add a <code className="font-mono">.dockerignore</code> to exclude <code className="font-mono">node_modules</code>, <code className="font-mono">.git</code>, <code className="font-mono">.next</code>, <code className="font-mono">.env*.local</code>.</li>
          <li>Run as a non-root user (<code className="font-mono">nextjs:nodejs</code>) for security.</li>
          <li>Install <code className="font-mono">sharp</code> for image optimization inside the container.</li>
          <li>Set <code className="font-mono">NEXT_TELEMETRY_DISABLED=1</code> to skip telemetry pings in CI.</li>
        </ul>
      </div>

      <Link href="/deploying" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">← Deploying overview</Link>
    </div>
  );
}
