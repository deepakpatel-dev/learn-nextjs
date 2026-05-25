import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

export default function BundleAnalyzerPage() {
  return (
    <div className="space-y-8">
      <MarkVisited slug="bundle-analyzer" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 08 · Low impact · Tooling
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">Bundle Analyzer</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Before you can optimize your bundle you need to know what is in it. Next.js 16
          ships two analysis tools: an experimental built-in analyzer for Turbopack and the
          classic <code className="font-mono">@next/bundle-analyzer</code> plugin for Webpack.
        </p>
      </div>

      {/* Visual treemap mockup */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">What the analyzer shows</h2>
        <p className="text-sm text-gray-500 mb-4">
          The treemap visualizes every module in your bundle. Larger rectangles = more bytes.
          Red areas are opportunities to optimize.
        </p>
        <div className="border border-gray-200 rounded-xl overflow-hidden text-xs font-mono select-none">
          {/* Header */}
          <div className="bg-gray-800 text-gray-100 px-4 py-2 text-center text-sm font-sans font-semibold">
            Client Bundle — ~452 kB gzipped
          </div>
          {/* Top row */}
          <div className="flex h-32">
            <div className="bg-blue-100 border-r border-white flex flex-col items-center justify-center text-center p-3 gap-1" style={{ width: "41%" }}>
              <span className="font-bold text-blue-800 text-sm">next</span>
              <span className="text-blue-600">185 kB · 41%</span>
              <span className="text-blue-400 text-xs">framework runtime</span>
            </div>
            <div className="bg-violet-100 border-r border-white flex flex-col items-center justify-center text-center p-3 gap-1" style={{ width: "31%" }}>
              <span className="font-bold text-violet-800 text-sm">react + react-dom</span>
              <span className="text-violet-600">140 kB · 31%</span>
              <span className="text-violet-400 text-xs">renderer</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="bg-red-100 border-b border-white flex flex-col items-center justify-center text-center p-2 flex-1 gap-0.5">
                <span className="font-bold text-red-800">⚠ moment.js</span>
                <span className="text-red-600">67 kB · 15%</span>
                <span className="text-red-400 text-xs">replace with day.js (2 kB)</span>
              </div>
              <div className="bg-green-100 flex flex-col items-center justify-center text-center p-2 flex-1 gap-0.5">
                <span className="font-bold text-green-800">your app</span>
                <span className="text-green-600">60 kB · 13%</span>
                <span className="text-green-400 text-xs">src/ code</span>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex gap-6 text-gray-500 text-xs font-sans">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-300 shrink-0" /> potential optimization</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-300 shrink-0" /> your code</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-200 shrink-0" /> framework</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center italic">
          Approximate example — run the real analyzer for your actual bundle breakdown
        </p>
      </div>

      {/* Tool 1 — experimental */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          Tool 1 — Next.js experimental analyzer{" "}
          <span className="text-xs font-normal text-gray-400">(Turbopack, v16.1+)</span>
        </h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          No installation required. Runs a Turbopack build and opens an interactive module
          graph in the browser with precise import tracing.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# Run from the project root — no config changes needed.
npx next experimental-analyze

# The interactive UI opens automatically. You can:
#   • Filter by route, environment (client/server), and file type
#   • Click a module to trace its full import chain
#   • Find which page(s) pull in a given large dependency`}
        </pre>
      </div>

      {/* Tool 2 — @next/bundle-analyzer */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          Tool 2 — @next/bundle-analyzer{" "}
          <span className="text-xs font-normal text-gray-400">(Webpack)</span>
        </h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          The classic Webpack treemap visualizer. Already installed and configured in this
          project. Run <code className="font-mono">npm run analyze</code> to generate the
          report.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Step 1 — Install</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`npm install --save-dev @next/bundle-analyzer`}
            </pre>
          </div>

          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Step 2 — next.config.ts</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // ... your existing config
};

export default bundleAnalyzer(nextConfig);`}
            </pre>
          </div>

          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Step 3 — package.json script</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}`}
            </pre>
          </div>

          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">Step 4 — Run</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`npm run analyze
# Opens two treemap reports in your browser:
#   .next/analyze/client.html  — client-side bundle
#   .next/analyze/server.html  — server-side bundle`}
            </pre>
          </div>
        </div>
      </div>

      {/* What to look for */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">What to look for</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            {
              title: "⚠ Unexpectedly large dependencies",
              desc: "Find libraries over 10 kB gzipped that you only use a small part of.",
              action: "Replace: moment.js → day.js, lodash (whole) → lodash/fn, chart.js → recharts.",
              color: "border-red-200 bg-red-50",
            },
            {
              title: "⚠ Duplicate modules",
              desc: "Multiple versions of the same library bundled together (two copies of React or lodash from conflicting peer deps).",
              action: "Run npm dedupe or pin the version in package.json.",
              color: "border-orange-200 bg-orange-50",
            },
            {
              title: "⚠ Server-only code in client bundle",
              desc: 'Database clients, secret keys, Node APIs appearing in the client treemap.',
              action: 'Mark files with "server-only" import or move to Server Components.',
              color: "border-red-200 bg-red-50",
            },
            {
              title: "✓ Your app code is small",
              desc: "An icon library where only 3 icons are used but hundreds are included.",
              action: "Switch to specific imports or a smaller purpose-built package.",
              color: "border-gray-200 bg-white",
            },
          ].map((item) => (
            <div key={item.title} className={`border rounded-xl p-4 ${item.color}`}>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-500 mb-2">{item.desc}</p>
              <p className="text-blue-700 text-xs">
                <strong>Fix:</strong> {item.action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-green-900 mb-2">Already configured in this project</h3>
        <p className="text-green-800 leading-relaxed">
          <code className="font-mono">@next/bundle-analyzer</code> is installed and wired up
          in <code className="font-mono">next.config.ts</code>. The{" "}
          <code className="font-mono">analyze</code> script is in{" "}
          <code className="font-mono">package.json</code>. Run{" "}
          <code className="font-mono">npm run analyze</code> to inspect this project&apos;s
          bundles. Use <code className="font-mono">npx next experimental-analyze</code> for
          the Turbopack interactive graph.
        </p>
      </div>

      <TechniqueNav slug="bundle-analyzer" />
    </div>
  );
}
