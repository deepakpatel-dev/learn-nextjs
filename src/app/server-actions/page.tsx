// Route: /server-actions — Module overview
import Link from "next/link";

const demos = [
  {
    href:    "/server-actions/form-submission",
    title:   "Form Submission",
    badge:   "useActionState",
    color:   "blue",
    what:    "Contact form with server-side validation. useActionState tracks form result. useFormStatus shows pending state on the button.",
    hooks:   ["useActionState", "useFormStatus"],
    concept: "Server Actions replace API routes for form handling. No fetch(), no POST endpoint — just a function.",
  },
  {
    href:    "/server-actions/data-mutations",
    title:   "Data Mutations",
    badge:   "revalidatePath",
    color:   "green",
    what:    "Full Todo CRUD — create, toggle, delete. revalidatePath re-fetches the Server Component after each mutation. useOptimistic for instant UI.",
    hooks:   ["useOptimistic", "useFormStatus", "revalidatePath"],
    concept: "After a mutation Server Action runs, call revalidatePath to purge the cache and re-render with fresh data.",
  },
  {
    href:    "/server-actions/authentication",
    title:   "Authentication",
    badge:   "cookies + redirect",
    color:   "purple",
    what:    "Login via Server Action. Validates credentials, sets an httpOnly cookie with cookies() from next/headers, then redirects — all server-side.",
    hooks:   ["cookies()", "redirect()"],
    concept: "Server Actions have full access to next/headers — read/write cookies and headers without an API route.",
  },
  {
    href:    "/server-actions/background-tasks",
    title:   "Background Tasks",
    badge:   "async work",
    color:   "orange",
    what:    "Simulated email sending. The Server Action runs multiple async steps (validate → render → send → log) and returns a detailed result.",
    hooks:   ["useActionState", "async/await"],
    concept: "Server Actions are plain async functions — they can do anything: send emails, write files, call third-party APIs.",
  },
];

const colorMap: Record<string, { card: string; badge: string; chip: string }> = {
  blue:   { card: "bg-blue-50 border-blue-200",   badge: "bg-blue-600 text-white",   chip: "bg-blue-100 text-blue-700" },
  green:  { card: "bg-green-50 border-green-200",  badge: "bg-green-600 text-white",  chip: "bg-green-100 text-green-700" },
  purple: { card: "bg-purple-50 border-purple-200",badge: "bg-purple-600 text-white", chip: "bg-purple-100 text-purple-700" },
  orange: { card: "bg-orange-50 border-orange-200",badge: "bg-orange-500 text-white", chip: "bg-orange-100 text-orange-700" },
};

export default function ServerActionsOverview() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono bg-gray-200 text-gray-600 px-2 py-1 rounded">
          App Router — src/app/server-actions/ · src/actions/
        </span>
        <h1 className="text-4xl font-bold mt-4 mb-3">Module 03 — Server Actions</h1>
        <p className="text-gray-500 leading-relaxed max-w-3xl">
          Server Actions are async functions marked with <code className="font-mono bg-gray-100 px-1 rounded">&quot;use server&quot;</code>.
          They run exclusively on the server and can be called directly from components —
          no API route, no <code className="font-mono bg-gray-100 px-1 rounded">fetch()</code>, no endpoint to maintain.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-gray-900 text-gray-300 rounded-2xl p-5 font-mono text-xs mb-10">
        <p className="text-gray-500 mb-3"># Two ways to define a Server Action</p>
        <pre>{`// 1. Module-level: "use server" at top of file → every export is a Server Action
"use server";
export async function submitForm(formData: FormData) { ... }
export async function deleteItem(id: string) { ... }

// 2. Inline: "use server" inside an async function inside a Server Component
async function handleSubmit(formData: FormData) {
  "use server";
  // runs on the server
}`}</pre>
      </div>

      {/* Demo cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {demos.map((demo) => {
          const c = colorMap[demo.color];
          return (
            <div key={demo.href} className={`rounded-2xl border p-6 ${c.card}`}>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${c.badge}`}>
                    {demo.badge}
                  </span>
                  <h2 className="font-semibold text-lg">{demo.title}</h2>
                </div>
                <Link href={demo.href} className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${c.badge} opacity-90 hover:opacity-100 transition-opacity`}>
                  Demo →
                </Link>
              </div>
              <p className="text-sm text-gray-600 mb-3">{demo.what}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {demo.hooks.map((h) => (
                  <span key={h} className={`text-xs font-mono px-2 py-0.5 rounded ${c.chip}`}>{h}</span>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic">{demo.concept}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
