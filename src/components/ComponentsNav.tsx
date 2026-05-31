"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/components-patterns",                        label: "Overview" },
  { href: "/components-patterns/server-client",          label: "Server vs Client" },
  { href: "/components-patterns/composition",            label: "Composition Patterns" },
  { href: "/components-patterns/parallel-routes",        label: "Parallel Routes" },
  { href: "/components-patterns/intercepting-routes",    label: "Intercepting Routes" },
];

export default function ComponentsNav() {
  const pathname = usePathname();
  return (
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Components & Patterns
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label }) => {
            const active =
              href === "/components-patterns"
                ? pathname === href
                : (pathname ?? "").startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    active
                      ? "bg-violet-50 text-violet-800 font-medium"
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
