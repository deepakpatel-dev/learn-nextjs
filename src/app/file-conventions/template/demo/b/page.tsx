import Link from "next/link";

export default function TemplateDemoPageB() {
  return (
    <div className="space-y-4">
      {/* Page indicator */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <p className="text-xs font-mono text-purple-500 mb-1">demo/b/page.tsx — Page B</p>
        <h2 className="font-bold text-purple-900 text-lg">Page B</h2>
        <p className="text-purple-700 text-sm">
          The counter reset when you navigated here. Go back to Page A — it will reset again.
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-800 mb-2">Why did the counter reset?</p>
        <p className="mb-2">
          Next.js assigns a <strong>new key</strong> to <code className="font-mono">template.tsx</code>{" "}
          on each navigation. When React sees a component with a different key, it unmounts the
          old one and mounts a fresh one — resetting all <code className="font-mono">useState</code>{" "}
          to their initial values.
        </p>
        <p className="text-gray-400 text-xs">
          A <code className="font-mono">layout.tsx</code> at the same level would have kept{" "}
          <em>one</em> instance across both pages, preserving the count.
        </p>
      </div>

      <Link
        href="/file-conventions/template/demo"
        className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
      >
        ← Go to Page A
      </Link>

      <div>
        <Link href="/file-conventions/template" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
          ← Back to template.js
        </Link>
      </div>
    </div>
  );
}
