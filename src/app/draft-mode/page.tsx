// /draft-mode — Overview page (Server Component)
//
// Explains what Draft Mode is, how to enable it, and how pages use it.
// The "Live Preview" link leads to a page that actually changes content
// based on draftMode().isEnabled.

export default function DraftModeOverviewPage() {
  const secret = "demo-preview-secret";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-1 rounded">
          Module 04 — Draft Mode
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Draft Mode</h1>
        <p className="text-gray-500 leading-relaxed">
          Draft Mode lets editors preview <strong>unpublished CMS content</strong> on the live
          site without affecting public visitors. It bypasses static cache and forces dynamic
          rendering for authenticated editors only.
        </p>
      </div>

      {/* How it works diagram */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">How it works</h2>
        <div className="grid grid-cols-3 gap-3 text-sm text-center">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              1
            </div>
            <p className="font-semibold text-gray-800 mb-1">Editor clicks Preview</p>
            <p className="text-gray-500 text-xs">
              The CMS redirects to{" "}
              <code className="font-mono">/api/draft?secret=…&amp;redirect=/blog/my-post</code>
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              2
            </div>
            <p className="font-semibold text-gray-800 mb-1">Cookie is set</p>
            <p className="text-gray-500 text-xs">
              <code className="font-mono">draft.enable()</code> writes a signed{" "}
              <code className="font-mono">__prerender_bypass</code> cookie — invisible to
              the public.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              3
            </div>
            <p className="font-semibold text-gray-800 mb-1">Page renders dynamically</p>
            <p className="text-gray-500 text-xs">
              <code className="font-mono">draftMode().isEnabled</code> is{" "}
              <code className="font-mono">true</code>. The page fetches draft content and
              skips the static cache.
            </p>
          </div>
        </div>
      </div>

      {/* Try it */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="font-semibold text-amber-900 mb-2">Try it now</h2>
        <p className="text-sm text-amber-800 mb-4">
          The demo secret is <code className="font-mono bg-amber-100 px-1 rounded">{secret}</code>.
          Click the links below to toggle Draft Mode — watch the banner appear and the preview
          page change content.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a
            href={`/api/draft?secret=${secret}&redirect=/draft-mode/preview`}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
          >
            ✓ Enable Draft Mode
          </a>
          <a
            href="/draft-mode/preview"
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors"
          >
            Open Preview Page →
          </a>
        </div>
      </div>

      {/* Code: API route to enable */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          1 — API route to enable Draft Mode
        </h2>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          This route validates a shared secret and calls{" "}
          <code className="font-mono text-blue-700">draft.enable()</code>, which sets the
          bypass cookie and redirects the editor to the content preview.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// src/app/api/draft/route.ts
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.DRAFT_MODE_SECRET ?? "demo-preview-secret";

export async function GET(request: NextRequest) {
  const secret   = request.nextUrl.searchParams.get("secret");
  const redirect = request.nextUrl.searchParams.get("redirect") ?? "/";

  // 1. Validate the secret — reject unauthorized requests
  if (secret !== SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  // 2. draftMode() is async in Next.js 16 — must be awaited
  const draft = await draftMode();
  draft.enable();   // sets __prerender_bypass cookie

  // 3. Redirect editor to the preview page
  return NextResponse.redirect(new URL(redirect, request.url));
}`}
        </pre>
      </div>

      {/* Code: API route to disable */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          2 — API route to disable Draft Mode
        </h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// src/app/api/draft/disable/route.ts
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();  // clears the bypass cookie
  return NextResponse.redirect(new URL("/", request.url));
}`}
        </pre>
      </div>

      {/* Code: Reading draft mode in a page */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          3 — Reading Draft Mode in a page or layout
        </h2>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          Any async Server Component can check{" "}
          <code className="font-mono text-blue-700">draft.isEnabled</code> to decide whether
          to fetch published or draft content from the CMS.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// src/app/blog/[slug]/page.tsx
import { draftMode } from "next/headers";

export default async function BlogPostPage({ params }) {
  // draftMode() is async in Next.js 16 — await is required
  const draft = await draftMode();

  // Fetch different data depending on mode
  const post = draft.isEnabled
    ? await fetchDraftPost(params.slug)    // CMS draft API (authenticated)
    : await fetchPublishedPost(params.slug); // CMS public API (cached)

  return (
    <article>
      {draft.isEnabled && (
        <div className="draft-badge">Previewing draft — not public</div>
      )}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`}
        </pre>
      </div>

      {/* Code: Global banner */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          4 — Global Draft Mode banner
        </h2>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          An async Server Component in the root layout checks draft mode and renders
          a banner only for the editor — public visitors see nothing.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// src/components/DraftModeBanner.tsx
import { draftMode } from "next/headers";

export default async function DraftModeBanner() {
  const draft = await draftMode();
  if (!draft.isEnabled) return null;  // renders nothing for public visitors

  return (
    <div className="bg-amber-400 text-amber-950 px-4 py-2 flex justify-between">
      <span>✏ Draft Mode — previewing unpublished content</span>
      <a href="/api/draft/disable">Exit Draft Mode →</a>
    </div>
  );
}

// src/app/layout.tsx
import DraftModeBanner from "@/components/DraftModeBanner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DraftModeBanner />  {/* ← only visible when draft mode is on */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}`}
        </pre>
      </div>

      {/* Key points */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-3">Key points</h3>
        <ul className="space-y-2 text-blue-800">
          <li>
            <code className="font-mono">draftMode()</code> returns a <strong>Promise</strong> in
            Next.js 16 — always <code className="font-mono">await</code> it.
          </li>
          <li>
            The bypass cookie is <strong>signed</strong> — it cannot be forged by visitors.
            Only your API route can set it.
          </li>
          <li>
            Calling <code className="font-mono">draftMode()</code> in a page or layout
            opts that route into <strong>dynamic rendering</strong> (no static cache).
          </li>
          <li>
            Store the secret in an environment variable (
            <code className="font-mono">DRAFT_MODE_SECRET</code>) and share it only with
            your CMS webhook config.
          </li>
          <li>
            Combine with the CMS Preview API — Contentful, Sanity, and Payload all support
            a &quot;Preview Mode&quot; button that calls your{" "}
            <code className="font-mono">/api/draft</code> route automatically.
          </li>
        </ul>
      </div>

      {/* CMS integration guide */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">CMS integration patterns</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            {
              cms: "Contentful",
              pattern:
                'Configure a "Preview URL" in Contentful pointing to /api/draft?secret={env.DRAFT_SECRET}&redirect=/blog/{entry.fields.slug}',
            },
            {
              cms: "Sanity",
              pattern:
                "Use the Sanity Presentation tool. It calls your /api/draft route with the secret and manages preview sessions automatically.",
            },
            {
              cms: "Payload CMS",
              pattern:
                'Add a "Live Preview" button to your collection that points to /api/draft?secret=…&redirect=/blog/{slug}.',
            },
            {
              cms: "Custom CMS",
              pattern:
                "Add a Preview button in your CMS admin that calls /api/draft with the shared secret. The editor is redirected to the live page in draft mode.",
            },
          ].map((item) => (
            <div key={item.cms} className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.cms}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.pattern}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
