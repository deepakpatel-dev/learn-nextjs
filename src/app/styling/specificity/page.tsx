"use client";
// Route: /styling/specificity
// Topic: Controlling specificity of CSS Modules in a Next.js App
//
// Approach 1 — Combining CSS Modules + Component Hierarchies
//   • Single-class selectors keep every rule at the same specificity (0,1,0)
//   • Parent passes className prop to merge its own module class onto the child
//   • clsx combines base + variant + size + consumer classes cleanly
//
// Approach 2 — Dynamic Styling with Scoped CSS Variables
//   • Component writes CSS custom properties into style={{ '--hue': 210 }}
//   • Module CSS reads them with var(--hue) — fully scoped to that element
//   • JS-driven dynamic values without scattering inline styles everywhere

import { useState } from "react";
import btnStyles from "./Button.module.css";
import cardStyles from "./TokenCard.module.css";

// ─── Tiny clsx helper (no extra dependency needed) ──────────────────────────
function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// APPROACH 1 — Button: CSS Modules + Component Hierarchy
// ─────────────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize    = "sm" | "md" | "lg";

function Button({
  children,
  variant  = "primary",
  size     = "md",
  disabled = false,
  fullWidth = false,
  className,          // ← parent can pass its own module class here
  style,
  onClick,
}: {
  children: React.ReactNode;
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;    // consumer's override — same specificity, declared last → wins
  style?: React.CSSProperties; // demo: simulate parent module-class output as inline style
  onClick?: () => void;
}) {
  const sizeClass =
    size === "sm" ? btnStyles.sm :
    size === "lg" ? btnStyles.lg :
    undefined;

  const variantClass =
    variant === "primary"   ? btnStyles.primary   :
    variant === "secondary" ? btnStyles.secondary :
    btnStyles.danger;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={cx(
        btnStyles.btn,          // 1. base styles
        variantClass,           // 2. variant (same specificity as base)
        sizeClass,              // 3. size modifier
        disabled   && btnStyles.disabled,
        fullWidth  && btnStyles.fullWidth,
        className,              // 4. parent override — always last → wins
      )}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APPROACH 2 — TokenCard: Dynamic Styling with Scoped CSS Variables
// ─────────────────────────────────────────────────────────────────────────────

// Extend CSSProperties so TypeScript accepts CSS custom properties in style={}
type WithVars = React.CSSProperties & {
  "--hue"?:      number;
  "--progress"?: number;
};

function TokenCard({
  title,
  subtitle,
  hue,
  progress,
}: {
  title:    string;
  subtitle: string;
  hue:      number;
  progress: number;
}) {
  const vars: WithVars = {
    "--hue":      hue,       // ← scoped to this element only
    "--progress": progress,
  };

  return (
    <div className={cardStyles.card} style={vars}>
      <div className={cardStyles.dot} />
      <h3 className={cardStyles.title}>{title}</h3>
      <p  className={cardStyles.subtitle}>{subtitle}</p>
      <div className={cardStyles.progressTrack}>
        <div className={cardStyles.progressFill} />
      </div>
      <p className={cardStyles.progressLabel}>{progress}% complete</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SpecificityPage() {
  const [hue,      setHue]      = useState(260);
  const [progress, setProgress] = useState(68);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
          CSS Modules — specificity control
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">
          Controlling CSS Module Specificity
        </h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          CSS Modules hash every class to a unique name but keep each selector at a single-class
          specificity level <code className="font-mono bg-gray-100 px-1 rounded">(0,1,0)</code>.
          That flat playing field, plus two architectural patterns, gives you full control
          without specificity hacks like <code className="font-mono bg-gray-100 px-1 rounded">!important</code>.
        </p>
      </div>

      <div className="space-y-10">

        {/* ── Specificity primer ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Why CSS Module specificity is predictable</h2>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed mb-4">
            <pre>{`/* Global CSS — specificity HELL */
.card            { color: red;   }   /* (0,1,0) */
.sidebar .card   { color: blue;  }   /* (0,2,0) ← wins because higher specificity */
#main .card      { color: green; }   /* (1,1,0) ← wins again */

/* CSS Modules — every rule is ONE class → same specificity */
.card   { color: red;  }   /* (0,1,0) */
.active { color: blue; }   /* (0,1,0) */

/* When you combine them: cx(styles.card, styles.active)
   The LAST declared class in the stylesheet wins — predictable, no hacks. */`}</pre>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            {[
              { label: "Global CSS",    risk: "High",   note: "Nested selectors and IDs create specificity wars" },
              { label: "CSS Modules",   risk: "None",   note: "Every class is (0,1,0) — order in source decides" },
              { label: "!important",    risk: "High",   note: "Breaks the cascade — avoid in both approaches"    },
            ].map(({ label, risk, note }) => (
              <div key={label} className={`rounded-xl p-4 border ${
                risk === "High" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
              }`}>
                <p className="font-semibold text-sm mb-1">{label}</p>
                <p className={`text-xs font-mono mb-1 ${risk === "High" ? "text-red-600" : "text-green-700"}`}>
                  Conflict risk: {risk}
                </p>
                <p className="text-xs text-gray-600">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            APPROACH 1 — CSS Modules + Component Hierarchies
        ════════════════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
              Approach 1
            </span>
            <h2 className="font-semibold text-xl">
              Combining CSS Modules and Component Hierarchies
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed max-w-2xl">
            The <code className="font-mono bg-gray-100 px-1 rounded">Button</code> component owns its
            base styles in <code className="font-mono bg-gray-100 px-1 rounded">Button.module.css</code>.
            A parent component can extend it by passing its <em>own</em> module class via the{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">className</code> prop.
            Because all classes share equal specificity, the <strong>last class appended wins</strong> —
            so the parent override always takes effect cleanly.
          </p>

          {/* How-it-works code */}
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs mb-6 leading-relaxed">
            <pre>{`// Button.module.css — component owns its defaults
.btn     { padding: 0.5rem 1.25rem; border-radius: 0.5rem; … }
.primary { background: #6d28d9; color: #fff; }
.lg      { padding: 0.75rem 1.75rem; font-size: 1rem; }

// Button.tsx — accepts className from the outside
function Button({ variant, size, className, ...props }) {
  return (
    <button
      className={cx(
        styles.btn,          // base    ← (0,1,0)
        styles[variant],     // variant ← (0,1,0) same
        styles[size],        // size    ← (0,1,0) same
        className,           // parent  ← (0,1,0) same, but LAST → wins ✓
      )}
      {...props}
    />
  );
}

// ParentPage.module.css
.heroBtn { background: #0ea5e9; letter-spacing: 0.05em; }

// ParentPage.tsx — no specificity fight needed
<Button variant="primary" className={pageStyles.heroBtn}>
  Sky-blue override
</Button>`}</pre>
          </div>

          {/* Live demo */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-5">Live Demo — Button component with variants, sizes &amp; hierarchy overrides</h3>

            {/* Variants */}
            <div className="mb-5">
              <p className="text-xs text-gray-400 font-mono mb-2">variant prop</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-5">
              <p className="text-xs text-gray-400 font-mono mb-2">size prop</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium (default)</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* Disabled */}
            <div className="mb-5">
              <p className="text-xs text-gray-400 font-mono mb-2">disabled prop</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary"   disabled>Primary disabled</Button>
                <Button variant="secondary" disabled>Secondary disabled</Button>
              </div>
            </div>

            {/* Parent override via className */}
            <div>
              <p className="text-xs text-gray-400 font-mono mb-2">
                className override — parent passes its own module class
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Inline style used here only to simulate "parent's module class" output */}
                <Button
                  variant="primary"
                  className={undefined}
                  style={{ background: "#0ea5e9", borderColor: "#0ea5e9", letterSpacing: "0.05em" } as React.CSSProperties}
                >
                  Sky override (via className)
                </Button>
                <Button
                  variant="primary"
                  style={{ background: "#16a34a", borderColor: "#16a34a", borderRadius: "9999px" } as React.CSSProperties}
                >
                  Green pill (via className)
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ↑ Same <code className="font-mono bg-gray-100 px-1 rounded">Button</code> component —
                parent appends its own class which, being declared last, wins the specificity tie.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            APPROACH 2 — Dynamic Styling with Scoped CSS Variables
        ════════════════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
              Approach 2
            </span>
            <h2 className="font-semibold text-xl">
              Dynamic Styling with Scoped CSS Variables
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed max-w-2xl">
            Write a CSS custom property into the element's <code className="font-mono bg-gray-100 px-1 rounded">style</code> attribute
            from props/state, then read it with <code className="font-mono bg-gray-100 px-1 rounded">var()</code> in the module.
            The variable is scoped only to that element's subtree — no global leak, and no scattering
            of dozens of inline style declarations throughout JSX.
          </p>

          {/* How-it-works code */}
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs mb-6 leading-relaxed">
            <pre>{`// TokenCard.module.css — reads dynamic values from CSS variables
.card {
  background: hsl(var(--hue, 220) 60% 96%);   /* fallback = 220 */
  border:     1px solid hsl(var(--hue, 220) 50% 88%);
}
.dot  { background: hsl(var(--hue, 220) 60% 50%); }
.progressFill {
  width: calc(var(--progress, 0) * 1%);       /* 0-100 mapped to 0%-100% */
}

// TokenCard.tsx — writes the variables via style prop
// Extend CSSProperties so TypeScript accepts custom properties:
type WithVars = React.CSSProperties & {
  "--hue"?:      number;
  "--progress"?: number;
};

function TokenCard({ hue, progress }) {
  const vars: WithVars = { "--hue": hue, "--progress": progress };
  return (
    <div className={styles.card} style={vars}>
      {/* Every child reads --hue without any extra props */}
      <div className={styles.dot} />
      <div className={styles.progressFill} />
    </div>
  );
}`}</pre>
          </div>

          {/* Controls */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-5">
              Live Demo — drag the sliders, every card re-renders via CSS variables only
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 mb-7">
              <label className="flex flex-col gap-1.5 flex-1">
                <span className="text-xs font-mono text-gray-500">
                  --hue: <strong className="text-gray-800">{hue}</strong>
                </span>
                <input
                  type="range" min={0} max={360} value={hue}
                  onChange={(e) => setHue(Number(e.target.value))}
                  className="accent-purple-600"
                />
              </label>
              <label className="flex flex-col gap-1.5 flex-1">
                <span className="text-xs font-mono text-gray-500">
                  --progress: <strong className="text-gray-800">{progress}%</strong>
                </span>
                <input
                  type="range" min={0} max={100} value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="accent-purple-600"
                />
              </label>
            </div>

            {/* Cards — same component, different scoped variables */}
            <div className="grid sm:grid-cols-3 gap-5">
              <TokenCard
                title="Design"
                subtitle="UI foundations &amp; tokens"
                hue={hue}
                progress={progress}
              />
              <TokenCard
                title="Development"
                subtitle="Component implementation"
                hue={(hue + 120) % 360}
                progress={Math.min(100, progress + 20)}
              />
              <TokenCard
                title="Review"
                subtitle="QA &amp; code review"
                hue={(hue + 240) % 360}
                progress={Math.max(0, progress - 25)}
              />
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ↑ Three instances of the same <code className="font-mono bg-gray-100 px-1 rounded">TokenCard</code> component.
              The CSS file never changes — only the <code className="font-mono bg-gray-100 px-1 rounded">--hue</code> and{" "}
              <code className="font-mono bg-gray-100 px-1 rounded">--progress</code> variables written into{" "}
              <code className="font-mono bg-gray-100 px-1 rounded">style={`{}`}</code> differ per instance.
            </p>
          </div>
        </section>

        {/* ── Comparison ── */}
        <div className="bg-gray-900 text-gray-300 rounded-2xl p-6 font-mono text-xs">
          <p className="text-gray-500 mb-4"># Approach comparison</p>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="pb-2 pr-6">Question</th>
                <th className="pb-2 pr-6">Approach 1 — Hierarchy</th>
                <th className="pb-2">Approach 2 — Scoped Variables</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                ["Use case",        "Multi-variant reusable components",         "Data-driven color/size/progress"],
                ["Dynamic values",  "Via variant/size props → class lookup",     "Via CSS var() read from style={}"],
                ["JS in CSS",       "No — class names resolve the logic",        "Yes — hue/progress come from state"],
                ["TypeScript",      "No extra types needed",                     "Extend CSSProperties for --var types"],
                ["Performance",     "Zero re-paint — class swap only",           "Zero JS layout — CSS var changes only"],
                ["Best for",        "Buttons, badges, cards with themes",        "Charts, progress bars, theming sliders"],
              ].map(([q, a1, a2]) => (
                <tr key={q as string}>
                  <td className="py-2 pr-6 text-yellow-400">{q}</td>
                  <td className="py-2 pr-6 text-purple-400">{a1}</td>
                  <td className="py-2 text-sky-400">{a2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
