import DynamicImportDemo from "@/components/DynamicImportDemo";
import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

export default function DynamicImportsPage() {
  return (
    <div className="space-y-8">
      <MarkVisited slug="dynamic-imports" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 01 · High impact · JavaScript
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">Dynamic Imports</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Components not visible on initial load can be deferred with{" "}
          <code className="font-mono text-blue-700">next/dynamic</code>. Next.js splits
          them into a separate JS chunk that is only downloaded when the component is
          actually rendered — shrinking the initial bundle and improving TTI.
        </p>
      </div>

      {/* Live demo */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Live demo</p>
        <p className="text-xs text-gray-400 mb-4">
          Click the button and watch the chunk download + animation timer.
          Hide and re-load to see the browser cache at work.
        </p>
        <DynamicImportDemo />
      </div>

      {/* Before */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Without dynamic import</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// HeavyChart is bundled into the initial JS payload
// even if the user never opens the chart panel.
import HeavyChart from "@/components/HeavyChart";

export default function Page() {
  return <HeavyChart />;
}`}
        </pre>
      </div>

      {/* After */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">With dynamic import</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// HeavyChart is split into its own chunk — only downloaded on demand.
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <div>Loading chart…</div>,
  ssr: false, // skip server prerender (must be inside a Client Component)
});

export default function Page() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Chart</button>
      {show && <HeavyChart />}
    </>
  );
}`}
        </pre>
      </div>

      {/* Key points */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-3">Key points</h3>
        <ul className="space-y-1.5 text-blue-800">
          <li>
            <code className="font-mono">next/dynamic</code> is a composite of{" "}
            <code className="font-mono">React.lazy</code> +{" "}
            <code className="font-mono">Suspense</code>.
          </li>
          <li>
            <code className="font-mono">ssr: false</code> disables server prerendering.
            It must be used inside a Client Component (<code className="font-mono">"use client"</code>).
          </li>
          <li>
            Server Components are automatically code-split — dynamic imports only benefit{" "}
            <strong>Client Components</strong>.
          </li>
          <li>
            Provide a <code className="font-mono">loading</code> fallback to prevent layout
            shift while the chunk is being downloaded.
          </li>
          <li>
            On repeated loads the chunk is served from the browser cache — latency drops to
            near zero (as shown by the timer on second click).
          </li>
        </ul>
      </div>

      <TechniqueNav slug="dynamic-imports" />
    </div>
  );
}
