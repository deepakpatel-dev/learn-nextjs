// Styling module layout — sub-nav for all /styling/* pages

import Link from "next/link";

const tabs = [
  { href: "/styling",                label: "Overview" },
  { href: "/styling/global-styles",  label: "Global Stylesheets" },
  { href: "/styling/css-modules",    label: "CSS Modules" },
  { href: "/styling/node-modules",   label: "From node_modules" },
  { href: "/styling/specificity",    label: "Specificity & Scoped Variables" },
  { href: "/styling/sass",           label: "Sass" },
];

export default function StylingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Sub-nav */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-1 overflow-x-auto">
          <span className="text-xs font-mono text-gray-400 mr-3 shrink-0">Module 04</span>
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
