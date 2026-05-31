// Server Component — can read ALL env vars
import ClientEnvDisplay from "./ClientEnvDisplay";
import Link from "next/link";

export default function EnvVarsDemoPage() {
  // Server Components have full access to all env vars
  const serverData = {
    NEXT_PUBLIC_DEMO_VAR: process.env.NEXT_PUBLIC_DEMO_VAR ?? "(not set — add to .env.local)",
    DRAFT_MODE_SECRET_exists: !!process.env.DRAFT_MODE_SECRET,
    NODE_ENV: process.env.NODE_ENV ?? "unknown",
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs font-mono flex items-center gap-2">
        <span className="text-amber-600">●</span>
        env-vars/demo/page.tsx — Server Component + Client Component demo
      </div>

      <ClientEnvDisplay serverData={serverData} />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">What this demo shows</p>
        <ul className="space-y-1 text-xs list-disc list-inside">
          <li>Server Components read <strong>all</strong> env vars (including secrets).</li>
          <li>Client Components only see <code className="font-mono">NEXT_PUBLIC_*</code> vars — secrets are <code className="font-mono">undefined</code>.</li>
          <li>Route Handlers run server-side and have full env access.</li>
          <li>Pass server-read values down as <strong>props</strong> — never expose raw secrets.</li>
        </ul>
      </div>

      <Link href="/configuration/env-vars" className="text-sm text-gray-400 hover:text-amber-600 transition-colors">
        ← Back to Environment Variables
      </Link>
    </div>
  );
}
