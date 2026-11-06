export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/links";

const url = (l: string) => (l === routing.defaultLocale ? `${SITE_URL}/` : `${SITE_URL}/${l}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: url(locale),
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, url(l)])) },
  }));
}
