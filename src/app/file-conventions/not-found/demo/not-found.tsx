// This is the REAL not-found.tsx — a Server Component.
// It renders when notFound() is called in page.tsx (or any child).
// Scoped to this route segment and below.

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-5">
      {/* File indicator */}
      <div className="bg-gray-900 text-gray-300 rounded-xl px-4 py-2 text-xs font-mono flex items-center gap-2">
        <span className="text-orange-400">●</span>
        not-found.tsx — rendered by notFound()
      </div>

      {/* 404 UI */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-orange-900 mb-2">Product not found</h2>
        <p className="text-orange-700 text-sm mb-1">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <p className="text-orange-500 text-xs font-mono mb-6">
          notFound() was called in page.tsx
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/file-conventions/not-found/demo"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            ← Back to existing product
          </Link>
          <Link
            href="/file-conventions/not-found"
            className="px-4 py-2 bg-white border border-orange-200 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
          >
            View not-found.js docs
          </Link>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">What just happened?</p>
        <ol className="space-y-1 text-xs list-decimal list-inside">
          <li><code className="font-mono">page.tsx</code> checked the <code className="font-mono">?notfound=1</code> search param.</li>
          <li>It called <code className="font-mono">notFound()</code> from <code className="font-mono">next/navigation</code>.</li>
          <li>Next.js rendered this <code className="font-mono">not-found.tsx</code> file instead.</li>
          <li>The parent layout (<code className="font-mono">file-conventions/layout.tsx</code>) is still active — this is scoped, not global.</li>
        </ol>
      </div>
    </div>
  );
}
