import Link from "next/link";

export default function InstrumentationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-teal-100 text-teal-800 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">instrumentation.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          A server-side observability hook. Export a <code className="font-mono text-sm bg-gray-100 px-1 rounded">register()</code>{" "}
          function to initialize tracing, logging, or monitoring tools once when the
          Next.js server starts. Optionally export{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">onRequestError()</code>{" "}
          to capture server errors.
        </p>
      </div>

      {/* Key facts */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-sm space-y-2 text-teal-800">
        <p className="font-semibold text-teal-900 mb-2">Key facts</p>
        <p>✦ Place at the <strong>project root</strong> (or in <code className="font-mono">src/</code>) — not inside <code className="font-mono">app/</code>.</p>
        <p>✦ <code className="font-mono">register()</code> is called <strong>once</strong> per server instance — not on each request.</p>
        <p>✦ Works in both Node.js and Edge runtimes.</p>
        <p>✦ Use <code className="font-mono">process.env.NEXT_RUNTIME</code> to branch between runtimes.</p>
        <p>✦ Stable since Next.js 15. No experimental flag needed.</p>
      </div>

      {/* register() */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <code className="font-mono">register()</code> — initialize on server start
        </h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// src/instrumentation.ts  (or instrumentation.ts at project root)

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node.js only: OpenTelemetry, Sentry, Datadog, etc.
    const { registerOTel } = await import("@vercel/otel");
    registerOTel("my-next-app");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime: lighter-weight instrumentation
    await import("./register.edge");
  }
}`}
        </pre>
      </div>

      {/* onRequestError() */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <code className="font-mono">onRequestError()</code> — capture server errors
        </h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// src/instrumentation.ts
import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = async (
  err,      // Error & { digest: string }
  request,  // { path, method, headers }
  context   // { routerKind, routePath, routeType, renderType, ... }
) => {
  // Send to your error reporting service
  await fetch("https://errors.example.com/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      digest:    err.digest,
      message:   err.message,
      path:      request.path,
      method:    request.method,
      routeType: context.routeType,  // 'render' | 'route' | 'action' | 'proxy'
    }),
  });
};`}
        </pre>
      </div>

      {/* context fields */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <code className="font-mono">context</code> fields
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">Field</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                ["routerKind", "'Pages Router' | 'App Router'"],
                ["routePath", "e.g. /app/blog/[dynamic]"],
                ["routeType", "'render' | 'route' | 'action' | 'proxy'"],
                ["renderSource", "'react-server-components' | 'server-rendering' | …"],
                ["revalidateReason", "'on-demand' | 'stale' | undefined"],
                ["renderType", "'dynamic' | 'dynamic-resume'"],
              ].map(([field, values]) => (
                <tr key={field}>
                  <td className="px-3 py-2 font-mono text-teal-700">{field}</td>
                  <td className="px-3 py-2 text-gray-500">{values}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
