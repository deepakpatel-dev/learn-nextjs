import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Routing",
    status: "done",
    description:
      "File-system routing, nested routes, dynamic segments, route groups, catch-all routes, nested layouts, redirects, middleware, CORS, cookies, and i18n.",
    topics: [
      { label: "Basic & Nested Routing", href: "/about" },
      { label: "Dynamic Routes", href: "/blog/intro-to-nextjs" },
      { label: "Route Groups + Layouts", href: "/dashboard" },
      { label: "Catch-All Routes", href: "/docs/getting-started/installation" },
      { label: "Redirects (has-based) + 404", href: "/redirects" },
      { label: "Middleware — Auth, CORS, Cookies", href: "/login" },
      { label: "Internationalization (i18n)", href: "/en" },
    ],
  },
  {
    number: "02",
    title: "Data Fetching",
    status: "done",
    description:
      "getStaticProps (SSG), getServerSideProps (SSR), and getStaticPaths (dynamic SSG) — Pages Router data-fetching functions with live JSONPlaceholder demos.",
    topics: [
      { label: "Overview", href: "/data-fetching" },
      { label: "getStaticProps", href: "/data-fetching/static-props" },
      { label: "getServerSideProps", href: "/data-fetching/server-side-props" },
      { label: "getStaticPaths + [id]", href: "/data-fetching/posts/1" },
    ],
  },
  {
    number: "03",
    title: "Rendering",
    status: "soon",
    description:
      "Server Components vs Client Components, SSR, SSG, ISR, PPR (Partial Pre-rendering), and Streaming with Suspense.",
    topics: [
      { label: "Server vs Client Components", href: "#" },
      { label: "SSR / SSG / ISR", href: "#" },
      { label: "Streaming & Suspense", href: "#" },
      { label: "Partial Pre-rendering (PPR)", href: "#" },
    ],
  },
  {
    number: "04",
    title: "Styling",
    status: "soon",
    description:
      "Tailwind CSS, CSS Modules, global styles, CSS-in-JS, and the next/font optimization system.",
    topics: [
      { label: "Tailwind CSS", href: "#" },
      { label: "CSS Modules", href: "#" },
      { label: "next/font — Google & Local Fonts", href: "#" },
      { label: "CSS-in-JS (styled-components)", href: "#" },
    ],
  },
  {
    number: "05",
    title: "Optimization",
    status: "soon",
    description:
      "next/image, next/font, Script loading, metadata API, bundle analysis, lazy loading, and Core Web Vitals.",
    topics: [
      { label: "next/image", href: "#" },
      { label: "Metadata API (SEO)", href: "#" },
      { label: "Script & Third-party Optimization", href: "#" },
      { label: "Bundle Analysis", href: "#" },
    ],
  },
  {
    number: "06",
    title: "Configuration",
    status: "soon",
    description:
      "next.config.ts, environment variables, TypeScript config, ESLint, absolute imports, and custom webpack/turbopack setup.",
    topics: [
      { label: "next.config.ts deep dive", href: "#" },
      { label: "Environment Variables", href: "#" },
      { label: "TypeScript & Path Aliases", href: "#" },
      { label: "Custom Headers & Rewrites", href: "#" },
    ],
  },
  {
    number: "07",
    title: "Components & Patterns",
    status: "soon",
    description:
      "Error boundaries, loading UI, parallel routes, intercepting routes, Server Actions in forms, and composition patterns.",
    topics: [
      { label: "error.tsx & loading.tsx", href: "#" },
      { label: "Parallel & Intercepting Routes", href: "#" },
      { label: "Server Actions in Forms", href: "#" },
      { label: "Composition Patterns", href: "#" },
    ],
  },
  {
    number: "08",
    title: "Deploying",
    status: "soon",
    description:
      "Deploying to Vercel, Docker, Node.js server, and static export. CI/CD pipelines, preview deployments, and environment management.",
    topics: [
      { label: "Deploy to Vercel", href: "#" },
      { label: "Docker & Self-hosting", href: "#" },
      { label: "Static Export", href: "#" },
      { label: "CI/CD with GitHub Actions", href: "#" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Hero */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Learn Next.js</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          A hands-on reference repository covering every major Next.js topic —
          built module by module while learning, ready to explore in the browser.
        </p>
      </div>

      {/* Module grid */}
      <div className="space-y-5">
        {modules.map((mod) => {
          const done = mod.status === "done";
          return (
            <div
              key={mod.number}
              className={`rounded-2xl border p-6 transition-all ${
                done
                  ? "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
                  : "bg-gray-50 border-gray-200 opacity-75"
              }`}
            >
              <div className="flex items-start gap-5">
                {/* Module number */}
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
                    done ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {mod.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-semibold">{mod.title}</h2>
                    {done ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        ✓ Complete
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                        Coming soon
                      </span>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Topic links */}
                  <div className="flex flex-wrap gap-2">
                    {mod.topics.map((topic) =>
                      done ? (
                        <Link
                          key={topic.label}
                          href={topic.href}
                          className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          {topic.label}
                        </Link>
                      ) : (
                        <span
                          key={topic.label}
                          className="text-xs bg-gray-100 text-gray-400 border border-gray-200 px-3 py-1 rounded-full cursor-default"
                        >
                          {topic.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* File structure */}
      <div className="mt-14 bg-gray-900 text-gray-300 rounded-2xl p-6 font-mono text-xs">
        <p className="text-gray-500 mb-3"># Project structure</p>
        <pre>{`src/app/
├── page.tsx                       ← this page (learning path overview)
│
├── [01 — Routing]
│   ├── about/          blog/      contact/     docs/[...slug]/
│   ├── (dashboard)/               login/       redirects/
│   ├── [lang]/                    not-found.tsx
│   └── api/auth/login/ + logout/
│
├── [02 — Data Fetching]           (coming soon)
├── [03 — Rendering]               (coming soon)
├── [04 — Styling]                 (coming soon)
├── [05 — Optimization]            (coming soon)
├── [06 — Configuration]           (coming soon)
├── [07 — Components & Patterns]   (coming soon)
└── [08 — Deploying]               (coming soon)`}</pre>
      </div>
    </div>
  );
}
