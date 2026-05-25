// DraftModeBanner — async Server Component
//
// Shown at the very top of every page when Draft Mode is active.
// Returns null (renders nothing) when Draft Mode is off — zero overhead.
//
// Why async?  draftMode() returns a Promise in Next.js 16.
// Why a Server Component?  draftMode() is server-only; it cannot be called
// in Client Components.

import { draftMode } from "next/headers";

export default async function DraftModeBanner() {
  const draft = await draftMode();

  if (!draft.isEnabled) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber-400 text-amber-950 px-4 py-2.5 flex items-center justify-between text-sm font-medium"
    >
      <div className="flex items-center gap-2">
        {/* Pulsing dot signals "live preview" to the editor */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-700 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-800" />
        </span>
        <span>
          <strong>Draft Mode active</strong> — you are viewing unpublished content.
          Changes are not visible to the public.
        </span>
      </div>

      {/* Exit link — calls /api/draft/disable which turns off the cookie */}
      <a
        href="/api/draft/disable"
        className="ml-4 shrink-0 underline underline-offset-2 hover:text-amber-900 transition-colors"
      >
        Exit Draft Mode →
      </a>
    </div>
  );
}
