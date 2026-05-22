// Route: /contact
// File: app/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-6">
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Basic Route
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-gray-500 mb-8">URL: /contact</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-lg mb-3">Route Convention</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Just like <code className="bg-gray-100 px-1 rounded font-mono">/about</code>, this page is defined by its
          file path. The folder name becomes the URL segment automatically.
        </p>
        <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-sm">
          <pre>{`src/app/
├── about/
│   └── page.tsx   ← /about
└── contact/
    └── page.tsx   ← /contact  (this page)`}</pre>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-3">Special Files in App Router</h2>
        <div className="space-y-3 text-sm">
          {[
            { file: "page.tsx", desc: "Unique UI for a route — makes it publicly accessible" },
            { file: "layout.tsx", desc: "Shared UI that wraps child routes (persists on navigation)" },
            { file: "loading.tsx", desc: "Loading UI shown while the page is streaming" },
            { file: "error.tsx", desc: "Error boundary for the route segment" },
            { file: "not-found.tsx", desc: "UI shown when notFound() is called" },
          ].map(({ file, desc }) => (
            <div key={file} className="flex gap-3">
              <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-purple-700 shrink-0">
                {file}
              </code>
              <span className="text-gray-600">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
