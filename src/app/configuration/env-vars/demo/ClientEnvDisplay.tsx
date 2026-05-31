"use client";

import { useState } from "react";

interface ServerData {
  NEXT_PUBLIC_DEMO_VAR: string;
  DRAFT_MODE_SECRET_exists: boolean;
  NODE_ENV: string;
  timestamp: string;
}

export default function ClientEnvDisplay({ serverData }: { serverData: ServerData }) {
  const [apiResult, setApiResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  // In a real app you'd have actual NEXT_PUBLIC_ vars set in .env.local
  const clientNextPublic = process.env.NEXT_PUBLIC_DEMO_VAR;
  // This is undefined on the client — server-only
  const clientSecret = (process.env as Record<string, string | undefined>).DRAFT_MODE_SECRET;

  async function fetchFromApi() {
    setLoading(true);
    const res = await fetch("/api/env-check");
    const data = await res.json();
    setApiResult(data);
    setLoading(false);
  }

  return (
    <div className="space-y-5">
      {/* Side-by-side comparison */}
      <div className="grid grid-cols-2 gap-3">
        {/* Server Component side — passed as props */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs">
          <p className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-mono">Server Component</span>
            <span>data (passed as props)</span>
          </p>
          <div className="space-y-2 font-mono">
            <Row label="NEXT_PUBLIC_DEMO_VAR" value={serverData.NEXT_PUBLIC_DEMO_VAR} ok={true} />
            <Row label="DRAFT_MODE_SECRET" value={serverData.DRAFT_MODE_SECRET_exists ? "✓ exists (hidden)" : "(not set)"} ok={serverData.DRAFT_MODE_SECRET_exists} />
            <Row label="NODE_ENV" value={serverData.NODE_ENV} ok={true} />
          </div>
        </div>

        {/* Client Component side — read from process.env */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-xs">
          <p className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <span className="bg-orange-600 text-white px-1.5 py-0.5 rounded text-xs font-mono">Client Component</span>
            <span>process.env access</span>
          </p>
          <div className="space-y-2 font-mono">
            <Row label="NEXT_PUBLIC_DEMO_VAR" value={clientNextPublic ?? "(not set)"} ok={clientNextPublic !== undefined} />
            <Row label="DRAFT_MODE_SECRET" value={clientSecret ?? "undefined ← correct!"} ok={false} warn />
            <Row label="NODE_ENV" value={process.env.NODE_ENV ?? "(not set)"} ok={true} />
          </div>
        </div>
      </div>

      {/* API Route call */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-xs">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-green-900 flex items-center gap-2">
            <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-mono">Route Handler</span>
            <span>GET /api/env-check (server-side)</span>
          </p>
          <button
            onClick={fetchFromApi}
            disabled={loading}
            className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Fetching…" : "Call API →"}
          </button>
        </div>
        {apiResult ? (
          <pre className="bg-white rounded-lg p-3 text-gray-700 overflow-x-auto">
            {JSON.stringify(apiResult, null, 2)}
          </pre>
        ) : (
          <p className="text-green-700">Click the button to call the server-side route handler.</p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, ok, warn }: { label: string; value: string; ok: boolean; warn?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-0.5 ${warn ? "text-orange-500" : ok ? "text-green-600" : "text-red-500"}`}>
        {warn ? "⚠" : ok ? "✓" : "✗"}
      </span>
      <div>
        <span className="text-gray-500">{label}:</span>{" "}
        <span className={warn ? "text-orange-700 font-medium" : ok ? "text-gray-900" : "text-red-600"}>
          {value}
        </span>
      </div>
    </div>
  );
}
