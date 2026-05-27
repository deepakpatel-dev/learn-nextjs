import Link from "next/link";

export default function MiddlewareFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">middleware.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Runs before every matching request — at the Edge, before the cache is checked.
          Use it for auth guards, CORS headers, redirects, rewrites, and cookie manipulation.
        </p>
      </div>

      {/* Key facts */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-sm space-y-2 text-indigo-800">
        <p className="font-semibold text-indigo-900 mb-2">Key facts</p>
        <p>✦ Lives at the <strong>project root</strong> (or <code className="font-mono">src/middleware.ts</code>) — not inside <code className="font-mono">app/</code>.</p>
        <p>✦ Runs on the <strong>Edge Runtime</strong> — no Node.js APIs (<code className="font-mono">fs</code>, <code className="font-mono">Buffer</code>, etc.).</p>
        <p>✦ Use the <code className="font-mono">matcher</code> export to scope which paths it runs on.</p>
        <p>✦ Can read/write cookies, set response headers, and redirect/rewrite requests.</p>
        <p>✦ Cannot return page content — use <code className="font-mono">NextResponse.next()</code> to continue.</p>
      </div>

      {/* Already explored */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <p className="font-semibold text-blue-900 mb-2">
          Already covered in Module 01 — Routing
        </p>
        <p className="text-blue-800 mb-3">
          This project has a full middleware demo covering auth guards, CORS headers, cookie
          inspection, and the <code className="font-mono">matcher</code> config.
        </p>
        <Link
          href="/login"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          See middleware demo (Module 01) →
        </Link>
      </div>

      {/* Core pattern */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Core pattern</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Auth guard — redirect to login if not authenticated
  const token = request.cookies.get("session")?.value;
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Add headers to all responses
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  return response;

  // 3. Rewrite (change URL without redirect)
  // return NextResponse.rewrite(new URL("/en" + pathname, request.url));
}

// Run only on these paths — skip _next/static, images, etc.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};`}
        </pre>
      </div>

      {/* What you can do */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">What middleware can do</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { icon: "🔐", title: "Auth & Authorization", desc: "Read session cookie/JWT, redirect unauthenticated users." },
            { icon: "🌐", title: "Internationalization", desc: "Detect Accept-Language header and rewrite to /[lang]/..." },
            { icon: "↩", title: "Redirects & Rewrites", desc: "Redirect old URLs, A/B test with rewrites, feature flags." },
            { icon: "🛡", title: "Security Headers", desc: "Set CSP, X-Frame-Options, CORS headers on every response." },
            { icon: "🍪", title: "Cookie Manipulation", desc: "Read, set, and delete cookies before the page renders." },
            { icon: "🚦", title: "Rate Limiting", desc: "Track IP via headers, redirect/block excessive requests." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span>{icon}</span>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
              </div>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
