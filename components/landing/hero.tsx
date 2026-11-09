import type React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { links } from "@/lib/links";
import { ButtonLink, Dot } from "../ui";
import { PhoneMockup } from "./phone-mockup";
import { LaptopMockup } from "./laptop-mockup";
import { Tilt3D } from "../tilt-3d";
import { StoreBadges } from "../store-badges";

/** Splits "Samen regelen. Eén flow." so the last word can carry the brand accent. */
function splitLastWord(text: string) {
  const i = text.lastIndexOf(" ");
  return i < 0 ? ["", text] : [text.slice(0, i + 1), text.slice(i + 1)];
}

export async function Hero() {
  const t = await getTranslations("landing.hero");
  const locale = await getLocale();
  const [head, last] = splitLastWord(t("title"));

  return (
    <section className="hero-scroll relative overflow-hidden bg-(image:--hero) px-[18px]" aria-labelledby="hero-title">
      {/* Soft champagne light behind the phone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 size-[720px] rounded-full bg-(image:--brand-champagne) opacity-60 blur-3xl dark:opacity-15"
      />
      {/* Fade into the page colour, so the hero flows into the next section without an edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-paper" />
      <div className="relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-10 pt-14 sm:pt-20 lg:min-h-[calc(100svh-68px)] lg:grid-cols-[0.95fr_1.3fr] lg:pt-0">
        <div className="hero-out-text lg:pb-10">
          <p className="glass intro mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-hero-ink" style={{ "--d": "0s" } as React.CSSProperties}>
            <Dot />
            {t("pill")}
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(44px,5.2vw,78px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance text-hero-ink"
          >
            {head
              .trim()
              .split(" ")
              .map((w, i) => (
                <span key={i}>
                  <span className="word-in" style={{ "--i": i } as React.CSSProperties}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            <span className="word-in relative inline-block" style={{ "--i": head.trim().split(" ").length } as React.CSSProperties}>
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
          <p className="intro mt-7 max-w-xl text-[clamp(17px,1.6vw,20px)] leading-relaxed text-hero-sub" style={{ "--d": "0.7s" } as React.CSSProperties}>{t("lead")}</p>
          <div className="intro mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ "--d": "0.9s" } as React.CSSProperties}>
            <ButtonLink href={links.register} className="h-14 w-full px-7 text-[16px] shadow-(--shadow-tile-lift) sm:h-13 sm:w-auto">
              {t("start")}
              <ArrowRight aria-hidden size={18} />
            </ButtonLink>
            <ButtonLink href={localePath(locale, "hoe-het-werkt")} variant="secondary" className="h-14 w-full px-7 text-[16px] sm:h-13 sm:w-auto">
              {t("how")}
            </ButtonLink>
          </div>
          {/* On a phone the store badges sit in the closing block, not crammed under the buttons. */}
          <div className="intro mt-6 hidden sm:block" style={{ "--d": "1.05s" } as React.CSSProperties}>
            <StoreBadges />
          </div>
          <p className="mt-5 text-[14px] text-hero-sub">{t("note")}</p>
        </div>

        {/* The MacBook with the iPhone in front: eezzyflow on both. */}
        {/* The MacBook stands still; only the iPhone in front of it moves. */}
        <div className="relative -mx-2 pb-[26%] sm:mx-auto sm:w-full sm:max-w-[820px] sm:pb-10 lg:pb-0 2xl:-mr-16">
          <div className="intro relative pr-[4%] sm:pr-[10%]" style={{ "--d": "0.3s" } as React.CSSProperties}>
            <LaptopMockup />
          </div>
          <div className="tilt-stage hero-out-phone absolute right-1 bottom-0 w-[36%] sm:right-0 sm:bottom-[2%] sm:w-[25%] lg:bottom-[-8%]">
            <div className="phone-land">
              <Tilt3D>
                <div className="tilt-idle relative">
                  <PhoneMockup variant="burgundy" className="w-full" />
                </div>
              </Tilt3D>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
