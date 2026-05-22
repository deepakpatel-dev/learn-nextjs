// Route: /about
// File: app/about/page.tsx
// This is the simplest form of routing — a folder + page.tsx = a route.

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-6">
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Basic Route
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-gray-500 mb-8">URL: /about</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-lg mb-3">How this route works</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          This page exists because of the file{" "}
          <code className="bg-gray-100 px-1 rounded font-mono">app/about/page.tsx</code>.
          In the Next.js App Router, any folder inside <code className="bg-gray-100 px-1 rounded font-mono">app/</code>{" "}
          that contains a <code className="bg-gray-100 px-1 rounded font-mono">page.tsx</code> becomes a
          publicly accessible route.
        </p>
        <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-sm">
          <pre>{`src/app/
└── about/
    └── page.tsx   ← this file → URL: /about`}</pre>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-3">Key Rules</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Folder name becomes the URL segment
          </li>
          <li className="flex gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <code className="bg-gray-100 px-1 rounded font-mono">page.tsx</code> is what makes the route public
          </li>
          <li className="flex gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Server Component by default (no extra config needed)
          </li>
          <li className="flex gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Add <code className="bg-gray-100 px-1 rounded font-mono">layout.tsx</code> in the same folder to wrap only this route
          </li>
        </ul>
      </div>
    </div>
  );
}
