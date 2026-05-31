import Link from "next/link";

export default function StaticExportPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-1 rounded">Deploying</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Static Export</h1>
        <p className="text-gray-500 leading-relaxed">
          Export your app to pure HTML/CSS/JS files. Deploy to AWS S3, GitHub Pages,
          Cloudflare Pages, Nginx, or any static host — no Node.js server required.
          Best for purely static sites and SPAs.
        </p>
      </div>

      {/* Enable static export */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Enable static export</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// next.config.ts
export default {
  output: "export",

  // Optional: add a base path if deploying under a sub-path
  // basePath: "/my-app",

  // Optional: strip the trailing slash from URLs
  // trailingSlash: false,
} satisfies import("next").NextConfig;

# Build → generates the out/ directory
npm run build
# → out/
#   ├── index.html
#   ├── about/index.html
#   ├── blog/hello-world/index.html
#   └── _next/static/  (JS/CSS chunks)

# Serve locally to verify
npx serve out`}
        </pre>
      </div>

      {/* Supported vs not */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">What works / what doesn&apos;t</h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-800 mb-3">✓ Supported</p>
            <ul className="space-y-1.5 text-green-700">
              {[
                "Server Components (render at build time)",
                "generateStaticParams",
                "Client Components (useState, useEffect)",
                "next/image with unoptimized: true",
                "Dynamic routes (pre-generated)",
                "Metadata API",
                "next/link prefetching",
              ].map(item => <li key={item}>✓ {item}</li>)}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-semibold text-red-800 mb-3">✗ Not supported</p>
            <ul className="space-y-1.5 text-red-700">
              {[
                "Server Actions",
                "API Routes (route.ts)",
                "Middleware",
                "ISR / on-demand revalidation",
                "Streaming / Suspense",
                "Dynamic routes without generateStaticParams",
                "Server-side cookies / headers",
              ].map(item => <li key={item}>✗ {item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Deploy to GitHub Pages */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Deploy to GitHub Pages (GitHub Actions)</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages:    write
  id-token: write

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url:  \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_BASE_URL: \${{ secrets.NEXT_PUBLIC_BASE_URL }}

      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

      - uses: actions/deploy-pages@v4
        id: deployment`}
        </pre>
      </div>

      {/* When to choose static */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-semibold text-amber-900 mb-2">When to choose static export</p>
        <ul className="space-y-1 text-xs list-disc list-inside">
          <li>Marketing sites, landing pages, documentation — content changes rarely.</li>
          <li>Blogs built with MDX or a headless CMS with a build webhook.</li>
          <li>SPAs where all data is fetched client-side.</li>
          <li>When your hosting budget is $0 (GitHub Pages, Cloudflare Pages free tier).</li>
        </ul>
        <p className="text-xs mt-2 text-amber-700">
          <strong>Don&apos;t use</strong> for apps that need auth, real-time data, form submissions, or dynamic personalization — use Node.js or Vercel instead.
        </p>
      </div>

      <Link href="/deploying" className="text-sm text-gray-400 hover:text-amber-600 transition-colors">← Deploying overview</Link>
    </div>
  );
}
