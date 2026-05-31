// Pages Router — /data-fetching/posts/[id]
//
// getStaticPaths() tells Next.js which dynamic paths to pre-render at build time.
// getStaticProps() then fetches the data for each of those paths.
// Both functions work together — getStaticPaths is always paired with getStaticProps.

import type { GetStaticPaths, GetStaticProps } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import DataFetchingLayout from "@/components/DataFetchingLayout";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type Props = {
  post: Post;
  comments: Comment[];
  generatedAt: string;
  preGeneratedIds: number[];
};

// ─── getStaticPaths ────────────────────────────────────────────────────────
// Runs at build time. Must return:
//   paths  → array of { params } objects — one per URL to pre-render
//   fallback → what happens when a path NOT in the list is requested
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch enough posts to generate paths for
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const posts: Post[] = await res.json();

  return {
    // Pre-render /data-fetching/posts/1 through /data-fetching/posts/10
    paths: posts.map((post) => ({
      params: { id: String(post.id) },
    })),

    // fallback: false  → any path not in the list above returns 404
    // fallback: true   → unlisted paths render a loading state, then SSG on first hit
    // fallback: "blocking" → unlisted paths SSR on first hit, then cached as static
    fallback: false,
  };
};

// ─── getStaticProps ────────────────────────────────────────────────────────
// Called once per path returned by getStaticPaths, at build time.
// params.id matches each { params: { id } } from getStaticPaths.
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;

  // Fetch post and its comments in parallel — both at build time
  const [postRes, commentsRes, allPostsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10"),
  ]);

  const post: Post           = await postRes.json();
  const comments: Comment[]  = await commentsRes.json();
  const allPosts: Post[]      = await allPostsRes.json();

  return {
    props: {
      post,
      comments,
      generatedAt: new Date().toISOString(),
      preGeneratedIds: allPosts.map((p) => p.id),
    },
  };
};

// ─── Page Component ────────────────────────────────────────────────────────
export default function PostPage({ post, comments, generatedAt, preGeneratedIds }: Props) {
  return (
    <div>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">
            getStaticPaths() + getStaticProps() — Dynamic SSG
          </span>
          <h1 className="text-3xl font-bold mt-3 mb-2 font-mono">getStaticPaths()</h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl">
            Used on pages with dynamic route segments (<code className="font-mono bg-gray-100 px-1 rounded">[id]</code>).
            Next.js calls <code className="font-mono bg-gray-100 px-1 rounded">getStaticPaths</code> to
            learn which paths to pre-render, then calls{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">getStaticProps</code> for each one.
          </p>
        </div>

        {/* Pre-generated paths */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-8">
          <p className="text-sm font-semibold text-purple-800 mb-3">
            Pre-generated paths (from getStaticPaths):
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {preGeneratedIds.map((id) => (
              <Link
                key={id}
                href={`/data-fetching/posts/${id}`}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-colors ${
                  id === post.id
                    ? "bg-purple-600 text-white"
                    : "bg-white border border-purple-200 text-purple-700 hover:bg-purple-100"
                }`}
              >
                /posts/{id}
              </Link>
            ))}
          </div>
          <p className="text-xs text-purple-600">
            Page generated at build time: <strong>{generatedAt}</strong> — stays frozen until next build.
          </p>
        </div>

        {/* getStaticPaths code */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">getStaticPaths return shape</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`return {
  paths: [
    { params: { id: "1" } },
    { params: { id: "2" } },
    // ...one per pre-rendered URL
  ],

  // false → unlisted paths → 404
  // true  → unlisted paths → loading state
  //         then SSG on first hit
  // "blocking" → unlisted paths → SSR
  //         on first hit, then cached
  fallback: false,
};`}</pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">fallback values explained</h2>
            <div className="space-y-3 text-sm">
              {[
                {
                  value: "false",
                  color: "bg-red-100 text-red-700",
                  desc: "Paths not in the list → 404. Best for small, known datasets.",
                },
                {
                  value: "true",
                  color: "bg-yellow-100 text-yellow-700",
                  desc: "Unlisted paths show a loading fallback, then SSG in the background.",
                },
                {
                  value: '"blocking"',
                  color: "bg-green-100 text-green-700",
                  desc: "Unlisted paths SSR on first hit (blocks until done), then cached as static. No loading state.",
                },
              ].map(({ value, color, desc }) => (
                <div key={value} className="flex gap-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded shrink-0 ${color}`}>
                    {value}
                  </span>
                  <p className="text-xs text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Post content */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono bg-purple-100 text-purple-700 px-2 py-1 rounded">
              Post #{post.id}
            </span>
            <span className="text-xs text-gray-400 font-mono">userId: {post.userId}</span>
          </div>
          <h2 className="text-xl font-bold mb-3 capitalize">{post.title}</h2>
          <p className="text-gray-600 leading-relaxed">{post.body}</p>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({comments.length}) — also fetched at build time
          </h3>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold">{comment.name}</p>
                  <span className="text-xs text-gray-400 font-mono">{comment.email}</span>
                </div>
                <p className="text-sm text-gray-600">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

PostPage.getLayout = (page: ReactNode) => <DataFetchingLayout>{page}</DataFetchingLayout>;
