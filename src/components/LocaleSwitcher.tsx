"use client";

// LocaleSwitcher.tsx — Client Component
//
// Must be a Client Component because it uses usePathname() to read the
// current URL and build the switched-locale href dynamically.
//
// It receives the already-fetched dictionary from the parent (Header) —
// no additional fetching needed here.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale, type Dictionary } from "@/lib/dictionary";

interface Props {
  currentLang: Locale;
  dict: Dictionary;
}

export default function LocaleSwitcher({ currentLang, dict }: Props) {
  const pathname = usePathname();

  // Swap /en/... → /de/... (or vice versa) by replacing the first segment
  function buildLocalePath(locale: Locale): string {
    if (!pathname) return `/${locale}`;
    // pathname starts with /en or /de — replace that segment
    return pathname.replace(`/${currentLang}`, `/${locale}`);
  }

  return (
    <div className="flex items-center gap-1 bg-indigo-800 rounded-lg p-1">
      <span className="text-indigo-400 text-xs mr-1 font-mono">
        {dict.localeSwitcher.label}:
      </span>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={buildLocalePath(locale)}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
            locale === currentLang
              ? "bg-white text-indigo-900"
              : "text-indigo-300 hover:text-white hover:bg-indigo-700"
          }`}
        >
          {/* Show translated language name — e.g. in German: "Englisch" / "Deutsch" */}
          {dict.language[locale]}
        </Link>
      ))}
    </div>
  );
}
