import Link from "next/link";

const conventions = [
  {
    file: "page.js",
    href: "/file-conventions/page-file",
    category: "Route Files",
    color: "blue",
    summary: "The UI for a route. Receives params and searchParams as async props.",
    tags: ["Server Component", "Required"],
    demo: false,
  },
  {
    file: "layout.js",
    href: "/file-conventions/layout-file",
    category: "Route Files",
    color: "blue",
    summary: "Shared UI that wraps multiple pages. Persists state across navigation.",
    tags: ["Server Component", "Persistent"],
    demo: false,
  },
  {
    file: "template.js",
    href: "/file-conventions/template",
    category: "Route Files",
    color: "amber",
    summary: "Like layout, but remounts on every navigation — resets client state.",
    tags: ["Server Component", "Live Demo"],
    demo: true,
  },
  {
    file: "loading.js",
    href: "/file-conventions/loading",
    category: "Route Files",
    color: "purple",
    summary: "Automatic Suspense wrapper — shows a skeleton while the page streams in.",
    tags: ["Server Component", "Live Demo"],
    demo: true,
  },
  {
    file: "error.js",
    href: "/file-conventions/error",
    category: "Route Files",
    color: "red",
    summary: "React Error Boundary for a route segment. Must be a Client Component.",
    tags: ["Client Component", "Live Demo"],
    demo: true,
  },
  {
    file: "not-found.js",
    href: "/file-conventions/not-found",
    category: "Route Files",
    color: "orange",
    summary: "Custom UI shown when notFound() is called within a route segment.",
    tags: ["Server Component", "Live Demo"],
    demo: true,
  },
  {
    file: "default.js",
    href: "/file-conventions/default-file",
    category: "Route Files",
    color: "gray",
    summary: "Fallback for parallel route slots that have no active state after hard nav.",
    tags: ["Parallel Routes"],
    demo: false,
  },
  {
    file: "route.js",
    href: "/file-conventions/route",
    category: "API & Logic",
    color: "green",
    summary: "Creates an HTTP API endpoint. Export GET, POST, PUT, DELETE, etc.",
    tags: ["Server-only", "HTTP Methods"],
    demo: false,
  },
  {
    file: "middleware.js",
    href: "/file-conventions/middleware-file",
    category: "API & Logic",
    color: "indigo",
    summary: "Runs before every request. Can rewrite, redirect, and set headers.",
    tags: ["Edge Runtime", "Root-level"],
    demo: false,
  },
  {
    file: "instrumentation.js",
    href: "/file-conventions/instrumentation",
    category: "API & Logic",
    color: "teal",
    summary: "Server-side observability hook. register() called once on startup.",
    tags: ["Server-only", "Root-level"],
    demo: false,
  },
  {
    file: "Route Segment Config",
    href: "/file-conventions/route-segment-config",
    category: "Config & Meta",
    color: "slate",
    summary: "Module-level exports to control runtime, dynamicParams, and more.",
    tags: ["runtime", "dynamicParams", "maxDuration"],
    demo: false,
  },
  {
    file: "Metadata Files",
    href: "/file-conventions/metadata-files",
    category: "Config & Meta",
    color: "pink",
    summary: "Static files for SEO: manifest.json, robots.txt, sitemap.xml, og-image.",
    tags: ["SEO", "Static Files"],
    demo: false,
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",  badge: "bg-blue-100 text-blue-700" },
  amber:  { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200", badge: "bg-amber-100 text-amber-800" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200",badge: "bg-purple-100 text-purple-700" },
  red:    { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",   badge: "bg-red-100 text-red-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200",badge: "bg-orange-100 text-orange-800" },
  gray:   { bg: "bg-gray-50",   text: "text-gray-700",   border: "border-gray-200",  badge: "bg-gray-100 text-gray-600" },
  green:  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200", badge: "bg-green-100 text-green-700" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200",badge: "bg-indigo-100 text-indigo-700" },
  teal:   { bg: "bg-teal-50",   text: "text-teal-700",   border: "border-teal-200",  badge: "bg-teal-100 text-teal-700" },
  slate:  { bg: "bg-slate-50",  text: "text-slate-700",  border: "border-slate-200", badge: "bg-slate-100 text-slate-600" },
  pink:   { bg: "bg-pink-50",   text: "text-pink-700",   border: "border-pink-200",  badge: "bg-pink-100 text-pink-700" },
};

const categories = ["Route Files", "API & Logic", "Config & Meta"];

export default function FileConventionsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Module 07 — File Conventions
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Next.js File Conventions</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Next.js uses special filenames inside the <code className="font-mono text-sm bg-gray-100 px-1 rounded">app/</code>{" "}
          directory to define UI, handle errors, show loading states, and configure route
          behavior — no imports needed, just the right filename.
        </p>
      </div>

      {/* Component hierarchy diagram */}
      <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs leading-relaxed">
        <p className="text-gray-500 mb-3"># Component hierarchy (outer → inner)</p>
        <pre>{`layout.js
  └── template.js
        └── error.js          ← error boundary
              └── loading.js  ← Suspense wrapper
                    └── not-found.js
                          └── page.js`}</pre>
      </div>

      {/* Convention cards by category */}
      {categories.map((cat) => {
        const items = conventions.filter((c) => c.category === cat);
        return (
          <div key={cat}>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {cat}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {items.map((conv) => {
                const c = colorMap[conv.color] ?? colorMap.gray;
                return (
                  <Link
                    key={conv.file}
                    href={conv.href}
                    className={`group block rounded-xl border p-4 transition-all hover:shadow-sm ${c.bg} ${c.border}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className={`text-sm font-bold font-mono ${c.text}`}>
                            {conv.file}
                          </code>
                          {conv.demo && (
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                              Live Demo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{conv.summary}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {conv.tags.filter((t) => t !== "Live Demo").map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${c.text} group-hover:translate-x-1 transition-transform`}>
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
