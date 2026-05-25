// API Route: GET /api/draft/disable
//
// Disables Draft Mode and sends the editor back to the preview page.
// No secret needed — disabling is always safe (it only removes access).

import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // draftMode() is async in Next.js 16 — must be awaited.
  const draft = await draftMode();
  draft.disable();

  // Send editor back to preview so they can compare draft vs published side-by-side.
  return NextResponse.redirect(new URL("/draft-mode/preview", request.url));
}
