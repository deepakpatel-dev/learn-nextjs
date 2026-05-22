"use client";

// Route: /login
// This is a Client Component because it uses useState and event handlers.
//
// Flow when user submits:
//   1. fetch POST /api/auth/login  {username, password}
//   2. middleware.ts intercepts → validates credentials
//      ✓ valid   → NextResponse.next() → route.ts runs → 200 Welcome
//      ✗ invalid → middleware returns 401 directly → route.ts never runs

import { useState } from "react";
import { useRouter } from "next/navigation";

type Result = {
  success: boolean;
  message: string;
  handledBy?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: Result = await res.json();
      setResult(data);

      // On success navigate to dashboard after a brief delay so the
      // user can see the Welcome message before being redirected
      if (data.success) {
        setTimeout(() => router.push("/dashboard"), 1500);
      }
    } catch {
      setResult({ success: false, message: "Network error — is the server running?" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            middleware.ts + app/api/auth/login/route.ts
          </span>
          <h1 className="text-3xl font-bold mt-4 mb-2">Login</h1>
          <p className="text-gray-500 text-sm">
            Credentials are validated by middleware before the route handler runs.
          </p>
        </div>

        {/* Hint box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-6 font-mono text-xs">
          <p className="text-gray-400 mb-2"># Test credentials</p>
          <div className="flex justify-between">
            <span className="text-gray-600">Username:</span>
            <span className="font-semibold text-gray-900">admin</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Password:</span>
            <span className="font-semibold text-gray-900">secret123</span>
          </div>
          <p className="text-gray-400 mt-2"># Try wrong values to see middleware block the request</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Authenticating…" : "Login"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div
            className={`mt-5 rounded-xl border p-5 ${
              result.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{result.success ? "✓" : "✗"}</span>
              <div>
                <p
                  className={`font-semibold text-sm mb-1 ${
                    result.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result.message}
                </p>
                {result.handledBy && (
                  <p className="text-xs text-green-600 font-mono">{result.handledBy}</p>
                )}
                {!result.success && (
                  <p className="text-xs text-red-500 font-mono mt-1">
                    Blocked by middleware.ts — route.ts was never called
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Flow diagram */}
        <div className="mt-8 bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs">
          <p className="text-gray-500 mb-3"># Request flow</p>
          <pre>{`POST /api/auth/login
        │
        ▼
┌───────────────────┐
│   middleware.ts   │  ← runs FIRST on Edge
│                   │
│  check username   │
│  check password   │
└─────────┬─────────┘
          │
    ┌─────┴──────┐
    │            │
  valid       invalid
    │            │
    ▼            ▼
route.ts     401 response
runs         (route never runs)
    │
    ▼
200 Welcome`}</pre>
        </div>
      </div>
    </div>
  );
}
