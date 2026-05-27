import Link from "next/link";

export default function TemplateDemoPageA() {
  return (
    <div className="space-y-4">
      {/* Page indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-xs font-mono text-blue-500 mb-1">demo/page.tsx — Page A</p>
        <h2 className="font-bold text-blue-900 text-lg">Page A</h2>
        <p className="text-blue-700 text-sm">
          Navigate to Page B and back — watch the counter in the template reset each time.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
        <ol className="space-y-2 list-decimal list-inside">
          <li>Click <strong>+1</strong> in the amber banner to increment the counter.</li>
          <li>Click <strong>Go to Page B</strong> below — the counter resets to 0.</li>
          <li>Navigate back — it resets again.</li>
          <li className="text-gray-400">
            (With <code className="font-mono">layout.tsx</code> instead, the counter would persist.)
          </li>
        </ol>
      </div>

      <Link
        href="/file-conventions/template/demo/b"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Go to Page B →
      </Link>

      <div className="flex gap-3">
        <Link href="/file-conventions/template" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
          ← Back to template.js
        </Link>
      </div>
    </div>
  );
}
