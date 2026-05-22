"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    // Cookie is now cleared — middleware will block /dashboard on next visit
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors font-medium"
    >
      {loading ? "Logging out…" : "Logout"}
    </button>
  );
}
