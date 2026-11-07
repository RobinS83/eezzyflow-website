import Image, { type StaticImageData } from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { links } from "@/lib/links";
import appNl from "@/assets/badges/app-store-nl.svg";
import appFr from "@/assets/badges/app-store-fr.svg";
import appEn from "@/assets/badges/app-store-en.svg";
import appDe from "@/assets/badges/app-store-de.svg";
import appEs from "@/assets/badges/app-store-es.svg";
import appIt from "@/assets/badges/app-store-it.svg";
import playNl from "@/assets/badges/google-play-nl.png";
import playFr from "@/assets/badges/google-play-fr.png";
import playEn from "@/assets/badges/google-play-en.png";
import playDe from "@/assets/badges/google-play-de.png";
import playEs from "@/assets/badges/google-play-es.png";
import playIt from "@/assets/badges/google-play-it.png";

// Official badges, unchanged (Apple's and Google's rules: no redrawing, no
// recolouring), one per language. Apple's English one is the US-UK badge.
const appStore: Record<string, StaticImageData> = {
  nl: appNl, fr: appFr, en: appEn, de: appDe, es: appEs, it: appIt,
};
const googlePlay: Record<string, StaticImageData> = {
  nl: playNl, fr: playFr, en: playEn, de: playDe, es: playEs, it: playIt,
};

const HEIGHT = 48;

export async function StoreBadges({ className = "" }: { className?: string }) {
  const t = await getTranslations("site.stores");
  const locale = await getLocale();
  const play = googlePlay[locale] ?? playEn;
  const apple = appStore[locale] ?? appEn;

  const badges = [
    { href: links.appStore ?? links.app, src: apple, alt: t("appStore") },
    { href: links.googlePlay ?? links.app, src: play, alt: t("googlePlay") },
  ];

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {badges.map((b) => (
        <li key={b.alt}>
          <a
            href={b.href}
            className="block rounded-[10px] transition-transform duration-180 ease-(--ease-natural) hover:-translate-y-0.5"
          >
            <Image
              src={b.src}
              alt={b.alt}
              height={HEIGHT}
              width={Math.round((b.src.width / b.src.height) * HEIGHT)}
              className="h-12 w-auto"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
