import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import { CONTROLLER, TERMS_LAST_UPDATED } from "@/lib/legal";
import { pageMetadata } from "@/lib/page-meta";
import { PageHeader } from "@/components/page-header";
import { LegalSection, legalLink } from "@/components/legal-section";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return pageMetadata(locale, "voorwaarden", t("title"), t("intro"));
}

// The app's terms of use (same texts as app.eezzyflow.com/voorwaarden).
export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.terms");
  const help = await getTranslations("site.help");
  const sections = Object.keys(t.raw("sections") as Record<string, unknown>);
  const date = new Date(TERMS_LAST_UPDATED).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHeader id="page-title" eyebrow="eezzyflow" title={t("title")} lead={t("intro")} />
      <article className="px-[18px] pb-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <p className="text-[14px] text-sub">{t("lastUpdated", { date })}</p>
          {sections.map((key) => (
            <LegalSection key={key} title={t(`sections.${key}.title`)}>
              <p>
                {t.rich(`sections.${key}.body`, {
                  link: (chunks) => (
                    <a className={legalLink} href={localePath(locale, "privacy")}>
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </LegalSection>
          ))}
          <LegalSection title={t("contact")}>
            <p>
              <strong>{CONTROLLER.naam}</strong>
              <br />
              <a className={legalLink} href={`mailto:${CONTROLLER.email}`}>
                {CONTROLLER.email}
              </a>
            </p>
            <p>
              <a className={legalLink} href={localePath(locale, "hulp")}>
                {help("metaTitle")}
              </a>
            </p>
          </LegalSection>
        </div>
      </article>
    </>
  );
}
