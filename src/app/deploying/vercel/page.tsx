import Link from "next/link";

export default function VercelPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">Deploying</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Deploy to Vercel</h1>
        <p className="text-gray-500 leading-relaxed">
          The simplest path to production. Connect your GitHub repo, push code, and Vercel
          builds and deploys automatically — with preview URLs on every pull request.
        </p>
      </div>

      {/* Steps */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Deploy in 3 steps</h2>
        <div className="grid grid-cols-3 gap-3 text-sm text-center">
          {[
            { n: "1", title: "Push to GitHub", body: "Your Next.js project must be in a GitHub, GitLab, or Bitbucket repo." },
            { n: "2", title: "Import on Vercel", body: "vercel.com/new → select your repo → Vercel auto-detects Next.js settings." },
            { n: "3", title: "It's live!", body: "Every push to main deploys to production. Every PR gets a unique preview URL." },
          ].map(({ n, title, body }) => (
            <div key={n} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">{n}</div>
              <p className="font-semibold text-gray-800 mb-1">{title}</p>
              <p className="text-gray-500 text-xs">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Environment variables */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Setting environment variables</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# Option 1 — Vercel Dashboard
# Project Settings → Environment Variables → Add

# Option 2 — Vercel CLI
vercel env add DATABASE_URL production
vercel env add STRIPE_SECRET_KEY production

# Option 3 — vercel.json (for non-sensitive vars only)
{
  "env": {
    "NEXT_PUBLIC_APP_ENV": "production"
  }
}

# Pull production env vars to local .env.local (never committed)
vercel env pull .env.local`}
        </pre>
      </div>

      {/* vercel.json */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3"><code className="font-mono">vercel.json</code> configuration</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`{
  "regions": ["iad1", "lhr1"],   // deploy to US East + London
  "functions": {
    "app/api/ai/route.ts": {
      "maxDuration": 300          // 5-minute timeout for AI routes
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}`}
        </pre>
      </div>

      {/* Vercel-specific features */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Vercel-specific features</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { title: "Preview Deployments", desc: "Every PR gets a unique HTTPS URL — share with stakeholders before merging." },
            { title: "Edge Network", desc: "Your app runs at 100+ PoPs worldwide — static assets and Edge routes are served from the nearest location." },
            { title: "Analytics & Speed Insights", desc: "Real-user performance metrics with Core Web Vitals breakdown — zero config." },
            { title: "Blob Storage", desc: "Vercel Blob and Postgres are first-class storage options with Next.js-aware SDKs." },
            { title: "Cron Jobs", desc: "Schedule Route Handlers with a cron expression in vercel.json — no external scheduler needed." },
            { title: "Firewall & DDoS", desc: "Built-in WAF, bot protection, and DDoS mitigation on all plans." },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-xl p-3">
              <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Link href="/deploying" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Deploying overview</Link>
    </div>
  );
}
