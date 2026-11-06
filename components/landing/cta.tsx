import { getTranslations } from "next-intl/server";
import { links } from "@/lib/links";
import { buttonStyles } from "../ui";

export async function Cta() {
  const t = await getTranslations("landing.cta");

  return (
    <section className="px-[18px] pb-16 sm:pb-24" aria-labelledby="cta-title">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-(image:--hero-cost) px-6 py-14 text-center text-on-primary sm:px-12 dark:text-ink">
        <h2
          id="cta-title"
          className="mb-3 text-[clamp(26px,3.4vw,38px)] leading-[1.15] font-extrabold tracking-[-0.03em] text-balance"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-[16px] leading-relaxed opacity-90">{t("body")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={links.register} className={`${buttonStyles.primary} bg-surface! text-ink! dark:bg-primary! dark:text-on-primary!`}>
            {t("start")}
          </a>
          <a href="#features" className={`${buttonStyles.primary} border border-current bg-transparent! text-inherit! hover:brightness-100`}>
            {t("features")}
          </a>
        </div>
        <p className="mt-6 text-[13px] opacity-85">{t("note")}</p>
      </div>
    </section>
  );
}
