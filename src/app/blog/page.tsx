// Route: /blog
// File: app/blog/page.tsx
// This is also the parent of nested routes like /blog/[slug]

import Link from "next/link";

const posts = [
  {
    slug: "intro-to-nextjs",
    title: "Introduction to Next.js",
    date: "2026-05-01",
    summary: "An overview of Next.js, the React framework for production.",
    readTime: "5 min read",
  },
  {
    slug: "understanding-routing",
    title: "Understanding the App Router",
    date: "2026-05-08",
    summary: "A deep dive into file-system based routing with the Next.js App Router.",
    readTime: "8 min read",
  },
  {
    slug: "react-server-components",
    title: "React Server Components",
    date: "2026-05-15",
    summary: "How Server Components change the way we think about data fetching and rendering.",
    readTime: "6 min read",
  },
  {
    slug: "nested-layouts",
    title: "Nested Layouts in Next.js",
    date: "2026-05-21",
    summary: "Learn how layouts compose across route segments to build complex UIs with minimal code.",
    readTime: "7 min read",
  },
];

export default function BlogPage() {
  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
          Nested Route Parent
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Blog</h1>
        <p className="text-gray-500">
          URL: <code className="font-mono">/blog</code> — click any post to see a dynamic nested route
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-sm transition-all block"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-3">{post.summary}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <span className="text-gray-300 text-xl shrink-0">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
