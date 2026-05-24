// Route: /styling/sass
// Demonstrates Sass (SCSS) support in Next.js:
//   - Install: npm install --save-dev sass
//   - Variables, nesting, mixins, @extend, %placeholders
//   - .module.scss for scoped Sass modules
//   - sassOptions.additionalData — global vars without @use
//   - :export — expose Sass variables to JavaScript

import styles from "./Button.module.scss";
// variables.module.scss is imported for concept illustration only.
// :export values are empty strings in this project because Tailwind v4's
// PostCSS plugin runs before css-loader in the webpack chain.
import "./variables.module.scss";

// ── Button component ──────────────────────────────────────────────────────────
function Button({
  variant = "primary",
  size,
  badge,
  children,
}: {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "lg";
  badge?: string | number;
  children: React.ReactNode;
}) {
  const cls =
    variant === "outline" ? styles.btnOutline :
    variant === "ghost"   ? styles.btnGhost   :
    [
      styles.btn,
      size === "lg" ? styles.btnLg : size === "sm" ? styles.btnSm : "",
    ].filter(Boolean).join(" ");

  return (
    <button className={cls}>
      {children}
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SassPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
          *.scss — compiled by Next.js
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Sass / SCSS</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Next.js has built-in Sass support — install{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">sass</code> and
          use <code className="font-mono bg-gray-100 px-1 rounded">.scss</code>{" "}
          files anywhere. Name them{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">.module.scss</code>{" "}
          for scoped CSS Modules, or import as plain global stylesheets.
        </p>
      </div>

      <div className="space-y-8">

        {/* ── Setup ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Setup</h2>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`# 1. Install sass (the official Dart Sass compiler)
npm install --save-dev sass

# That's it — Next.js auto-detects it.
# Now .scss and .module.scss files just work.`}</pre>
          </div>
        </section>

        {/* ── Variables ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">
            <code className="font-mono text-orange-700 text-base">$variables</code> — Sass Variables
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Sass variables are resolved at compile time (unlike CSS custom properties which live at runtime).
            Perfect for build-time constants — colors, spacing scales, radii.
          </p>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`// _variables.scss  (partial — starts with _, never compiled alone)
$color-primary:  #f97316;
$spacing-lg:     1.5rem;
$radius-full:    9999px;
$shadow-md:      0 4px 16px rgba(0, 0, 0, 0.08);

// Use them anywhere after @use
@use "variables" as *;

.btn {
  background:    $color-primary;
  padding:       $spacing-sm $spacing-lg;
  border-radius: $radius-full;
  box-shadow:    $shadow-md;
}`}</pre>
          </div>
        </section>

        {/* ── Nesting ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">
            Nesting &amp; <code className="font-mono text-orange-700 text-base">&amp;</code>-selector
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Write child selectors and pseudo-classes inside their parent — Sass flattens them at compile time.
            <code className="font-mono bg-gray-100 px-1 rounded ml-1">&amp;</code> refers to the parent selector.
          </p>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`.btn {
  background: $color-primary;

  &:hover {                        // compiles to  .btn:hover
    background: $color-primary-dark;
  }

  &:active { transform: scale(0.97); }

  &.btnLg {                        // compiles to  .btn.btnLg
    font-size: 1rem;
    padding: $spacing-md $spacing-xl;
  }

  .badge {                         // compiles to  .btn .badge
    background: rgba(255,255,255,0.25);
  }
}`}</pre>
          </div>
        </section>

        {/* ── Mixins ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">
            <code className="font-mono text-orange-700 text-base">@mixin</code> &amp;{" "}
            <code className="font-mono text-orange-700 text-base">@include</code> — Mixins
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Reusable blocks of CSS that accept arguments. Unlike copy-paste, they centralise logic in one place.
          </p>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`// Define a mixin
@mixin transition($props: all, $duration: 150ms, $easing: ease) {
  transition: $props $duration $easing;
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Use it
.btn {
  @include transition(background box-shadow transform);
}

.badge {
  @include flex-center;
  min-width: 1.25rem;
  height: 1.25rem;
}`}</pre>
          </div>
        </section>

        {/* ── @extend / %placeholders ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">
            <code className="font-mono text-orange-700 text-base">@extend</code> &amp;{" "}
            <code className="font-mono text-orange-700 text-base">%placeholders</code>
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            A <code className="font-mono bg-gray-100 px-1 rounded">%placeholder</code> is a rule set that
            is never emitted on its own — only when something <code className="font-mono bg-gray-100 px-1 rounded">@extend</code>s it.
            Variants share one base rule in the output CSS.
          </p>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`// Placeholder — never emitted by itself
%btn-reset {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  border-radius: $radius-full;
  cursor: pointer;
}

// Variants @extend the placeholder
.btn        { @extend %btn-reset; background: $color-primary; }
.btnOutline { @extend %btn-reset; border: 2px solid $color-primary; }
.btnGhost   { @extend %btn-reset; background: transparent; }

// Compiled output — selectors are merged:
// .btn, .btnOutline, .btnGhost { display: inline-flex; … }`}</pre>
          </div>
        </section>

        {/* ── Live demo — buttons ── */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Live Demo — Button.module.scss</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">

            <div>
              <p className="text-xs text-gray-500 font-mono mb-3"># Primary — sizes</p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button badge={3}>With Badge</Button>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-mono mb-3"># Variants — shared %btn-reset via @extend</p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`// Button.module.scss
import styles from "./Button.module.scss";

<button className={styles.btn}>Primary</button>
<button className={styles.btnOutline}>Outline</button>
<button className={styles.btnGhost}>Ghost</button>

// Size modifiers (nested & selector)
<button className={\`\${styles.btn} \${styles.btnLg}\`}>Large</button>`}</pre>
            </div>
          </div>
        </section>

        {/* ── sassOptions.additionalData ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">
            <code className="font-mono text-orange-700 text-base">sassOptions.additionalData</code> — Global Variables
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Inject Sass code into every <code className="font-mono bg-gray-100 px-1 rounded">.scss</code> file
            automatically — no <code className="font-mono bg-gray-100 px-1 rounded">@use</code> needed.
            Useful for a single global token that everything needs.
          </p>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed mb-4">
            <pre>{`// next.config.ts
const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: \`$global-brand: #f97316;\`,
  },
};

// Now in ANY .scss file — no @use required:
.highlight { color: $global-brand; }`}</pre>
          </div>
          <div
            className="rounded-xl px-5 py-3 text-sm font-semibold inline-block"
            style={{ color: "#f97316", background: "#fff7ed" }}
          >
            Text styled orange — the{" "}
            <code className="font-mono text-xs">$global-brand</code> variable injected via{" "}
            <code className="font-mono text-xs">additionalData</code> is <code className="font-mono text-xs">#f97316</code>
          </div>
        </section>

        {/* ── :export — Sass vars in JS ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-1">
            <code className="font-mono text-orange-700 text-base">:export</code> — Sass Variables in JavaScript
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            A <code className="font-mono bg-gray-100 px-1 rounded">.module.scss</code> file can export Sass
            variable values to JavaScript using the{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">:export</code> block.
            Useful for keeping chart colors, animation durations, or breakpoints in sync between CSS and JS.
          </p>

          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed mb-5">
            <pre>{`// variables.module.scss
@use "variables" as *;

:export {
  colorPrimary:      $color-primary;      // #f97316
  colorPrimaryDark:  $color-primary-dark; // #ea580c
  shadowMd:          $shadow-md;
  spacingLg:         $spacing-lg;         // 1.5rem
  radiusLg:          $radius-lg;          // 1rem
}

// page.tsx
import vars from "./variables.module.scss";
//  vars.colorPrimary  → "#f97316"  (string)
//  vars.shadowMd      → "0 4px 16px rgba(0, 0, 0, 0.08)"`}</pre>
          </div>

          {/* Live swatches — values match _variables.scss */}
          <p className="text-xs font-mono text-gray-400 mb-3"># Swatches matching _variables.scss token values</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "colorPrimary",      value: "#f97316", bg: "#f97316",  text: "#fff" },
              { label: "colorPrimaryDark",  value: "#ea580c", bg: "#ea580c",  text: "#fff" },
              { label: "colorPrimaryLight", value: "#fff7ed", bg: "#fff7ed",  text: "#ea580c" },
              { label: "colorMuted",        value: "#6b7280", bg: "#6b7280",  text: "#fff" },
            ].map(({ label, value, bg, text }) => (
              <div
                key={label}
                style={{ background: bg, color: text, borderRadius: "1rem", padding: "1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                className="flex flex-col gap-1"
              >
                <code className="text-xs font-mono opacity-80">{label}</code>
                <code className="text-xs font-mono font-bold">{value}</code>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <strong>Note:</strong> When Tailwind v4&apos;s PostCSS plugin runs before the css-loader in the webpack
            chain, it sees the raw <code className="font-mono">:export</code> block and emits a pseudo-class
            warning. The exported values arrive as empty strings. For dynamic color access in JS, prefer CSS
            custom properties (<code className="font-mono">getComputedStyle(el).getPropertyValue()</code>) instead.
          </div>
        </section>

        {/* ── Key rules ── */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <h2 className="font-semibold text-orange-900 mb-3">Key rules for Sass in Next.js</h2>
          <ul className="space-y-2 text-sm text-orange-800">
            {[
              "Install sass as a devDependency — that's all Next.js needs to compile .scss and .sass files.",
              "Name partials with a leading underscore (_variables.scss) — they are @use'd but never emitted alone.",
              "Use .module.scss for scoped components; use plain .scss (imported in layout.tsx) for globals.",
              "sassOptions.additionalData injects code into every file — useful for one global variable or @use.",
              ":export maps Sass variable values to a JS object you can import and use in React.",
              "Sass $variables are compile-time constants; CSS custom properties (var(--x)) are runtime — choose accordingly.",
            ].map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-orange-400 shrink-0">→</span>{r}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
