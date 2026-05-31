"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/draft-mode",         label: "Overview & Code" },
  { href: "/draft-mode/preview", label: "Live Preview Demo" },
];

export default function DraftModeNav() {
  const pathname = usePathname();
  return (
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Module 04 — Draft Mode
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label }) => {
            const active =
              href === "/draft-mode"
                ? pathname === href
                : (pathname ?? "").startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
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

        {/* Quick demo toggles */}
        <div className="mt-5 border-t border-gray-200 pt-4 space-y-1.5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
            Try It
          </p>
          <a
            href="/api/draft?secret=demo-preview-secret&redirect=/draft-mode/preview"
            className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors font-medium"
          >
            ✓ Enable Draft Mode
          </a>
          <a
            href="/api/draft/disable"
            className="flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            ✕ Exit Draft Mode
          </a>
        </div>
      </div>
    </nav>
  );
}
