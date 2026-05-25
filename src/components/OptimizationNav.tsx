"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const topics = [
  { label: "Overview", href: "/optimization" },
  { label: "01 · Dynamic Imports", href: "/optimization/dynamic-imports" },
  { label: "02 · Image Formats", href: "/optimization/images" },
  { label: "03 · LCP Optimization", href: "/optimization/lcp" },
  { label: "04 · Lazy Loading", href: "/optimization/lazy-loading" },
  { label: "05 · Intersection Observer", href: "/optimization/intersection-observer" },
  { label: "06 · Specific Imports", href: "/optimization/specific-imports" },
  { label: "07 · Prefetch False", href: "/optimization/prefetch" },
  { label: "08 · Bundle Analyzer", href: "/optimization/bundle-analyzer" },
];

export default function OptimizationNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-0.5">
      {topics.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
              active
                ? "text-blue-600 bg-blue-50 font-medium"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
