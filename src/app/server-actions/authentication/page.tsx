// Route: /server-actions/authentication
// Server Component — reads cookies server-side to show auth state.

import { cookies } from "next/headers";
import AuthForm from "./AuthForm";
import LoggedIn from "./LoggedIn";

export default async function AuthenticationPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("sa_auth_token");
  const isLoggedIn = !!token;
  const username = token?.value.split(":")[0] ?? "";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">
          cookies() + redirect() in Server Action
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Authentication</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Login via a Server Action that validates credentials, sets an{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">httpOnly</code> cookie
          using <code className="font-mono bg-gray-100 px-1 rounded">cookies()</code> from{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">next/headers</code>, and
          redirects — all without an API route.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: form or logged-in state */}
        <div>
          {isLoggedIn ? (
            <LoggedIn username={username} tokenValue={token?.value ?? ""} />
          ) : (
            <AuthForm justLoggedIn={status === "success"} />
          )}
        </div>

        {/* Right: explanation */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">Server Action vs API Route</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`// ── API Route approach (middleware + route.ts) ──────
// middleware.ts validates → route.ts sets cookie

// ── Server Action approach (this page) ──────────────
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username !== "admin" || password !== "secret123")
    return { error: "Invalid credentials" };

  // Set cookie directly — no NextResponse needed
  const jar = await cookies();
  jar.set("sa_auth_token", \`\${username}:\${uuid()}\`, {
    httpOnly: true, sameSite: "lax", maxAge: 86400,
  });

  redirect("/server-actions/authentication?status=success");
}`}</pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">Reading the cookie server-side</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`// Server Component can read cookies directly
import { cookies } from "next/headers";

export default async function Page() {
  const jar   = await cookies();
  const token = jar.get("sa_auth_token");

  if (!token) return <LoginForm />;
  return <LoggedInView username={token.value} />;
}`}</pre>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
            <p className="text-xs font-mono text-purple-700">
              <strong>Credentials:</strong> admin / secret123<br />
              <strong>Cookie name:</strong> sa_auth_token (separate from middleware auth_token)<br />
              <strong>redirect()</strong> must be called outside try/catch — it throws internally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
