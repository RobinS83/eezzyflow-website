import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { links } from "@/lib/links";
import appIcon from "@/brand/merkpakket-champagne/ios/AppIcon-1024.png";
import { buttonStyles } from "../ui";
import { StoreBadges } from "../store-badges";

export async function Cta() {
  const t = await getTranslations("landing.cta");
  const locale = await getLocale();

  return (
    <section className="px-[18px] pb-20 sm:pb-28" aria-labelledby="cta-title">
      <div className="reveal tilt-card light-sweep grain relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-(image:--hero-cost) px-6 py-16 text-center text-on-primary sm:px-12 sm:py-24 dark:text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-60 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-(image:--brand-champagne) opacity-20 blur-3xl"
        />
        <div className="relative">
          <Image
            src={appIcon}
            alt=""
            width={96}
            height={96}
            className="float mx-auto mb-8 rounded-[22px] shadow-[0_24px_48px_-16px_rgb(0_0_0/0.5)]"
          />
          <h2
            id="cta-title"
            className="mb-4 text-[clamp(34px,5.4vw,64px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance"
          >
            {t("title")}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[clamp(16px,1.5vw,19px)] leading-relaxed opacity-90">{t("body")}</p>
          <div className="mx-auto flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={links.register}
              className={`${buttonStyles.primary} h-14 w-full px-7 text-[16px] bg-surface! text-ink! sm:h-13 sm:w-auto dark:bg-primary! dark:text-on-primary!`}
            >
              {t("start")}
              <ArrowRight aria-hidden size={18} />
            </a>
            <a
              href={localePath(locale, "functies")}
              className={`${buttonStyles.primary} h-14 w-full border border-current px-7 text-[16px] bg-transparent! text-inherit! hover:brightness-100 sm:h-13 sm:w-auto`}
            >
              {t("features")}
            </a>
          </div>
          <StoreBadges className="mt-10 justify-center" />
          <p className="mt-7 text-[13.5px] opacity-85">{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
