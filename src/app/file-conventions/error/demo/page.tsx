// error/demo/page.tsx — Server Component
//
// When ?crash=1 is in the URL, this page throws a deliberate error.
// The error.tsx at this level catches it and shows recovery UI.
// Navigate here normally to see the "healthy" state.

import Link from "next/link";

export default async function ErrorDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ crash?: string }>;
}) {
  const params = await searchParams;

  // Trigger the error boundary
  if (params.crash === "1") {
    throw new Error(
      "Deliberate crash — triggered via ?crash=1 to demonstrate error.tsx"
    );
  }

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 text-sm">
        <span className="text-lg">✅</span>
        <div>
          <p className="font-semibold text-green-900">
            This page is healthy
          </p>
          <p className="text-green-700 text-xs mt-0.5">
            Click the button below to trigger an error and see{" "}
            <code className="font-mono">error.tsx</code> in action.
          </p>
        </div>
      </div>

      {/* Simulated page content */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Demo Dashboard</h2>
        <div className="grid grid-cols-3 gap-3 text-sm">
          {[
            { label: "Users", value: "1,284", delta: "+12%" },
            { label: "Revenue", value: "$24,680", delta: "+8%" },
            { label: "Uptime", value: "99.98%", delta: "Last 30d" },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-3">
              <p className="text-gray-500 text-xs">{stat.label}</p>
              <p className="font-bold text-gray-900 text-lg">{stat.value}</p>
              <p className="text-green-600 text-xs">{stat.delta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Crash trigger */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm">
        <p className="font-semibold text-red-900 mb-2">Crash this page</p>
        <p className="text-red-700 text-xs mb-3">
          This will navigate to <code className="font-mono">?crash=1</code>. The server
          component will throw, and <code className="font-mono">error.tsx</code> will catch it.
        </p>
        <Link
          href="/file-conventions/error/demo?crash=1"
          className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          💥 Crash this page
        </Link>
      </div>

      <Link
        href="/file-conventions/error"
        className="text-sm text-gray-400 hover:text-blue-600 transition-colors"
      >
        ← Back to error.js
      </Link>
    </div>
  );
}
