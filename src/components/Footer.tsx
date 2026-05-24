"use client";

import { usePathname } from "next/navigation";

// Maps a route prefix to a module label.
// Order matters — more specific prefixes should come first.
const MODULE_MAP: { prefix: string; label: string }[] = [
  { prefix: "/styling",        label: "Module 04 · Styling" },
  { prefix: "/server-actions", label: "Module 03 · Server Actions" },
  { prefix: "/data-fetching",  label: "Module 02 · Data Fetching" },
  // Module 01 — Routing covers everything else under the app
  { prefix: "/about",          label: "Module 01 · Routing" },
  { prefix: "/blog",           label: "Module 01 · Routing" },
  { prefix: "/dashboard",      label: "Module 01 · Routing" },
  { prefix: "/docs",           label: "Module 01 · Routing" },
  { prefix: "/redirects",      label: "Module 01 · Routing" },
  { prefix: "/login",          label: "Module 01 · Routing" },
  { prefix: "/contact",        label: "Module 01 · Routing" },
  { prefix: "/en",             label: "Module 01 · Routing (i18n)" },
  { prefix: "/",               label: "Learn Next.js · App Router" }, // home / fallback
];

function getModuleLabel(pathname: string): string {
  for (const { prefix, label } of MODULE_MAP) {
    if (prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)) {
      return label;
    }
  }
  return "Learn Next.js · App Router";
}

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const label    = getModuleLabel(pathname);

  return (
    <footer className="bg-gray-900 text-gray-400 text-center text-sm py-4 select-none">
      <span className="text-gray-600 mr-2 font-mono text-xs">▸</span>
      {label}
    </footer>
  );
}
