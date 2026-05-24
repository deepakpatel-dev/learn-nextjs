// Server Actions module layout
// Adds a sub-navigation bar below the main Navbar for all /server-actions/* pages

import Link from "next/link";

const tabs = [
  { href: "/server-actions",                 label: "Overview" },
  { href: "/server-actions/form-submission",  label: "Form Submission" },
  { href: "/server-actions/data-mutations",   label: "Data Mutations" },
  { href: "/server-actions/authentication",   label: "Authentication" },
  { href: "/server-actions/background-tasks", label: "Background Tasks" },
];

export default function ServerActionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Sub-nav */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-1 overflow-x-auto">
          <span className="text-xs font-mono text-gray-400 mr-3 shrink-0">Module 03</span>
          {tabs.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm px-4 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
