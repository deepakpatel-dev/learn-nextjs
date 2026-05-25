import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

const bundleRows = [
  {
    import: "import _ from 'lodash'",
    kb: 70,
    bad: true,
    note: "entire library",
  },
  {
    import: "import { debounce } from 'lodash'",
    kb: 70,
    bad: true,
    note: "barrel blocks tree-shaking",
  },
  {
    import: "import debounce from 'lodash/debounce'",
    kb: 2,
    bad: false,
    note: "sub-path — only what you need",
  },
];

const dateFnsRows = [
  {
    import: "import * as dateFns from 'date-fns'",
    kb: 200,
    bad: true,
    note: "~200 functions pulled in",
  },
  {
    import: "import { format } from 'date-fns'",
    kb: 4,
    bad: false,
    note: "ESM tree-shaking works here",
  },
];

function BundleBar({
  label,
  kb,
  maxKb,
  bad,
  note,
}: {
  label: string;
  kb: number;
  maxKb: number;
  bad: boolean;
  note: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-xs">
        <code className={`font-mono ${bad ? "text-red-700" : "text-green-700"}`}>
          {label}
        </code>
        <span className={`font-bold ${bad ? "text-red-600" : "text-green-600"}`}>
          {kb} kB
        </span>
      </div>
      <div className="h-5 bg-gray-100 rounded-full overflow-hidden flex items-center">
        <div
          className={`h-full rounded-full transition-all flex items-center justify-end pr-2 ${
            bad ? "bg-red-400" : "bg-green-400"
          }`}
          style={{ width: `${Math.max((kb / maxKb) * 100, 4)}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{note}</p>
    </div>
  );
}

export default function SpecificImportsPage() {
  return (
    <div className="space-y-8">
      <MarkVisited slug="specific-imports" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 06 · High impact · JavaScript
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">Specific Imports</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Large libraries like <code className="font-mono">lodash</code>,{" "}
          <code className="font-mono">date-fns</code>, and <code className="font-mono">lucide-react</code>{" "}
          ship hundreds of functions. Importing the whole library includes every function in
          your bundle — even ones you never use. Import only what you need.
        </p>
      </div>

      {/* Bundle size visualizer — lodash */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Bundle weight — lodash</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          {bundleRows.map((row) => (
            <BundleBar
              key={row.import}
              label={row.import}
              kb={row.kb}
              maxKb={70}
              bad={row.bad}
              note={row.note}
            />
          ))}
        </div>
      </div>

      {/* Bundle size visualizer — date-fns */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Bundle weight — date-fns</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          {dateFnsRows.map((row) => (
            <BundleBar
              key={row.import}
              label={row.import}
              kb={row.kb}
              maxKb={200}
              bad={row.bad}
              note={row.note}
            />
          ))}
        </div>
      </div>

      {/* Lodash code example */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">
          Example — lodash (~70 kB gzipped)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-sm font-semibold text-gray-700">Whole library import</span>
            </div>
            <pre className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed text-red-900">
{`// Bundles the ENTIRE lodash library (~70 kB).
// Tree-shaking usually cannot eliminate the rest
// when the import is from the barrel entry point.
import _ from "lodash";
import { debounce } from "lodash";

const fn = _.debounce(handler, 300);`}
            </pre>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">Specific import</span>
            </div>
            <pre className="bg-green-50 border border-green-200 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed text-green-900">
{`// Bundles ONLY the debounce function (~2 kB).
// Each lodash function lives in its own module,
// so this import path is unambiguous for bundlers.
import debounce from "lodash/debounce";

const fn = debounce(handler, 300);`}
            </pre>
          </div>
        </div>
      </div>

      {/* date-fns example */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">
          Example — date-fns (~200 functions)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-sm font-semibold text-gray-700">Namespace import</span>
            </div>
            <pre className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed text-red-900">
{`import * as dateFns from "date-fns";

dateFns.format(new Date(), "yyyy-MM-dd");`}
            </pre>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">Named import</span>
            </div>
            <pre className="bg-green-50 border border-green-200 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed text-green-900">
{`// date-fns ships with proper ESM tree-shaking support.
// Named imports are safe here.
import { format } from "date-fns";

format(new Date(), "yyyy-MM-dd");`}
            </pre>
          </div>
        </div>
      </div>

      {/* Icon libraries */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">
          Example — icon libraries (lucide-react, react-icons)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-sm font-semibold text-gray-700">Barrel import</span>
            </div>
            <pre className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed text-red-900">
{`// A top-level barrel index re-exports 1000s of icons.
// Bundlers struggle to tree-shake this pattern.
import { FiHome } from "react-icons";`}
            </pre>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">lucide-react (ESM)</span>
            </div>
            <pre className="bg-green-50 border border-green-200 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed text-green-900">
{`// lucide-react ships with full ESM tree-shaking.
// Named imports bundle only the icon(s) you use.
import { Home, Settings, Bell } from "lucide-react";

<Home size={20} />
<Settings size={20} />
<Bell size={20} />`}
            </pre>
          </div>
        </div>
      </div>

      {/* How to verify */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">How to verify tree-shaking works</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# 1. Run the experimental Turbopack analyzer (Next.js 16.1+)
npx next experimental-analyze

# 2. Or use @next/bundle-analyzer with webpack
ANALYZE=true npm run build

# Look for unexpectedly large chunks. If you see all of "lodash"
# in a client chunk, switch to specific sub-path imports.`}
        </pre>
      </div>

      {/* Key points */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-3">Key points</h3>
        <ul className="space-y-1.5 text-blue-800">
          <li>Tree-shaking removes unused exports <strong>only</strong> when the bundler can statically analyze the import graph.</li>
          <li>Barrel files (an <code className="font-mono">index.js</code> that re-exports everything) often block tree-shaking.</li>
          <li>For lodash, prefer sub-path imports: <code className="font-mono">import debounce from &apos;lodash/debounce&apos;</code>.</li>
          <li>Libraries that ship ESM with <code className="font-mono">&quot;sideEffects&quot;: false</code> in package.json tree-shake reliably.</li>
          <li>Use the bundle analyzer to find the worst offenders before optimizing.</li>
        </ul>
      </div>

      <TechniqueNav slug="specific-imports" />
    </div>
  );
}
