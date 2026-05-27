import Link from "next/link";

export default function NotFoundFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
          File Convention · Live Demo
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">not-found.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          A custom 404 page rendered when{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">notFound()</code> is
          called inside a route segment. Scoped to the nearest ancestor{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">not-found.tsx</code>.
        </p>
      </div>

      {/* Live demo */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
        <h2 className="font-semibold text-orange-900 mb-2">Try the live demo</h2>
        <p className="text-sm text-orange-800 mb-4">
          The demo page normally shows content. Click <strong>&ldquo;Trigger Not Found&rdquo;</strong>{" "}
          to call <code className="font-mono">notFound()</code> and see the scoped 404 UI.
        </p>
        <div className="flex gap-3">
          <Link
            href="/file-conventions/not-found/demo"
            className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            Open demo page →
          </Link>
          <Link
            href="/file-conventions/not-found/demo?notfound=1"
            className="inline-block px-4 py-2 bg-white border border-orange-200 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
          >
            Trigger notFound() directly
          </Link>
        </div>
      </div>

      {/* Key facts */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-sm space-y-2 text-orange-800">
        <p className="font-semibold text-orange-900 mb-2">Key facts</p>
        <p>✦ Server Component by default — can be <code className="font-mono">async</code> to fetch data for the 404 page.</p>
        <p>✦ Scoped: the nearest ancestor <code className="font-mono">not-found.tsx</code> is used, not necessarily the root one.</p>
        <p>✦ The root <code className="font-mono">app/not-found.tsx</code> also catches any URL that matches no route.</p>
        <p>✦ HTTP status is <strong>404</strong> for non-streamed responses, <strong>200</strong> for streamed (with <code className="font-mono">noindex</code> meta tag).</p>
        <p>✦ Does <strong>not</strong> accept props — unlike <code className="font-mono">error.tsx</code>.</p>
      </div>

      {/* Code */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Usage pattern</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/blog/[slug]/page.tsx</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  // Call notFound() to trigger the
  // nearest not-found.tsx
  if (!post) notFound();

  return <article>{post.title}</article>;
}`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/blog/not-found.tsx</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold mb-2">
        Post not found
      </h2>
      <p className="text-gray-500 mb-4">
        This article doesn't exist.
      </p>
      <Link href="/blog">
        ← Back to blog
      </Link>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Global not-found */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-gray-800 mb-2">
          <code className="font-mono">app/not-found.tsx</code> vs{" "}
          <code className="font-mono">app/global-not-found.tsx</code>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 pr-4 font-semibold text-gray-600">File</th>
                <th className="text-left py-1.5 pr-4 font-semibold text-gray-600">Triggered by</th>
                <th className="text-left py-1.5 font-semibold text-gray-600">Uses root layout?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-1.5 pr-4 font-mono text-orange-700">app/not-found.tsx</td>
                <td className="py-1.5 pr-4 text-gray-600">notFound() call or unmatched URL</td>
                <td className="py-1.5 text-green-700">Yes</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4 font-mono text-orange-700">app/global-not-found.tsx</td>
                <td className="py-1.5 pr-4 text-gray-600">Unmatched URL, bypasses all layouts</td>
                <td className="py-1.5 text-red-700">No — must include html+body</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
