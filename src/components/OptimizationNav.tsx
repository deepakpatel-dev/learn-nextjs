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
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Module 06 — Optimization
        </p>
        <ul className="space-y-0.5">
          {topics.map(({ label, href }) => {
            const active =
              href === "/optimization"
                ? pathname === href
                : (pathname ?? "").startsWith(href);
            return (
              <li key={href}>
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
