// Route: /en/about  or  /de/about
// File: app/[lang]/about/page.tsx
//
// Demonstrates that every nested page under [lang]/ automatically
// inherits the locale and can load its own translated content.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "@/lib/dictionary";

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Locale badge */}
      <div className="mb-6">
        <span className="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
          app/[lang]/about/page.tsx — lang = &quot;{lang}&quot;
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-4">{dict.about.title}</h1>
      <p className="text-gray-500 leading-relaxed mb-10 max-w-2xl">{dict.about.description}</p>

      {/* Dictionary comparison */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs">
          <p className="text-gray-500 mb-2"># en.json</p>
          <pre>{`{
  "about": {
    "title": "About",
    "description": "This is the
    About page. Its content is
    loaded from en.json..."
  }
}`}</pre>
        </div>
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs">
          <p className="text-gray-500 mb-2"># de.json</p>
          <pre>{`{
  "about": {
    "title": "Über uns",
    "description": "Dies ist die
    Über-uns-Seite. Der Inhalt
    wird aus de.json geladen..."
  }
}`}</pre>
        </div>
      </div>

      {/* Active dictionary highlight */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
        <p className="text-xs font-mono text-indigo-600 mb-2">
          Currently loaded: <strong>{lang}.json</strong>
        </p>
        <div className="font-mono text-sm text-indigo-900 space-y-1">
          <p>title → <span className="font-semibold">&quot;{dict.about.title}&quot;</span></p>
          <p>description → <span className="font-semibold">&quot;{dict.about.description}&quot;</span></p>
          <p>backHome → <span className="font-semibold">&quot;{dict.about.backHome}&quot;</span></p>
        </div>
      </div>

      <Link href={`/${lang}`} className="text-sm text-indigo-600 hover:underline font-medium">
        {dict.about.backHome}
      </Link>
    </div>
  );
}
