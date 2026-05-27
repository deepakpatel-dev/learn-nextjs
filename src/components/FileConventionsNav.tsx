"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    label: "Overview",
    links: [
      { href: "/file-conventions", label: "All Conventions" },
    ],
  },
  {
    label: "Route Files",
    links: [
      { href: "/file-conventions/page-file",   label: "page.js" },
      { href: "/file-conventions/layout-file",  label: "layout.js" },
      { href: "/file-conventions/template",     label: "template.js" },
      { href: "/file-conventions/loading",      label: "loading.js" },
      { href: "/file-conventions/error",        label: "error.js" },
      { href: "/file-conventions/not-found",    label: "not-found.js" },
      { href: "/file-conventions/default-file", label: "default.js" },
    ],
  },
  {
    label: "API & Logic",
    links: [
      { href: "/file-conventions/route",           label: "route.js" },
      { href: "/file-conventions/middleware-file",  label: "middleware.js" },
      { href: "/file-conventions/instrumentation",  label: "instrumentation.js" },
    ],
  },
  {
    label: "Config & Meta",
    links: [
      { href: "/file-conventions/route-segment-config", label: "Route Segment Config" },
      { href: "/file-conventions/metadata-files",       label: "Metadata Files" },
    ],
  },
];

export default function FileConventionsNav() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0">
      <div className="sticky top-6 space-y-5">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.links.map(({ href, label }) => {
                const active =
                  href === "/file-conventions"
                    ? pathname === href
                    : (pathname ?? "").startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block text-sm px-3 py-1.5 rounded-lg transition-colors font-mono ${
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
        ))}
      </div>
    </nav>
  );
}
