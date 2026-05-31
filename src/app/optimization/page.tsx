import Link from "next/link";
import ProgressIndicator from "@/components/ProgressIndicator";

type Impact = "High" | "Medium" | "Low";

const techniques = [
  {
    number: "01",
    title: "Dynamic Imports",
    href: "/optimization/dynamic-imports",
    description:
      "Lazy load Client Components not needed on initial render using next/dynamic. Next.js splits them into separate chunks downloaded on demand.",
    impact: "High" as Impact,
    tag: "JavaScript",
  },
  {
    number: "02",
    title: "Choose the Right Image Format",
    href: "/optimization/images",
    description:
      "Use SVG for icons and logos. Use WebP for photos — it is 25–75% smaller than JPEG or PNG with equivalent quality.",
    impact: "High" as Impact,
    tag: "Images",
  },
  {
    number: "03",
    title: "Optimize Large Contentful Paint (LCP)",
    href: "/optimization/lcp",
    description:
      "Never lazy-load the LCP element. Use preload={true} on the hero image and loading=\"eager\" to hit the 2.5 s LCP target.",
    impact: "High" as Impact,
    tag: "Performance",
  },
  {
    number: "04",
    title: "Lazy Load Images",
    href: "/optimization/lazy-loading",
    description:
      "next/image lazy-loads by default. For native <img> elements use loading=\"lazy\" to defer off-screen images until they near the viewport.",
    impact: "Medium" as Impact,
    tag: "Images",
  },
  {
    number: "05",
    title: "Intersection Observer API",
    href: "/optimization/intersection-observer",
    description:
      "Use the browser's IntersectionObserver API to render off-screen sections only when they enter the viewport, shrinking initial DOM size.",
    impact: "Medium" as Impact,
    tag: "JavaScript",
  },
  {
    number: "06",
    title: "Specific Imports",
    href: "/optimization/specific-imports",
    description:
      "Import only the function you need from large libraries. Tree-shaking removes the rest, but named barrel imports can block it.",
    impact: "High" as Impact,
    tag: "JavaScript",
  },
  {
    number: "07",
    title: "prefetch={false} in next/link",
    href: "/optimization/prefetch",
    description:
      "Disable automatic prefetching for low-priority or rarely visited routes so the browser does not download their JS bundles on page load.",
    impact: "Medium" as Impact,
    tag: "Network",
  },
  {
    number: "08",
    title: "Bundle Analyzer",
    href: "/optimization/bundle-analyzer",
    description:
      "Use npx next experimental-analyze (Turbopack) or @next/bundle-analyzer (Webpack) to visualize and shrink your JS bundles.",
    impact: "Low" as Impact,
    tag: "Tooling",
  },
];

const impactStyles: Record<Impact, string> = {
  High: "bg-red-50 text-red-700 border border-red-200",
  Medium: "bg-amber-50 text-amber-700 border border-amber-200",
  Low: "bg-green-50 text-green-700 border border-green-200",
};

const tagStyles: Record<string, string> = {
  JavaScript: "bg-yellow-50 text-yellow-700",
  Images: "bg-sky-50 text-sky-700",
  Performance: "bg-purple-50 text-purple-700",
  Network: "bg-teal-50 text-teal-700",
  Tooling: "bg-gray-100 text-gray-600",
};

export default function OptimizationPage() {
  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Module 06 — Optimization
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Bundle Optimization</h1>
        <p className="text-gray-500 leading-relaxed">
          Eight practical techniques to reduce JavaScript bundle size and improve Core Web
          Vitals in Next.js 16. Click any technique to see a live demo and code example.
        </p>
        <ProgressIndicator />
      </div>

      <div className="space-y-3">
        {techniques.map((t) => (
          <Link
            key={t.number}
            href={t.href}
            className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs">
              {t.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="font-semibold text-gray-900">{t.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${impactStyles[t.impact]}`}>
                  {t.impact} impact
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagStyles[t.tag] ?? "bg-gray-100 text-gray-600"}`}>
                  {t.tag}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{t.description}</p>
            </div>
            <div className="shrink-0 text-gray-300 group-hover:text-blue-400 transition-colors text-lg self-center">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
