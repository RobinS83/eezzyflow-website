import { getTranslations } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import { buttonStyles } from "./ui";

export async function NotFoundContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "site.notFound" });
  return (
    <section className="px-[18px] py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-[clamp(64px,10vw,120px)] leading-none font-extrabold tracking-[-0.05em] text-champagne">404</p>
        <h1 className="mb-4 text-[clamp(26px,3.4vw,36px)] leading-[1.15] font-extrabold tracking-[-0.03em]">{t("title")}</h1>
        <p className="mb-8 text-[15px] leading-relaxed text-sub">{t("body")}</p>
        <a href={localePath(locale)} className={buttonStyles.primary}>
          {t("back")}
        </a>
      </div>
    </section>
  );
}
