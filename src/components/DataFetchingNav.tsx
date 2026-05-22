// DataFetchingNav — shared navigation for Pages Router data-fetching pages.
// The main App Router Navbar only renders inside app/ routes, so pages/ routes
// get their own lightweight nav that links back to the main app and between demos.

import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/data-fetching",                    label: "Overview" },
  { href: "/data-fetching/static-props",       label: "getStaticProps" },
  { href: "/data-fetching/server-side-props",  label: "getServerSideProps" },
  { href: "/data-fetching/posts/1",            label: "getStaticPaths" },
];

export default function DataFetchingNav() {
  const { pathname } = useRouter();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <Link href="/" className="text-lg font-bold text-blue-400 hover:text-blue-300 transition-colors">
          ← Learn Next.js
        </Link>

        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs font-mono text-gray-500 mr-2">Module 02 — Data Fetching</span>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-mono ${
                pathname === href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
