// Route: /docs/* (catch-all)
// File: app/docs/[...slug]/page.tsx
//
// [...slug] is a Catch-All Segment. It matches any number of path segments
// after /docs/ and provides them as an array: params.slug = ["a", "b", "c"]
//
// Try visiting:
//   /docs/getting-started/installation   → slug = ["getting-started", "installation"]
//   /docs/routing/nested                 → slug = ["routing", "nested"]
//   /docs/api/reference/hooks            → slug = ["api", "reference", "hooks"]

import Link from "next/link";

const docTree: Record<string, { title: string; content: string }> = {
  "getting-started/installation": {
    title: "Installation",
    content: "Install Next.js with: npx create-next-app@latest. This sets up TypeScript, Tailwind, ESLint, and the App Router automatically.",
  },
  "getting-started/project-structure": {
    title: "Project Structure",
    content: "The src/app directory contains your routes. public/ holds static assets. next.config.ts configures the framework.",
  },
  "routing/basics": {
    title: "Routing Basics",
    content: "Folders define route segments. page.tsx makes them public. layout.tsx wraps child segments.",
  },
  "routing/nested": {
    title: "Nested Routes",
    content: "Nest folders to create nested routes. Each level can have its own layout that composes with parent layouts.",
  },
  "routing/dynamic": {
    title: "Dynamic Routes",
    content: "Use [param] for dynamic segments. Use [...slug] for catch-all. Use [[...slug]] for optional catch-all.",
  },
  "api/reference/hooks": {
    title: "Hooks Reference",
    content: "usePathname(), useRouter(), useSearchParams(), useParams() — these Client Component hooks give access to routing state.",
  },
};

const exampleLinks = [
  { href: "/docs/getting-started/installation", label: "/docs/getting-started/installation" },
  { href: "/docs/getting-started/project-structure", label: "/docs/getting-started/project-structure" },
  { href: "/docs/routing/basics", label: "/docs/routing/basics" },
  { href: "/docs/routing/nested", label: "/docs/routing/nested" },
  { href: "/docs/routing/dynamic", label: "/docs/routing/dynamic" },
  { href: "/docs/api/reference/hooks", label: "/docs/api/reference/hooks" },
];

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const doc = docTree[key];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
      {/* Sidebar */}
      <aside className="w-56 shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-mono text-gray-400">Docs Nav</p>
          </div>
          <nav className="p-2 space-y-1">
            {exampleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                  link.href === `/docs/${key}`
                    ? "bg-red-50 text-red-700 font-semibold"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                /{slug?.join("/")} === {link.label.replace("/docs/", "")} ?
                {link.href === `/docs/${key}` ? " ✓" : ""}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <div className="mb-4">
          <span className="text-xs font-mono bg-red-100 text-red-800 px-2 py-1 rounded">
            Catch-All Route — [...slug]
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{doc ? doc.title : "Page Not Found in Docs"}</h1>
        <p className="text-gray-400 text-sm font-mono mb-6">/docs/{slug.join("/")}</p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-red-900 mb-2">How catch-all routes work</h3>
          <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-xs mb-3">
            <pre>{`// app/docs/[...slug]/page.tsx
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  // Current slug array: ${JSON.stringify(slug)}
  // Joined key: "${key}"
}`}</pre>
          </div>
          <div className="text-sm text-red-800 space-y-1">
            <p><strong>Current URL segments captured:</strong></p>
            <div className="flex gap-2 flex-wrap">
              {slug.map((segment, i) => (
                <span key={i} className="bg-white border border-red-200 px-2 py-1 rounded font-mono text-xs">
                  [{i}] = &quot;{segment}&quot;
                </span>
              ))}
            </div>
          </div>
        </div>

        {doc ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-600 leading-relaxed">{doc.content}</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-500 italic mb-4">
              No doc found for <code className="font-mono">/{key}</code>. Try one of these:
            </p>
            <div className="space-y-2">
              {exampleLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-blue-600 hover:underline font-mono">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
