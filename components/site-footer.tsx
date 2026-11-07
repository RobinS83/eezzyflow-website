import { getLocale, getTranslations } from "next-intl/server";
import { localePath, routing } from "@/i18n/routing";
import { CONTACT_EMAIL, links } from "@/lib/links";
import { localeNames } from "@/lib/locales";
import { Wordmark } from "./wordmark";

export async function SiteFooter() {
  const t = await getTranslations("landing.footer");
  const s = await getTranslations("site.footer");
  const nav = await getTranslations("landing.nav");
  const meta = await getTranslations("meta");
  const locale = await getLocale();

  const linkClass = "inline-flex min-h-11 items-center text-[14.5px] text-sub hover:text-ink hover:underline";
  const heading = "mb-1 text-[12px] font-bold tracking-[0.06em] text-sub uppercase";

  return (
    <footer className="border-t border-line px-[18px] py-14">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 text-[14.5px] text-sub">{meta("tagline").replace(/^eezzyflow · /, "")}</p>
          <p className="mt-1 text-[13px] text-sub">{t("tagline")}</p>
        </div>

        <nav aria-labelledby="footer-product">
          <p id="footer-product" className={heading}>{s("product")}</p>
          <ul>
            <li><a className={linkClass} href={links.login}>{s("openApp")}</a></li>
            <li><a className={linkClass} href={links.register}>{nav("start")}</a></li>
            <li><a className={linkClass} href={localePath(locale, "#pricing")}>{t("pricing")}</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-help">
          <p id="footer-help" className={heading}>{s("help")}</p>
          <ul>
            <li><a className={linkClass} href={localePath(locale, "hulp")}>{s("help")}</a></li>
            <li><a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>{s("contact")}</a></li>
            <li><a className={linkClass} href={links.privacy}>{t("privacy")}</a></li>
            <li><a className={linkClass} href={links.terms}>{t("terms")}</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-language">
          <p id="footer-language" className={heading}>{s("language")}</p>
          <ul className="grid grid-cols-2 gap-x-4 lg:grid-cols-1">
            {routing.locales.map((l) => {
              const current = l === locale;
              return (
                <li key={l}>
                  <a
                    href={localePath(l)}
                    hrefLang={l}
                    lang={l}
                    aria-current={current ? "page" : undefined}
                    className={`${linkClass} ${current ? "font-bold text-ink underline underline-offset-4" : ""}`}
                  >
                    {localeNames[l]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-[13px] text-sub">
        {s("rights", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
