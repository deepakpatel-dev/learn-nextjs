import Link from "next/link";

export default function LoadingFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">
          File Convention · Live Demo
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">loading.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Placing a <code className="font-mono text-sm bg-gray-100 px-1 rounded">loading.tsx</code> in
          a folder automatically wraps the <code className="font-mono text-sm bg-gray-100 px-1 rounded">page.tsx</code>{" "}
          in a <code className="font-mono text-sm bg-gray-100 px-1 rounded">{"<Suspense>"}</code> boundary.
          The loading UI is shown instantly while the page streams in from the server.
        </p>
      </div>

      {/* Live demo CTA */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
        <h2 className="font-semibold text-purple-900 mb-2">Try the live demo</h2>
        <p className="text-sm text-purple-800 mb-4">
          The demo page simulates a slow 2-second data fetch. When you navigate to it,{" "}
          <code className="font-mono">loading.tsx</code> renders immediately as a skeleton,
          then the real content replaces it.
        </p>
        <Link
          href="/file-conventions/loading/demo"
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Open slow demo page →
        </Link>
      </div>

      {/* How it works */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">How it works</h2>
        <div className="grid grid-cols-3 gap-3 text-sm text-center">
          {[
            { n: "1", color: "purple", title: "Navigate to route", body: "Browser requests /your-slow-page. The response starts streaming immediately." },
            { n: "2", color: "amber", title: "loading.tsx renders", body: "Next.js shows your skeleton/spinner while the page.tsx awaits data." },
            { n: "3", color: "green", title: "Content swaps in", body: "Once page.tsx finishes, React replaces the fallback with the real UI." },
          ].map(({ n, color, title, body }) => (
            <div key={n} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg
                ${color === "purple" ? "bg-purple-100 text-purple-700" : color === "amber" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                {n}
              </div>
              <p className="font-semibold text-gray-800 mb-1">{title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The two files */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">The two files in action</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/file-conventions/loading/demo/loading.tsx</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`// loading.tsx — shown immediately
export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-32 bg-gray-200 rounded" />
    </div>
  );
}`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/file-conventions/loading/demo/page.tsx</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`// page.tsx — slow server component
async function fetchSlowData() {
  // simulate 2s network call
  await new Promise(r => setTimeout(r, 2000));
  return { title: "Data loaded!", items: [...] };
}

export default async function DemoPage() {
  const data = await fetchSlowData();
  return <div>{data.title}</div>;
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Key points */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-3">Key points</h3>
        <ul className="space-y-2 text-blue-800">
          <li>✦ <code className="font-mono">loading.tsx</code> is prefetched alongside the page — navigation feels instant.</li>
          <li>✦ Navigation is <strong>interruptible</strong> — you can navigate away before the page finishes loading.</li>
          <li>✦ Shared layouts stay interactive while the new page loads.</li>
          <li>✦ <code className="font-mono">loading.tsx</code> does <strong>not</strong> wrap <code className="font-mono">layout.tsx</code> — only <code className="font-mono">page.tsx</code> and nested children.</li>
          <li>✦ You can also add granular <code className="font-mono">{"<Suspense>"}</code> boundaries directly inside pages for individual data waterfalls.</li>
        </ul>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
