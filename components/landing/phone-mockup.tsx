import { getTranslations } from "next-intl/server";
import { Dot } from "../ui";

// A drawing of the app's Home screen, built from the app's own texts.
// Decorative for screen readers: the figure carries a single label.
export async function PhoneMockup() {
  const t = await getTranslations("landing.phone");
  const s = await getTranslations("site.phone");

  const items = [
    { time: t("item1Time"), title: t("item1Title"), sub: t("item1Sub") },
    { time: t("item2Time"), title: t("item2Title"), sub: t("item2Sub") },
  ];

  return (
    <figure role="img" aria-label={s("label")} className="w-[300px] shrink-0">
      <div aria-hidden className="rounded-t-[42px] bg-ink px-3 pt-3">
        <div className="h-[470px] overflow-hidden rounded-t-[32px] bg-paper">
          <div className="flex justify-center pt-2.5">
            <div className="h-[22px] w-[88px] rounded-full bg-ink" />
          </div>
          <div className="px-4 pt-5">
            <p className="text-[12px] font-semibold text-sub">{t("date")}</p>
            <p className="mt-1 text-[19px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">{t("title")}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-highlight-soft px-3 py-1 text-[12px] font-semibold text-highlight-chip-text">
              <Dot />
              {t("pill")}
            </p>

            <div className="tile mt-4 rounded-[14px] p-3">
              <p className="mb-2 text-[11px] font-bold tracking-[0.06em] text-sub uppercase">{t("today")}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.time} className="flex items-center gap-3">
                    <span className="w-11 text-[13px] font-bold text-ink tabular-nums">{item.time}</span>
                    <span className="h-8 w-1 rounded-full bg-highlight" />
                    <span>
                      <span className="block text-[13.5px] font-semibold text-ink">{item.title}</span>
                      <span className="block text-[12px] text-sub">{item.sub}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="tile rounded-[14px] p-3">
                <p className="text-[11px] font-bold tracking-[0.06em] text-sub uppercase">{t("balance")}</p>
                <p className="mt-1 text-[18px] font-bold text-success-text tabular-nums">{t("balanceValue")}</p>
              </div>
              <div className="tile rounded-[14px] p-3">
                <p className="text-[11px] font-bold tracking-[0.06em] text-sub uppercase">{t("unread")}</p>
                <p className="mt-1 text-[18px] font-bold text-ink">
                  {t("unreadValue")} <span className="text-[12px] font-medium text-sub">{t("unreadSub")}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
