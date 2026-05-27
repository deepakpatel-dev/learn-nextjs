import Link from "next/link";

export default function ErrorFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-red-100 text-red-800 px-2 py-1 rounded">
          File Convention · Live Demo
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">error.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          An <code className="font-mono text-sm bg-gray-100 px-1 rounded">error.tsx</code> file
          creates a React Error Boundary around a route segment. When an error is thrown inside
          the segment, this component renders as the fallback UI.
        </p>
      </div>

      {/* Live demo CTA */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="font-semibold text-red-900 mb-2">Try the live demo</h2>
        <p className="text-sm text-red-800 mb-4">
          Navigate to the demo page, then click <strong>&ldquo;Crash this page&rdquo;</strong> to
          trigger a server error. The <code className="font-mono">error.tsx</code> boundary
          catches it and shows recovery UI. Click <strong>&ldquo;Try again&rdquo;</strong> to
          re-render the segment.
        </p>
        <Link
          href="/file-conventions/error/demo"
          className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Open error boundary demo →
        </Link>
      </div>

      {/* Key rules */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm space-y-2 text-red-800">
        <p className="font-semibold text-red-900 mb-2">Critical rules</p>
        <p>✦ <strong>Must be a Client Component</strong> — add <code className="font-mono">"use client"</code> at the top. Error boundaries use class lifecycle methods internally.</p>
        <p>✦ Does <strong>not</strong> catch errors in <code className="font-mono">layout.tsx</code> at the same level — only wraps <code className="font-mono">page.tsx</code> and children.</p>
        <p>✦ In production, server errors show a generic message. Use <code className="font-mono">error.digest</code> to match the server log entry.</p>
        <p>✦ <code className="font-mono">unstable_retry()</code> re-fetches and re-renders the boundary children — use it instead of <code className="font-mono">reset()</code>.</p>
      </div>

      {/* Code */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">The error.tsx file</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/dashboard/error.tsx
"use client";  // ← required — error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;  // re-fetches and re-renders the segment
}) {
  useEffect(() => {
    // Log to your error reporting service
    console.error("Error digest:", error.digest);
  }, [error]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-4 text-sm">
        {/* In production this will be generic — check server logs */}
        {error.message}
      </p>
      <button onClick={() => unstable_retry()}>
        Try again
      </button>
    </div>
  );
}`}
        </pre>
      </div>

      {/* Hierarchy */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">What error.tsx wraps</h2>
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs leading-relaxed">
          <pre>{`layout.tsx         ← NOT caught by error.tsx at same level
  └── template.tsx ← NOT caught
        └── error.tsx  ← wraps everything below ↓
              └── loading.tsx
                    └── not-found.tsx
                          └── page.tsx ← ✓ caught
                                └── children ← ✓ caught`}</pre>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          To catch errors in a layout, add <code className="font-mono">error.tsx</code> in the
          parent segment — or use <code className="font-mono">app/global-error.tsx</code> for
          the root layout.
        </p>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
