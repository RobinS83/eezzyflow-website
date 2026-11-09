import { Globe } from "lucide-react";
import { localePath, routing } from "@/i18n/routing";
import { localeNames } from "@/lib/locales";

/** Language picker without JavaScript: a native <details> disclosure. */
export function LanguageMenu({ locale, label }: { locale: string; label: string }) {
  return (
    <details className="group relative">
      <summary
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-[11px] px-3 text-[14px] font-semibold text-sub uppercase hover:bg-primary-soft hover:text-ink"
        aria-label={`${label}: ${localeNames[locale as keyof typeof localeNames]}`}
      >
        <Globe aria-hidden size={17} />
        {locale}
      </summary>
      <ul className="tile tile-lift absolute right-0 z-50 mt-2 w-48 rounded-[16px] p-1.5">
        {routing.locales.map((l) => (
          <li key={l}>
            <a
              href={localePath(l)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "page" : undefined}
              className={`flex min-h-11 items-center justify-between rounded-[10px] px-3 text-[14.5px] hover:bg-primary-soft ${
                l === locale ? "font-bold text-ink" : "text-sub"
              }`}
            >
              {localeNames[l]}
              {l === locale && <span aria-hidden className="size-2 rounded-full bg-highlight" />}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
