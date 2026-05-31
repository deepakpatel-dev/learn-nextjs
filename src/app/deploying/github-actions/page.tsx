import Link from "next/link";

export default function GitHubActionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">Deploying</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">CI/CD — GitHub Actions</h1>
        <p className="text-gray-500 leading-relaxed">
          Automate your quality gates: type-check, lint, build, and deploy on every push.
          Run Lighthouse audits on preview deployments to catch performance regressions before merge.
        </p>
      </div>

      {/* Full CI pipeline */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Full CI pipeline</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Type-check, Lint & Build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      # ── Type-check ────────────────────────────────────────────────
      - name: TypeScript
        run: npx tsc --noEmit

      # ── Lint ──────────────────────────────────────────────────────
      - name: ESLint
        run: npm run lint

      # ── Build (also catches TS errors Next.js finds at build time)
      - name: Build
        run: npm run build
        env:
          # Don't skip build errors in CI
          NEXT_TELEMETRY_DISABLED: 1
          # Inject secrets from GitHub Secrets
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: \${{ secrets.NEXTAUTH_SECRET }}

      # ── Upload build artifact for deploy job ──────────────────────
      - uses: actions/upload-artifact@v4
        with:
          name: next-build
          path: .next/
          retention-days: 1`}
        </pre>
      </div>

      {/* Deploy to Vercel */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Deploy to Vercel from Actions</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token:   \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id:  \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          # Push to main → production deploy
          vercel-args: --prod`}
        </pre>
      </div>

      {/* Lighthouse CI */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Lighthouse CI — catch performance regressions</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# .github/workflows/lighthouse.yml
name: Lighthouse

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }

      - run: npm ci && npm run build

      # Start the Next.js server and run Lighthouse
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/blog
          budgetPath: ./budget.json
          uploadArtifacts: true
        env:
          LHCI_GITHUB_APP_TOKEN: \${{ secrets.LHCI_GITHUB_APP_TOKEN }}

# budget.json — fail if scores drop below thresholds
# [
#   {
#     "path":       "/*",
#     "performance": [{ "numericValue": 90, "operator": ">=" }],
#     "accessibility": [{ "numericValue": 95, "operator": ">=" }]
#   }
# ]`}
        </pre>
      </div>

      {/* Environment secrets */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">GitHub Secrets — where to set them</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
          <p className="text-gray-700 mb-2 font-medium">Settings → Secrets and variables → Actions</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-white rounded p-2 border border-gray-200">
              <p className="text-gray-500 mb-1">Repository secrets (all envs)</p>
              <p>DATABASE_URL</p>
              <p>NEXTAUTH_SECRET</p>
              <p>STRIPE_SECRET_KEY</p>
            </div>
            <div className="bg-white rounded p-2 border border-gray-200">
              <p className="text-gray-500 mb-1">Environment secrets (production)</p>
              <p>VERCEL_TOKEN</p>
              <p>VERCEL_ORG_ID</p>
              <p>VERCEL_PROJECT_ID</p>
            </div>
          </div>
        </div>
      </div>

      <Link href="/deploying" className="text-sm text-gray-400 hover:text-purple-600 transition-colors">← Deploying overview</Link>
    </div>
  );
}
