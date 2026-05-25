import Link from "next/link";
import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

export default function PrefetchPage() {
  return (
    <div className="space-y-8">
      <MarkVisited slug="prefetch" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 07 · Medium impact · Network
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">
          prefetch=&#123;false&#125; in next/link
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          By default, <code className="font-mono text-blue-700">next/link</code> prefetches
          every linked route when the link enters the viewport. This is great for pages users
          are likely to visit, but wastes bandwidth and CPU on rarely visited routes. Disable
          it selectively with <code className="font-mono">prefetch=&#123;false&#125;</code>.
        </p>
      </div>

      {/* How prefetching works */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">How prefetching works in Next.js 16</h2>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-mono text-xs text-gray-400 mb-2">prefetch=&#123;null&#125; (default)</p>
            <p className="text-gray-600">
              Prefetches the static parts of the route when the link enters the viewport.
              Dynamic content is not prefetched.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-mono text-xs text-gray-400 mb-2">prefetch=&#123;true&#125;</p>
            <p className="text-gray-600">
              Prefetches <strong>all</strong> data for the route (including dynamic parts)
              when the link is in the viewport.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-mono text-xs text-gray-400 mb-2">prefetch=&#123;false&#125;</p>
            <p className="text-gray-600">
              Disables automatic prefetching. The route is still prefetched on{" "}
              <strong>hover</strong> — so navigation stays fast without wasting background
              bandwidth.
            </p>
          </div>
        </div>
      </div>

      {/* When to use */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">When to disable prefetching</h2>
        <div className="space-y-3 text-sm">
          {[
            {
              title: "Long nav bars / sidebars",
              desc: "If a sidebar has 20 links, prefetching all 20 routes on page load is wasteful. Most users click one.",
              example: `// optimization/layout.tsx — sidebar nav with many links
<Link href={href} prefetch={false}>
  {label}
</Link>`,
            },
            {
              title: "Rarely visited admin or settings pages",
              desc: "Pages like /account/billing or /admin/logs are visited infrequently. Prefetching them on every page load wastes data.",
              example: `<Link href="/admin/logs" prefetch={false}>
  System Logs
</Link>`,
            },
            {
              title: "External-feeling routes",
              desc: "Routes that open heavy dashboards or analytics pages with large JS chunks.",
              example: `<Link href="/analytics/deep-dive" prefetch={false}>
  Open Analytics
</Link>`,
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-500 mb-3">{item.desc}</p>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-x-auto leading-relaxed">
                {item.example}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Live demo */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          Live demo — hover to trigger prefetch
        </h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Open DevTools → Network → JS. The left link prefetches on viewport entry; the
          right link only prefetches on hover. Watch the difference in the Network tab.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-mono text-gray-400 mb-1">default — prefetches in viewport</p>
            <p className="text-xs text-gray-400 mb-3">Chunk downloads as soon as this link is visible</p>
            <Link
              href="/optimization/bundle-analyzer"
              className="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Bundle Analyzer →
            </Link>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-xs font-mono text-gray-400 mb-1">prefetch=&#123;false&#125; — only on hover</p>
            <p className="text-xs text-gray-400 mb-3">Chunk downloads only when you hover over the link</p>
            <Link
              href="/optimization/bundle-analyzer"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg transition-colors"
            >
              Bundle Analyzer (no auto-prefetch) →
            </Link>
          </div>
        </div>
      </div>

      {/* This layout uses prefetch={false} */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-2">Applied in this module</h3>
        <p className="text-blue-800 leading-relaxed">
          The sidebar navigation in <code className="font-mono">OptimizationNav.tsx</code>{" "}
          uses <code className="font-mono">prefetch=&#123;false&#125;</code> on every link.
          The sidebar contains 9 links; prefetching all 9 routes when the layout loads would
          waste bandwidth since users typically visit only 1–2 topics per session.
        </p>
      </div>

      <TechniqueNav slug="prefetch" />
    </div>
  );
}
