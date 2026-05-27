// This is the REAL slow page.tsx.
// It awaits a 2-second simulated fetch before rendering.
// While it's waiting, loading.tsx is shown automatically by Next.js.

import Link from "next/link";

// Simulates a slow API call or DB query
async function fetchSlowData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    title: "Next.js Release Notes",
    description: "Latest updates and improvements across the Next.js ecosystem.",
    articles: [
      {
        id: 1,
        title: "Next.js 16 — Partial Pre-Rendering stable",
        date: "15 Jan 2025",
        readTime: "6 min",
        tag: "Release",
      },
      {
        id: 2,
        title: "App Router performance improvements",
        date: "20 Dec 2024",
        readTime: "4 min",
        tag: "Performance",
      },
      {
        id: 3,
        title: "Turbopack reaches general availability",
        date: "10 Dec 2024",
        readTime: "5 min",
        tag: "Tooling",
      },
      {
        id: 4,
        title: "Server Actions: new onRequestError hook",
        date: "01 Dec 2024",
        readTime: "3 min",
        tag: "Server Actions",
      },
    ],
  };
}

export default async function LoadingDemoPage() {
  // This await triggers the Suspense boundary.
  // loading.tsx is shown while this resolves.
  const data = await fetchSlowData();

  return (
    <div className="space-y-6">
      {/* Success banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3 text-sm">
        <span className="text-lg">✅</span>
        <div>
          <p className="font-semibold text-purple-900">
            Page loaded — <code className="font-mono">loading.tsx</code> dismissed
          </p>
          <p className="text-purple-700 text-xs mt-0.5">
            The skeleton shown during the 2-second wait was{" "}
            <code className="font-mono">loading.tsx</code>. This content is from{" "}
            <code className="font-mono">page.tsx</code>.
          </p>
        </div>
      </div>

      {/* Simulated content */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.title}</h1>
        <p className="text-gray-500 text-sm">{data.description}</p>
      </div>

      <div className="space-y-3">
        {data.articles.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                  {article.tag}
                </span>
              </div>
              <h2 className="font-semibold text-gray-900 text-sm">{article.title}</h2>
            </div>
            <div className="text-right text-xs text-gray-400 font-mono shrink-0 ml-4">
              <p>{article.date}</p>
              <p>{article.readTime} read</p>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-1">What happened?</p>
        <ol className="space-y-1 text-xs list-decimal list-inside">
          <li>You navigated to this page → Next.js streamed the response.</li>
          <li><code className="font-mono">loading.tsx</code> rendered immediately as the Suspense fallback.</li>
          <li><code className="font-mono">fetchSlowData()</code> resolved after 2 seconds.</li>
          <li>React swapped in this content, dismissing the skeleton.</li>
        </ol>
      </div>

      <div className="flex gap-3">
        <Link
          href="/file-conventions/loading/demo"
          className="text-sm text-purple-600 hover:text-purple-800 transition-colors font-medium"
        >
          ↺ Reload demo (see skeleton again)
        </Link>
        <Link
          href="/file-conventions/loading"
          className="text-sm text-gray-400 hover:text-blue-600 transition-colors"
        >
          ← Back to loading.js
        </Link>
      </div>
    </div>
  );
}
