// Route: /en  or  /de
// File: app/[lang]/page.tsx
//
// Server Component — receives the locale from params,
// loads the matching dictionary, and renders everything translated.
// Zero client-side JS involved in the translation.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "@/lib/dictionary";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) notFound();

  // getDictionary is the only thing that changes between /en and /de
  const dict = await getDictionary(lang as Locale);
  const otherLang: Locale = lang === "en" ? "de" : "en";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Locale badge */}
      <div className="mb-6">
        <span className="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
          app/[lang]/page.tsx — lang = &quot;{lang}&quot;
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-3">{dict.home.title}</h1>
      <p className="text-xl text-indigo-600 font-medium mb-4">{dict.home.subtitle}</p>
      <p className="text-gray-500 leading-relaxed mb-10 max-w-2xl">{dict.home.description}</p>

      {/* Language toggle CTA */}
      <Link
        href={`/${otherLang}`}
        className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors mb-12"
      >
        {dict.home.viewInGerman}
      </Link>

      {/* How it works */}
      <section>
        <h2 className="text-xl font-bold mb-6">{dict.home.howItWorks}</h2>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {[
            {
              step: "1",
              title: "Dynamic [lang] segment",
              body: "The folder app/[lang]/ captures the locale from the URL. /en → lang=\"en\", /de → lang=\"de\".",
              color: "blue",
            },
            {
              step: "2",
              title: "getDictionary(lang)",
              body: "lib/dictionary.ts dynamically imports only the needed JSON file. No other locale is loaded.",
              color: "green",
            },
            {
              step: "3",
              title: "Async Server Component",
              body: "Header.tsx awaits getDictionary() on the server. Translated HTML is sent — no client JS needed.",
              color: "purple",
            },
            {
              step: "4",
              title: "LocaleSwitcher (Client)",
              body: "Uses usePathname() to swap /en ↔ /de in the URL. Only this small piece runs on the client.",
              color: "orange",
            },
          ].map(({ step, title, body, color }) => (
            <div
              key={step}
              className={`rounded-xl border p-5 ${
                color === "blue"   ? "bg-blue-50 border-blue-200" :
                color === "green"  ? "bg-green-50 border-green-200" :
                color === "purple" ? "bg-purple-50 border-purple-200" :
                                     "bg-orange-50 border-orange-200"
              }`}
            >
              <div className={`text-xs font-mono font-bold px-2 py-0.5 rounded inline-block mb-2 ${
                color === "blue"   ? "bg-blue-600 text-white" :
                color === "green"  ? "bg-green-600 text-white" :
                color === "purple" ? "bg-purple-600 text-white" :
                                     "bg-orange-500 text-white"
              }`}>
                Step {step}
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{body}</p>
            </div>
          ))}
        </div>

        {/* File structure */}
        <div className="bg-gray-900 text-gray-300 rounded-xl p-5 font-mono text-xs">
          <p className="text-gray-500 mb-3"># i18n file structure</p>
          <pre>{`src/
├── dictionaries/
│   ├── en.json          ← English strings
│   └── de.json          ← German strings
├── lib/
│   └── dictionary.ts    ← getDictionary(locale) + Locale type
├── components/
│   ├── Header.tsx       ← async Server Component (awaits getDictionary)
│   └── LocaleSwitcher.tsx ← "use client" (usePathname to swap locale)
└── app/
    └── [lang]/
        ├── layout.tsx   ← validates locale, renders Header
        ├── page.tsx     ← /en  or  /de
        └── about/
            └── page.tsx ← /en/about  or  /de/about`}</pre>
        </div>
      </section>
    </div>
  );
}
