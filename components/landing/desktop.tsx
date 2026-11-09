import { getLocale, getTranslations } from "next-intl/server";
import { screensFor } from "@/lib/screens";
import { ScreenCycle } from "../screen-cycle";
import { ArrowUpRight, Lock, Monitor } from "lucide-react";
import { links } from "@/lib/links";
import { ButtonLink, Section } from "../ui";

/** "On your computer": the web app is one click away. */
export async function Desktop() {
  const t = await getTranslations("site.desktop");
  const locale = await getLocale();
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
        </div>

        {/* A browser window with the app inside. */}
        <figure role="img" aria-label={t("label")} className="reveal">
          <div aria-hidden className="tile tile-lift tilt-card overflow-hidden rounded-[18px]">
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
            {/* The real app in the browser: desktop screenshots of this language taking turns. */}
            <div className="relative aspect-[16/10] bg-paper">
              <ScreenCycle srcs={screensFor(locale, "desktop")} kind="mouse" position="object-left-top" zoom={1.18} />
            </div>
          </div>
        </figure>
      </div>
    </Section>
  );
}
