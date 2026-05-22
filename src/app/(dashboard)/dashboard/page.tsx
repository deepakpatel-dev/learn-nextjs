// Route: /dashboard
// File: app/(dashboard)/dashboard/page.tsx
//
// Server Component — reads the auth_token cookie server-side via next/headers.
// Middleware already verified the cookie exists before this page runs.

import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  // Read cookie on the server — available because middleware let this request through
  const cookieStore = await cookies();
  const authToken   = cookieStore.get("auth_token");

  // Extract username from token value  (format: "username:uuid")
  const username = authToken?.value.split(":")[0] ?? "User";

  return (
    <div>
      {/* Auth status banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <div>
            <p className="text-sm font-semibold text-green-800">
              Authenticated as <span className="font-mono">{username}</span>
            </p>
            <p className="text-xs text-green-600 font-mono mt-0.5">
              auth_token cookie is present — middleware allowed this request
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Cookie details */}
      <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs mb-6">
        <p className="text-gray-500 mb-2"># Cookie set by route.ts after successful login</p>
        <div className="space-y-1">
          <p><span className="text-yellow-400">Name</span>      : auth_token</p>
          <p><span className="text-yellow-400">Value</span>     : {authToken?.value}</p>
          <p><span className="text-yellow-400">httpOnly</span>  : true  ← JS cannot read it (XSS protection)</p>
          <p><span className="text-yellow-400">sameSite</span>  : lax   ← CSRF protection</p>
          <p><span className="text-yellow-400">maxAge</span>    : 86400 ← expires in 24 hours</p>
          <p><span className="text-yellow-400">secure</span>    : {process.env.NODE_ENV === "production" ? "true  ← HTTPS only" : "false (dev mode)"}</p>
        </div>
      </div>

      {/* Route group explanation */}
      <div className="mb-4">
        <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
          Route Group — URL: /dashboard
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        File: <code className="font-mono">app/(dashboard)/dashboard/page.tsx</code>
      </p>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-orange-900 mb-3">Middleware cookie guard</h2>
        <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-xs">
          <pre>{`// middleware.ts
if (pathname.startsWith("/dashboard")) {
  const authToken = request.cookies.get("auth_token");
  if (!authToken) {
    // No cookie → redirect to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Cookie present → proceed
  return NextResponse.next();
}`}</pre>
        </div>
        <p className="text-xs text-orange-700 mt-3">
          Try opening an incognito window and navigating to <code className="font-mono bg-white px-1 rounded">/dashboard</code> directly — middleware will redirect you to <code className="font-mono bg-white px-1 rounded">/login</code>.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/dashboard/settings"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-sm transition-all"
        >
          <div className="text-2xl mb-2">⚙</div>
          <h3 className="font-semibold mb-1">Settings</h3>
          <p className="text-sm text-gray-500">/dashboard/settings</p>
        </Link>
        <Link
          href="/dashboard/profile"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-sm transition-all"
        >
          <div className="text-2xl mb-2">◎</div>
          <h3 className="font-semibold mb-1">Profile</h3>
          <p className="text-sm text-gray-500">/dashboard/profile</p>
        </Link>
      </div>
    </div>
  );
}
