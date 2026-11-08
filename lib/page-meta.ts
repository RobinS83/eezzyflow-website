import type { Metadata } from "next";
import { localePath, routing } from "@/i18n/routing";

/** Title, description and language alternates for a sub page such as "functies". */
export function pageMetadata(locale: string, page: string, title: string, description: string): Metadata {
  return {
    title: `${title} · eezzyflow`,
    description,
    alternates: {
      canonical: localePath(locale, page),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l, page)])),
        "x-default": localePath(routing.defaultLocale, page),
      },
    },
  };
}
