import Link from "next/link";

const topics = [
  {
    href: "/components-patterns/server-client",
    title: "Server vs Client Components",
    icon: "⚡",
    color: "violet",
    summary: "Decision tree, rendering environments, and how to cross the server/client boundary safely.",
    tags: ["async/await", '"use client"', "Live Demo"],
    demo: true,
  },
  {
    href: "/components-patterns/composition",
    title: "Composition Patterns",
    icon: "🧩",
    color: "blue",
    summary: "Pass Server Components as props to Client Components. Provider wrapping. Avoiding the 'use client' sprawl.",
    tags: ["children prop", "Provider pattern", "Islands"],
  },
  {
    href: "/components-patterns/parallel-routes",
    title: "Parallel Routes",
    icon: "⑆",
    color: "green",
    summary: "Render multiple pages simultaneously in the same layout using @slot folders.",
    tags: ["@slot", "Conditional UI", "Modals"],
  },
  {
    href: "/components-patterns/intercepting-routes",
    title: "Intercepting Routes",
    icon: "🔗",
    color: "orange",
    summary: "Show a route's content in a modal overlay — with a shareable URL that opens the full page on hard nav.",
    tags: ["(..)", "Modal pattern", "Soft navigation"],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", badge: "bg-violet-100 text-violet-700" },
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   badge: "bg-blue-100 text-blue-700" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700",  badge: "bg-green-100 text-green-700" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-800" },
};

export default function ComponentsOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-violet-100 text-violet-700 px-2 py-1 rounded">Module 09 — Components & Patterns</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Components & Patterns</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Master the composition model: Server Components for data, Client Components for
          interactivity, and advanced routing patterns for modals and dashboards.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {topics.map((t) => {
          const c = colorMap[t.color];
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`group block rounded-xl border p-5 transition-all hover:shadow-sm ${c.bg} ${c.border}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className={`font-semibold ${c.text}`}>{t.title}</h2>
                    {"demo" in t && (
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">Live Demo</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{t.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.filter(tag => tag !== "Live Demo").map(tag => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-mono ${c.badge}`}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className={`text-sm font-medium ${c.text} group-hover:translate-x-1 transition-transform`}>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* The golden rule */}
      <div className="bg-gray-900 text-gray-300 rounded-xl p-5 text-xs font-mono leading-relaxed">
        <p className="text-gray-500 mb-2"># The golden rule of component composition</p>
        <pre>{`Server Components can import Client Components  ✓
Client Components CANNOT import Server Components ✗

// But you CAN pass a Server Component as a prop:
// <ClientShell>{/* Server Component here */}</ClientShell>
// The Server Component renders on the server, its output is
// passed as children — the boundary is respected.`}</pre>
      </div>
    </div>
  );
}
