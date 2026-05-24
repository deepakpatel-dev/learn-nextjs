"use server";
// auth.ts — Server Action for authentication
//
// Demonstrates the Server Action approach to auth:
//   Form → Server Action (validate) → set httpOnly cookie → redirect
//
// Compared to the API-route approach (middleware + route.ts), here the
// entire flow lives in one function with no HTTP round-trip overhead.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "secret123";

export type AuthState = {
  error: string;
};

export async function loginAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const username = (formData.get("username") as string | null) ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  // Basic presence check
  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  // Simulate DB lookup latency
  await new Promise((r) => setTimeout(r, 600));

  // Credential check
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return { error: "Invalid username or password." };
  }

  // ── Set auth cookie ──────────────────────────────────────────────────────
  // cookies() from next/headers lets Server Actions read/write cookies directly.
  // No NextResponse needed — runs purely on the server.
  const cookieStore = await cookies();
  cookieStore.set("sa_auth_token", `${username}:${crypto.randomUUID()}`, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 24, // 24 hours
    path:     "/",
  });

  // ── Redirect after successful login ──────────────────────────────────────
  // redirect() throws internally — call it OUTSIDE try/catch blocks.
  // This navigates the user server-side without a client round-trip.
  redirect("/server-actions/authentication?status=success");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("sa_auth_token");
  redirect("/server-actions/authentication");
}
