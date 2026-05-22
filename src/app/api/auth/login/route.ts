// API Route: POST /api/auth/login
//
// Only reached when middleware has already validated the credentials.
// Responsibilities here:
//   • Return a Welcome JSON response
//   • Set an httpOnly auth_token cookie so the browser is "logged in"

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const username  = request.headers.get("x-auth-user")      ?? "User";
  const validated = request.headers.get("x-auth-validated");

  // Safety net: reject if somehow reached without middleware validation
  if (validated !== "true") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  // Build the success response
  const response = NextResponse.json({
    success:   true,
    message:   `Welcome, ${username}! You are successfully authenticated.`,
    handledBy: "route.ts — middleware passed the request after validation",
  });

  // ── Set auth_token cookie ──────────────────────────────────────────────
  // httpOnly  → JavaScript cannot read it (XSS protection)
  // secure    → HTTPS only in production
  // sameSite  → lax prevents CSRF while allowing normal navigation
  // maxAge    → 24 hours in seconds
  response.cookies.set("auth_token", `${username}:${crypto.randomUUID()}`, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 24,
    path:     "/",
  });

  return response;
}
