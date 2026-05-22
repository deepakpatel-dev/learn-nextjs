// Route: /blog/[slug]/comments  e.g. /blog/intro-to-nextjs/comments
// File: app/blog/[slug]/comments/page.tsx
//
// This is a nested route under a dynamic route.
// It has access to the same [slug] param from its parent.

import Link from "next/link";

const commentsBySlug: Record<string, { author: string; text: string; date: string }[]> = {
  "intro-to-nextjs": [
    { author: "Alice", text: "Great intro! The App Router explanation really clicked for me.", date: "2026-05-03" },
    { author: "Bob", text: "Finally understand the difference between pages and app router. Thanks!", date: "2026-05-04" },
  ],
  "understanding-routing": [
    { author: "Carlos", text: "The route groups section was exactly what I was looking for.", date: "2026-05-10" },
    { author: "Diana", text: "Bookmarked this. Best routing explanation I've found.", date: "2026-05-11" },
    { author: "Eve", text: "Would love a follow-up on parallel routes!", date: "2026-05-12" },
  ],
  "react-server-components": [
    { author: "Frank", text: "RSC changed how I think about data fetching entirely.", date: "2026-05-16" },
  ],
  "nested-layouts": [
    { author: "Grace", text: "Layout composition makes so much sense now.", date: "2026-05-22" },
    { author: "Henry", text: "The layout persistence on navigation is a game changer for SPAs.", date: "2026-05-22" },
  ],
};

export default async function CommentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comments = commentsBySlug[slug] ?? [];

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
          Nested Route under Dynamic Segment
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Comments</h1>
      <p className="text-gray-500 mb-2">
        Post: <code className="font-mono bg-gray-100 px-1 rounded">{slug}</code>
      </p>
      <p className="text-gray-400 text-sm mb-8">
        URL: /blog/{slug}/comments
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
        <h3 className="font-semibold text-green-900 mb-2">How this nested route works</h3>
        <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-xs">
          <pre>{`app/blog/
└── [slug]/
    ├── page.tsx           ← /blog/${slug}
    └── comments/
        └── page.tsx       ← /blog/${slug}/comments (this page)

// params.slug is inherited from the parent segment
export default async function CommentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // slug = "${slug}"
}`}</pre>
        </div>
      </div>

      {comments.length === 0 ? (
        <p className="text-gray-400 italic">No comments yet for this post.</p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((comment, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{comment.author}</span>
                <span className="text-xs text-gray-400">{comment.date}</span>
              </div>
              <p className="text-gray-600 text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      )}

      <Link
        href={`/blog/${slug}`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to post
      </Link>
    </div>
  );
}
