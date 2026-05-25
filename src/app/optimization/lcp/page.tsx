import Image from "next/image";
import LCPSimulator from "@/components/LCPSimulator";
import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

export default function LCPPage() {
  return (
    <div className="space-y-8">
      <MarkVisited slug="lcp" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 03 · High impact · Performance
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">Optimize Large Contentful Paint (LCP)</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          LCP measures how long it takes for the largest visible element to render. Google
          considers LCP under 2.5 s as &ldquo;good&rdquo;. The most common LCP element is a hero image —
          and the most common mistake is lazy-loading it.
        </p>
      </div>

      {/* LCP target cards */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-700 mb-1">≤ 2.5 s</div>
          <div className="text-green-600 font-medium">Good</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-700 mb-1">2.5–4 s</div>
          <div className="text-yellow-600 font-medium">Needs improvement</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-700 mb-1">&gt; 4 s</div>
          <div className="text-red-600 font-medium">Poor</div>
        </div>
      </div>

      {/* Interactive simulator */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          Interactive demo — eager vs lazy hero image
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Toggle between eager (correct) and lazy (wrong), then simulate a page load to
          feel the LCP difference.
        </p>
        <LCPSimulator />
      </div>

      {/* Static hero demo */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          Hero image with <code className="font-mono text-blue-700">preload</code> (LCP element)
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-3">
          <p className="text-xs font-mono text-gray-400">
            preload=&#123;true&#125; + loading=&quot;eager&quot; + fetchPriority=&quot;high&quot;
          </p>
          {/* preload={true} replaces the deprecated priority prop in Next.js 16 */}
          <Image
            src="/hero-lcp.avif"
            alt="Hero banner — the LCP element"
            width={900}
            height={600}
            preload={true}
            loading="eager"
            fetchPriority="high"
            className="rounded-xl w-full object-cover"
          />
          <span className="text-xs text-green-600 font-medium">
            ✓ Fetched immediately — not deferred by lazy loading
          </span>
        </div>
      </div>

      {/* Wrong way */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <span className="text-red-500">✗</span> Wrong — lazy loading the LCP image
        </h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// NEVER lazy-load the LCP image.
// The browser must wait for the image to appear in the viewport
// before even starting to download it — devastating for LCP.
<Image
  src="/hero.webp"
  alt="Hero"
  width={1200}
  height={630}
  loading="lazy"   {/* ← kills your LCP score */}
/>`}
        </pre>
      </div>

      {/* Right way */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          <span className="text-green-500">✓</span> Correct — preload the LCP image
        </h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`import Image from "next/image";

// In Next.js 16 the \`priority\` prop is deprecated.
// Use preload + loading + fetchPriority instead.
<Image
  src="/hero-lcp.avif"
  alt="Hero banner"
  width={900}
  height={600}
  preload={true}           // inserts <link rel="preload"> in <head>
  loading="eager"          // do not defer this image
  fetchPriority="high"     // hint to browser: download this first
/>`}
        </pre>
      </div>

      {/* Additional strategies */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Additional LCP strategies</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { title: "Use a CDN", desc: "Serve images from an edge location geographically close to users." },
            { title: "Defer non-critical CSS", desc: "Load only critical above-the-fold styles first; lazy-load the rest." },
            { title: "Reduce font weight", desc: "If a text node is the LCP, reduce the font file size or use system fonts." },
            { title: "Server-side render", desc: "Return HTML with the LCP element from the server so browsers start rendering immediately." },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-amber-900 mb-2">Next.js 16 breaking change</h3>
        <p className="text-amber-800">
          The <code className="font-mono">priority</code> prop on{" "}
          <code className="font-mono">next/image</code> was deprecated in v16.0.0 in favor of{" "}
          <code className="font-mono">preload</code>. Use{" "}
          <code className="font-mono">preload=&#123;true&#125;</code> +{" "}
          <code className="font-mono">loading=&quot;eager&quot;</code> +{" "}
          <code className="font-mono">fetchPriority=&quot;high&quot;</code> for the LCP element.
        </p>
      </div>

      <TechniqueNav slug="lcp" />
    </div>
  );
}
