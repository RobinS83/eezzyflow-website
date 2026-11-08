import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import { CONTROLLER, PRIVACY_LAST_UPDATED, PROCESSORS } from "@/lib/legal";
import { pageMetadata } from "@/lib/page-meta";
import { PageHeader } from "@/components/page-header";
import { LegalSection, legalLink } from "@/components/legal-section";

type Props = { params: Promise<{ locale: string }> };
type List = Record<string, string>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  return pageMetadata(locale, "privacy", t("title"), t("intro"));
}

// The app's privacy policy (same texts as app.eezzyflow.com/privacy), on the
// site so visitors stay here. One extra section is about the website itself.
export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.privacy");
  const s = await getTranslations("site.legal");
  const sections = Object.entries(
    t.raw("sections") as Record<string, { title: string; paras?: List; items?: List; paras2?: List }>,
  );
  const processors = t.raw("processors") as List;
  const date = new Date(PRIVACY_LAST_UPDATED).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHeader id="page-title" eyebrow="eezzyflow" title={t("title")} lead={t("intro")} />
      <article className="px-[18px] pb-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <p className="text-[14px] text-sub">{t("lastUpdated", { date })}</p>

          <LegalSection title={s("websiteTitle")}>
            <p>{s("websiteBody")}</p>
          </LegalSection>

          <LegalSection title={t("responsible")}>
            <p>
              <strong>{CONTROLLER.naam}</strong>
              <br />
              <a className={legalLink} href={`mailto:${CONTROLLER.email}`}>
                {CONTROLLER.email}
              </a>
            </p>
            <p>
              {t.rich("contact", {
                link: (chunks) => (
                  <a className={legalLink} href={localePath(locale, "hulp")}>
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </LegalSection>

          {sections.map(([key, sec]) => (
            <LegalSection key={key} title={sec.title}>
              {Object.values(sec.paras ?? {}).map((p) => (
                <p key={p}>{p}</p>
              ))}
              {sec.items && (
                <ul className="flex list-disc flex-col gap-1.5 pl-5">
                  {Object.values(sec.items).map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
              {key === "where" && (
                <ul className="flex list-disc flex-col gap-1.5 pl-5">
                  {PROCESSORS.map((name) => (
                    <li key={name}>
                      <strong>{name}</strong>: {processors[name]}
                    </li>
                  ))}
                </ul>
              )}
              {Object.values(sec.paras2 ?? {}).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </LegalSection>
          ))}
        </div>
      </article>
    </>
  );
}
