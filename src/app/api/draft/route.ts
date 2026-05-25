// API Route: GET /api/draft?secret=<token>&redirect=<path>
//
// Enables Next.js Draft Mode so editors can preview unpublished CMS content.
//
// Flow:
//   1. CMS calls this URL with a shared secret when "Preview" is clicked
//   2. We validate the secret
//   3. draftMode().enable() sets a signed __prerender_bypass cookie
//   4. We redirect to the content page — which now renders dynamically
//      and can fetch the *draft* version from the CMS

import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// In a real app, store this secret in an environment variable and share it
// only with your CMS. For this demo the fallback is readable so you can try it.
const DRAFT_SECRET =
  process.env.DRAFT_MODE_SECRET ?? "demo-preview-secret";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const redirectTo = searchParams.get("redirect") ?? "/draft-mode/preview";

  // ── 1. Validate secret ───────────────────────────────────────────────────
  // A wrong secret means someone is trying to enable draft mode without
  // authorization — reject immediately.
  if (secret !== DRAFT_SECRET) {
    return new Response(
      JSON.stringify({
        error: "Invalid draft mode secret",
        hint:  'Try: /api/draft?secret=demo-preview-secret',
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── 2. Enable draft mode ─────────────────────────────────────────────────
  // draftMode() returns a Promise in Next.js 16 — must be awaited.
  // .enable() sets the __prerender_bypass cookie which the Next.js runtime
  // checks on subsequent requests to skip static cache.
  const draft = await draftMode();
  draft.enable();

  // ── 3. Redirect to the preview URL ───────────────────────────────────────
  // The redirect target can be passed as a query param from the CMS.
  // Only allow relative paths (same origin) to prevent open redirect attacks.
  const safeRedirect = redirectTo.startsWith("/") ? redirectTo : "/draft-mode/preview";
  return NextResponse.redirect(new URL(safeRedirect, request.url));
}
