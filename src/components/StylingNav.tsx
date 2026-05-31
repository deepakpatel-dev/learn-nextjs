"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/styling",                 label: "Overview" },
  { href: "/styling/global-styles",   label: "Global Stylesheets" },
  { href: "/styling/css-modules",     label: "CSS Modules" },
  { href: "/styling/node-modules",    label: "From node_modules" },
  { href: "/styling/specificity",     label: "Specificity & Scoped Variables" },
  { href: "/styling/sass",            label: "Sass / SCSS" },
];

export default function StylingNav() {
  const pathname = usePathname();
  return (
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Module 05 — Styling
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label }) => {
            const active =
              href === "/styling"
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
      </div>
    </nav>
  );
}
