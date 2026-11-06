import { defineRouting } from "next-intl/routing";

export const locales = ["nl", "fr", "en", "de", "es", "it"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "nl",
  // Dutch lives at "/", the others at "/fr", "/en"…
  localePrefix: "as-needed",
  // No cookies on the site, and no automatic redirects: the visitor picks.
  localeCookie: false,
  localeDetection: false,
});
