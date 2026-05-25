"use client";

import Image from "next/image";
import { useState } from "react";

type Mode = "eager" | "lazy";
type Phase = "idle" | "simulating" | "done";

export default function LCPSimulator() {
  const [mode, setMode] = useState<Mode>("eager");
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);

  function simulate() {
    setPhase("simulating");
    setElapsedMs(null);
    const delay = mode === "lazy" ? 2200 : 80;
    const start = Date.now();
    setTimeout(() => {
      setElapsedMs(Date.now() - start);
      setPhase("done");
    }, delay);
  }

  function reset() {
    setPhase("idle");
    setElapsedMs(null);
  }

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex rounded-lg overflow-hidden border border-gray-200 text-sm font-medium">
          <button
            onClick={() => { setMode("eager"); reset(); }}
            className={`px-4 py-2 transition-colors ${
              mode === "eager"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            ✓ Eager (correct)
          </button>
          <button
            onClick={() => { setMode("lazy"); reset(); }}
            className={`px-4 py-2 transition-colors border-l border-gray-200 ${
              mode === "lazy"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            ✗ Lazy (wrong)
          </button>
        </div>
        <button
          onClick={phase === "idle" || phase === "done" ? simulate : undefined}
          disabled={phase === "simulating"}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 transition-colors"
        >
          {phase === "simulating" ? "Simulating…" : "Simulate page load"}
        </button>
        {phase === "done" && (
          <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Reset
          </button>
        )}
      </div>

      {/* Simulation viewport */}
      <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-6 min-h-36 flex flex-col items-center justify-center gap-2 overflow-hidden">
        <p className="absolute top-3 left-4 text-xs font-mono text-gray-400">
          Hero image — LCP element
        </p>

        {phase === "idle" && (
          <p className="text-sm text-gray-400 italic">Press &quot;Simulate page load&quot; to see the difference</p>
        )}

        {phase === "simulating" && mode === "lazy" && (
          <div className="w-full space-y-2">
            <div className="w-full aspect-[3/2] bg-gray-200 animate-pulse rounded-lg" />
            <p className="text-xs text-red-500 font-medium animate-pulse text-center">
              LCP image deferred — browser waiting for scroll…
            </p>
            <p className="text-xs text-gray-400 text-center">~2.2 s delay</p>
          </div>
        )}

        {phase === "simulating" && mode === "eager" && (
          <div className="w-full space-y-2">
            <Image
              src="/hero-lcp.avif"
              alt="Hero"
              width={900}
              height={600}
              loading="eager"
              fetchPriority="high"
              className="rounded-lg w-full object-cover"
            />
            <p className="text-xs text-green-600 font-medium text-center">Fetched immediately</p>
          </div>
        )}

        {phase === "done" && (
          <div className="w-full space-y-2">
            <Image
              src="/hero-lcp.avif"
              alt="Hero"
              width={900}
              height={600}
              loading={mode === "eager" ? "eager" : "lazy"}
              fetchPriority={mode === "eager" ? "high" : "auto"}
              className="rounded-lg w-full object-cover"
            />
            <p className={`text-xs font-semibold text-center ${mode === "eager" ? "text-green-600" : "text-red-500"}`}>
              {mode === "eager"
                ? `✓ LCP: ~${elapsedMs} ms — excellent`
                : `✗ LCP: ~${elapsedMs} ms — devastating (2+ s wasted)`}
            </p>
          </div>
        )}

        {/* LCP score bar */}
        {phase === "done" && elapsedMs !== null && (
          <div className="w-full mt-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>0 ms</span>
              <span className="text-green-600">2 500 ms (good)</span>
              <span className="text-red-500">4 000 ms (poor)</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  elapsedMs < 2500 ? "bg-green-500" : elapsedMs < 4000 ? "bg-amber-400" : "bg-red-500"
                }`}
                style={{ width: `${Math.min((elapsedMs / 4000) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {mode === "lazy" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
          With <code className="font-mono">loading=&quot;lazy&quot;</code>, the browser defers the hero image
          until it &quot;scrolls into view&quot; — but it&apos;s already above the fold. The image
          download doesn&apos;t even start until visibility is confirmed, adding 2+ s to LCP.
        </div>
      )}
    </div>
  );
}
