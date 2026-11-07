import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CalendarDays, House, MessagesSquare, Wallet } from "lucide-react";
import frame from "@/assets/iphone-frame.webp";
import { Dot } from "../ui";

// The app's Home screen inside a real phone frame (assets/iphone-frame.webp,
// 980 × 2000, transparent screen). Built from the app's own texts.
// The figure carries one label; everything inside is decorative.

// Where the screen sits inside the frame image, in percent of the frame.
const SCREEN = { left: "5.2%", top: "2.25%", width: "89.6%", height: "95.5%" };

const WEEK = ["y", "y", "y", "y", "o", "o", "o"] as const;

export async function PhoneMockup() {
  const t = await getTranslations("landing.phone");
  const costs = await getTranslations("landing.costs");
  const s = await getTranslations("site.phone");
  const you = costs("you");
  const other = costs("other");

  const items = [
    { time: t("item1Time"), title: t("item1Title"), sub: t("item1Sub") },
    { time: t("item2Time"), title: t("item2Title"), sub: t("item2Sub") },
  ];

  return (
    <figure
      role="img"
      aria-label={s("label")}
      className="relative aspect-[980/2000] w-[290px] shrink-0 drop-shadow-[0_40px_50px_rgb(23_23_28/0.35)] sm:w-[320px]"
    >
      <div
        aria-hidden
        className="absolute flex flex-col overflow-hidden rounded-[13%/6.4%] bg-paper"
        style={SCREEN}
      >
        <div className="bg-(image:--hero) px-5 pt-[54px] pb-12 text-hero-ink">
          <div className="flex items-center justify-between">
            <span className="text-[14px] leading-none font-extrabold tracking-[-0.03em]">
              <span className="text-brand-wordmark">eezzy</span>
              <span className="text-brand-wordmark-accent">flow</span>
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-surface/70 text-[12px] font-bold">
              {you}
            </span>
          </div>
          <p className="mt-5 text-[12px] text-hero-sub">{t("date")}</p>
          <p className="mt-0.5 text-[20px] leading-[1.18] font-bold tracking-[-0.02em]">{t("title")}</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-[11.5px] font-semibold">
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
        <div className="tile mx-3.5 mt-3 rounded-[16px] p-3.5">
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

        {/* Latest cost, as on the costs screen. */}
        <div className="tile mx-3.5 mt-3 flex items-center gap-3 rounded-[16px] p-3">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-chip text-[12px] font-bold text-primary-chip-text">
            {you}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold text-ink">{costs("row1Title")}</span>
            <span className="block truncate text-[11px] text-sub">{costs("row1Sub")}</span>
          </span>
          <span className="text-right">
            <span className="block text-[13px] font-bold text-ink tabular-nums">{costs("row1Amount")}</span>
            <span className="inline-block rounded-full bg-highlight-soft px-1.5 py-px text-[10px] font-semibold text-highlight-chip-text">
              {costs("row1Status")}
            </span>
          </span>
        </div>

        {/* Tab bar, as at the bottom of the app. */}
        <div className="mt-auto flex items-center justify-around border-t border-line bg-surface px-4 pt-3 pb-7">
          {[House, CalendarDays, Wallet, MessagesSquare].map((Icon, i) => (
            <span key={i} className={`flex flex-col items-center gap-1 ${i === 0 ? "text-ink" : "text-sub"}`}>
              <Icon size={20} strokeWidth={i === 0 ? 2.4 : 2} />
              <span className={`h-1 w-1 rounded-full ${i === 0 ? "bg-highlight" : "bg-transparent"}`} />
            </span>
          ))}
        </div>
      </div>

      <Image src={frame} alt="" fill sizes="320px" priority className="pointer-events-none select-none" />
    </figure>
  );
}
