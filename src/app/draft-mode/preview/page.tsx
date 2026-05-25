// /draft-mode/preview — async Server Component
//
// This page demonstrates Draft Mode in action.
// It renders different content depending on draftMode().isEnabled:
//
//   • Draft Mode OFF  →  published article (what public visitors see)
//   • Draft Mode ON   →  draft article     (what editors preview)
//
// Visit /api/draft?secret=demo-preview-secret to enable Draft Mode,
// then come back here to see the draft content.

import { draftMode } from "next/headers";
import Link from "next/link";

// ─── Simulated CMS content ───────────────────────────────────────────────────
// In a real app these would be fetched from a CMS API (e.g. Contentful, Sanity).
// The "draft" version is fetched with an authenticated token that bypasses
// the CMS's content filter.

const published = {
  title: "Deploying Next.js to Production",
  subtitle: "A complete guide to shipping your app to Vercel, Docker, or a Node server.",
  status: "Published",
  lastUpdated: "15 Jan 2025",
  author: "Engineering Team",
  readTime: "8 min read",
  sections: [
    {
      heading: "1. Choose your deployment target",
      body:
        "Next.js supports three deployment strategies: Vercel (managed), Node.js server (self-hosted), and static export. Vercel is the fastest to ship — push to main and your app is live within seconds.",
    },
    {
      heading: "2. Environment variables",
      body:
        "Use .env.local for development secrets and set production values in your hosting platform's dashboard. Never commit secrets to git. Access them via process.env.MY_VAR in Server Components and API routes.",
    },
    {
      heading: "3. Build optimizations",
      body:
        "Run next build before deploying. Next.js automatically applies code-splitting, image optimization, and static generation. Check the build output for bundle sizes and any build warnings.",
    },
  ],
  draftNote: null,
  newSection: null,
};

const draft = {
  title: "Deploying Next.js to Production",
  subtitle:
    "A complete guide to shipping your app to Vercel, Docker, or a Node server. [v2 — adding PPR section]",
  status: "Draft — unpublished changes",
  lastUpdated: "Today (edited 3 min ago)",
  author: "Engineering Team",
  readTime: "11 min read",
  sections: [
    {
      heading: "1. Choose your deployment target",
      body:
        "Next.js supports three deployment strategies: Vercel (managed), Node.js server (self-hosted), and static export. Vercel is the fastest to ship — push to main and your app is live within seconds.",
    },
    {
      heading: "2. Environment variables",
      body:
        "Use .env.local for development secrets and set production values in your hosting platform's dashboard. Never commit secrets to git. Access them via process.env.MY_VAR in Server Components and API routes.",
    },
    {
      heading: "3. Build optimizations",
      body:
        "Run next build before deploying. Next.js automatically applies code-splitting, image optimization, and static generation. Check the build output for bundle sizes and any build warnings.",
    },
  ],
  draftNote:
    "⚠ Editor note: Section 4 (PPR) is new and needs review from the tech lead before publication. The performance numbers in 4.2 are still being validated.",
  newSection: {
    heading: "4. Partial Pre-Rendering (PPR) [NEW — not yet published]",
    body:
      "PPR is Next.js 16's new rendering model that combines static shells with dynamic content holes. The outer layout is pre-rendered at build time; dynamic data streams in instantly after. Enable it with experimental.ppr = true in next.config.ts.",
    isNew: true,
  },
};
// ─────────────────────────────────────────────────────────────────────────────

export default async function PreviewPage() {
  // draftMode() returns a Promise in Next.js 16 — await is required.
  // This also opts the page into dynamic rendering (no static cache).
  const draftState = await draftMode();
  const isEnabled = draftState.isEnabled;

  const post = isEnabled ? draft : published;

  return (
    <div className="space-y-8">
      {/* Mode indicator */}
      <div
        className={`rounded-xl p-4 border flex items-start gap-3 text-sm ${
          isEnabled
            ? "bg-amber-50 border-amber-300"
            : "bg-green-50 border-green-200"
        }`}
      >
        <span className="text-lg">{isEnabled ? "✏️" : "🌐"}</span>
        <div>
          <p className={`font-semibold mb-0.5 ${isEnabled ? "text-amber-900" : "text-green-900"}`}>
            {isEnabled
              ? "Draft Mode is ON — you are viewing unpublished content"
              : "Draft Mode is OFF — this is what public visitors see"}
          </p>
          <p className={`text-xs ${isEnabled ? "text-amber-700" : "text-green-700"}`}>
            {isEnabled ? (
              <>
                <a href="/api/draft/disable" className="underline font-medium">
                  Exit Draft Mode
                </a>{" "}
                to switch back to the published version.
              </>
            ) : (
              <>
                <a
                  href="/api/draft?secret=demo-preview-secret&redirect=/draft-mode/preview"
                  className="underline font-medium"
                >
                  Enable Draft Mode
                </a>{" "}
                to preview the unpublished draft.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Simulated article */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Article header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isEnabled
                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}
            >
              {post.status}
            </span>
            {isEnabled && (
              <span className="text-xs text-gray-400 font-mono">
                CMS Draft API • authenticated fetch
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.subtitle}</p>

          <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.lastUpdated}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Editor note — only in draft */}
        {post.draftNote && (
          <div className="mx-6 mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            {post.draftNote}
          </div>
        )}

        {/* Article body */}
        <div className="p-6 space-y-6">
          {post.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-semibold text-gray-800 mb-2">{section.heading}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
            </div>
          ))}

          {/* New section — only in draft */}
          {post.newSection && (
            <div className="border-2 border-dashed border-amber-300 rounded-xl p-4 bg-amber-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-200 px-2 py-0.5 rounded font-mono">
                  DRAFT ONLY — not yet published
                </span>
              </div>
              <h2 className="font-semibold text-gray-800 mb-2">{post.newSection.heading}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{post.newSection.body}</p>
            </div>
          )}
        </div>
      </div>

      {/* Explanation panel */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-gray-800 mb-3">What just happened?</h3>
        <div className="space-y-2 text-gray-600">
          {isEnabled ? (
            <>
              <p>
                ✅ <code className="font-mono text-blue-700">(await draftMode()).isEnabled</code>{" "}
                returned <code className="font-mono">true</code> — this page fetched the{" "}
                <strong>draft version</strong> of the article (authenticated CMS call).
              </p>
              <p>
                ✅ The article shows Section 4 (PPR) and the editor note — content that is
                not visible to public visitors.
              </p>
              <p>
                ✅ The global amber banner appears at the top of every page, reminding the
                editor they are in preview mode.
              </p>
              <p>
                ✅ This page is <strong>dynamically rendered</strong> on each request —
                the static cache is bypassed.
              </p>
            </>
          ) : (
            <>
              <p>
                ⬜ <code className="font-mono text-blue-700">(await draftMode()).isEnabled</code>{" "}
                returned <code className="font-mono">false</code> — this page fetched only the{" "}
                <strong>published version</strong> (public CMS endpoint, statically cacheable).
              </p>
              <p>
                ⬜ Section 4 (PPR) and the editor note are hidden — they only exist in the
                draft.
              </p>
              <p>
                Enable Draft Mode to see the unpublished content an editor would see.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Server Component note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-2">Server Component — no client JS needed</h3>
        <p className="text-blue-800 leading-relaxed">
          This entire page is a Server Component. There is no <code className="font-mono">useState</code>,
          no <code className="font-mono">useEffect</code>, no client hydration.{" "}
          <code className="font-mono">await draftMode()</code> runs on the server, reads the
          signed cookie from the request, and returns the correct content before HTML is even
          sent to the browser.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/draft-mode"
          className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          ← Back to overview
        </Link>
      </div>
    </div>
  );
}
