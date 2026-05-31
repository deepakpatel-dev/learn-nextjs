// Nested Layout: applies to /blog and all routes under /blog
// This layout wraps /blog, /blog/[slug], /blog/[slug]/comments
// The root layout (Navbar + footer) still wraps this too — layouts compose.

import Link from "next/link";
import RoutingNav from "@/components/RoutingNav";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex gap-10">
        <RoutingNav />
        <div className="flex-1 min-w-0">
          {/* Blog-specific header — appears on every /blog/* page (demo of nested layout) */}
          <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-green-700 bg-green-100 px-2 py-1 rounded inline-block mb-1">
                Nested Layout — app/blog/layout.tsx
              </p>
              <h2 className="text-sm text-gray-500">
                This header is shared across all <code className="font-mono">/blog/*</code> routes via layout.tsx
              </h2>
            </div>
            <Link href="/blog" className="text-sm text-blue-600 hover:underline">
              ← All Posts
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
