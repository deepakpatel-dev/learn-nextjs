// This is the REAL template.tsx — it remounts on every navigation.
// The Counter inside resets to 0 each time you navigate between pages.
// If this were a layout.tsx instead, the counter would persist.

"use client";

import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  // This state resets to 0 on every navigation because
  // template.tsx is remounted (given a new key) by Next.js.
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      {/* Template indicator banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-amber-600 mb-1">template.tsx — remounts on navigation</p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-amber-900">
              Counter: <span className="text-2xl font-bold">{count}</span>
            </span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 py-1 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              +1
            </button>
            <span className="text-xs text-amber-600 italic">
              ← navigates reset this to 0
            </span>
          </div>
        </div>
        <div className="text-amber-400 text-2xl">🔄</div>
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
