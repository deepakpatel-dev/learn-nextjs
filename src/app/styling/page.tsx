// Route: /styling
// Overview page for the Styling module

import Link from "next/link";

const topics = [
  {
    href:    "/styling/global-styles",
    badge:   "globals.css",
    color:   "purple",
    title:   "Global Stylesheets",
    desc:    "Import a CSS file once in the root layout and its rules apply everywhere — base resets, CSS custom properties (design tokens), keyframe animations, and third-party font-faces.",
    bullets: [
      "Imported in app/layout.tsx — affects every page",
      "CSS custom properties (--variables) for design tokens",
      "@keyframes for site-wide animations",
      "Element-level resets (*, body, a, …)",
    ],
  },
  {
    href:    "/styling/css-modules",
    badge:   "*.module.css",
    color:   "blue",
    title:   "CSS Modules",
    desc:    "Co-locate a .module.css file next to your component. Next.js scopes every class name automatically — no collisions, no naming conventions needed.",
    bullets: [
      "Class names are hashed at build time → zero collisions",
      "Import styles as a JS object: styles.card",
      "composes: lets you extend other classes",
      "Works with TypeScript via CSS Module type declarations",
    ],
  },
  {
    href:    "/styling/node-modules",
    badge:   "node_modules",
    color:   "green",
    title:   "Styles from node_modules",
    desc:    "Any package CSS (resets, component libraries, icon sets) can be imported directly. Next.js processes and bundles it just like your own CSS.",
    bullets: [
      "Import normalize.css for a cross-browser reset baseline",
      "Works with any npm package that ships a .css file",
      "Import in layout.tsx for global effect, or in a page for local scope",
      "Processed through the same PostCSS pipeline as your own CSS",
    ],
  },
  {
    href:    "/styling/sass",
    badge:   "*.scss",
    color:   "orange",
    title:   "Sass / SCSS",
    desc:    "Install sass and Next.js compiles .scss files automatically. Use .module.scss for scoped components, plain .scss for globals, and sassOptions for build-time config.",
    bullets: [
      "Variables, nesting, mixins, @extend — full Sass feature set",
      ".module.scss works exactly like .module.css — scoped class names",
      "sassOptions.additionalData injects vars into every file globally",
      ":export maps Sass variables to a JS object you can import in React",
    ],
  },
];

const colorMap: Record<string, { badge: string; dot: string; link: string }> = {
  purple: {
    badge: "bg-purple-100 text-purple-800",
    dot:   "bg-purple-500",
    link:  "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100",
  },
  blue: {
    badge: "bg-blue-100 text-blue-800",
    dot:   "bg-blue-500",
    link:  "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
  },
  green: {
    badge: "bg-green-100 text-green-800",
    dot:   "bg-green-500",
    link:  "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
  },
  orange: {
    badge: "bg-orange-100 text-orange-800",
    dot:   "bg-orange-500",
    link:  "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100",
  },
};

export default function StylingOverviewPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">
          Module 04 — Styling
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Stylesheet in Next.js</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Next.js supports multiple CSS strategies — global stylesheets for site-wide rules,
          CSS Modules for scoped component styles, and direct imports from npm packages.
          Pick the right tool for each layer.
        </p>
      </div>

      {/* Topic cards */}
      <div className="space-y-5 mb-12">
        {topics.map((t) => {
          const c = colorMap[t.color];
          return (
            <div key={t.href} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-3 h-3 rounded-full mt-1.5 ${c.dot}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-semibold text-lg">{t.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${c.badge}`}>
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{t.desc}</p>
                  <ul className="space-y-1 mb-4">
                    {t.bullets.map((b) => (
                      <li key={b} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-400 shrink-0">→</span>{b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={t.href}
                    className={`inline-flex text-sm border px-4 py-1.5 rounded-full transition-colors ${c.link}`}
                  >
                    View demo →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="bg-gray-900 text-gray-300 rounded-2xl p-6 font-mono text-xs">
        <p className="text-gray-500 mb-4"># When to use each approach</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="pb-2 pr-6">Approach</th>
                <th className="pb-2 pr-6">Scope</th>
                <th className="pb-2 pr-6">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                ["globals.css",      "Global",    "Resets, CSS variables, fonts, animations"],
                ["*.module.css",     "Component", "Scoped UI components, layout pieces"],
                ["node_modules CSS", "Global",    "Third-party resets, icon CSS, UI libraries"],
                ["*.module.scss",    "Component", "Sass-powered scoped components (variables, mixins, nesting)"],
                ["*.scss (global)",  "Global",    "Sass globals — same as globals.css but with Sass features"],
              ].map(([approach, scope, use]) => (
                <tr key={approach}>
                  <td className="py-2 pr-6 text-yellow-400">{approach}</td>
                  <td className="py-2 pr-6 text-blue-400">{scope}</td>
                  <td className="py-2 text-gray-300">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
