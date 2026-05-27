// not-found/demo/page.tsx — Server Component
//
// When ?notfound=1 is in the URL, calls notFound().
// The not-found.tsx at this level renders as the 404 UI.

import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NotFoundDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ notfound?: string }>;
}) {
  const params = await searchParams;

  // Simulate a resource lookup that returns nothing
  if (params.notfound === "1") {
    notFound(); // ← triggers not-found.tsx
  }

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 text-sm">
        <span className="text-lg">✅</span>
        <div>
          <p className="font-semibold text-green-900">Resource found</p>
          <p className="text-green-700 text-xs mt-0.5">
            This page is rendering normally. Click the button below to simulate a missing resource.
          </p>
        </div>
      </div>

      {/* Fake product card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-3xl shrink-0">
            📦
          </div>
          <div>
            <p className="text-xs text-gray-400 font-mono mb-1">SKU: WIDGET-001</p>
            <h2 className="font-bold text-gray-900 text-lg mb-1">Premium Widget Pro</h2>
            <p className="text-gray-500 text-sm mb-2">
              A high-quality widget for all your widget needs. Available in 3 colors.
            </p>
            <p className="text-2xl font-bold text-gray-900">$49.99</p>
          </div>
        </div>
      </div>

      {/* Trigger not-found */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-sm">
        <p className="font-semibold text-orange-900 mb-2">Simulate a missing resource</p>
        <p className="text-orange-700 text-xs mb-3">
          This will navigate to <code className="font-mono">?notfound=1</code>. The server
          component calls <code className="font-mono">notFound()</code>, and the scoped{" "}
          <code className="font-mono">not-found.tsx</code> renders.
        </p>
        <Link
          href="/file-conventions/not-found/demo?notfound=1"
          className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          🔍 Simulate missing product
        </Link>
      </div>

      <Link
        href="/file-conventions/not-found"
        className="text-sm text-gray-400 hover:text-blue-600 transition-colors"
      >
        ← Back to not-found.js
      </Link>
    </div>
  );
}
