// Pages Router component — uses useRouter from next/router (not next/navigation)

import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/data-fetching",                    label: "Overview" },
  { href: "/data-fetching/static-props",       label: "getStaticProps" },
  { href: "/data-fetching/server-side-props",  label: "getServerSideProps" },
  { href: "/data-fetching/posts/1",            label: "getStaticPaths + [id]" },
];

export default function DataFetchingSideNav() {
  const { pathname } = useRouter();
  return (
    <nav className="w-52 shrink-0">
      <div className="sticky top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Module 02 — Data Fetching
        </p>
        <ul className="space-y-0.5">
          {links.map(({ href, label }) => {
            // For dynamic routes like /posts/1, match on prefix
            const active =
              href === "/data-fetching"
                ? pathname === "/data-fetching"
                : pathname.startsWith(href.replace("/1", ""));
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

        <div className="mt-5 border-t border-gray-200 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
          >
            ← All Modules
          </Link>
        </div>
      </div>
    </nav>
  );
}
