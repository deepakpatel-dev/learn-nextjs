// Route: /blog/[slug]  e.g. /blog/intro-to-nextjs
// File: app/blog/[slug]/page.tsx
//
// The [slug] folder is a Dynamic Segment. Next.js captures whatever
// is in that URL position and passes it as `params.slug` to the component.

import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; readTime: string; content: string }> = {
  "intro-to-nextjs": {
    title: "Introduction to Next.js",
    date: "2026-05-01",
    readTime: "5 min read",
    content: `Next.js is a React framework that gives you the building blocks to create web applications.
By framework, we mean Next.js handles the tooling and configuration needed for React, and provides
additional structure, features, and optimizations.

The App Router (introduced in Next.js 13) uses React Server Components by default, enabling
server-side rendering with a simpler mental model. Routes are defined by the file system —
no router configuration needed.`,
  },
  "understanding-routing": {
    title: "Understanding the App Router",
    date: "2026-05-08",
    readTime: "8 min read",
    content: `The App Router works by convention. Every folder inside app/ can be a route segment.
A page.tsx file makes a segment publicly accessible. A layout.tsx wraps child segments
and persists across navigations (great for sidebars and navbars).

Dynamic segments like [slug] capture URL values at that position. Catch-all segments
like [...slug] capture everything after a prefix. Route groups like (group) let you
organize files without affecting URLs.`,
  },
  "react-server-components": {
    title: "React Server Components",
    date: "2026-05-15",
    readTime: "6 min read",
    content: `React Server Components (RSC) run only on the server. They can directly access
databases, file systems, and environment variables without exposing them to the client.
They never ship JavaScript to the browser, reducing bundle size significantly.

In Next.js, all components inside the app/ directory are Server Components by default.
Add "use client" at the top of a file to opt into client-side rendering for components
that need interactivity (event handlers, useState, useEffect).`,
  },
  "nested-layouts": {
    title: "Nested Layouts in Next.js",
    date: "2026-05-21",
    readTime: "7 min read",
    content: `Layouts in the App Router compose automatically. The root layout wraps every page.
A layout.tsx inside a segment folder wraps only routes under that segment.

This means /blog/intro-to-nextjs is wrapped by: root layout → blog layout → post page.
Each layout receives its children as a prop and can add its own UI (headers, sidebars, etc.).
Layouts are preserved during navigation — they don't re-render when the child route changes.`,
  },
};

// In a real app this would be an async function fetching from a database
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;
  const post = posts[slug];

  // notFound() renders the nearest not-found.tsx (or Next.js default 404)
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">
          Dynamic Route — params.slug = &quot;{slug}&quot;
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>

      <div className="prose text-gray-700 leading-relaxed whitespace-pre-line mb-10">
        {post.content}
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">
        <h3 className="font-semibold text-purple-900 mb-2">How dynamic routes work</h3>
        <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-xs">
          <pre>{`// app/blog/[slug]/page.tsx
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // slug = "${slug}"
  // fetch post by slug...
}`}</pre>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">
          ← All Posts
        </Link>
        <Link
          href={`/blog/${slug}/comments`}
          className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          View Comments →
        </Link>
      </div>
    </div>
  );
}
