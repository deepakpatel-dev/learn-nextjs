// Route: /styling/node-modules
// Demonstrates importing CSS from node_modules in Next.js.
//
// normalize.css is imported on this page only — its rules are scoped to
// this page's render. For a global effect you'd import in layout.tsx instead.
//
// Next.js 13+ (App Router) allows CSS imports in any Server or Client Component.

import "normalize.css";

export default function NodeModulesPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
          import "normalize.css" — from node_modules
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Styles from node_modules</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Any npm package that ships a <code className="font-mono bg-gray-100 px-1 rounded">.css</code> file
          can be imported directly. Next.js processes it through the same PostCSS pipeline as your own CSS —
          no extra configuration required.
        </p>
      </div>

      <div className="space-y-8">

        {/* ── How to import ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Three ways to import</h2>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`// ─── Option 1: Global (affects every page) ───────────────────────────
// app/layout.tsx
import "normalize.css";          // ← runs on all pages

// ─── Option 2: Page-level (affects only this route) ────────────────
// app/styling/node-modules/page.tsx
import "normalize.css";          // ← only on /styling/node-modules

// ─── Option 3: Inside globals.css with @import ──────────────────────
// globals.css
@import "normalize.css";         // ← processed by PostCSS at build time`}</pre>
          </div>
        </section>

        {/* ── What normalize.css does ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">What normalize.css does</h2>
          <p className="text-sm text-gray-500 mb-5">
            Each browser ships with its own default stylesheet. normalize.css irons out the differences
            so your UI starts from a consistent baseline across Chrome, Firefox, Safari, and Edge.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "HTML5 display roles",
                desc:  "Sets block/inline rendering for new HTML5 elements that older browsers don't know about.",
                code:  "article, aside, figure, figcaption,\nfooter, header, main, nav, section\n{ display: block; }",
              },
              {
                title: "Consistent font sizes",
                desc:  "Prevents sub and sup elements from affecting line-height in all browsers.",
                code:  "sub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n}",
              },
              {
                title: "Form element inheritance",
                desc:  "Makes buttons and inputs inherit font-family from their parent — browsers don't do this by default.",
                code:  "button, input, optgroup,\nselect, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  line-height: 1.15;\n}",
              },
              {
                title: "Correct line height",
                desc:  "Sets a sensible 1.15 line-height across all browsers (Chrome sets 1.2, others differ).",
                code:  "html {\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n}",
              },
            ].map(({ title, desc, code }) => (
              <div key={title} className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{desc}</p>
                <pre className="bg-gray-900 text-gray-300 rounded-lg p-3 text-xs overflow-x-auto">{code}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* ── Common packages that ship CSS ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Common npm packages that ship CSS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500 font-medium">
                  <th className="pb-2 pr-4">Package</th>
                  <th className="pb-2 pr-4">Import</th>
                  <th className="pb-2">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["normalize.css",       'import "normalize.css"',                  "Cross-browser CSS reset"],
                  ["highlight.js",        'import "highlight.js/styles/github.css"', "Syntax highlighting themes"],
                  ["react-toastify",      'import "react-toastify/dist/ReactToastify.css"', "Toast notification styles"],
                  ["swiper",             'import "swiper/css"',                      "Touch slider component CSS"],
                  ["nprogress",           'import "nprogress/nprogress.css"',         "Page load progress bar"],
                  ["react-datepicker",    'import "react-datepicker/dist/react-datepicker.css"', "Date picker styles"],
                ].map(([pkg, imp, purpose]) => (
                  <tr key={pkg}>
                    <td className="py-2.5 pr-4 font-mono text-xs text-green-700">{pkg}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-blue-700">{imp}</td>
                    <td className="py-2.5 text-xs text-gray-600">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── normalize.css live proof ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">normalize.css — live proof</h2>
          <p className="text-sm text-gray-500 mb-5">
            These raw HTML elements are rendered <strong>without any Tailwind classes</strong>.
            normalize.css ensures they look consistent across browsers.
          </p>

          <div className="border border-dashed border-gray-300 rounded-xl p-6 space-y-4 bg-gray-50">
            <p>
              Normal paragraph text — line-height from normalize:{" "}
              <code>line-height: 1.15</code>
            </p>

            <p>
              Sub/sup example: H<sub>2</sub>O and E=mc<sup>2</sup> —
              normalized so they don't shift line height.
            </p>

            <p>
              <strong>Bold</strong>, <em>italic</em>, <s>strikethrough</s>,{" "}
              <abbr title="Cascading Style Sheets">CSS</abbr>
            </p>

            <button style={{ fontFamily: "inherit", fontSize: "1rem" }}>
              Button — font-family inherited from parent (normalize fix)
            </button>

            <hr />

            <blockquote style={{ margin: 0, paddingLeft: "1rem", borderLeft: "3px solid #d1d5db" }}>
              A blockquote — margins reset to 0 by normalize so it doesn't have surprise spacing.
            </blockquote>
          </div>
        </section>

        {/* ── Important notes ── */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h2 className="font-semibold text-green-900 mb-3">Important notes</h2>
          <ul className="space-y-2 text-sm text-green-800">
            {[
              "Next.js App Router allows CSS imports in any Server or Client Component — no restriction like the Pages Router.",
              "In the Pages Router you could only import global CSS inside _app.tsx — the App Router lifted this restriction.",
              "The imported CSS is bundled and code-split — importing on a page means it only loads for that route.",
              "Import in app/layout.tsx if you want the package CSS to apply globally to every page.",
              "PostCSS processes node_modules CSS just like your own — vendor prefixes are added automatically.",
            ].map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-green-500 shrink-0">→</span>{r}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
