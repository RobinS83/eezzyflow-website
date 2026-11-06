import { getLocale, getTranslations } from "next-intl/server";
import { localePath, routing } from "@/i18n/routing";
import { links } from "@/lib/links";
import { localeNames } from "@/lib/locales";
import { Wordmark } from "./wordmark";

export async function SiteFooter() {
  const t = await getTranslations("landing.footer");
  const s = await getTranslations("site.footer");
  const meta = await getTranslations("meta");
  const locale = await getLocale();

  const linkClass = "inline-flex min-h-11 items-center text-[14.5px] text-sub hover:text-ink hover:underline";

  return (
    <footer className="border-t border-line px-[18px] py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 text-[14.5px] text-sub">{meta("tagline").replace(/^eezzyflow · /, "")}</p>
          <p className="mt-1 text-[13px] text-sub">{t("tagline")}</p>
        </div>

        <nav aria-label="eezzyflow">
          <ul>
            <li><a className={linkClass} href="#pricing">{t("pricing")}</a></li>
            <li><a className={linkClass} href={links.privacy}>{t("privacy")}</a></li>
            <li><a className={linkClass} href={links.terms}>{t("terms")}</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-language">
          <p id="footer-language" className="mb-1 text-[12px] font-bold tracking-[0.06em] text-sub uppercase">
            {s("language")}
          </p>
          <ul className="grid grid-cols-2 gap-x-4">
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
      <p className="mx-auto mt-10 max-w-6xl text-[13px] text-sub">
        {s("rights", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
