import Link from "next/link";

export default function ParallelRoutesPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">Components & Patterns</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Parallel Routes</h1>
        <p className="text-gray-500 leading-relaxed">
          Render multiple pages simultaneously in the same layout using{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">@slot</code> folders.
          Each slot is independently navigable and can have its own loading/error states.
        </p>
      </div>

      {/* Key facts */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm space-y-2 text-green-800">
        <p className="font-semibold text-green-900 mb-2">Key facts</p>
        <p>✦ Slot folders use the <code className="font-mono">@name</code> convention — they <strong>don't affect the URL</strong>.</p>
        <p>✦ Slots are passed as props to the parent layout.</p>
        <p>✦ Each slot can have its own <code className="font-mono">loading.tsx</code> and <code className="font-mono">error.tsx</code>.</p>
        <p>✦ On hard navigation, unmatched slots need a <code className="font-mono">default.tsx</code> fallback.</p>
        <p>✦ Combines with Intercepting Routes to build shareable modals.</p>
      </div>

      {/* Folder structure */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Folder structure</h2>
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs leading-relaxed">
          <pre>{`app/
├── layout.tsx        ← receives @analytics and @team as props
├── page.tsx          ← /dashboard main content
├── @analytics/
│   ├── default.tsx   ← fallback on hard navigation
│   ├── page.tsx      ← renders alongside @team at /
│   └── revenue/
│       └── page.tsx  ← /revenue (shown in @analytics slot)
└── @team/
    ├── default.tsx
    ├── page.tsx
    └── settings/
        └── page.tsx  ← /settings (shown in @team slot)`}</pre>
        </div>
      </div>

      {/* Layout code */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">The layout receives slots as props</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/layout.tsx
export default function DashboardLayout({
  children,    // implicit slot — the page.tsx
  analytics,   // @analytics slot
  team,        // @team slot
}: {
  children:  React.ReactNode;
  analytics: React.ReactNode;
  team:      React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <main className="col-span-2">{children}</main>
      <aside>
        <div>{analytics}</div>  {/* renders @analytics/page.tsx */}
        <div>{team}</div>       {/* renders @team/page.tsx */}
      </aside>
    </div>
  );
}`}
        </pre>
      </div>

      {/* Use cases */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Common use cases</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { icon: "📊", title: "Analytics dashboard", desc: "Show multiple data panels simultaneously, each fetching independently." },
            { icon: "💬", title: "Split-view inbox", desc: "List on the left, selected message on the right — each a separate route." },
            { icon: "🖼️", title: "Photo gallery modal", desc: "Combined with intercepting routes to show photos in a modal with a shareable URL." },
            { icon: "👥", title: "Conditional UI", desc: "Show different content based on auth state without a full page change." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-xl p-3">
              <p className="text-xl mb-1">{icon}</p>
              <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional rendering */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Conditional rendering with slots</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/layout.tsx — show different content based on auth
import { getUser } from "@/lib/auth";

export default async function Layout({
  children,
  authenticated,
  unauthenticated,
}: {
  children:       React.ReactNode;
  authenticated:  React.ReactNode;
  unauthenticated: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div>
      {user ? authenticated : unauthenticated}
      {children}
    </div>
  );
}`}
        </pre>
      </div>

      <Link href="/components-patterns" className="text-sm text-gray-400 hover:text-green-600 transition-colors">← Components & Patterns overview</Link>
    </div>
  );
}
