import Link from "next/link";

export default function TypeScriptConfigPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">Configuration</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">TypeScript & Path Aliases</h1>
        <p className="text-gray-500 leading-relaxed">
          Next.js ships with TypeScript first-class. Zero config for new projects — rename any
          file to <code className="font-mono text-sm bg-gray-100 px-1 rounded">.ts</code> /{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">.tsx</code> and{" "}
          <code className="font-mono text-sm bg-gray-100 px-1 rounded">next dev</code> installs
          the right packages automatically.
        </p>
      </div>

      {/* Key facts */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm space-y-2 text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">Key facts</p>
        <p>✦ Built-in VS Code plugin — enable via <em>TypeScript: Select TypeScript Version → Use Workspace Version</em>.</p>
        <p>✦ The plugin warns on invalid route segment config, missing <code className="font-mono">"use client"</code>, and hooks in Server Components.</p>
        <p>✦ <code className="font-mono">next build</code> runs a full type-check — no need for a separate <code className="font-mono">tsc</code> step.</p>
        <p>✦ Route type helpers (<code className="font-mono">PageProps</code>, <code className="font-mono">LayoutProps</code>) are auto-generated into <code className="font-mono">.next/types</code>.</p>
      </div>

      {/* This project's tsconfig */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">This project&apos;s <code className="font-mono">tsconfig.json</code></h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,           // ← always enable for Next.js projects
    "noEmit": true,           // ← Next.js handles the build, not tsc
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],  // ← enables the Next.js TS plugin

    // ── Path aliases ──────────────────────────────────────────────────
    // @/* maps to src/*  — use instead of ../../../components/Button
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"    // ← auto-generated route type helpers
  ],
  "exclude": ["node_modules"]
}`}
        </pre>
      </div>

      {/* Path aliases */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Path aliases in practice</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-semibold text-red-800 mb-2">❌ Without path aliases</p>
            <pre className="bg-white rounded p-2 text-xs font-mono overflow-x-auto">
{`import Button from "../../../components/Button";
import { db } from "../../../../lib/db";
import type { User } from "../../../types/user";`}
            </pre>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-800 mb-2">✓ With @/* alias</p>
            <pre className="bg-white rounded p-2 text-xs font-mono overflow-x-auto">
{`import Button from "@/components/Button";
import { db } from "@/lib/db";
import type { User } from "@/types/user";`}
            </pre>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Since <code className="font-mono">paths</code> maps <code className="font-mono">@/*</code> →{" "}
          <code className="font-mono">./src/*</code>, the alias always resolves relative to the{" "}
          <code className="font-mono">src/</code> folder regardless of where the importing file lives.
        </p>
      </div>

      {/* Route type helpers */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Auto-generated route helpers</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// Next.js auto-generates these during \`next dev\` / \`next build\`
// No import needed — they come from .next/types/**/*.ts

// app/blog/[slug]/page.tsx
export default function Page({ params, searchParams }: PageProps) {
  //                                                     ↑ globally available
  // params and searchParams are correctly typed as Promises<...>
}

// app/dashboard/layout.tsx
export default function Layout({ children, params }: LayoutProps) {}

// app/api/posts/[id]/route.ts
export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params;  // ← correctly typed
}`}
        </pre>
      </div>

      <Link href="/configuration" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">← Configuration overview</Link>
    </div>
  );
}
