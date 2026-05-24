"use client";

import { useFormStatus } from "react-dom";
import { logoutAction } from "@/actions/auth";

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-sm bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
    >
      {pending ? "Logging out…" : "Logout"}
    </button>
  );
}

export default function LoggedIn({
  username,
  tokenValue,
}: {
  username: string;
  tokenValue: string;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="text-3xl mb-3">✓</div>
        <h2 className="text-xl font-bold text-green-800 mb-1">
          Logged in as <span className="font-mono">{username}</span>
        </h2>
        <p className="text-sm text-green-600">
          Cookie set by the Server Action — readable on the server, invisible to JS.
        </p>
      </div>

      <div className="bg-gray-900 text-gray-300 rounded-2xl p-5 font-mono text-xs">
        <p className="text-gray-500 mb-2"># sa_auth_token cookie (read server-side)</p>
        <div className="space-y-1">
          <p><span className="text-yellow-400">value</span>    : {tokenValue}</p>
          <p><span className="text-yellow-400">httpOnly</span> : true  ← document.cookie cannot see this</p>
          <p><span className="text-yellow-400">sameSite</span> : lax</p>
          <p><span className="text-yellow-400">maxAge</span>   : 86400 (24 h)</p>
        </div>
      </div>

      <form action={logoutAction}>
        <LogoutButton />
      </form>
    </div>
  );
}
