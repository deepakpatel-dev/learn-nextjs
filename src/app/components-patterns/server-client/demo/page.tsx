// Server Component — fetches data, renders Client Components
import InteractiveCard from "./InteractiveCard";
import Link from "next/link";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json() as Promise<{ id: number; title: string; body: string; userId: number }[]>;
}

export default async function ServerClientDemoPage() {
  // ✓ Can use await — this is a Server Component
  const posts = await fetchPosts();
  const fetchedAt = new Date().toLocaleTimeString("en-US", { hour12: false });

  return (
    <div className="space-y-5">
      {/* File indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-xs font-mono flex items-center gap-2">
        <span className="text-blue-500">●</span>
        server-client/demo/page.tsx — async Server Component
        <span className="ml-auto text-blue-400">Fetched at {fetchedAt} (server time)</span>
      </div>

      {/* Architecture diagram */}
      <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
        <pre>{`page.tsx (Server Component)
  ├── fetch() posts on the server — no API key exposed, no waterfall
  └── renders InteractiveCard[] — each is a Client Component
        ├── useState(expanded)     ← client state
        └── useState(liked)        ← client state`}</pre>
      </div>

      {/* The posts */}
      <div className="grid grid-cols-1 gap-3">
        {posts.map((post) => (
          // Pass server-fetched data as props to Client Components
          <InteractiveCard key={post.id} post={post} />
        ))}
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">What just happened?</p>
        <ul className="space-y-1 text-xs list-disc list-inside">
          <li><code className="font-mono">page.tsx</code> is a Server Component — it ran <code className="font-mono">await fetch()</code> server-side.</li>
          <li>The data was passed as <code className="font-mono">post</code> props to <code className="font-mono">InteractiveCard</code>.</li>
          <li><code className="font-mono">InteractiveCard</code> is a Client Component — it handles expand/like state.</li>
          <li>No API calls from the browser — the fetch happened on the server.</li>
        </ul>
      </div>

      <Link href="/components-patterns/server-client" className="text-sm text-gray-400 hover:text-violet-600 transition-colors">
        ← Back to Server vs Client
      </Link>
    </div>
  );
}
