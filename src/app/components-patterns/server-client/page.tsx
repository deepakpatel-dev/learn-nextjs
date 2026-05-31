import Link from "next/link";

export default function ServerClientPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-violet-100 text-violet-700 px-2 py-1 rounded">Components & Patterns · Live Demo</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Server vs Client Components</h1>
        <p className="text-gray-500 leading-relaxed">
          Every component in the App Router is a <strong>Server Component by default</strong>.
          Add <code className="font-mono text-sm bg-gray-100 px-1 rounded">"use client"</code> at
          the top to opt into the client environment and unlock React hooks and browser APIs.
        </p>
      </div>

      {/* Live demo CTA */}
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
        <h2 className="font-semibold text-violet-900 mb-2">Live demo — composition in action</h2>
        <p className="text-sm text-violet-800 mb-3">
          A Server Component fetches posts from JSONPlaceholder, then renders them as Client
          Components with expand/like interactivity — zero browser fetch calls.
        </p>
        <Link href="/components-patterns/server-client/demo" className="inline-block px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">
          Open composition demo →
        </Link>
      </div>

      {/* When to use which */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">When to use each</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
            <p className="font-semibold text-blue-900 mb-3">Use Server Components when you need:</p>
            <ul className="space-y-2 text-blue-800 text-xs">
              {["Fetch data from DB or APIs", "Use API keys / secrets", "Reduce JS sent to browser", "Improve initial page load", "Access cookies, headers server-side"].map(item => (
                <li key={item} className="flex items-center gap-2"><span className="text-blue-500">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm">
            <p className="font-semibold text-orange-900 mb-3">Use Client Components when you need:</p>
            <ul className="space-y-2 text-orange-800 text-xs">
              {["useState / useReducer", "useEffect / useRef", "onClick, onChange, onSubmit", "Browser APIs (localStorage, window)", "Third-party client-side libraries"].map(item => (
                <li key={item} className="flex items-center gap-2"><span className="text-orange-500">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The boundary */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">The "use client" boundary</h2>
        <p className="text-sm text-gray-500 mb-3">
          <code className="font-mono">"use client"</code> marks a boundary. Everything imported
          by that file is also considered a Client Component. The boundary flows <em>down</em>,
          not up.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// app/page.tsx — Server Component (no directive needed)
import LikeButton from "@/components/LikeButton";  // ← Client Component

export default async function Page() {
  const data = await fetch("https://api.example.com/posts");  // ✓ server fetch
  const posts = await data.json();

  return (
    <div>
      {posts.map(post => (
        // Data flows from server → client as serializable props
        <LikeButton key={post.id} initialLikes={post.likes} />
      ))}
    </div>
  );
}

// components/LikeButton.tsx
"use client";  // ← everything in this file + its imports = client

import { useState } from "react";

export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);  // ✓ works in client
  return <button onClick={() => setLikes(l => l + 1)}>{likes} ❤️</button>;
}`}
        </pre>
      </div>

      {/* Serialization */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-semibold text-amber-900 mb-2">Props must be serializable</p>
        <p className="text-xs mb-2">
          Props passed from a Server Component to a Client Component must cross the server/client
          boundary — they must be JSON-serializable.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div>
            <p className="text-green-700 mb-1">✓ OK</p>
            <pre className="bg-white rounded p-2">string, number, boolean
Date, Array, plain object
null, undefined</pre>
          </div>
          <div>
            <p className="text-red-700 mb-1">✗ Not serializable</p>
            <pre className="bg-white rounded p-2">Function
Class instance
Symbol
Set / Map (use Array)</pre>
          </div>
        </div>
      </div>

      <Link href="/components-patterns" className="text-sm text-gray-400 hover:text-violet-600 transition-colors">← Components & Patterns overview</Link>
    </div>
  );
}
