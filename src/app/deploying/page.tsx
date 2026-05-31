import Link from "next/link";

const options = [
  {
    href: "/deploying/vercel",
    title: "Vercel",
    icon: "▲",
    color: "bg-black",
    bg: "bg-gray-50",
    border: "border-gray-300",
    text: "text-gray-900",
    badge: "bg-gray-200 text-gray-700",
    summary: "git push = production. Zero-config, preview deployments, automatic HTTPS.",
    tags: ["Zero config", "Preview URLs", "Edge Network"],
    recommended: true,
  },
  {
    href: "/deploying/nodejs-server",
    title: "Node.js Server",
    icon: "🟢",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-700",
    summary: "Self-host on any Node.js 18+ server. Full feature support. Use with PM2 or systemd.",
    tags: ["Full features", "Self-hosted", "PM2 / systemd"],
  },
  {
    href: "/deploying/docker",
    title: "Docker",
    icon: "🐳",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    summary: "Containerize with output: 'standalone' for minimal image size. Deploy to k8s, ECS, GCP, Fly.io.",
    tags: ["Containerized", "output: standalone", "Kubernetes"],
  },
  {
    href: "/deploying/static-export",
    title: "Static Export",
    icon: "📄",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-800",
    summary: "Export to static HTML/CSS/JS. Deploy to S3, GitHub Pages, Cloudflare Pages — no server.",
    tags: ["output: export", "No server", "Limited features"],
  },
  {
    href: "/deploying/github-actions",
    title: "CI/CD — GitHub Actions",
    icon: "⚙️",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-700",
    summary: "Automate build, test, lint, and deploy on every push. Type check + Lighthouse in CI.",
    tags: ["Automated", "Type-check", "Lighthouse CI"],
  },
];

const featureTable = [
  ["Server Components", "✓", "✓", "✓", "✗"],
  ["Server Actions", "✓", "✓", "✓", "✗"],
  ["API Routes", "✓", "✓", "✓", "✗"],
  ["Image Optimization", "✓", "✓", "✓", "Partial"],
  ["Middleware", "✓", "✓", "✓", "✗"],
  ["ISR / Revalidation", "✓", "✓", "✓", "✗"],
  ["Edge Runtime", "✓", "Manual", "Manual", "✗"],
  ["Streaming", "✓", "✓", "✓", "✗"],
];

export default function DeployingPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Module 10 — Deploying</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Deploying Next.js</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Next.js supports four deployment targets. Vercel and Node.js support all features.
          Docker is ideal for containerized infrastructure. Static export trades features for
          zero-cost hosting.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => (
          <Link
            key={opt.href}
            href={opt.href}
            className={`group block rounded-xl border p-5 transition-all hover:shadow-sm ${opt.bg} ${opt.border}`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl shrink-0">{opt.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className={`font-semibold ${opt.text}`}>{opt.title}</h2>
                  {"recommended" in opt && (
                    <span className="text-xs bg-black text-white px-1.5 py-0.5 rounded font-medium">Recommended</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{opt.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {opt.tags.map(tag => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-mono ${opt.badge}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className={`text-sm font-medium ${opt.text} group-hover:translate-x-1 transition-transform`}>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Feature comparison */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Feature support by deployment target</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">Feature</th>
                {["Vercel", "Node.js", "Docker", "Static"].map(h => (
                  <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {featureTable.map(([feature, ...vals]) => (
                <tr key={feature}>
                  <td className="px-3 py-2 text-gray-700 font-medium">{feature}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`px-3 py-2 font-medium ${v === "✓" ? "text-green-600" : v === "✗" ? "text-red-500" : "text-amber-600"}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
