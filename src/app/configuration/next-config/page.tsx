import Link from "next/link";

export default function NextConfigPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">Configuration</span>
        <h1 className="text-3xl font-bold mt-3 mb-2"><code className="font-mono">next.config.ts</code></h1>
        <p className="text-gray-500 leading-relaxed">
          The central config file at the project root. Typed with{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">NextConfig</code> — TypeScript
          catches invalid options at build time.
        </p>
      </div>

      {/* Key facts */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2 text-slate-800">
        <p className="font-semibold text-slate-900 mb-2">Key facts</p>
        <p>✦ Runs on the <strong>server/build side only</strong> — never sent to the browser.</p>
        <p>✦ Use <code className="font-mono">next.config.ts</code> for full TypeScript support.</p>
        <p>✦ Supports a <strong>function form</strong> to access <code className="font-mono">phase</code> (build vs dev vs start).</p>
        <p>✦ Plugins wrap the config: <code className="font-mono">withBundleAnalyzer(nextConfig)</code>.</p>
      </div>

      {/* This project's actual config */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          This project&apos;s <code className="font-mono">next.config.ts</code>
        </h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Sass ──────────────────────────────────────────────────────────────
  // Inject a global variable into every .scss file automatically.
  sassOptions: {
    additionalData: \`$global-brand: #f97316;\`,
  },

  // ── CORS Headers ──────────────────────────────────────────────────────
  // Applied statically to every /api/* route.
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────────
  // has-based: only redirect when the condition matches.
  async redirects() {
    return [
      // ?version=legacy → /blog/intro-to-nextjs
      { source: "/blog", has: [{ type: "query", key: "version", value: "legacy" }],
        destination: "/blog/intro-to-nextjs", permanent: false },

      // Logged-in users bypass /login → /dashboard
      { source: "/login", has: [{ type: "cookie", key: "auth_token" }],
        destination: "/dashboard", permanent: false },
    ];
  },
};

// Wrap with plugin — ANALYZE=true npm run build opens a treemap report
export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);`}
        </pre>
      </div>

      {/* Key options reference */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Commonly used options</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">Option</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                ["headers()", "Add HTTP headers to responses (async, returns array of rules)"],
                ["redirects()", "Redirect rules with optional has: matchers (query, cookie, header)"],
                ["rewrites()", "Rewrite URLs without redirecting (proxy-like; hides the real URL)"],
                ["images.remotePatterns", "Allowlist of external domains for next/image optimization"],
                ["basePath", "Deploy the app under a sub-path, e.g. /app"],
                ["env", "Expose static env vars to JS bundle (prefer NEXT_PUBLIC_ instead)"],
                ["sassOptions", "Configure sass compiler options or inject global variables"],
                ["compress", "Enable gzip compression (default: true on Node.js server)"],
                ["outputFileTracingRoot", "Custom root for output file tracing in monorepos"],
                ["output: 'standalone'", "Minimal production bundle — includes only used node_modules"],
                ["output: 'export'", "Static HTML/CSS/JS export — no server required"],
              ].map(([opt, desc]) => (
                <tr key={opt}>
                  <td className="px-3 py-2 font-mono text-slate-700">{opt}</td>
                  <td className="px-3 py-2 text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phase-aware config */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Phase-aware configuration</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// next.config.ts
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";

export default function config(phase: string) {
  const isDev   = phase === PHASE_DEVELOPMENT_SERVER;
  const isBuild = phase === PHASE_PRODUCTION_BUILD;

  return {
    // Only enable strict mode in dev
    reactStrictMode: isDev,
    // Only analyze bundle during build
    // (normally you'd wrap withBundleAnalyzer instead)
    ...(isBuild && { output: "standalone" }),
  } satisfies import("next").NextConfig;
}`}
        </pre>
      </div>

      <Link href="/configuration" className="text-sm text-gray-400 hover:text-slate-600 transition-colors">← Configuration overview</Link>
    </div>
  );
}
