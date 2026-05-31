// Route Group Layout: (dashboard)/layout.tsx
//
// (dashboard) is a Route Group — the parentheses mean this folder does NOT
// create a URL segment. Routes inside still live at /dashboard/*, not /dashboard-group/dashboard/*.
//
// This layout adds a sidebar that's shared by /dashboard, /dashboard/settings, /dashboard/profile.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RoutingNav from "@/components/RoutingNav";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: "⊞" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙" },
  { href: "/dashboard/profile", label: "Profile", icon: "◎" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex gap-10">
        {/* Module 01 routing sidebar */}
        <RoutingNav />

        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
              Route Group — (dashboard)/layout.tsx — no URL segment added
            </span>
          </div>

          <div className="flex gap-6">
            {/* Dashboard demo sidebar — defined once in layout, shared by all /dashboard/* routes */}
            <aside className="w-52 shrink-0">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs font-mono text-gray-400">Dashboard Sidebar</p>
                </div>
                <nav className="p-2">
                  {sidebarLinks.map(({ href, label, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                        pathname === href
                          ? "bg-orange-50 text-orange-700 font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{icon}</span>
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Page content */}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
