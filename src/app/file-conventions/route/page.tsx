import Link from "next/link";

export default function RouteFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">route.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Creates an HTTP API endpoint. Export named functions for each HTTP method you want
          to handle. Lives in the <code className="font-mono text-sm bg-gray-100 px-1 rounded">app/</code>{" "}
          directory just like pages — but cannot coexist with <code className="font-mono text-sm bg-gray-100 px-1 rounded">page.tsx</code>{" "}
          at the same path.
        </p>
      </div>

      {/* Key facts */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm space-y-2 text-green-800">
        <p className="font-semibold text-green-900 mb-2">Key facts</p>
        <p>✦ Supported methods: <code className="font-mono">GET POST PUT PATCH DELETE HEAD OPTIONS</code></p>
        <p>✦ Uses the standard Web <code className="font-mono">Request</code> / <code className="font-mono">Response</code> API (not Express).</p>
        <p>✦ Cannot have both <code className="font-mono">route.ts</code> and <code className="font-mono">page.tsx</code> at the same path.</p>
        <p>✦ Supports dynamic segments: <code className="font-mono">app/api/users/[id]/route.ts</code></p>
        <p>✦ <code className="font-mono">context.params</code> is a <strong>Promise</strong> in Next.js 16 — await it.</p>
      </div>

      {/* HTTP methods */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Supported HTTP methods</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/api/posts/route.ts
import { NextRequest } from "next/server";

// GET /api/posts
export async function GET() {
  const posts = await db.post.findMany();
  return Response.json(posts);
}

// POST /api/posts
export async function POST(request: NextRequest) {
  const body = await request.json();
  const post = await db.post.create({ data: body });
  return Response.json(post, { status: 201 });
}

// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  // ← async in Next.js 16
  const post = await db.post.findUnique({ where: { id } });
  if (!post) return new Response("Not found", { status: 404 });
  return Response.json(post);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.post.delete({ where: { id } });
  return new Response(null, { status: 204 });
}`}
        </pre>
      </div>

      {/* Common patterns */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Common patterns</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "JSON response",
              code: `export async function GET() {\n  return Response.json({ ok: true });\n}`,
            },
            {
              title: "Read request body",
              code: `export async function POST(req: NextRequest) {\n  const { name } = await req.json();\n  return Response.json({ name });\n}`,
            },
            {
              title: "Read search params",
              code: `export async function GET(req: NextRequest) {\n  const q = req.nextUrl.searchParams.get("q");\n  return Response.json({ q });\n}`,
            },
            {
              title: "Custom status + headers",
              code: `export async function GET() {\n  return new Response("Created", {\n    status: 201,\n    headers: { "X-Custom": "value" },\n  });\n}`,
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">{item.title}</p>
              <pre className="bg-gray-50 rounded p-2 text-xs overflow-x-auto">{item.code}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* Live examples in this project */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-gray-800 mb-2">Route handlers in this project</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "GET /api/draft", href: "/api/draft?secret=demo-preview-secret" },
            { label: "GET /api/draft/disable", href: "/api/draft/disable" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full hover:bg-green-100 transition-colors font-mono"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <Link href="/file-conventions" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← All conventions
      </Link>
    </div>
  );
}
