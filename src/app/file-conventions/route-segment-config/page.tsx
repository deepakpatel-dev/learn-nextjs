import Link from "next/link";

export default function RouteSegmentConfigPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Route Segment Config</h1>
        <p className="text-gray-500 leading-relaxed">
          Module-level exports in <code className="font-mono text-sm bg-gray-100 px-1 rounded">page.tsx</code>,{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">layout.tsx</code>, or{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">route.ts</code> that configure how
          Next.js builds and runs that segment.
        </p>
      </div>

      {/* Options table */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Available options (Next.js 16)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">Option</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">Type</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">Default</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                {
                  option: "runtime",
                  type: "'nodejs' | 'edge'",
                  defaultVal: "'nodejs'",
                  desc: "Runtime environment. Edge is faster cold-start, smaller bundle, limited APIs.",
                },
                {
                  option: "dynamicParams",
                  type: "boolean",
                  defaultVal: "true",
                  desc: "When false, visiting a dynamic segment not in generateStaticParams returns 404.",
                },
                {
                  option: "preferredRegion",
                  type: "'auto' | 'global' | 'home' | string[]",
                  defaultVal: "'auto'",
                  desc: "Edge region preference for deployment platforms that support it.",
                },
                {
                  option: "maxDuration",
                  type: "number",
                  defaultVal: "Platform default",
                  desc: "Maximum execution time in seconds before the function times out.",
                },
              ].map((row) => (
                <tr key={row.option}>
                  <td className="px-4 py-3 font-mono text-slate-700 font-medium text-xs">{row.option}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-blue-600">{row.defaultVal}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Removed in v16 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
        <p className="font-semibold text-amber-900 mb-2">⚠ Removed in Next.js 16</p>
        <p className="text-amber-800 text-xs mb-2">
          When <code className="font-mono">cacheComponents</code> is enabled in{" "}
          <code className="font-mono">next.config.ts</code>, the following options are no longer supported:
        </p>
        <div className="flex flex-wrap gap-2">
          {["dynamic", "revalidate", "fetchCache"].map((opt) => (
            <code key={opt} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono line-through">
              {opt}
            </code>
          ))}
        </div>
        <p className="text-amber-700 text-xs mt-2">
          Also: <code className="font-mono">experimental_ppr</code> has been removed — PPR is stable in v16.
        </p>
      </div>

      {/* Code examples */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Usage examples</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Edge runtime API route",
              code: `// app/api/geo/route.ts
export const runtime = "edge";

export async function GET(req: Request) {
  const region = (req as any).geo?.region;
  return Response.json({ region });
}`,
            },
            {
              title: "Strict static params",
              code: `// app/blog/[slug]/page.tsx
export const dynamicParams = false;
// ^ 404 for any slug not in generateStaticParams

export async function generateStaticParams() {
  return [
    { slug: "hello" },
    { slug: "world" },
  ];
}`,
            },
            {
              title: "Long-running function",
              code: `// app/api/ai/route.ts
// Allow up to 5 minutes for AI inference
export const maxDuration = 300;

export async function POST(req: Request) {
  const result = await runLLM(await req.json());
  return Response.json(result);
}`,
            },
            {
              title: "Edge middleware replacement",
              code: `// app/dashboard/page.tsx
export const runtime = "edge";
// This page runs on the edge — closer to
// users, near-instant cold start.
// No Node.js APIs (fs, crypto, etc.).`,
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">{item.title}</p>
              <pre className="bg-gray-50 rounded p-2 text-xs overflow-x-auto leading-relaxed">{item.code}</pre>
            </div>
          ))}
        </div>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
