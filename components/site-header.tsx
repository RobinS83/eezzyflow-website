import { getLocale, getTranslations } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import { LanguageMenu } from "./language-menu";
import { ThemeToggle } from "./theme-toggle";
import { links } from "@/lib/links";
import { ButtonLink } from "./ui";
import { Wordmark } from "./wordmark";
import { MobileMenu } from "./mobile-menu";

export async function SiteHeader() {
  const t = await getTranslations("landing.nav");
  const s = await getTranslations("site.nav");
  const f = await getTranslations("site.footer");
  const th = await getTranslations("site.theme");
  const locale = await getLocale();

  const items = [
    { href: localePath(locale, "functies"), label: t("features") },
    { href: localePath(locale, "hoe-het-werkt"), label: t("how") },
    { href: localePath(locale, "prijzen"), label: s("pricing") },
    { href: localePath(locale, "hulp"), label: s("help") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-[18px]">
        <a href={localePath(locale)} aria-label={s("home")} className="rounded-[8px]">
          <Wordmark />
        </a>

        <nav aria-label={s("main")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-[11px] px-3 text-[15px] font-medium text-sub hover:bg-primary-soft hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 lg:gap-2">
          <ThemeToggle labels={{ label: th("label"), light: th("light"), dark: th("dark"), auto: th("auto") }} />
          <LanguageMenu locale={locale} label={f("language")} />
          <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href={links.login} variant="secondary" className="px-4">
            {s("openApp")}
          </ButtonLink>
          <ButtonLink href={links.register} className="px-4">
            {t("start")}
          </ButtonLink>
          </div>

        <MobileMenu
          items={items}
          labels={{ menu: t("menu"), close: s("close"), main: s("main"), login: s("openApp"), start: t("start") }}
          loginHref={links.login}
          startHref={links.register}
        />
        </div>
      </div>
    </header>
  );
}
