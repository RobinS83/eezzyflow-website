import { getTranslations } from "next-intl/server";
import { links } from "@/lib/links";
import { ButtonLink, Dot } from "../ui";
import { PhoneMockup } from "./phone-mockup";

export async function Hero() {
  const t = await getTranslations("landing.hero");

  return (
    <section className="overflow-hidden bg-(image:--hero) px-[18px] pt-12 sm:pt-20" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="pb-4 lg:pb-24">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-[13px] text-hero-sub">
            <Dot />
            {t("pill")}
          </p>
          <h1
            id="hero-title"
            className="mb-5 text-[clamp(32px,5vw,52px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-hero-ink"
          >
            {t("title")}
          </h1>
          <p className="mb-8 max-w-xl text-[17px] leading-relaxed text-hero-sub">{t("lead")}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={links.register}>{t("start")}</ButtonLink>
            <ButtonLink href="#how" variant="secondary">
              {t("how")}
            </ButtonLink>
          </div>
          <p className="mt-5 text-[13px] text-hero-sub">{t("note")}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
