// Header.tsx — async Server Component
//
// This component is intentionally async so it can await getDictionary()
// directly on the server. No useEffect, no loading state, no client JS —
// the translated strings are baked into the HTML before it reaches the browser.

import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/dictionary";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default async function Header({ lang }: { lang: Locale }) {
  // getDictionary is awaited here — this is what makes the component async.
  // Next.js fetches the right JSON file on the server and renders translated nav links.
  const dict = await getDictionary(lang);

  return (
    <header className="bg-indigo-900 text-white px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <Link href={`/${lang}`} className="font-bold text-lg text-indigo-200 hover:text-white transition-colors">
          i18n Demo
        </Link>

        {/* Translated navigation links */}
        <nav className="flex items-center gap-6 text-sm">
          {/* Link labels come from the JSON dictionary — server rendered */}
          <Link
            href={`/${lang}`}
            className="text-indigo-200 hover:text-white transition-colors"
          >
            {dict.nav.home}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="text-indigo-200 hover:text-white transition-colors"
          >
            {dict.nav.about}
          </Link>

          {/* LocaleSwitcher is a Client Component — needs interactivity */}
          <LocaleSwitcher currentLang={lang} dict={dict} />
        </nav>
      </div>

      {/* Debug banner — shows which locale is active */}
      <div className="max-w-4xl mx-auto mt-2">
        <p className="text-xs font-mono text-indigo-400">
          Active locale: <span className="text-indigo-200">{lang}</span>
          &nbsp;·&nbsp;
          Dictionary loaded: <span className="text-indigo-200">src/dictionaries/{lang}.json</span>
          &nbsp;·&nbsp;
          Rendered: <span className="text-indigo-200">Server (async component)</span>
        </p>
      </div>
    </header>
  );
}
