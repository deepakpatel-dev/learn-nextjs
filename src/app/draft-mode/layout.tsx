import Link from "next/link";

const topics = [
  { label: "Overview",     href: "/draft-mode" },
  { label: "Live Preview", href: "/draft-mode/preview" },
];

export default function DraftModeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex gap-10">
      <aside className="w-52 shrink-0">
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
          Draft Mode
        </p>
        <nav className="space-y-0.5">
          {topics.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              prefetch={false}
              className="block text-sm text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Quick enable / disable links for easy demo access */}
        <div className="mt-6 border-t border-gray-200 pt-5">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
            Try it
          </p>
          <div className="space-y-1.5">
            <a
              href="/api/draft?secret=demo-preview-secret"
              className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              ✓ Enable Draft Mode
            </a>
            <a
              href="/api/draft/disable"
              className="flex items-center gap-1.5 text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              ✕ Exit Draft Mode
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
