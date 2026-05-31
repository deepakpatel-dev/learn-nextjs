"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/deploying",                    label: "Overview" },
  { href: "/deploying/vercel",             label: "Vercel" },
  { href: "/deploying/nodejs-server",      label: "Node.js Server" },
  { href: "/deploying/docker",             label: "Docker" },
  { href: "/deploying/static-export",      label: "Static Export" },
  { href: "/deploying/github-actions",     label: "CI/CD — GitHub Actions" },
];

export default function DeployingNav() {
  const pathname = usePathname();
  return (
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Deploying
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label }) => {
            const active =
              href === "/deploying"
                ? pathname === href
                : (pathname ?? "").startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    active
                      ? "bg-emerald-50 text-emerald-800 font-medium"
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
