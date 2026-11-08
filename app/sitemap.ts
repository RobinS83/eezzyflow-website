export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { localePath, routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/links";

const PAGES = ["", "functies", "hoe-het-werkt", "prijzen", "hulp"];
const url = (l: string, page: string) => SITE_URL + (page ? localePath(l, page) : localePath(l));

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: url(locale, page),
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, url(l, page)])) },
    })),
  );
}
