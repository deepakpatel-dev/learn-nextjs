import Link from "next/link";

export default function HeadersRewritesPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">Configuration</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Headers, Rewrites & Redirects</h1>
        <p className="text-gray-500 leading-relaxed">
          Configure HTTP response headers, URL rewrites (hide the real URL), and conditional
          redirects — all in <code className="font-mono text-sm bg-gray-100 px-1 rounded">next.config.ts</code>{" "}
          with full TypeScript support.
        </p>
      </div>

      {/* Quick comparison */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {[
          { key: "headers()", color: "blue", icon: "📋", desc: "Attach HTTP headers to responses. CORS, cache-control, CSP, security headers." },
          { key: "rewrites()", color: "purple", icon: "🔀", desc: "Map one URL to another internally. The browser URL doesn't change. Useful for proxying to external APIs." },
          { key: "redirects()", color: "indigo", icon: "↩️", desc: "Redirect the browser to a new URL (301/302). Supports has: matchers for conditional logic." },
        ].map(({ key, color, icon, desc }) => (
          <div key={key} className={`rounded-xl border p-4 bg-${color}-50 border-${color}-200`}>
            <p className="text-2xl mb-2">{icon}</p>
            <p className={`font-mono font-semibold text-${color}-700 mb-1 text-sm`}>{key}</p>
            <p className="text-xs text-gray-600">{desc}</p>
          </div>
        ))}
      </div>

      {/* headers() */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3"><code className="font-mono">headers()</code> — add HTTP response headers</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// next.config.ts
async headers() {
  return [
    // ── Security headers on all pages ────────────────────────────────
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options",           value: "DENY" },
        { key: "X-Content-Type-Options",    value: "nosniff" },
        { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy",        value: "camera=(), microphone=()" },
      ],
    },
    // ── CORS on API routes ────────────────────────────────────────────
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin",  value: "https://my-frontend.com" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, DELETE, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
      ],
    },
    // ── Cache-control for static assets ──────────────────────────────
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ];
}`}
        </pre>
      </div>

      {/* rewrites() */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3"><code className="font-mono">rewrites()</code> — proxy without redirect</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// next.config.ts
async rewrites() {
  return [
    // Proxy /api/v1/* to an external service — URL stays the same in browser
    {
      source: "/api/v1/:path*",
      destination: "https://internal-service.example.com/:path*",
    },
    // Serve a different page under a marketing-friendly URL
    {
      source: "/pricing",
      destination: "/plans/public",
    },
    // Rewrite based on query param presence (beforeFiles)
    // beforeFiles rewrites run before checking the filesystem
  ];
  // You can return { beforeFiles, afterFiles, fallback } for ordered rewrites
}`}
        </pre>
      </div>

      {/* redirects with has: matchers */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <code className="font-mono">redirects()</code> — with <code className="font-mono">has:</code> matchers
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          <code className="font-mono">has:</code> makes redirects conditional — only fire when a
          specific query param, cookie, or header is present.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`async redirects() {
  return [
    // ── Query param ──────────────────────────────────────────────────
    // /blog?version=legacy  →  /blog/intro-to-nextjs
    {
      source: "/blog",
      has: [{ type: "query", key: "version", value: "legacy" }],
      destination: "/blog/intro-to-nextjs",
      permanent: false,
    },

    // ── Cookie ───────────────────────────────────────────────────────
    // Logged-in users hitting /login go straight to dashboard
    {
      source: "/login",
      has: [{ type: "cookie", key: "auth_token" }],
      destination: "/dashboard",
      permanent: false,
    },

    // ── Header ───────────────────────────────────────────────────────
    // Old API clients with x-api-version: v1 → legacy docs
    {
      source: "/docs/api",
      has: [{ type: "header", key: "x-api-version", value: "v1" }],
      destination: "/docs/api/reference/hooks",
      permanent: false,
    },

    // ── Permanent SEO redirect ────────────────────────────────────────
    {
      source: "/old-product",
      destination: "/products/new-product",
      permanent: true,  // 301 — tells search engines to update their index
    },
  ];
}`}
        </pre>
        <div className="mt-3 flex gap-3">
          <Link href="/redirects" className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors">
            Live redirects demo (Module 01) →
          </Link>
        </div>
      </div>

      <Link href="/configuration" className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">← Configuration overview</Link>
    </div>
  );
}
