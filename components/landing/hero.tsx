import { getTranslations } from "next-intl/server";
import { ArrowRight, MessagesSquare, Wallet } from "lucide-react";
import { links } from "@/lib/links";
import { ButtonLink, Dot } from "../ui";
import { PhoneMockup } from "./phone-mockup";
import { Tilt3D } from "../tilt-3d";
import { StoreBadges } from "../store-badges";

/** Splits "Samen regelen. Eén flow." so the last word can carry the brand accent. */
function splitLastWord(text: string) {
  const i = text.lastIndexOf(" ");
  return i < 0 ? ["", text] : [text.slice(0, i + 1), text.slice(i + 1)];
}

export async function Hero() {
  const t = await getTranslations("landing.hero");
  const phone = await getTranslations("landing.phone");
  const [head, last] = splitLastWord(t("title"));

  return (
    <section className="relative overflow-hidden bg-(image:--hero) px-[18px]" aria-labelledby="hero-title">
      {/* Soft champagne light behind the phone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 size-[720px] rounded-full bg-(image:--brand-champagne) opacity-60 blur-3xl dark:opacity-15"
      />
      <div className="relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-10 pt-14 sm:pt-20 lg:min-h-[calc(100svh-68px)] lg:grid-cols-[1.3fr_1fr] lg:pt-0">
        <div className="lg:pb-10">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/70 px-3.5 py-1.5 text-[13px] font-semibold text-hero-ink backdrop-blur">
            <Dot />
            {t("pill")}
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(44px,6.6vw,84px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance text-hero-ink"
          >
            {head}
            <span className="relative inline-block">
              <span className="text-champagne">{last}</span>
              <svg
                aria-hidden
                viewBox="0 0 200 24"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full overflow-visible"
              >
                <path
                  d="M3 16 C 45 4, 80 4, 112 13 S 175 22, 197 8"
                  pathLength={1}
                  fill="none"
                  stroke="var(--highlight)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="draw"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-[clamp(17px,1.6vw,20px)] leading-relaxed text-hero-sub">{t("lead")}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={links.register} className="h-13 px-7 text-[16px] shadow-(--shadow-tile-lift)">
              {t("start")}
              <ArrowRight aria-hidden size={18} />
            </ButtonLink>
            <ButtonLink href="#how" variant="secondary" className="h-13 px-7 text-[16px]">
              {t("how")}
            </ButtonLink>
          </div>
          <StoreBadges className="mt-6" />
          <p className="mt-5 text-[14px] text-hero-sub">{t("note")}</p>
        </div>

        <div className="tilt-stage relative mx-auto w-full max-w-[460px] pb-12 lg:pb-0">
          <Tilt3D className="relative flex justify-center">
            <div className="tilt-idle relative">
              <PhoneMockup />
              {/* Floating tiles stand in front of the phone, so they move with depth. */}
              <div aria-hidden className="tilt-depth absolute top-[64%] -left-20 hidden sm:block lg:-left-28">
                <div className="float tile rounded-[14px] px-4 py-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.06em] text-sub uppercase">
                    <Wallet size={13} /> {phone("balance")}
                  </p>
                  <p className="mt-0.5 text-[20px] font-extrabold text-success-text tabular-nums">{phone("balanceValue")}</p>
                </div>
              </div>
              <div aria-hidden className="tilt-depth absolute top-[30%] -right-16 hidden sm:block lg:-right-24">
                <div className="float-slow tile rounded-[14px] px-4 py-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.06em] text-sub uppercase">
                    <MessagesSquare size={13} /> {phone("unread")}
                  </p>
                  <p className="mt-0.5 text-[20px] font-extrabold text-ink">
                    {phone("unreadValue")} <span className="text-[13px] font-medium text-sub">{phone("unreadSub")}</span>
                  </p>
                </div>
              </div>
            </div>
          </Tilt3D>
        </div>
      </div>
    </section>
  );
}
