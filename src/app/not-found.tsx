// Global 404 — rendered when:
//   • A user navigates to a route that doesn't exist
//   • notFound() is called inside a Server Component
//   • A redirect's destination is unreachable (redirect chain ends here)
//
// Next.js looks for the nearest not-found.tsx up the segment tree.
// This root-level file is the final fallback for the whole app.

import Link from "next/link";

const suggestedRoutes = [
  { href: "/", label: "Home", desc: "Back to the overview" },
  { href: "/blog", label: "Blog", desc: "Browse all posts" },
  { href: "/dashboard", label: "Dashboard", desc: "Your dashboard" },
  { href: "/redirects", label: "Redirects Demo", desc: "See redirect examples" },
  { href: "/docs/getting-started/installation", label: "Docs", desc: "Documentation" },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">

        {/* Status code */}
        <div className="mb-6">
          <span className="text-8xl font-black text-gray-100 select-none">404</span>
        </div>

        {/* Explanation badge */}
        <div className="mb-4">
          <span className="text-xs font-mono bg-red-100 text-red-700 px-3 py-1 rounded-full">
            app/not-found.tsx — global fallback
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-3 text-gray-900">Page not found</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The route you visited doesn&apos;t exist, a redirect had no matching condition,
          or <code className="font-mono bg-gray-100 px-1 rounded">notFound()</code> was
          called in a Server Component. Next.js renders this file as the error UI.
        </p>

        {/* How it works box */}
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs text-left mb-8">
          <p className="text-gray-500 mb-2"># When does Next.js render not-found.tsx?</p>
          <pre>{`1. Route doesn't exist in the file system
   e.g. /this-page-does-not-exist

2. notFound() called inside a Server Component
   import { notFound } from "next/navigation"
   if (!data) notFound()

3. has-based redirect condition not met — no
   redirect fires, route itself doesn't exist
   e.g. /admin (no ?role=admin query param)`}</pre>
        </div>

        {/* Suggested routes */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-left">
            <p className="text-xs font-medium text-gray-500">Valid routes in this project</p>
          </div>
          <div className="divide-y divide-gray-100">
            {suggestedRoutes.map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <span className="text-xs font-mono text-gray-400">{href}</span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          ← Go home
        </Link>
      </div>
    </div>
  );
}
