import Link from "next/link";

const ORDER = [
  { label: "Dynamic Imports", href: "/optimization/dynamic-imports" },
  { label: "Image Formats", href: "/optimization/images" },
  { label: "LCP Optimization", href: "/optimization/lcp" },
  { label: "Lazy Loading", href: "/optimization/lazy-loading" },
  { label: "Intersection Observer", href: "/optimization/intersection-observer" },
  { label: "Specific Imports", href: "/optimization/specific-imports" },
  { label: "Prefetch False", href: "/optimization/prefetch" },
  { label: "Bundle Analyzer", href: "/optimization/bundle-analyzer" },
];

export default function TechniqueNav({ slug }: { slug: string }) {
  const idx = ORDER.findIndex((t) => t.href.endsWith(slug));
  const prev = idx > 0 ? ORDER[idx - 1] : null;
  const next = idx < ORDER.length - 1 ? ORDER[idx + 1] : null;

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200 text-sm">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors"
        >
          ← {prev.label}
        </Link>
      ) : (
        <div />
      )}
      <Link
        href="/optimization"
        className="text-gray-400 hover:text-gray-600 transition-colors text-xs font-mono"
      >
        All techniques
      </Link>
      {next ? (
        <Link
          href={next.href}
          className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors"
        >
          {next.label} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
