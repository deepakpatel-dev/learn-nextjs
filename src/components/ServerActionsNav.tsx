"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/server-actions",                  label: "Overview" },
  { href: "/server-actions/form-submission",  label: "Form Submission" },
  { href: "/server-actions/data-mutations",   label: "Data Mutations" },
  { href: "/server-actions/authentication",   label: "Authentication" },
  { href: "/server-actions/background-tasks", label: "Background Tasks" },
];

export default function ServerActionsNav() {
  const pathname = usePathname();
  return (
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Module 03 — Server Actions
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label }) => {
            const active =
              href === "/server-actions"
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
