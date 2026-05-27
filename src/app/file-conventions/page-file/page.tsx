import Link from "next/link";

export default function PageFilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          File Convention
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          <code className="font-mono">page.js</code>
        </h1>
        <p className="text-gray-500 leading-relaxed">
          The entry point for a route. Every URL in your app maps to a{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">page.tsx</code> file.
          Without a page, the route returns 404.
        </p>
      </div>

      {/* Key points */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm space-y-2 text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">Key facts</p>
        <p>✦ Server Component by default — add <code className="font-mono">"use client"</code> to opt in to the client.</p>
        <p>✦ <code className="font-mono">params</code> and <code className="font-mono">searchParams</code> are both <strong>Promises</strong> in Next.js 16 — always <code className="font-mono">await</code> them.</p>
        <p>✦ A route cannot have both a <code className="font-mono">page.tsx</code> and a <code className="font-mono">route.ts</code> at the same path.</p>
        <p>✦ Only <code className="font-mono">page.tsx</code> and <code className="font-mono">route.ts</code> are publicly accessible — other files in the folder are private.</p>
      </div>

      {/* Signature */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Props signature</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/blog/[slug]/page.tsx
export default async function Page({
  params,
  searchParams,
}: {
  params:       Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug }  = await params;        // e.g. "hello-world"
  const { q }     = await searchParams;  // e.g. "next.js"

  return <article>Post: {slug}</article>;
}`}
        </pre>
      </div>

      {/* Static vs dynamic */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Static vs dynamic params</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            {
              title: "Static route",
              path: "app/about/page.tsx",
              note: "No params. Pre-rendered at build time by default.",
              code: `export default function AboutPage() {\n  return <h1>About</h1>;\n}`,
            },
            {
              title: "Dynamic route",
              path: "app/blog/[slug]/page.tsx",
              note: "Dynamic segment [slug] — resolved at runtime or via generateStaticParams.",
              code: `export default async function Page({\n  params,\n}: {\n  params: Promise<{ slug: string }>;\n}) {\n  const { slug } = await params;\n  return <h1>{slug}</h1>;\n}`,
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
              <p className="text-xs text-gray-400 font-mono mb-2">{item.path}</p>
              <p className="text-xs text-gray-500 mb-3">{item.note}</p>
              <pre className="bg-gray-50 rounded p-2 text-xs overflow-x-auto">{item.code}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* Where to see it in this project */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-gray-800 mb-2">See it in this project</h3>
        <p className="text-gray-500 mb-3">
          Every route in this repo is a <code className="font-mono">page.tsx</code>. Here are a few examples:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Home page", href: "/" },
            { label: "Static: /about", href: "/about" },
            { label: "Dynamic: /blog/[slug]", href: "/blog/hello-world" },
            { label: "Catch-all: /docs/[...slug]", href: "/docs/getting-started/installation" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors font-mono"
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
