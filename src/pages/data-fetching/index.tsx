// Pages Router — /data-fetching
// Overview page explaining all three data-fetching methods side by side.

import type { ReactNode } from "react";
import Link from "next/link";
import DataFetchingLayout from "@/components/DataFetchingLayout";

const methods = [
  {
    fn: "getStaticProps()",
    badge: "SSG",
    badgeColor: "bg-green-600",
    cardColor: "bg-green-50 border-green-200",
    titleColor: "text-green-900",
    href: "/data-fetching/static-props",
    when: "At build time",
    useWhen: "Data that doesn't change often — blog posts, product catalogue, docs.",
    notFor: "User-specific or real-time data.",
    keyPoints: [
      "Runs only once at build time (or on revalidation with ISR)",
      "Returns props that are baked into the static HTML",
      "Fastest possible response — served from CDN",
      "Add revalidate to enable Incremental Static Regeneration (ISR)",
    ],
    snippet: `export const getStaticProps: GetStaticProps = async () => {
  const res  = await fetch("https://api.example.com/posts");
  const data = await res.json();
  return {
    props: { data },
    revalidate: 60, // ISR: re-generate every 60 s
  };
};`,
  },
  {
    fn: "getServerSideProps()",
    badge: "SSR",
    badgeColor: "bg-blue-600",
    cardColor: "bg-blue-50 border-blue-200",
    titleColor: "text-blue-900",
    href: "/data-fetching/server-side-props",
    when: "On every request",
    useWhen: "Data that must be fresh — dashboards, user profiles, search results.",
    notFor: "High-traffic pages where CDN caching matters.",
    keyPoints: [
      "Runs on every HTTP request — never cached by default",
      "Has access to request context: headers, cookies, query params",
      "Slower than getStaticProps — server executes fetch on each visit",
      "Return redirect or notFound to handle missing data",
    ],
    snippet: `export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res, params, query } = ctx;
  const data = await fetchUserData(req.cookies.token);
  if (!data) return { notFound: true };
  return { props: { data } };
};`,
  },
  {
    fn: "getStaticPaths()",
    badge: "Dynamic SSG",
    badgeColor: "bg-purple-600",
    cardColor: "bg-purple-50 border-purple-200",
    titleColor: "text-purple-900",
    href: "/data-fetching/posts/1",
    when: "At build time — generates a list of dynamic paths",
    useWhen: "Pre-render dynamic routes like /posts/[id] or /products/[slug].",
    notFor: "Unbounded data sets — use fallback: 'blocking' instead.",
    keyPoints: [
      "Used together with getStaticProps on dynamic-route pages",
      "Returns paths[] — each item becomes a pre-rendered URL",
      "fallback: false → unlisted paths return 404",
      "fallback: 'blocking' → unlisted paths SSR on first request, then cached",
    ],
    snippet: `export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  return {
    paths: posts.map(p => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
};`,
  },
];

export default function DataFetchingOverview() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-mono bg-gray-200 text-gray-600 px-2 py-1 rounded">
            Pages Router — src/pages/data-fetching/
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-3">Module 02 — Data Fetching</h1>
          <p className="text-gray-500 leading-relaxed max-w-3xl">
            The Pages Router provides three built-in data-fetching functions. Each runs at a
            different point in the request lifecycle and solves a different problem.
            Click any card to see a live demo using the{" "}
            <a
              href="https://jsonplaceholder.typicode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              JSONPlaceholder
            </a>{" "}
            public API.
          </p>
        </div>

        {/* Method cards */}
        <div className="space-y-6 mb-14">
          {methods.map((m) => (
            <div key={m.fn} className={`rounded-2xl border p-6 ${m.cardColor}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold px-2 py-1 rounded text-white ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                  <h2 className={`text-xl font-bold font-mono ${m.titleColor}`}>{m.fn}</h2>
                </div>
                <Link
                  href={m.href}
                  className={`text-xs font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-80 ${m.badgeColor}`}
                >
                  Live demo →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Runs:</span> <span className="text-gray-700">{m.when}</span></p>
                  <p><span className="font-semibold">Use when:</span> <span className="text-gray-700">{m.useWhen}</span></p>
                  <p><span className="font-semibold">Not for:</span> <span className="text-gray-700">{m.notFor}</span></p>
                </div>
                <ul className="space-y-1.5">
                  {m.keyPoints.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-green-600 font-bold shrink-0">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
                <pre>{m.snippet}</pre>
              </div>
            </div>
          ))}
        </div>

        {/* Pages Router vs App Router comparison */}
        <div className="bg-gray-900 text-gray-300 rounded-2xl p-6 font-mono text-xs">
          <p className="text-gray-500 mb-3"># Pages Router → App Router equivalents</p>
          <pre>{`Pages Router                     App Router (Next.js 13+)
─────────────────────────────────────────────────────────────────
getStaticProps()                 async Server Component + fetch()
                                 with cache: "force-cache" (default)

getStaticProps + revalidate      fetch() + next: { revalidate: N }
(ISR)                            (Incremental Static Regeneration)

getServerSideProps()             async Server Component + fetch()
                                 with cache: "no-store"

getStaticPaths()                 generateStaticParams()

getInitialProps()                Not supported — use the above`}</pre>
        </div>
      </div>
    </div>
  );
}

DataFetchingOverview.getLayout = (page: ReactNode) => (
  <DataFetchingLayout>{page}</DataFetchingLayout>
);
