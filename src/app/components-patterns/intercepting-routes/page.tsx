import Link from "next/link";

export default function InterceptingRoutesPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">Components & Patterns</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Intercepting Routes</h1>
        <p className="text-gray-500 leading-relaxed">
          Load a route inside the current layout as an overlay (e.g. a modal) during soft
          navigation, while still rendering the full page on hard navigation or direct URL access.
        </p>
      </div>

      {/* The concept */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-semibold text-blue-900 mb-2">🔗 Soft navigation (client-side)</p>
          <p className="text-blue-800 text-xs leading-relaxed">
            User clicks a photo in the feed → the <code className="font-mono">(..)photo/[id]</code>{" "}
            route intercepts — shows the photo in a modal overlay while the feed stays in the background.
            URL updates to <code className="font-mono">/photo/123</code>.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-900 mb-2">🌐 Hard navigation (direct URL)</p>
          <p className="text-green-800 text-xs leading-relaxed">
            User pastes <code className="font-mono">/photo/123</code> in a new tab → the real
            <code className="font-mono">photo/[id]/page.tsx</code> renders as a full page — no
            interception. Shareable links just work.
          </p>
        </div>
      </div>

      {/* Convention */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">The <code className="font-mono">(..)</code> convention</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">Convention</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-600 border-b border-gray-200">Matches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                ["(.)segment", "Same level — e.g. (.)photo intercepts ./photo"],
                ["(..)segment", "One level above — e.g. (..)photo in @modal"],
                ["(..)(..)segment", "Two levels above"],
                ["(...)segment", "From the app root"],
              ].map(([conv, desc]) => (
                <tr key={conv}>
                  <td className="px-3 py-2 font-mono text-orange-700 font-medium">{conv}</td>
                  <td className="px-3 py-2 text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Note: the convention is based on <em>route segments</em>, not filesystem depth.
          <code className="font-mono">@modal</code> slots are not counted as a segment.
        </p>
      </div>

      {/* Folder structure */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Photo gallery folder structure</h2>
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs leading-relaxed">
          <pre>{`app/
├── layout.tsx          ← receives @modal slot
├── @modal/
│   ├── default.tsx     ← null (no modal by default)
│   └── (..)photo/      ← intercepts /photo/[id] one level up
│       └── [id]/
│           └── page.tsx  ← renders the MODAL
└── photo/
    └── [id]/
        └── page.tsx    ← renders the FULL PAGE (hard nav)`}</pre>
        </div>
      </div>

      {/* Code */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Implementation</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/layout.tsx — accepts @modal</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal:    React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}  {/* ← renders the modal overlay (or null via default.tsx) */}
      </body>
    </html>
  );
}`}
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">app/@modal/(..)photo/[id]/page.tsx — the modal</p>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
{`"use client";
import { useRouter } from "next/navigation";

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  // Close modal by going back
  const close = () => router.back();

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={close}>
      <div className="absolute inset-20 bg-white rounded-xl p-6" onClick={e => e.stopPropagation()}>
        {/* Photo content — same data as the full page */}
        <button onClick={close}>✕ Close</button>
        <img src={"/photos/" + React.use(params).id + ".jpg"} alt="Photo" />
      </div>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </div>

      <Link href="/components-patterns" className="text-sm text-gray-400 hover:text-orange-600 transition-colors">← Components & Patterns overview</Link>
    </div>
  );
}
