import Link from "next/link";

export default function DefaultFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">default.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          A fallback UI for{" "}
          <strong>parallel route slots</strong> that have no active state after a hard page
          load (full browser refresh). Without <code className="font-mono">default.js</code>,
          unmatched slots return a 404 error on hard navigation.
        </p>
      </div>

      {/* What are parallel routes? */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
        <p className="font-semibold text-gray-800 mb-2">Context: Parallel Routes</p>
        <p className="text-gray-600 mb-3">
          Parallel routes let you render multiple pages in the same layout simultaneously.
          Slots are defined with the <code className="font-mono">@folder</code> naming convention.
        </p>
        <pre className="bg-gray-900 text-gray-300 rounded-xl p-4 text-xs font-mono">
{`app/
├── layout.tsx        ← receives @team and @analytics as props
├── @team/
│   ├── default.js    ← fallback for @team slot
│   └── settings/
│       └── page.tsx
└── @analytics/
    └── default.js    ← fallback for @analytics slot
    └── page.tsx`}
        </pre>
      </div>

      {/* Why it's needed */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Why <code className="font-mono">default.js</code> is needed</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-semibold text-blue-900 mb-2">Soft navigation (client-side)</p>
            <p className="text-blue-800 text-xs leading-relaxed">
              Next.js tracks the active sub-page for each slot in memory.
              If you navigate to <code className="font-mono">/settings</code>, the{" "}
              <code className="font-mono">@team</code> slot shows the settings page while{" "}
              <code className="font-mono">@analytics</code> keeps whatever was active.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-semibold text-amber-900 mb-2">Hard navigation (full-page load)</p>
            <p className="text-amber-800 text-xs leading-relaxed">
              On a browser refresh at <code className="font-mono">/settings</code>, the{" "}
              <code className="font-mono">@analytics</code> slot has no URL to match.
              Without <code className="font-mono">default.js</code>, Next.js returns 404.
              With it, the default component renders as the fallback.
            </p>
          </div>
        </div>
      </div>

      {/* Code */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Usage</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/layout.tsx</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`export default function Layout({
  children,
  team,
  analytics,
}: {
  children:  React.ReactNode;
  team:      React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
      <aside>{team}</aside>
      <aside>{analytics}</aside>
    </div>
  );
}`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/@analytics/default.tsx</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`// Rendered when @analytics slot has no
// active page for the current URL
export default function Default() {
  return (
    <div className="p-4 text-gray-500">
      <p>Select a page to see analytics.</p>
    </div>
  );
}

// Or: return 404 for this slot
import { notFound } from "next/navigation";
export default function Default() {
  notFound();
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-1">Note on children</p>
        <p>
          The implicit <code className="font-mono">children</code> slot also needs a{" "}
          <code className="font-mono">default.js</code> if there are parallel routes at the same
          level — otherwise a hard reload of a slot-specific URL will 404 on the children slot.
        </p>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
