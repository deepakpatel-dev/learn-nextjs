// middleware.ts — runs on the Edge runtime before any route handler.
//
// Responsibilities:
//   1. CORS  — handle OPTIONS preflight, inject Access-Control-Allow-Origin
//              dynamically based on the incoming Origin header
//   2. Auth  — validate username + password for POST /api/auth/login
//   3. Guard — protect /dashboard* routes; redirect to /login if no auth_token cookie

import { NextRequest, NextResponse } from "next/server";

// ─── Config ────────────────────────────────────────────────────────────────

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "secret123";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function getCorsOrigin(request: NextRequest): string {
  const origin = request.headers.get("origin") ?? "";
  // Return the origin if it's in the allowlist, otherwise deny by omitting the header
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

function withCors(response: NextResponse, request: NextRequest): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", getCorsOrigin(request));
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

// ─── Middleware ─────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname, origin: reqOrigin } = request.nextUrl;

  // ── 1. CORS preflight (OPTIONS) ─────────────────────────────────────────
  // Browsers send OPTIONS before cross-origin POST/PUT/DELETE with custom headers.
  // We must respond 204 with the correct CORS headers or the browser blocks the request.
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin":      getCorsOrigin(request),
        "Access-Control-Allow-Methods":     "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":     "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age":           "86400",
      },
    });
  }

  // ── 2. Dashboard route guard ────────────────────────────────────────────
  // Any /dashboard* request without an auth_token cookie is redirected to /login.
  if (pathname.startsWith("/dashboard")) {
    const authToken = request.cookies.get("auth_token");
    if (!authToken) {
      const loginUrl = new URL("/login", reqOrigin);
      // Pass the attempted URL so the login page could redirect back after login
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Cookie present — let the request through
    return withCors(NextResponse.next(), request);
  }

  // ── 3. Login credential validation ─────────────────────────────────────
  if (pathname === "/api/auth/login" && request.method === "POST") {
    let body: { username?: string; password?: string };

    try {
      body = await request.clone().json();
    } catch {
      return withCors(
        NextResponse.json({ success: false, message: "Bad request — expected JSON body" }, { status: 400 }),
        request
      );
    }

    const { username, password } = body;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // ✓ Valid — forward to route.ts with auth headers so route knows who logged in
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-auth-user",      username);
      requestHeaders.set("x-auth-validated", "true");

      return withCors(
        NextResponse.next({ request: { headers: requestHeaders } }),
        request
      );
    }

    // ✗ Invalid — middleware responds directly, route.ts never runs
    return withCors(
      NextResponse.json({ success: false, message: "Invalid Username & Password" }, { status: 401 }),
      request
    );
  }

  // ── 4. All other API routes — attach CORS origin header ─────────────────
  if (pathname.startsWith("/api/")) {
    return withCors(NextResponse.next(), request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",       // All API routes — CORS
    "/dashboard",        // Dashboard root — cookie guard
    "/dashboard/:path*", // Dashboard sub-routes — cookie guard
  ],
};
