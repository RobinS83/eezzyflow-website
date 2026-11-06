import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui";

export default async function NotFound() {
  const t = await getTranslations("site.notFound");
  return (
    <section className="px-[18px] py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">404</p>
        <h1 className="mb-4 text-[clamp(26px,3.4vw,36px)] leading-[1.15] font-extrabold tracking-[-0.03em]">
          {t("title")}
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-sub">{t("body")}</p>
        <Link href="/" className={buttonStyles.primary}>
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
