// Demonstrates what's available server-side vs client-side.
// NEXT_PUBLIC_* vars are safe to expose; server-only vars should NEVER
// be returned here in a real app. We only reveal whether they exist.

export async function GET() {
  return Response.json({
    runtime: "server (Route Handler)",
    // Safe to show: NEXT_PUBLIC_ vars are already in the client bundle
    NEXT_PUBLIC_DEMO_VAR: process.env.NEXT_PUBLIC_DEMO_VAR ?? "(not set)",
    // Never expose actual secret values — just show they exist
    DRAFT_MODE_SECRET_exists: !!process.env.DRAFT_MODE_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
