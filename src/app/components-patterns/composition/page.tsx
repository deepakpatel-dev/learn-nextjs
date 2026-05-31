import Link from "next/link";

export default function CompositionPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">Components & Patterns</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Composition Patterns</h1>
        <p className="text-gray-500 leading-relaxed">
          The key to keeping Server Components working inside Client Component trees — pass
          them as <code className="font-mono text-sm bg-gray-100 px-1 rounded">children</code> props
          instead of importing them directly.
        </p>
      </div>

      {/* The core rule */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm">
        <p className="font-semibold text-red-900 mb-2">The rule that catches everyone</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-red-700 font-semibold mb-2">❌ This breaks — importing SC inside CC</p>
            <pre className="bg-white rounded p-2 text-xs font-mono overflow-x-auto">
{`"use client";
// ❌ ServerFeed is a Server Component
// importing it here makes it run as client
import ServerFeed from "./ServerFeed";

export function Sidebar() {
  return <ServerFeed />;
}`}
            </pre>
          </div>
          <div>
            <p className="text-xs text-green-700 font-semibold mb-2">✓ This works — SC passed as children</p>
            <pre className="bg-white rounded p-2 text-xs font-mono overflow-x-auto">
{`// page.tsx (Server Component)
import Sidebar from "./Sidebar";   // Client
import ServerFeed from "./ServerFeed"; // Server

export default function Page() {
  return (
    // Pass the Server Component as children ✓
    <Sidebar>
      <ServerFeed />
    </Sidebar>
  );
}`}
            </pre>
          </div>
        </div>
        <p className="text-xs text-red-700 mt-2">
          React renders <code className="font-mono">ServerFeed</code> on the server first, then passes
          its already-rendered output as <code className="font-mono">children</code> — the boundary
          is respected.
        </p>
      </div>

      {/* Provider pattern */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Provider pattern — wrap the app in a Client boundary</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// components/Providers.tsx
"use client";  // ← must be client to use Context

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}  {/* ← Server Components can live here */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// app/layout.tsx (Server Component — the root layout)
import { Providers } from "@/components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>
          {children}  {/* ← your Server Component pages go here */}
        </Providers>
      </body>
    </html>
  );
}`}
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          This is the standard pattern used by shadcn/ui, next-themes, and most React Query setups.
          The <code className="font-mono">Providers</code> wrapper is Client, but its{" "}
          <code className="font-mono">children</code> can still be Server Components.
        </p>
      </div>

      {/* Islands architecture */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Islands architecture — minimize client JS</h2>
        <p className="text-sm text-gray-500 mb-3">
          The goal: keep as much as possible on the server. Add client interactivity only where
          needed — like islands in a sea of server-rendered HTML.
        </p>
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs leading-relaxed">
          <pre>{`Page (Server)
├── Header (Server)          ← static — no JS needed
├── Article (Server)         ← just HTML from DB
│   ├── Title (Server)
│   └── Body (Server)
├── LikeButton (Client) 🏝   ← small client island for onClick
├── Comments (Server)        ← rendered server-side
│   └── CommentForm (Client) 🏝  ← needs state + fetch
└── RelatedPosts (Server)    ← purely static list

Total JS bundle: only LikeButton + CommentForm`}</pre>
        </div>
      </div>

      {/* Interleaving */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Component interleaving patterns</h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            {
              title: "Server → Client (passing as props)",
              code: `// ✓ Server fetches, Client renders
export default async function Page() {
  const data = await db.query();
  return <Chart data={data} />;  // Client
}`,
              ok: true,
            },
            {
              title: "Client → Server (via children slot)",
              code: `// ✓ Client wraps, Server content inside
export default function Page() {
  return (
    <Modal>        {/* Client */}
      <Profile />  {/* Server */}
    </Modal>
  );
}`,
              ok: true,
            },
            {
              title: "Client imports Server (broken)",
              code: `// ✗ Don't import SC inside a CC file
"use client";
import ServerData from "./ServerData";
// ServerData now runs as client — loses
// server-only features like DB access`,
              ok: false,
            },
            {
              title: "Server imports Client (fine)",
              code: `// ✓ Always safe to import CC in SC
// No directive needed in server files
import LikeButton from "./LikeButton"; // "use client"
export default function Page() {
  return <LikeButton />;  // ✓
}`,
              ok: true,
            },
          ].map(({ title, code, ok }) => (
            <div key={title} className={`rounded-xl border p-3 ${ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <p className={`font-semibold mb-2 ${ok ? "text-green-800" : "text-red-800"}`}>{ok ? "✓" : "✗"} {title}</p>
              <pre className="bg-white rounded p-2 text-xs overflow-x-auto font-mono leading-relaxed">{code}</pre>
            </div>
          ))}
        </div>
      </div>

      <Link href="/components-patterns" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">← Components & Patterns overview</Link>
    </div>
  );
}
