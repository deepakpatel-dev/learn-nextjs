// Route: /styling/css-modules
// Demonstrates CSS Modules in Next.js:
//   - Import styles as a JS object
//   - Class names are automatically scoped (hashed)
//   - composes: for class composition
//   - Variant cards using the same module

import styles from "./Card.module.css";

// ── Reusable Card component (uses the CSS Module) ────────────────────────────
function Card({
  title,
  subtitle,
  body,
  tags,
  variant = "default",
  badge,
}: {
  title: string;
  subtitle?: string;
  body: string;
  tags?: string[];
  variant?: "default" | "purple" | "blue" | "green";
  badge?: string;
}) {
  const cardClass =
    variant === "purple" ? styles.cardPurple :
    variant === "blue"   ? styles.cardBlue   :
    variant === "green"  ? styles.cardGreen  :
    styles.card;

  return (
    <div className={cardClass}>
      {badge && <span className={styles.badge}>{badge}</span>}
      <h3 className={styles.title}>{title}</h3>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <p className={styles.body}>{body}</p>
      {tags && (
        <div className={styles.tagRow}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CssModulesPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          *.module.css — scoped by Next.js
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">CSS Modules</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Name a file <code className="font-mono bg-gray-100 px-1 rounded">something.module.css</code> and
          co-locate it with your component. Next.js hashes every class name at build time — so{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">.card</code> in one file can never
          collide with <code className="font-mono bg-gray-100 px-1 rounded">.card</code> in another.
        </p>
      </div>

      <div className="space-y-8">

        {/* ── How it works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">How it works</h2>
          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs leading-relaxed">
            <pre>{`// 1. Create  Card.module.css  next to your component
.card  { border-radius: 1rem; padding: 1.5rem; … }
.title { font-size: 1.125rem; font-weight: 700; }

// 2. Import it as a JS object
import styles from "./Card.module.css";

// 3. Use it — class names are scoped automatically
<div className={styles.card}>
  <h3 className={styles.title}>Hello</h3>
</div>

// What Next.js renders in the browser:
// <div class="Card_card__xK2mQ">
//   <h3 class="Card_title__9pLqR">Hello</h3>
// </div>`}</pre>
          </div>
        </section>

        {/* ── Live demo — default card ── */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Live Demo — Default Card</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <Card
              badge="styles.card"
              title="CSS Module Card"
              subtitle="Scoped styles, zero collision"
              body="This card is styled entirely with Card.module.css. Hover over it to see the :hover rule lift it up — all without a single inline style or Tailwind class on the element itself."
              tags={["CSS Modules", "Scoped", "Next.js"]}
            />
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-xs font-mono text-gray-600 leading-relaxed overflow-auto">
              <p className="text-gray-400 mb-2"># Actual HTML in browser DevTools</p>
              <pre>{`<div class="Card_card__xK2mQ">
  <span class="Card_badge__7tRpA">
    styles.card
  </span>
  <h3 class="Card_title__9pLqR">
    CSS Module Card
  </h3>
  <p class="Card_subtitle__2mNvB">
    Scoped styles, zero collision
  </p>
  <p class="Card_body__kL3eZ">
    This card is styled…
  </p>
</div>`}</pre>
              <p className="text-gray-400 mt-3">
                ↑ Class names are hashed — inspect the card in DevTools to see real values.
              </p>
            </div>
          </div>
        </section>

        {/* ── composes: variants ── */}
        <section>
          <h2 className="font-semibold text-lg mb-1">
            <code className="font-mono text-blue-700 text-base">composes:</code> — Class Composition
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            CSS Modules lets you extend existing classes without duplication — like{" "}
            <code className="font-mono bg-gray-100 px-1 rounded">@extend</code> in Sass.
          </p>

          <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs mb-5">
            <pre>{`/* Card.module.css */
.card { border-radius: 1rem; padding: 1.5rem; … } /* base */

.cardPurple {
  composes: card;            /* ← inherit ALL base styles */
  border-color: #c4b5fd;
  background: linear-gradient(135deg, #faf5ff, #ede9fe);
}

.cardBlue {
  composes: card;
  border-color: #bfdbfe;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
}

.cardGreen {
  composes: card;
  border-color: #bbf7d0;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
}`}</pre>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <Card
              title="Purple Variant"
              body="composes: card — inherits base layout, adds purple gradient background and border."
              variant="purple"
              badge="cardPurple"
            />
            <Card
              title="Blue Variant"
              body="composes: card — same base, different colour scheme. No CSS duplication."
              variant="blue"
              badge="cardBlue"
            />
            <Card
              title="Green Variant"
              body="composes: card — three variants, one base class, zero copy-paste."
              variant="green"
              badge="cardGreen"
            />
          </div>
        </section>

        {/* ── Key rules ── */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h2 className="font-semibold text-blue-900 mb-3">Key rules for CSS Modules</h2>
          <ul className="space-y-2 text-sm text-blue-800">
            {[
              "File must end in .module.css — regular .css files are NOT scoped.",
              "Import as an object: import styles from './Card.module.css'",
              "Access classes as properties: styles.card, styles.title, etc.",
              "composes: lets you extend another class from the same file or another module.",
              "Global selectors still work inside a module: :global(.some-class) { … }",
              "Works with TypeScript — add a global.d.ts or use typed-css-modules for autocomplete.",
            ].map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-blue-500 shrink-0">→</span>{r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
