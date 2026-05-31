import Link from "next/link";

const topics = [
  {
    href: "/configuration/next-config",
    title: "next.config.ts",
    icon: "⚙️",
    color: "slate",
    summary: "The central config file. Controls headers, redirects, rewrites, Sass, bundle analyzer, and more.",
    tags: ["headers()", "redirects()", "rewrites()", "sassOptions"],
  },
  {
    href: "/configuration/env-vars",
    title: "Environment Variables",
    icon: "🔑",
    color: "amber",
    summary: "Server-only secrets vs NEXT_PUBLIC_ client-exposed vars. .env.local, .env.production, and runtime injection.",
    tags: ["NEXT_PUBLIC_*", ".env.local", "Live Demo"],
    demo: true,
  },
  {
    href: "/configuration/typescript-config",
    title: "TypeScript & Path Aliases",
    icon: "🔷",
    color: "blue",
    summary: "Built-in TS support, the Next.js IDE plugin, and @/ absolute imports via tsconfig.json paths.",
    tags: ["tsconfig.json", "@/*", "strict mode"],
  },
  {
    href: "/configuration/headers-rewrites",
    title: "Headers, Rewrites & Redirects",
    icon: "↩️",
    color: "indigo",
    summary: "Static and dynamic headers, URL rewrites, conditional redirects with has: matchers.",
    tags: ["headers()", "rewrites()", "has: matchers"],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  slate:  { bg: "bg-slate-50",  border: "border-slate-200",  text: "text-slate-700",  badge: "bg-slate-100 text-slate-600" },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700",  badge: "bg-amber-100 text-amber-800" },
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   badge: "bg-blue-100 text-blue-700" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700" },
};

export default function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">Module 08 — Configuration</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Configuration</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Next.js configuration lives in <code className="font-mono text-sm bg-gray-100 px-1 rounded">next.config.ts</code>,{" "}
          environment files (<code className="font-mono text-sm bg-gray-100 px-1 rounded">.env.*</code>),
          and <code className="font-mono text-sm bg-gray-100 px-1 rounded">tsconfig.json</code> — all
          checked by TypeScript, no surprises at runtime.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {topics.map((t) => {
          const c = colorMap[t.color];
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`group block rounded-xl border p-5 transition-all hover:shadow-sm ${c.bg} ${c.border}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className={`font-semibold font-mono ${c.text}`}>{t.title}</h2>
                    {"demo" in t && (
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">Live Demo</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{t.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.filter(tag => tag !== "Live Demo").map(tag => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-mono ${c.badge}`}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className={`text-sm font-medium ${c.text} group-hover:translate-x-1 transition-transform`}>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* This project's config */}
      <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs">
        <p className="text-gray-500 mb-2"># This project uses</p>
        <pre>{`next.config.ts
  ├── sassOptions        — global Sass variable injection
  ├── headers()         — CORS headers on /api/* routes
  ├── redirects()       — has-based conditional redirects
  └── withBundleAnalyzer — ANALYZE=true build inspection

tsconfig.json
  └── paths: { "@/*": ["./src/*"] }  — absolute imports

.env.local
  └── DRAFT_MODE_SECRET   — server-only secret`}</pre>
      </div>
    </div>
  );
}
