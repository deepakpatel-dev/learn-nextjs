// Pages Router — /data-fetching/server-side-props
//
// getServerSideProps() runs on EVERY request, on the server.
// The fetch happens at request time — never cached by default.
// The timestamp below proves it: every page refresh shows a new time.

import type { GetServerSideProps } from "next";
import DataFetchingNav from "@/components/DataFetchingNav";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: { city: string; street: string };
  company: { name: string };
};

type Props = {
  users: User[];
  requestedAt: string;      // request-time timestamp — changes every refresh
  userAgent: string;         // from request headers — only available server-side
  queryParams: Record<string, string | string[]>;
};

// ─── getServerSideProps ────────────────────────────────────────────────────
// Next.js calls this function on every HTTP request to this page.
// The context object gives access to the full request/response cycle.
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { req, query } = context;

  // This fetch runs on every page request — always fresh, never cached
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return {
    props: {
      users,
      requestedAt: new Date().toISOString(),
      userAgent: req.headers["user-agent"] ?? "unknown",
      queryParams: query as Record<string, string | string[]>,
    },
    // NOTE: revalidate is NOT valid here — getServerSideProps is always dynamic
  };
};

// ─── Page Component ────────────────────────────────────────────────────────
export default function ServerSidePropsPage({
  users,
  requestedAt,
  userAgent,
  queryParams,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DataFetchingNav />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
            getServerSideProps() — SSR (Server-Side Rendering)
          </span>
          <h1 className="text-3xl font-bold mt-3 mb-2 font-mono">getServerSideProps()</h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl">
            Data is fetched on <strong>every request</strong> — the page is never cached.
            Use this when data must be fresh or when you need access to the request
            context (headers, cookies, query params).
          </p>
        </div>

        {/* Request-time proof */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <p className="text-sm font-semibold text-blue-800 mb-2">
            Request received at (server-side):
          </p>
          <p className="font-mono text-blue-700 text-lg mb-3">{requestedAt}</p>
          <p className="text-xs text-blue-600">
            Refresh the page — this timestamp <strong>updates every time</strong>.
            That proves getServerSideProps ran on this specific request, not at build time.
          </p>
        </div>

        {/* Context object demo */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">context object</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`async (context) => {
  const {
    req,     // IncomingMessage — headers, cookies
    res,     // ServerResponse — set headers, status
    params,  // dynamic route params { id: "1" }
    query,   // query string { tab: "posts" }
    preview, // preview mode boolean
    locale,  // active locale (if i18n configured)
  } = context;
}`}</pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">Live request data</h2>
            <div className="space-y-3 text-xs font-mono">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 mb-1">req.headers[&apos;user-agent&apos;]</p>
                <p className="text-gray-800 break-all">{userAgent}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 mb-1">query params (try ?name=test)</p>
                <p className="text-gray-800">
                  {Object.keys(queryParams).length === 0
                    ? "{} — no query params"
                    : JSON.stringify(queryParams, null, 2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return shape */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">Return shape</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`return {
  props: { users, requestedAt },

  // Redirect instead of rendering
  redirect: {
    destination: "/login",
    permanent: false,
  },

  // Render 404 instead
  notFound: true,
};

// ⚠️  revalidate is NOT valid here`}</pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">vs getStaticProps</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                ["When", "Every request", "Build time"],
                ["Cached", "No", "Yes (CDN)"],
                ["req/res access", "Yes", "No"],
                ["Cookie access", "Yes", "No"],
                ["Speed", "Slower (TTFB)", "Instant"],
                ["ISR", "Not supported", "Supported"],
              ].map(([label, ssr, ssg]) => (
                <li key={label} className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <span className="font-semibold text-gray-700">{label}</span>
                  <span className="text-blue-600">{ssr}</span>
                  <span className="text-green-600">{ssg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Users — fetched from JSONPlaceholder on this request
            </h2>
            <span className="text-xs font-mono text-gray-400">
              https://jsonplaceholder.typicode.com/users
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                    {user.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.company.name}</p>
                    <p className="text-xs text-gray-400">{user.address.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
