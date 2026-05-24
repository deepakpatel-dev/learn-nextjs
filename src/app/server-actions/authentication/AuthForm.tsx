"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type AuthState } from "@/actions/auth";

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
    >
      {pending && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {pending ? "Authenticating…" : "Login"}
    </button>
  );
}

export default function AuthForm({ justLoggedIn }: { justLoggedIn?: boolean }) {
  const [state, action] = useActionState<AuthState, FormData>(
    loginAction,
    { error: "" },
  );

  return (
    <form action={action} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
      <h2 className="font-semibold text-lg">Login via Server Action</h2>

      {/* Hint */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-xs">
        <p className="text-gray-400 mb-1"># Test credentials</p>
        <p>Username: <span className="text-gray-800 font-semibold">admin</span></p>
        <p>Password: <span className="text-gray-800 font-semibold">secret123</span></p>
      </div>

      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          name="username" type="text" placeholder="admin" required
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          name="password" type="password" placeholder="••••••••" required
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
        />
      </div>

      <LoginButton />
    </form>
  );
}
