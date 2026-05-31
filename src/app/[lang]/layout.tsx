// [lang]/layout.tsx — Locale Layout
//
// This layout wraps every page under /[lang]/* and is responsible for:
//   1. Validating the locale param (unknown locales → 404)
//   2. Rendering the async Header with translated nav links
//   3. Setting the correct `lang` attribute on the wrapper for screen readers / SEO
//
// generateStaticParams tells Next.js to pre-render /en and /de at build time.
// Any other locale hits notFound() at runtime.

import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/dictionary";
import Header from "@/components/Header";
import RoutingNav from "@/components/RoutingNav";

export function generateStaticParams() {
  // Pre-renders a version of every [lang]/* page for each supported locale
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Reject unsupported locales — e.g. /fr/about → 404
  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  return (
    <div lang={lang} className="min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="flex gap-10">
          <RoutingNav />
          <div className="flex-1 min-w-0">
            {/*
              Header is an async Server Component.
              It awaits getDictionary(lang) internally and renders
              translated nav links without any client-side JS.
            */}
            <Header lang={lang as Locale} />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
