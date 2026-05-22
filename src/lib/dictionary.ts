// dictionary.ts
//
// getDictionary dynamically imports the correct JSON file based on the locale.
// Dynamic imports are lazy — only the requested language file is loaded,
// not all of them at once. This keeps the server response lean.
//
// The Dictionary type is inferred directly from en.json so TypeScript
// catches any missing translation keys at compile time.

import type enDict from "@/dictionaries/en.json";

export type Dictionary = typeof enDict;

export type Locale = "en" | "de";

export const locales: Locale[] = ["en", "de"];

export const defaultLocale: Locale = "en";

// Map each locale to a lazy import — only executed when called
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  de: () => import("@/dictionaries/de.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // Fall back to English if an unknown locale somehow slips through
  const loader = dictionaries[locale] ?? dictionaries[defaultLocale];
  return loader();
}
