import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { links } from "@/lib/links";
import { ButtonLink } from "./ui";
import { Wordmark } from "./wordmark";
import { MobileMenu } from "./mobile-menu";

export async function SiteHeader() {
  const t = await getTranslations("landing.nav");
  const s = await getTranslations("site.nav");

  const items = [
    { href: "#features", label: t("features") },
    { href: "#how", label: t("how") },
    { href: "#pricing", label: s("pricing") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-[18px]">
        <Link href="/" aria-label={s("home")} className="rounded-[8px]">
          <Wordmark />
        </Link>

        <nav aria-label={s("main")} className="hidden md:block">
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

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href={links.login} variant="secondary" className="px-4">
            {t("login")}
          </ButtonLink>
          <ButtonLink href={links.register} className="px-4">
            {t("start")}
          </ButtonLink>
        </div>

        <MobileMenu
          items={items}
          labels={{ menu: t("menu"), close: s("close"), main: s("main"), login: t("login"), start: t("start") }}
          loginHref={links.login}
          startHref={links.register}
        />
      </div>
    </header>
  );
}
