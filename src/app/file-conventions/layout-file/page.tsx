import Link from "next/link";

export default function LayoutFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">layout.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Shared UI that wraps a route and all its children.{" "}
          <strong>State is preserved on navigation</strong> — the layout never unmounts.
        </p>
      </div>

      {/* Key facts */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm space-y-2 text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">Key facts</p>
        <p>✦ Must accept and render a <code className="font-mono">children</code> prop.</p>
        <p>✦ Server Component by default — can be <code className="font-mono">async</code> to fetch data.</p>
        <p>✦ Does <strong>not</strong> receive <code className="font-mono">searchParams</code> — layouts don't re-render on query changes.</p>
        <p>✦ The root <code className="font-mono">app/layout.tsx</code> must include <code className="font-mono">&lt;html&gt;</code> and <code className="font-mono">&lt;body&gt;</code>.</p>
        <p>✦ Layouts at the same segment level as <code className="font-mono">error.tsx</code> are <strong>not</strong> caught by it — use a parent error boundary.</p>
      </div>

      {/* Code example */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Basic usage</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />           {/* renders once, persists across navigation */}
      <main>{children}</main>  {/* ← page.tsx renders here */}
    </div>
  );
}`}
        </pre>
      </div>

      {/* layout vs template comparison */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <code className="font-mono">layout.js</code> vs{" "}
          <code className="font-mono">template.js</code>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">Feature</th>
                <th className="text-left px-4 py-2 font-semibold text-blue-700 border-b border-gray-200 font-mono">layout.js</th>
                <th className="text-left px-4 py-2 font-semibold text-amber-700 border-b border-gray-200 font-mono">template.js</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Mounted on navigation", "Once (persists)", "Every navigation (remounts)"],
                ["Client state reset", "No — state preserved", "Yes — state resets"],
                ["useEffect re-run", "No", "Yes — re-runs on nav"],
                ["Suspense fallback", "Shows once (first load)", "Shows on every navigation"],
                ["When to use", "Nav, sidebar, auth checks", "Page animations, form resets, per-page effects"],
              ].map(([feature, layout, template]) => (
                <tr key={feature} className="bg-white">
                  <td className="px-4 py-2.5 text-gray-600 font-medium">{feature}</td>
                  <td className="px-4 py-2.5 text-blue-700">{layout}</td>
                  <td className="px-4 py-2.5 text-amber-700">{template}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nesting */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Nested layouts</h2>
        <p className="text-sm text-gray-500 mb-3">
          Layouts nest automatically. Each layout wraps its segment and all children.
        </p>
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs leading-relaxed">
          <pre>{`app/
├── layout.tsx          ← RootLayout   (wraps everything)
│   ├── dashboard/
│   │   ├── layout.tsx  ← DashboardLayout (wraps dashboard pages)
│   │   ├── page.tsx    ← /dashboard
│   │   └── settings/
│   │       └── page.tsx ← /dashboard/settings
│   └── blog/
│       └── page.tsx    ← /blog (no extra layout here)`}</pre>
        </div>
      </div>

      {/* Live examples */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-gray-800 mb-2">See layouts in this project</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Root layout", href: "/" },
            { label: "Dashboard layout", href: "/dashboard" },
            { label: "Draft Mode layout", href: "/draft-mode" },
            { label: "template.js demo →", href: "/file-conventions/template" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
