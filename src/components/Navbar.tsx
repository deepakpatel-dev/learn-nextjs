"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const allModules = [
  { num: "01", title: "Routing",               href: "/about",               desc: "File-system, dynamic, catch-all, middleware, i18n" },
  { num: "02", title: "Data Fetching",          href: "/data-fetching",       desc: "SSG, SSR, getStaticPaths" },
  { num: "03", title: "Server Actions",         href: "/server-actions",      desc: "Forms, mutations, authentication" },
  { num: "04", title: "Draft Mode",             href: "/draft-mode",          desc: "CMS preview without cache" },
  { num: "05", title: "Styling",                href: "/styling",             desc: "CSS Modules, Sass, globals" },
  { num: "06", title: "Optimization",           href: "/optimization",        desc: "Images, lazy loading, bundles" },
  { num: "07", title: "File Conventions",       href: "/file-conventions",    desc: "page, layout, loading, error…" },
  { num: "08", title: "Configuration",          href: "/configuration",       desc: "next.config.ts, env, TypeScript" },
  { num: "09", title: "Components & Patterns",  href: "/components-patterns", desc: "Server/Client, composition" },
  { num: "10", title: "Deploying",              href: "/deploying",           desc: "Vercel, Docker, CI/CD" },
];

const groups = [
  {
    id: "routing",
    label: "Routing",
    badge: "01",
    links: [
      { href: "/about",                              label: "Basic & Nested",    desc: "Static routes, nested folders" },
      { href: "/blog/intro-to-nextjs",               label: "Dynamic Routes",    desc: "[slug] segments, params" },
      { href: "/dashboard",                          label: "Route Groups",      desc: "(group) folders & layouts" },
      { href: "/docs/getting-started/installation",  label: "Catch-All Routes",  desc: "[...slug] multi-segment" },
      { href: "/redirects",                          label: "Redirects",         desc: "has: query, cookie, header" },
      { href: "/login",                              label: "Middleware",         desc: "Auth guards, CORS, cookies" },
      { href: "/en",                                 label: "i18n",              desc: "Internationalization" },
    ],
  },
  {
    id: "data-server",
    label: "Data & Server",
    badge: "02–04",
    links: [
      { href: "/data-fetching",  label: "Data Fetching",  desc: "SSG, SSR, getStaticPaths — Pages Router" },
      { href: "/server-actions", label: "Server Actions", desc: "Mutations, forms, auth flows" },
      { href: "/draft-mode",     label: "Draft Mode",     desc: "Preview unpublished CMS content" },
    ],
  },
  {
    id: "ui-perf",
    label: "UI & Performance",
    badge: "05–06",
    links: [
      { href: "/styling",      label: "Styling",       desc: "CSS Modules, Sass, node_modules" },
      { href: "/optimization", label: "Optimization",  desc: "Images, lazy loading, bundle analyzer" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    badge: "07–09",
    links: [
      { href: "/file-conventions",    label: "File Conventions",    desc: "page, layout, error, loading, template…" },
      { href: "/configuration",       label: "Configuration",       desc: "next.config.ts, env vars, TypeScript" },
      { href: "/components-patterns", label: "Components & Patterns", desc: "Server/Client, composition, parallel routes" },
    ],
  },
  {
    id: "deploying",
    label: "Deploying",
    badge: "10",
    links: [
      { href: "/deploying/vercel",          label: "Vercel",          desc: "Zero-config, preview URLs" },
      { href: "/deploying/nodejs-server",   label: "Node.js Server",  desc: "PM2, Nginx, self-hosted" },
      { href: "/deploying/docker",          label: "Docker",          desc: "Standalone output, k8s" },
      { href: "/deploying/static-export",   label: "Static Export",   desc: "No server, S3 / GitHub Pages" },
      { href: "/deploying/github-actions",  label: "GitHub Actions",  desc: "CI/CD, type-check, Lighthouse" },
    ],
  },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function useHoverDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  return { open, handleEnter, handleLeave };
}

// ─── All-Modules Panel ────────────────────────────────────────────────────────

function AllModulesMenu({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div className="absolute top-full left-0 mt-1 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
        All Modules
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {allModules.map((mod) => (
          <Link
            key={mod.num}
            href={mod.href}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <span className="shrink-0 w-8 h-8 bg-blue-600 text-white text-xs font-bold font-mono rounded-lg flex items-center justify-center mt-0.5">
              {mod.num}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {mod.title}
              </p>
              <p className="text-xs text-gray-400 leading-snug">{mod.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Group Dropdown ───────────────────────────────────────────────────────────

function GroupMenu({
  open,
  links,
  groupLabel,
}: {
  open: boolean;
  links: (typeof groups)[0]["links"];
  groupLabel: string;
}) {
  const pathname = usePathname();
  if (!open) return null;
  return (
    <div className="absolute top-full left-0 mt-1 min-w-[260px] bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">
        {groupLabel}
      </p>
      {links.map(({ href, label, desc }) => {
        const active =
          pathname === href ||
          (href !== "/" && (pathname ?? "").startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group ${
              active ? "bg-blue-50" : ""
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${active ? "bg-blue-500" : "bg-gray-200 group-hover:bg-blue-400"}`} />
            <div>
              <p className={`text-sm font-medium ${active ? "text-blue-700" : "text-gray-800 group-hover:text-blue-600"} transition-colors`}>
                {label}
              </p>
              <p className="text-xs text-gray-400 leading-snug">{desc}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const allMods = useHoverDropdown();

  // One hook per group
  const routing    = useHoverDropdown();
  const dataServer = useHoverDropdown();
  const uiPerf     = useHoverDropdown();
  const arch       = useHoverDropdown();
  const deploy     = useHoverDropdown();

  const groupHooks = [routing, dataServer, uiPerf, arch, deploy];

  // Is any link in a group active?
  function groupActive(g: (typeof groups)[0]) {
    return g.links.some(
      ({ href }) =>
        pathname === href ||
        (href !== "/" && (pathname ?? "").startsWith(href))
    );
  }

  return (
    <nav className="bg-gray-950 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center h-14 gap-1">

          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 mr-3 shrink-0 group"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">N</span>
            </div>
            <span className="font-semibold text-white text-sm hidden sm:block">
              Learn Next.js
            </span>
          </Link>

          {/* ── Divider ──────────────────────────────────────────── */}
          <div className="h-5 w-px bg-gray-700 mx-2 shrink-0" />

          {/* ── All Modules ──────────────────────────────────────── */}
          <div
            className="relative"
            onMouseEnter={allMods.handleEnter}
            onMouseLeave={allMods.handleLeave}
          >
            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                allMods.open
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>All Modules</span>
              <svg className={`w-3 h-3 transition-transform ${allMods.open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </button>
            <AllModulesMenu open={allMods.open} />
          </div>

          {/* ── Divider ──────────────────────────────────────────── */}
          <div className="h-5 w-px bg-gray-700 mx-2 shrink-0" />

          {/* ── Module Groups ─────────────────────────────────────── */}
          <div className="flex items-center gap-0.5 min-w-0">
            {groups.map((group, i) => {
              const hook   = groupHooks[i];
              const active = groupActive(group);
              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={hook.handleEnter}
                  onMouseLeave={hook.handleLeave}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      active
                        ? "text-blue-400 bg-gray-800"
                        : hook.open
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <span
                      className={`text-xs font-mono px-1 py-0.5 rounded font-bold hidden lg:inline ${
                        active ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {group.badge}
                    </span>
                    <span>{group.label}</span>
                    <svg
                      className={`w-3 h-3 transition-transform shrink-0 ${hook.open ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>

                  <GroupMenu
                    open={hook.open}
                    links={group.links}
                    groupLabel={group.label}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}
