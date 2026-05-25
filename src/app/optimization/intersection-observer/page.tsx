"use client";

import { useState } from "react";
import LazySection from "@/components/LazySection";
import MarkVisited from "@/components/MarkVisited";
import TechniqueNav from "@/components/TechniqueNav";

const SECTIONS = [
  {
    id: "stats",
    label: "Stats Section",
    content: (
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { value: "2.1s", label: "Avg LCP" },
          { value: "94", label: "Lighthouse Score" },
          { value: "0.04", label: "CLS" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "testimonial",
    label: "Testimonial Section",
    content: (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-gray-700 italic mb-4">
          &ldquo;Switching to Intersection Observer for our product section reduced our initial JS
          execution time by 340 ms and pushed our Lighthouse score from 78 to 96.&rdquo;
        </p>
        <p className="text-sm font-semibold text-gray-800">— Engineering team, example.com</p>
      </div>
    ),
  },
  {
    id: "features",
    label: "Features Section",
    content: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "Zero dependencies", desc: "IntersectionObserver is a native browser API — no library needed." },
          { title: "One-shot observation", desc: "Call disconnect() after the element is seen to avoid memory leaks." },
          { title: "Threshold control", desc: "Set threshold: 0.1 to trigger when 10% of the element is visible." },
          { title: "Root margin", desc: "Use rootMargin to start loading slightly before the element enters the viewport." },
        ].map((f) => (
          <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{f.title}</h3>
            <p className="text-xs text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function IntersectionObserverPage() {
  const [visibleCount, setVisibleCount] = useState(0);

  function handleVisible() {
    setVisibleCount((c) => Math.min(c + 1, SECTIONS.length));
  }

  return (
    <div className="space-y-8">
      <MarkVisited slug="intersection-observer" />

      <div>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Technique 05 · Medium impact · JavaScript
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">Intersection Observer API</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          The browser-native <code className="font-mono text-blue-700">IntersectionObserver</code>{" "}
          API lets you detect when an element enters the viewport. Wrap off-screen sections in a{" "}
          <code className="font-mono">LazySection</code> component that renders a placeholder until
          the section scrolls into view — reducing initial DOM size and JS work.
        </p>
      </div>

      {/* How it works */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">LazySection component</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`"use client";
import { useEffect, useRef, useState } from "react";

export default function LazySection({ children, onVisible }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onVisible?.();            // notify parent for counters / analytics
          observer.disconnect();    // stop observing once visible
        }
      },
      { threshold: 0.1 }           // trigger when 10% of element is visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? children : <Placeholder />}
    </div>
  );
}`}
        </pre>
      </div>

      {/* Live demo with counter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-800">
            Live demo — scroll down to reveal sections
          </h2>
          {/* Loaded counter */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex gap-1.5">
              {SECTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    i < visibleCount ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {visibleCount} / {SECTIONS.length} sections loaded
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Each section shows a pulsing placeholder until it enters the viewport.
          Open DevTools → Elements to watch the DOM update as you scroll.
        </p>

        <div className="space-y-8">
          {SECTIONS.map(({ id, label, content }) => (
            <div key={id}>
              <p className="text-xs font-mono text-gray-400 mb-2">
                &lt;LazySection&gt; — {label}
              </p>
              <LazySection
                placeholderHeight="h-40"
                label={`${label} — waiting for viewport…`}
                onVisible={handleVisible}
              >
                {content}
              </LazySection>
            </div>
          ))}
        </div>

        {visibleCount === SECTIONS.length && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 text-center font-medium">
            ✓ All {SECTIONS.length} sections loaded — DOM fully populated
          </div>
        )}
      </div>

      {/* Key points */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm">
        <h3 className="font-semibold text-blue-900 mb-3">Key points</h3>
        <ul className="space-y-1.5 text-blue-800">
          <li>No third-party library required — IntersectionObserver is supported in all modern browsers.</li>
          <li>Call <code className="font-mono">observer.disconnect()</code> after the element becomes visible to prevent memory leaks.</li>
          <li>Use <code className="font-mono">rootMargin: &quot;200px&quot;</code> to start loading slightly before the element enters the viewport for a smoother UX.</li>
          <li>Combine with <code className="font-mono">next/dynamic</code> to also defer the component&apos;s JS bundle, not just its render.</li>
        </ul>
      </div>

      <TechniqueNav slug="intersection-observer" />
    </div>
  );
}
