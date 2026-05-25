import LazyImageScroller from "@/components/LazyImageScroller";
import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

export default function LazyLoadingPage() {
  return (
    <div className="space-y-8">
      <MarkVisited slug="lazy-loading" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 04 · Medium impact · Images
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">Lazy Load Images</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Lazy loading defers image downloads until they are about to enter the viewport.
          This reduces initial page weight, saves bandwidth for off-screen content, and
          improves Time-to-Interactive. <strong>Never lazy-load the LCP image</strong> (see
          Technique 03).
        </p>
      </div>

      {/* Interactive scroll demo */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-2">
          Live demo — scroll to load images
        </h2>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          The container below uses <code className="font-mono text-blue-700">IntersectionObserver</code> with
          the scroll container as <code className="font-mono">root</code> — the same concept
          as the native <code className="font-mono">loading=&quot;lazy&quot;</code> attribute. Scroll
          down inside the box to watch each image load on demand.
        </p>
        <LazyImageScroller />
        <p className="text-xs text-gray-400 mt-2">
          Tip: open DevTools → Network → Images to confirm only visible images are fetched.
        </p>
      </div>

      {/* next/image default */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          next/image — lazy by default
        </h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          <code className="font-mono text-blue-700">next/image</code> sets{" "}
          <code className="font-mono">loading="lazy"</code> automatically. You get lazy
          loading for free — no extra code needed.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`import Image from "next/image";

// loading="lazy" is the default — you can omit it.
// next/image also handles: WebP conversion, responsive srcset, blur placeholder.
<Image
  src="/photo.webp"
  alt="Off-screen photo"
  width={800}
  height={600}
  loading="lazy"          // browser defers download until near viewport
  placeholder="blur"      // show blurred preview while loading
  blurDataURL="data:..."  // tiny base64 image for the blur
/>`}
        </pre>
      </div>

      {/* Native img */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">
          Native <code className="font-mono text-blue-700">&lt;img&gt;</code> — explicit
          loading=&quot;lazy&quot;
        </h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          When you cannot use <code className="font-mono">next/image</code> (e.g. dynamic
          external URLs without a configured domain), add{" "}
          <code className="font-mono">loading="lazy"</code> and explicit dimensions to the
          native element.
        </p>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`// Native HTML — always add width + height to prevent layout shift.
<img
  src="/photo.webp"
  alt="Off-screen photo"
  width={800}
  height={600}
  loading="lazy"
/>`}
        </pre>
      </div>

      {/* When not to lazy load */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-red-900 mb-2">When NOT to lazy load</h3>
        <ul className="space-y-1.5 text-red-800">
          <li>
            <strong>LCP element</strong> — Use <code className="font-mono">preload=&#123;true&#125;</code>{" "}
            + <code className="font-mono">loading=&quot;eager&quot;</code> instead (Technique 03).
          </li>
          <li>
            <strong>Above-the-fold images</strong> — Images visible without scrolling should
            load immediately.
          </li>
          <li>
            <strong>Small icons</strong> — The overhead of deferring tiny images exceeds the
            savings. Inline them as SVG instead.
          </li>
        </ul>
      </div>

      <TechniqueNav slug="lazy-loading" />
    </div>
  );
}
