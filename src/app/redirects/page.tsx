// Route: /redirects
// Demo page that explains and lets you test both redirect features:
//   1. has-based redirects (query / cookie / header conditions in next.config.ts)
//   2. 404 fallback when no redirect fires and the route doesn't exist

import Link from "next/link";

// ─── Data ──────────────────────────────────────────────────────────────────

const hasRedirects = [
  {
    id: "query-version",
    type: "query",
    badge: "has: query",
    color: "blue",
    title: "Version query param",
    source: "/blog?version=legacy",
    destination: "/blog/intro-to-nextjs",
    condition: 'key: "version", value: "legacy"',
    explanation:
      'Any request to /blog that includes ?version=legacy in the URL is redirected to the intro post. Useful for retiring old URL patterns without breaking bookmarks.',
    configSnippet: `{
  source: "/blog",
  has: [{ type: "query", key: "version", value: "legacy" }],
  destination: "/blog/intro-to-nextjs",
  permanent: false,
}`,
    testHref: "/blog?version=legacy",
    testLabel: "Visit /blog?version=legacy",
  },
  {
    id: "query-search",
    type: "query",
    badge: "has: query",
    color: "blue",
    title: "Search query shortcut",
    source: "/search?q=routing",
    destination: "/blog/understanding-routing",
    condition: 'key: "q", value: "routing"',
    explanation:
      'A /search page doesn\'t exist, but if someone arrives with ?q=routing the redirect fires and sends them to the relevant post directly.',
    configSnippet: `{
  source: "/search",
  has: [{ type: "query", key: "q", value: "routing" }],
  destination: "/blog/understanding-routing",
  permanent: false,
}`,
    testHref: "/search?q=routing",
    testLabel: "Visit /search?q=routing",
  },
  {
    id: "query-role",
    type: "query",
    badge: "has: query",
    color: "blue",
    title: "Role-based gate",
    source: "/admin?role=admin",
    destination: "/dashboard",
    condition: 'key: "role", value: "admin"',
    explanation:
      '/admin doesn\'t exist as a page. When ?role=admin is present the redirect fires and the user lands on the dashboard. Without that param they hit the 404.',
    configSnippet: `{
  source: "/admin",
  has: [{ type: "query", key: "role", value: "admin" }],
  destination: "/dashboard",
  permanent: false,
}`,
    testHref: "/admin?role=admin",
    testLabel: "Visit /admin?role=admin (redirects ✓)",
    failHref: "/admin",
    failLabel: "Visit /admin without param (404 ✗)",
  },
  {
    id: "cookie-auth",
    type: "cookie",
    badge: "has: cookie",
    color: "purple",
    title: "Auth cookie guard",
    source: "/login",
    destination: "/dashboard",
    condition: 'key: "auth_token"  (any value)',
    explanation:
      'If the browser has an auth_token cookie the user is already logged in — redirect them away from /login to the dashboard. No cookie → /login page loads normally.',
    configSnippet: `{
  source: "/login",
  has: [{ type: "cookie", key: "auth_token" }],
  destination: "/dashboard",
  permanent: false,
}`,
    testHref: "/login",
    testLabel: "Visit /login (no cookie → 404, cookie → /dashboard)",
    cookieNote: true,
  },
  {
    id: "header-api",
    type: "header",
    badge: "has: header",
    color: "green",
    title: "API version header",
    source: "/docs/api",
    destination: "/docs/api/reference/hooks",
    condition: 'key: "x-api-version", value: "v1"',
    explanation:
      'Clients that send x-api-version: v1 are routed to the v1 hooks reference. In a browser you normally can\'t set custom headers on navigation, so this is best tested with curl.',
    configSnippet: `{
  source: "/docs/api",
  has: [{ type: "header", key: "x-api-version", value: "v1" }],
  destination: "/docs/api/reference/hooks",
  permanent: false,
}`,
    curlNote: true,
    curlCommand: `curl -L -H "x-api-version: v1" http://localhost:3000/docs/api`,
  },
];

const notFoundScenarios = [
  {
    label: "Route doesn't exist in file system",
    href: "/this-page-does-not-exist",
    desc: "No page.tsx at this path — Next.js renders not-found.tsx",
  },
  {
    label: "has condition not met → no redirect fires",
    href: "/admin",
    desc: "/admin has a redirect rule, but only when ?role=admin is present. Without it, no redirect fires and the route doesn't exist → 404",
  },
  {
    label: "Deeply nested missing route",
    href: "/blog/this-post-does-not-exist",
    desc: "The [slug] page calls notFound() when the slug isn't in the data set",
  },
];

// ─── Color maps ────────────────────────────────────────────────────────────

const cardColor: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200",
  purple: "bg-purple-50 border-purple-200",
  green: "bg-green-50 border-green-200",
};
const badgeColor: Record<string, string> = {
  blue: "bg-blue-600 text-white",
  purple: "bg-purple-600 text-white",
  green: "bg-green-600 text-white",
};
const titleColor: Record<string, string> = {
  blue: "text-blue-900",
  purple: "text-purple-900",
  green: "text-green-900",
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function RedirectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          next.config.ts → redirects() + app/not-found.tsx
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Redirects in Next.js</h1>
        <p className="text-gray-500 leading-relaxed">
          Two features at work here: <strong>has-based redirects</strong> fire conditionally based on query
          params, cookies, or headers configured in <code className="font-mono bg-gray-100 px-1 rounded">next.config.ts</code>.
          When no redirect fires and the route doesn&apos;t exist, Next.js renders{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">app/not-found.tsx</code>.
        </p>
      </div>

      {/* ── Section 1: has-based redirects ── */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-1">1 — has-based Redirects</h2>
        <p className="text-sm text-gray-500 mb-6">
          Defined in <code className="font-mono bg-gray-100 px-1 rounded">next.config.ts</code> via the{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">redirects()</code> async function.
          The <code className="font-mono bg-gray-100 px-1 rounded">has</code> array adds conditions —
          all conditions must match for the redirect to fire.
        </p>

        <div className="space-y-6">
          {hasRedirects.map((r) => (
            <div key={r.id} className={`rounded-xl border p-6 ${cardColor[r.color]}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${badgeColor[r.color]}`}>
                  {r.badge}
                </span>
                <h3 className={`font-semibold ${titleColor[r.color]}`}>{r.title}</h3>
              </div>

              {/* Route info */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-4">
                <div className="bg-white rounded-lg px-3 py-2 border border-white/60">
                  <p className="text-gray-400 mb-0.5">source</p>
                  <p className="font-medium">{r.source}</p>
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-white/60">
                  <p className="text-gray-400 mb-0.5">destination</p>
                  <p className="font-medium">{r.destination}</p>
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-white/60 col-span-2">
                  <p className="text-gray-400 mb-0.5">has condition</p>
                  <p className="font-medium">{r.condition}</p>
                </div>
              </div>

              <p className="text-sm mb-4 opacity-80">{r.explanation}</p>

              {/* Config snippet */}
              <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-xs mb-4">
                <pre>{r.configSnippet}</pre>
              </div>

              {/* Test links */}
              <div className="flex flex-wrap gap-3">
                {r.testHref && (
                  <Link
                    href={r.testHref}
                    className="inline-block text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors font-mono"
                  >
                    {r.testLabel}
                  </Link>
                )}
                {r.failHref && (
                  <Link
                    href={r.failHref}
                    className="inline-block text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors font-mono"
                  >
                    {r.failLabel}
                  </Link>
                )}
                {r.cookieNote && (
                  <div className="text-xs text-purple-700 bg-white/60 px-3 py-1.5 rounded-lg">
                    Set cookie in DevTools → Application → Cookies:<br />
                    <code>Name: auth_token | Value: abc123 | Domain: localhost</code>
                  </div>
                )}
                {r.curlNote && (
                  <div className="w-full">
                    <p className="text-xs text-green-800 mb-1">Test with curl:</p>
                    <code className="block bg-gray-900 text-green-400 text-xs px-3 py-2 rounded-lg font-mono">
                      {r.curlCommand}
                    </code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: 404 not-found ── */}
      <section>
        <h2 className="text-xl font-bold mb-1">2 — Custom 404 (not-found.tsx)</h2>
        <p className="text-sm text-gray-500 mb-6">
          When no redirect fires and the route doesn&apos;t exist in the file system,
          Next.js walks up the segment tree looking for the nearest{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">not-found.tsx</code>. The root-level file
          at <code className="font-mono bg-gray-100 px-1 rounded">app/not-found.tsx</code> is the global fallback.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-red-900 mb-3">When does not-found.tsx render?</h3>
          <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-xs mb-4">
            <pre>{`// 1. Route doesn't exist in the file system

// 2. Server Component explicitly calls notFound()
import { notFound } from "next/navigation";
if (!post) notFound();

// 3. has condition NOT met → no redirect fires,
//    and the source route itself doesn't exist`}</pre>
          </div>

          {/* 404 test scenarios */}
          <div className="space-y-3">
            {notFoundScenarios.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-start justify-between gap-4 bg-white border border-red-100 rounded-lg px-4 py-3 hover:border-red-300 hover:shadow-sm transition-all"
              >
                <div>
                  <p className="text-sm font-medium text-red-900">{s.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
                <code className="text-xs font-mono text-red-600 shrink-0 pt-0.5">{s.href}</code>
              </Link>
            ))}
          </div>
        </div>

        {/* Key difference box */}
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs">
          <p className="text-gray-500 mb-3"># Key difference</p>
          <pre>{`has redirect with condition MET
  → permanent/temporary HTTP redirect (301/307)
  → browser URL changes to destination

has redirect with condition NOT MET
  → no redirect fires
  → if source route also has no page.tsx → 404
  → Next.js renders not-found.tsx

Try it:
  /admin?role=admin  →  redirect fires  → /dashboard  ✓
  /admin             →  no redirect     → 404          ✗`}</pre>
        </div>
      </section>
    </div>
  );
}
