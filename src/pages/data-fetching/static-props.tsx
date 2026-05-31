// Pages Router — /data-fetching/static-props
//
// getStaticProps() runs ONCE at BUILD TIME (or ISR revalidation).
// The fetch happens on the server during `next build`, never in the browser.
// The timestamp below proves it: refresh the page as many times as you like —
// the time stays the same until the next build/revalidation.

import type { GetStaticProps } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import DataFetchingLayout from "@/components/DataFetchingLayout";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Props = {
  posts: Post[];
  generatedAt: string; // build-time timestamp — frozen after build
};

// ─── getStaticProps ────────────────────────────────────────────────────────
// Next.js calls this function during `next build`.
// It must return { props } and optionally { revalidate } for ISR.
export const getStaticProps: GetStaticProps<Props> = async () => {
  // This fetch runs at build time — not on every browser request.
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
      generatedAt: new Date().toISOString(),
    },
    // Uncomment to enable ISR: re-generate this page every 30 seconds
    // revalidate: 30,
  };
};

// ─── Page Component ────────────────────────────────────────────────────────
export default function StaticPropsPage({ posts, generatedAt }: Props) {
  return (
    <div>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
            getStaticProps() — SSG (Static Site Generation)
          </span>
          <h1 className="text-3xl font-bold mt-3 mb-2 font-mono">getStaticProps()</h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl">
            Data is fetched once at <strong>build time</strong>. The page is pre-rendered
            to static HTML and served from a CDN on every request — no server needed.
          </p>
        </div>

        {/* Build-time proof */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8">
          <p className="text-sm font-semibold text-green-800 mb-1">
            Page generated at (build time):
          </p>
          <p className="font-mono text-green-700 text-lg">{generatedAt}</p>
          <p className="text-xs text-green-600 mt-2">
            Refresh the page — this timestamp <strong>never changes</strong> until the
            next build (or ISR revalidation). That proves the fetch ran at build time,
            not on request.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">Return shape</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`return {
  props: {
    // passed to the page component
    posts,
    generatedAt,
  },

  // Optional — enables ISR
  revalidate: 30,

  // Optional — return 404
  notFound: true,

  // Optional — redirect
  redirect: { destination: "/" },
};`}</pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">Key rules</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Only runs on the server — never in the browser",
                "Can only be exported from a page file (not components)",
                "Has access to the file system, env vars, and any server-only API",
                "Cannot access request headers or cookies (use getServerSideProps for that)",
                "Works with revalidate to enable ISR (stale-while-revalidate)",
                "Must return props — even if empty: return { props: {} }",
              ].map((rule) => (
                <li key={rule} className="flex gap-2">
                  <span className="text-green-500 font-bold shrink-0">✓</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Posts — fetched from JSONPlaceholder at build time
            </h2>
            <span className="text-xs font-mono text-gray-400">
              https://jsonplaceholder.typicode.com/posts?_limit=10
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-1 rounded shrink-0">
                    #{post.id}
                  </span>
                  <div>
                    <Link
                      href={`/data-fetching/posts/${post.id}`}
                      className="font-medium text-sm hover:text-green-600 transition-colors capitalize"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ISR note */}
        <div className="bg-gray-900 text-gray-300 rounded-2xl p-5 font-mono text-xs">
          <p className="text-gray-500 mb-2"># Enable ISR — uncomment in getStaticProps</p>
          <pre>{`return {
  props: { posts, generatedAt },
  revalidate: 30, // re-generate at most every 30 seconds
                  // first stale request triggers background regen
                  // subsequent requests get fresh HTML once ready
};`}</pre>
        </div>
      </div>
    </div>
  );
}

StaticPropsPage.getLayout = (page: ReactNode) => <DataFetchingLayout>{page}</DataFetchingLayout>;
