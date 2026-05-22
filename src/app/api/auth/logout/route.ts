// API Route: POST /api/auth/logout
//
// Clears the auth_token cookie by setting it with maxAge: 0.
// The browser immediately discards it — the user is logged out.

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  // Expire the cookie immediately
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   0,   // expires immediately
    path:     "/",
  });

  return response;
}
