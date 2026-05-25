"use client";

import { useEffect, useState } from "react";

const SLUGS = [
  "dynamic-imports",
  "images",
  "lcp",
  "lazy-loading",
  "intersection-observer",
  "specific-imports",
  "prefetch",
  "bundle-analyzer",
];

export default function ProgressIndicator() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("opt-visited");
      setVisited(raw ? JSON.parse(raw) : []);
    } catch {
      // ignore
    }
  }, []);

  const count = visited.length;
  const allDone = count === SLUGS.length;

  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="flex gap-1.5">
        {SLUGS.map((slug) => (
          <div
            key={slug}
            title={slug}
            className={`w-2 h-2 rounded-full transition-colors ${
              visited.includes(slug) ? "bg-blue-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-400">
        {allDone ? "✓ All techniques explored" : `${count} / ${SLUGS.length} explored`}
      </span>
    </div>
  );
}
