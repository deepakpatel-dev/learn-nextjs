// This is the REAL error.tsx — a Client Component error boundary.
// It renders when page.tsx (or any child) throws during rendering.
// Next.js passes `error` and `unstable_retry` as props automatically.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    // In a real app: send to Sentry, Datadog, etc.
    console.error("[error.tsx] caught:", error.message, "digest:", error.digest);
  }, [error]);

  function handleRetry() {
    setRetrying(true);
    // unstable_retry() re-fetches and re-renders the entire segment
    unstable_retry();
  }

  return (
    <div className="space-y-5">
      {/* This file indicator */}
      <div className="bg-gray-900 text-gray-300 rounded-xl px-4 py-2 text-xs font-mono flex items-center gap-2">
        <span className="text-red-400">●</span>
        error.tsx — error boundary active
      </div>

      {/* Error card */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          💥
        </div>
        <h2 className="text-xl font-bold text-red-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-700 text-sm mb-1 font-mono bg-red-100 px-3 py-1.5 rounded-lg inline-block max-w-full break-words">
          {error.message}
        </p>
        {error.digest && (
          <p className="text-red-500 text-xs mt-2">
            Error digest: <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleRetry}
          disabled={retrying}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {retrying ? "Retrying…" : "↺ Try again"}
        </button>
        <Link
          href="/file-conventions/error/demo"
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors"
        >
          ← Back to healthy state
        </Link>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">What just happened?</p>
        <ol className="space-y-1 text-xs list-decimal list-inside">
          <li><code className="font-mono">page.tsx</code> threw during rendering (triggered by <code className="font-mono">?crash=1</code>).</li>
          <li>Next.js caught it at the nearest <code className="font-mono">error.tsx</code> boundary.</li>
          <li>This component rendered as the fallback UI.</li>
          <li>
            Click <strong>Try again</strong> to call <code className="font-mono">unstable_retry()</code> —
            it re-fetches and re-renders <code className="font-mono">page.tsx</code>.
          </li>
        </ol>
      </div>

      <div className="text-center">
        <Link
          href="/file-conventions/error"
          className="text-sm text-gray-400 hover:text-blue-600 transition-colors"
        >
          ← Back to error.js overview
        </Link>
      </div>
    </div>
  );
}
