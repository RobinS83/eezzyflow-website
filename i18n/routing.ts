import { defineRouting } from "next-intl/routing";

export const locales = ["nl", "fr", "en", "de", "es", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

/** "/" for Dutch, "/fr" etc. for the others. scripts/postbuild.mjs moves nl to the root. */
export function localePath(locale: string, hashOrPage = "") {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  if (!hashOrPage) return base || "/";
  if (hashOrPage.startsWith("#")) return (base || "/") + hashOrPage;
  return `${base}/${hashOrPage}`;
}
