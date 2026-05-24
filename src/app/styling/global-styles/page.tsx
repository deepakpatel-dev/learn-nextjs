// Route: /styling/global-styles
// Demonstrates global stylesheets in Next.js:
//   - globals.css is imported ONCE in app/layout.tsx
//   - Every CSS rule in it applies to the entire app automatically
//   - Shown here: CSS custom properties, global utility classes, @keyframes

export default function GlobalStylesPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">
          globals.css — imported in app/layout.tsx
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Global Stylesheets</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          A global stylesheet is imported <strong>once</strong> at the root
          layout and its rules cascade to every page and component. Perfect for
          CSS resets, design tokens (custom properties), font declarations, and
          keyframe animations.
        </p>
      </div>

      <div className="space-y-8">
        {/* ── How it works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">How it works</h2>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`// app/layout.tsx  ← root layout, wraps every page
import "./globals.css";   // ← imported once here

// globals.css can contain:
//   • @import "tailwindcss"
//   • :root { --color-brand: #6d28d9; }  ← CSS variables
//   • body { font-family: … }            ← element styles
//   • @keyframes fadeInUp { … }          ← animations
//   • .text-brand { color: var(--color-brand); } ← utility classes`}</pre>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Next.js only allows global CSS imports inside a{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">
              layout.tsx
            </code>{" "}
            or{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">page.tsx</code>{" "}
            at the app root — not inside regular components. This prevents
            accidental style ordering issues.
          </p>
        </section>

        {/* ── CSS custom properties ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">
            CSS Custom Properties (Design Tokens)
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Defined in{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">:root</code> in
            globals.css — available everywhere without imports.
          </p>

          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs mb-5">
            <pre>{`/* globals.css */
:root {
  --color-brand:       #6d28d9;
  --color-brand-light: #ede9fe;
  --color-accent:      #0ea5e9;
  --radius-card:       1rem;
  --shadow-card:       0 4px 24px rgba(0,0,0,0.08);
  --transition-base:   150ms ease;
}`}</pre>
          </div>

          {/* Live demo */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "--color-brand",
                style: { background: "var(--color-brand)", color: "#fff" },
              },
              {
                label: "--color-brand-light",
                style: {
                  background: "var(--color-brand-light)",
                  color: "#6d28d9",
                },
              },
              {
                label: "--color-accent",
                style: { background: "var(--color-accent)", color: "#fff" },
              },
              {
                label: "--shadow-card",
                style: { background: "#fff", boxShadow: "var(--shadow-card)" },
              },
            ].map(({ label, style }) => (
              <div
                key={label}
                style={style}
                className="h-16 rounded-xl flex items-center justify-center text-xs font-mono text-center px-2 border border-gray-100"
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* ── Global utility classes ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">Global Utility Classes</h2>
          <p className="text-sm text-gray-500 mb-4">
            Classes declared in globals.css work on any element without
            importing anything.
          </p>

          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs mb-5">
            <pre>{`/* globals.css */
.text-brand  { color: var(--color-brand); }
.bg-brand    { background-color: var(--color-brand); color: #fff; }
.card-shadow { box-shadow: var(--shadow-card); }
.radius-card { border-radius: var(--radius-card); }

/* Usage in any component — no import needed */
<h2 className="text-brand">Purple heading</h2>
<div className="bg-brand radius-card">Branded card</div>`}</pre>
          </div>

          {/* Live demo */}
          <div className="space-y-3">
            <h3 className="text-brand font-semibold text-lg">
              This heading uses{" "}
              <code className="font-mono text-sm">.text-brand</code> from
              globals.css
            </h3>
            <div className="bg-brand radius-card p-4 text-sm">
              This div uses{" "}
              <code className="font-mono bg-white/20 px-1 rounded">
                .bg-brand
              </code>{" "}
              and{" "}
              <code className="font-mono bg-white/20 px-1 rounded">
                .radius-card
              </code>
            </div>
            <div className="card-shadow radius-card p-4 border border-gray-100 text-sm text-gray-700">
              This div uses{" "}
              <code className="font-mono bg-gray-100 px-1 rounded">
                .card-shadow
              </code>{" "}
              and{" "}
              <code className="font-mono bg-gray-100 px-1 rounded">
                .radius-card
              </code>
            </div>
          </div>
        </section>

        {/* ── Keyframe animations ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">@keyframes Animations</h2>
          <p className="text-sm text-gray-500 mb-4">
            Animations defined globally in globals.css can be used by any
            component via className.
          </p>

          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs mb-5">
            <pre>{`/* globals.css */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes pulse-brand {
  0%, 100% { box-shadow: 0 0 0 0 rgba(109,40,217,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(109,40,217,0); }
}
@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

/* Utility classes that apply them */
.animate-fade-in-up  { animation: fadeInUp    0.5s ease both; }
.animate-pulse-brand { animation: pulse-brand 2s   ease infinite; }
.animate-spin-slow   { animation: spin-slow   3s   linear infinite; }`}</pre>
          </div>

          {/* Live demo */}
          <div className="flex flex-wrap gap-5 items-center">
            <div className="animate-fade-in-up bg-purple-50 border border-purple-200 rounded-xl px-5 py-3 text-sm text-purple-800 font-medium">
              fadeInUp — slides up on load
            </div>
            <button className="animate-pulse-brand bg-brand radius-card px-5 py-3 text-sm font-medium cursor-default">
              pulse-brand — glowing ring
            </button>
            <div
              className="animate-spin-slow w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-700"
              style={{ display: "inline-block" }}
            />
          </div>
        </section>

        {/* ── Key rules callout ── */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <h2 className="font-semibold text-purple-900 mb-3">
            Key rules for global CSS in Next.js
          </h2>
          <ul className="space-y-2 text-sm text-purple-800">
            {[
              "Global CSS can only be imported inside a layout.tsx or page.tsx at the root level — NOT inside a component file.",
              "Tailwind's @import 'tailwindcss' directive lives in globals.css and is the first line.",
              "CSS custom properties in :root are available to every element, including Tailwind's arbitrary values.",
              "Every rule in globals.css applies to ALL pages — keep it lean; component-specific styles belong in CSS Modules.",
            ].map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-purple-400 shrink-0 mt-0.5">→</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
