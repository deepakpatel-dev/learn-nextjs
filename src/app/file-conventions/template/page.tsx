import Link from "next/link";

export default function TemplateFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-1 rounded">
          File Convention · Live Demo
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">template.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Like <code className="font-mono text-sm bg-gray-100 px-1 rounded">layout.js</code>,
          but receives a <strong>unique key on every navigation</strong>. This means the
          component remounts — resetting all client state and re-running effects.
        </p>
      </div>

      {/* Live demo CTA */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="font-semibold text-amber-900 mb-2">Try the live demo</h2>
        <p className="text-sm text-amber-800 mb-4">
          The demo has a counter inside <code className="font-mono">template.tsx</code>.
          Increment it, then navigate between Page A and Page B — the counter resets on
          each navigation. A layout would preserve it.
        </p>
        <Link
          href="/file-conventions/template/demo"
          className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
        >
          Open template.js demo →
        </Link>
      </div>

      {/* Comparison table */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <code className="font-mono">layout.js</code> vs{" "}
          <code className="font-mono">template.js</code>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">Behaviour</th>
                <th className="text-left px-4 py-2 font-semibold text-blue-700 border-b border-gray-200 font-mono">layout.js</th>
                <th className="text-left px-4 py-2 font-semibold text-amber-700 border-b border-gray-200 font-mono">template.js</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                ["Remounts on navigation", "Never", "Always (unique key)"],
                ["Client useState", "Preserved", "Reset to initial value"],
                ["useEffect", "Runs once on mount", "Re-runs on each navigation"],
                ["Suspense fallback", "First load only", "Every navigation"],
                ["DOM recreation", "No", "Yes — full remount"],
                ["Best for", "Nav bars, sidebars", "Page transitions, input resets, per-route analytics"],
              ].map(([behaviour, layout, template]) => (
                <tr key={behaviour}>
                  <td className="px-4 py-2.5 text-gray-600 font-medium text-sm">{behaviour}</td>
                  <td className="px-4 py-2.5 text-blue-700 text-sm">{layout}</td>
                  <td className="px-4 py-2.5 text-amber-700 text-sm">{template}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">The template.tsx file</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/dashboard/template.tsx
// Server Component by default

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Everything here remounts on every navigation */}
      <PageTransitionWrapper>
        {children}
      </PageTransitionWrapper>
    </div>
  );
}

// ─────────────────────────────────────────────
// Or as a Client Component (to use hooks):

"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  // Runs on every navigation (because the template remounts)
  useEffect(() => {
    analytics.track("page_view", { path: pathname });
  }, [pathname]);

  return <>{children}</>;
}`}
        </pre>
      </div>

      {/* Component hierarchy note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">Position in the hierarchy</p>
        <p>
          <code className="font-mono">template.tsx</code> is rendered between{" "}
          <code className="font-mono">layout.tsx</code> and its children:
        </p>
        <pre className="mt-2 bg-blue-900/10 rounded p-2 text-xs font-mono text-blue-900">
{`<Layout>
  <Template key={routeSegment}>  {/* ← unique key → remount */}
    <Page />
  </Template>
</Layout>`}
        </pre>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
