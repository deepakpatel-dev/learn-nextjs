"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs/getting-started/installation", label: "Docs" },
  { href: "/redirects", label: "Redirects" },
  { href: "/login", label: "Login" },
  { href: "/en", label: "i18n" },
  { href: "/data-fetching", label: "Data Fetching" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-400">
          Learn Next.js
        </Link>
        <ul className="flex gap-6 text-sm">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-blue-400 transition-colors ${
                  pathname === href || (href !== "/" && pathname.startsWith(href))
                    ? "text-blue-400 font-semibold"
                    : "text-gray-300"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
