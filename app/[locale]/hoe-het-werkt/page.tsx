import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/page-meta";
import { PageHeader } from "@/components/page-header";
import { Steps } from "@/components/landing/steps";
import { Desktop } from "@/components/landing/desktop";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing" });
  return pageMetadata(locale, "hoe-het-werkt", t("nav.how"), t("steps.title"));
}

export default async function HowPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("landing.steps");
  const cta = await getTranslations("landing.cta");

  return (
    <>
      <PageHeader id="page-title" eyebrow={t("eyebrow")} title={t("title")} lead={cta("body")} />
      <Steps heading={false} />
      <Desktop />
      <Faq />
      <Cta />
    </>
  );
}
