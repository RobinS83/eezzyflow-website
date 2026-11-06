import { getTranslations } from "next-intl/server";
import { Dot } from "../ui";

// A drawing of the app's Home screen, built from the app's own texts.
// The figure carries one label; the details inside are decorative.
const WEEK = ["y", "y", "y", "y", "o", "o", "o"] as const;

export async function PhoneMockup() {
  const t = await getTranslations("landing.phone");
  const costs = await getTranslations("landing.costs");
  const you = costs("you");
  const other = costs("other");
  const s = await getTranslations("site.phone");

  const items = [
    { time: t("item1Time"), title: t("item1Title"), sub: t("item1Sub") },
    { time: t("item2Time"), title: t("item2Title"), sub: t("item2Sub") },
  ];

  return (
    <figure role="img" aria-label={s("label")} className="w-[300px] shrink-0 sm:w-[320px]">
      <div
        aria-hidden
        className="rounded-t-[46px] bg-ink px-3 pt-3 shadow-[0_40px_80px_-30px_rgb(23_23_28/0.45)] dark:bg-line"
      >
        <div className="h-[500px] overflow-hidden rounded-t-[36px] bg-paper sm:h-[540px]">
          <div className="bg-(image:--hero) px-5 pt-3 pb-12 text-hero-ink">
            <div className="flex justify-center">
              <div className="h-[24px] w-[92px] rounded-full bg-ink dark:bg-line" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[14px] leading-none font-extrabold tracking-[-0.03em]">
                <span className="text-brand-wordmark">eezzy</span>
                <span className="text-brand-wordmark-accent">flow</span>
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-surface/70 text-[12px] font-bold">
                J
              </span>
            </div>
            <p className="mt-5 text-[12px] text-hero-sub">{t("date")}</p>
            <p className="mt-0.5 text-[21px] leading-[1.18] font-bold tracking-[-0.02em]">{t("title")}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-[12px] font-semibold">
              <Dot />
              {t("pill")}
            </p>
          </div>

          <div className="tile relative mx-3.5 -mt-8 rounded-[16px] p-4">
            <p className="mb-3 text-[10.5px] font-bold tracking-[0.06em] text-sub uppercase">{t("today")}</p>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.time} className="flex items-center gap-3">
                  <span className="w-11 text-[13px] font-bold text-ink tabular-nums">{item.time}</span>
                  <span className="h-9 w-1 rounded-full bg-highlight" />
                  <span>
                    <span className="block text-[14px] font-semibold text-ink">{item.title}</span>
                    <span className="block text-[12px] text-sub">{item.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* This week: who has the children, as in the custody calendar. */}
          <div className="tile mx-3.5 mt-3 rounded-[16px] p-4">
            <div className="grid grid-cols-7 gap-1.5">
              {WEEK.map((who, i) => (
                <span
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-[8px] text-[11px] font-bold ${
                    who === "y" ? "bg-primary-chip text-primary-chip-text" : "bg-highlight-chip text-highlight-chip-text"
                  } ${i === 2 ? "ring-2 ring-ink/70 ring-offset-1 ring-offset-surface" : ""}`}
                >
                  {who === "y" ? you : other}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
