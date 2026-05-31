import Link from "next/link";

export default function EnvVarsPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-1 rounded">Configuration · Live Demo</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Environment Variables</h1>
        <p className="text-gray-500 leading-relaxed">
          Next.js has a two-tier env system: <strong>server-only</strong> variables (secrets, tokens)
          and <strong><code className="font-mono">NEXT_PUBLIC_*</code></strong> variables that are
          inlined into the client bundle.
        </p>
      </div>

      {/* Live demo */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="font-semibold text-amber-900 mb-2">Live demo — server vs client access</h2>
        <p className="text-sm text-amber-800 mb-3">
          See what a Server Component, a Client Component, and a Route Handler each see when
          reading <code className="font-mono">process.env</code>.
        </p>
        <Link href="/configuration/env-vars/demo" className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
          Open env vars demo →
        </Link>
      </div>

      {/* The two tiers */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">The two tiers</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
            <p className="font-semibold text-blue-900 mb-2">Server-only (no prefix)</p>
            <pre className="bg-white rounded p-2 text-xs font-mono mb-2">{`DATABASE_URL=postgres://...
STRIPE_SECRET_KEY=sk_live_...
DRAFT_MODE_SECRET=my-secret`}</pre>
            <ul className="space-y-1 text-xs text-blue-800">
              <li>✦ Available in Server Components, Route Handlers, Server Actions</li>
              <li>✦ <strong className="text-red-600">Never</strong> accessible in <code className="font-mono">"use client"</code> files</li>
              <li>✦ Not included in the JS bundle</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm">
            <p className="font-semibold text-orange-900 mb-2">Client-safe (NEXT_PUBLIC_ prefix)</p>
            <pre className="bg-white rounded p-2 text-xs font-mono mb-2">{`NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-123456
NEXT_PUBLIC_APP_ENV=production`}</pre>
            <ul className="space-y-1 text-xs text-orange-800">
              <li>✦ Inlined into the JS bundle at build time</li>
              <li>✦ Available everywhere — server and client</li>
              <li>✦ <strong>Never put secrets here</strong> — users can see them</li>
            </ul>
          </div>
        </div>
      </div>

      {/* .env files */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">.env file precedence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b">File</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b">Loaded in</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b">Commit to git?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                [".env", "All environments", "✓ Yes (no secrets)"],
                [".env.local", "All environments (highest priority)", "✗ Never — add to .gitignore"],
                [".env.development", "next dev only", "✓ Yes (no secrets)"],
                [".env.production", "next build + next start", "✓ Yes (no secrets)"],
                [".env.test", "test runs only", "✓ Yes (no secrets)"],
              ].map(([file, when, git]) => (
                <tr key={file}>
                  <td className="px-3 py-2 font-mono text-amber-700">{file}</td>
                  <td className="px-3 py-2 text-gray-600">{when}</td>
                  <td className={`px-3 py-2 font-medium ${git.startsWith("✗") ? "text-red-600" : "text-green-600"}`}>{git}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Runtime injection */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Runtime injection (production)</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# Vercel Dashboard / CI/CD — set at deploy time, not in code
DATABASE_URL=postgres://...
STRIPE_SECRET_KEY=sk_live_...

# Docker run / Kubernetes — inject at container start
docker run -e DATABASE_URL=postgres://... my-next-app

# node process — inline before starting the server
DATABASE_URL=postgres://... node .next/standalone/server.js`}
        </pre>
      </div>

      <Link href="/configuration" className="text-sm text-gray-400 hover:text-amber-600 transition-colors">← Configuration overview</Link>
    </div>
  );
}
