// DataFetchingNav — top bar for Pages Router data-fetching pages.
// Acts as the main Navbar replacement (App Router Navbar doesn't render in pages/).

import Link from "next/link";

export default function DataFetchingNav() {
  return (
    <nav className="bg-gray-950 text-white border-b border-gray-800 px-6 h-14 flex items-center sticky top-0 z-50">
      <div className="max-w-6xl mx-auto w-full flex items-center gap-4">
        {/* Logo — mirrors App Router Navbar */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">N</span>
          </div>
          <span className="font-semibold text-white text-sm">Learn Next.js</span>
        </Link>

        <div className="h-5 w-px bg-gray-700 shrink-0" />

        <span className="text-xs font-mono text-gray-400">
          Module 02 — Data Fetching
          <span className="ml-2 text-gray-600">(Pages Router)</span>
        </span>
      </div>
    </nav>
  );
}
