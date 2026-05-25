"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => (
    <div className="h-48 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 text-sm">
      Downloading chart chunk…
    </div>
  ),
  ssr: false,
});

export default function DynamicImportDemo() {
  const [show, setShow] = useState(false);
  const [loadedMs, setLoadedMs] = useState<number | null>(null);
  const startRef = useRef<number | null>(null);

  const handleReady = useCallback(() => {
    if (startRef.current !== null) {
      setLoadedMs(Date.now() - startRef.current);
      startRef.current = null;
    }
  }, []);

  function handleToggle() {
    if (show) {
      setShow(false);
      setLoadedMs(null);
    } else {
      startRef.current = Date.now();
      setLoadedMs(null);
      setShow(true);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {show ? "Hide Chart" : "Load Chart Dynamically"}
        </button>

        {show && loadedMs === null && (
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin inline-block" />
            Loading chunk…
          </span>
        )}

        {loadedMs !== null && (
          <span className="flex items-center gap-2 text-xs">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-mono font-medium">
              Ready in {loadedMs} ms
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-mono font-medium">
              Chunk ≈ 4 kB
            </span>
            <span className="text-gray-400">
              (cached on second load)
            </span>
          </span>
        )}
      </div>

      {show && <HeavyChart onReady={handleReady} />}
    </div>
  );
}
