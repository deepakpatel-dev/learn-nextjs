"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/configuration",                    label: "Overview" },
  { href: "/configuration/next-config",        label: "next.config.ts" },
  { href: "/configuration/env-vars",           label: "Environment Variables" },
  { href: "/configuration/typescript-config",  label: "TypeScript & Paths" },
  { href: "/configuration/headers-rewrites",   label: "Headers & Rewrites" },
];

export default function ConfigNav() {
  const pathname = usePathname();
  return (
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Configuration
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label }) => {
            const active =
              href === "/configuration"
                ? pathname === href
                : (pathname ?? "").startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    active
                      ? "bg-slate-100 text-slate-800 font-medium"
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
