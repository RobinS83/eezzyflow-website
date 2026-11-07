import { getTranslations } from "next-intl/server";
import { ArrowUpRight, CalendarDays, Lock, MessagesSquare, Monitor, Wallet } from "lucide-react";
import { links } from "@/lib/links";
import { ButtonLink, Section } from "../ui";

/** "On your computer": the web app is one click away. */
export async function Desktop() {
  const t = await getTranslations("site.desktop");
  const phone = await getTranslations("landing.phone");
  const host = new URL(links.app).host;

  return (
    <Section id="desktop">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.25fr] [&>*]:min-w-0">
        <div className="reveal">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">
            <Monitor aria-hidden size={15} />
            {t("eyebrow")}
          </p>
          <h2 className="mb-5 text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
            {t("title")}
          </h2>
          <p className="mb-8 max-w-lg text-[17px] leading-relaxed text-sub">{t("body")}</p>
          <ButtonLink href={links.login} className="h-13 px-7 text-[16px] shadow-(--shadow-tile-lift)">
            {t("button")}
            <ArrowUpRight aria-hidden size={18} />
          </ButtonLink>
          <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-sub">{t("tip")}</p>
        </div>

        {/* A browser window with the app inside. */}
        <figure role="img" aria-label={t("label")} className="reveal">
          <div aria-hidden className="tile tile-lift overflow-hidden rounded-[18px]">
            <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-3">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </span>
              <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[12.5px] text-sub">
                <Lock size={11} />
                {host}
              </span>
            </div>
            <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[180px_1fr]">
              <div className="space-y-1.5 border-r border-line bg-paper p-3">
                <span className="mb-4 hidden px-2 text-[15px] font-extrabold tracking-[-0.03em] sm:block">
                  <span className="text-brand-wordmark">eezzy</span>
                  <span className="text-brand-wordmark-accent">flow</span>
                </span>
                {[CalendarDays, Wallet, MessagesSquare].map((Icon, i) => (
                  <span
                    key={i}
                    className={`flex items-center gap-2.5 rounded-[10px] px-2 py-2 ${i === 0 ? "bg-primary-soft text-ink" : "text-sub"}`}
                  >
                    <Icon size={17} />
                    <span className="hidden h-2 w-20 rounded-full bg-primary-chip sm:block" />
                  </span>
                ))}
              </div>
              <div className="bg-paper/40 p-4 sm:p-6">
                <div className="rounded-[14px] bg-(image:--hero) p-4 text-hero-ink">
                  <p className="text-[11.5px] text-hero-sub">{phone("date")}</p>
                  <p className="text-[16px] leading-tight font-bold tracking-[-0.02em] sm:text-[19px]">{phone("title")}</p>
                </div>
                <div className="mt-3 grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 14 }, (_, i) => (
                    <span
                      key={i}
                      className={`aspect-square rounded-[7px] ${[3, 4, 5, 6, 10, 11].includes(i) ? "bg-highlight-chip" : "bg-primary-soft"}`}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="tile rounded-[12px] p-3">
                    <p className="text-[10px] font-bold tracking-[0.06em] text-sub uppercase">{phone("balance")}</p>
                    <p className="text-[16px] font-bold text-success-text tabular-nums">{phone("balanceValue")}</p>
                  </div>
                  <div className="tile rounded-[12px] p-3">
                    <p className="text-[10px] font-bold tracking-[0.06em] text-sub uppercase">{phone("unread")}</p>
                    <p className="text-[16px] font-bold">
                      {phone("unreadValue")} <span className="text-[11px] font-medium text-sub">{phone("unreadSub")}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </Section>
  );
}
