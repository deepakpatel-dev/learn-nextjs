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
    title: "Server Actions",
    status: "done",
    description:
      "Async server functions for form submission, data mutations, authentication (cookies + redirect), and background tasks — no API routes needed.",
    topics: [
      { label: "Overview",          href: "/server-actions" },
      { label: "Form Submission",   href: "/server-actions/form-submission" },
      { label: "Data Mutations",    href: "/server-actions/data-mutations" },
      { label: "Authentication",    href: "/server-actions/authentication" },
      { label: "Background Tasks",  href: "/server-actions/background-tasks" },
    ],
  },
  {
    number: "04",
    title: "Styling",
    status: "done",
    description:
      "Global stylesheets, CSS Modules (scoped class names, composes), and importing CSS directly from node_modules packages.",
    topics: [
      { label: "Overview",                       href: "/styling" },
      { label: "Global Stylesheets",             href: "/styling/global-styles" },
      { label: "CSS Modules",                    href: "/styling/css-modules" },
      { label: "Styles from node_modules",       href: "/styling/node-modules" },
      { label: "Specificity & Scoped Variables", href: "/styling/specificity" },
      { label: "Sass/SCSS",                      href: "styling/sass" },
    ],
  },
  {
    number: "05",
    title: "Optimization",
    status: "done",
    description:
      "Dynamic imports, image format selection, LCP optimization, lazy loading, Intersection Observer, specific imports, prefetch control, and bundle analysis.",
    topics: [
      { label: "Dynamic Imports", href: "/optimization/dynamic-imports" },
      { label: "Image Formats", href: "/optimization/images" },
      { label: "LCP Optimization", href: "/optimization/lcp" },
      { label: "Lazy Loading", href: "/optimization/lazy-loading" },
      { label: "Intersection Observer", href: "/optimization/intersection-observer" },
      { label: "Specific Imports", href: "/optimization/specific-imports" },
      { label: "Prefetch False", href: "/optimization/prefetch" },
      { label: "Bundle Analyzer", href: "/optimization/bundle-analyzer" },
    ],
  },
  {
    number: "06",
    title: "Draft Mode",
    status: "done",
    description:
      "Preview unpublished CMS content without affecting public visitors. Uses a signed cookie to bypass static cache and force dynamic rendering for authenticated editors.",
    topics: [
      { label: "Overview & Code",  href: "/draft-mode" },
      { label: "Live Preview Demo", href: "/draft-mode/preview" },
      { label: "Enable Draft Mode", href: "/api/draft?secret=demo-preview-secret" },
      { label: "Disable Draft Mode", href: "/api/draft/disable" },
    ],
  },
  {
    number: "07",
    title: "File Conventions",
    status: "done",
    description:
      "Special filenames in the app/ directory: page.js, layout.js, loading.js, error.js, not-found.js, template.js, route.js, default.js, instrumentation.js, middleware.js, Route Segment Config, and Metadata Files.",
    topics: [
      { label: "Overview",              href: "/file-conventions" },
      { label: "loading.js demo",       href: "/file-conventions/loading" },
      { label: "error.js demo",         href: "/file-conventions/error" },
      { label: "not-found.js demo",     href: "/file-conventions/not-found" },
      { label: "template.js demo",      href: "/file-conventions/template" },
      { label: "route.js",              href: "/file-conventions/route" },
      { label: "Route Segment Config",  href: "/file-conventions/route-segment-config" },
      { label: "Metadata Files",        href: "/file-conventions/metadata-files" },
    ],
  },
  {
    number: "08",
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
    number: "09",
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
    number: "10",
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
├── [02 — Data Fetching]           pages/data-fetching/
├── [03 — Server Actions]          server-actions/
├── [04 — Styling]                 styling/   global-styles/   css-modules/   node-modules/
├── [05 — Optimization]            optimization/
├── [06 — Draft Mode]              draft-mode/
├── [07 — File Conventions]        file-conventions/
├── [08 — Configuration]           (coming soon)
├── [09 — Components & Patterns]   (coming soon)
└── [10 — Deploying]               (coming soon)`}</pre>
      </div>
    </div>
  );
}
