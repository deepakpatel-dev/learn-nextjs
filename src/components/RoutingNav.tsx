"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/about",
    label: "Basic & Nested Routing",
    desc: "file-system routing, layouts",
  },
  {
    href: "/blog/intro-to-nextjs",
    label: "Dynamic Routes",
    desc: "[slug] segments, params",
  },
  {
    href: "/dashboard",
    label: "Route Groups + Layouts",
    desc: "(group) folders, nested UI",
  },
  {
    href: "/docs/getting-started/installation",
    label: "Catch-All Routes",
    desc: "[...slug] multi-segment",
  },
  {
    href: "/redirects",
    label: "Redirects + 404",
    desc: "has: matchers, not-found",
  },
  {
    href: "/login",
    label: "Middleware",
    desc: "auth guards, CORS, cookies",
  },
  {
    href: "/en",
    label: "Internationalization",
    desc: "i18n, locale detection",
  },
];

// Which pathname prefixes map to each link
const matchPrefixes: Record<string, string[]> = {
  "/about":       ["/about"],
  "/blog/intro-to-nextjs": ["/blog"],
  "/dashboard":   ["/dashboard"],
  "/docs/getting-started/installation": ["/docs"],
  "/redirects":   ["/redirects"],
  "/login":       ["/login"],
  "/en":          ["/en", "/de", "/fr", "/ja"],
};

export default function RoutingNav() {
  const pathname = usePathname() ?? "";

  function isActive(href: string) {
    const prefixes = matchPrefixes[href] ?? [href];
    return prefixes.some((p) =>
      p === href ? pathname === p : pathname.startsWith(p)
    );
  }

  return (
    <nav className="w-56 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Module 01 — Routing
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label, desc }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className={`block text-sm font-medium ${active ? "text-blue-700" : ""}`}>
                    {label}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">{desc}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 border-t border-gray-200 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
          >
            ← All Modules
          </Link>
        </div>
      </div>
    </nav>
  );
}
