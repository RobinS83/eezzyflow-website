import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/page-meta";
import { PageHeader } from "@/components/page-header";
import { Features } from "@/components/landing/features";
import { Week } from "@/components/landing/week";
import { Costs } from "@/components/landing/costs";
import { More } from "@/components/landing/more";
import { Cta } from "@/components/landing/cta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing" });
  return pageMetadata(locale, "functies", t("nav.features"), t("features.title"));
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("landing.features");
  const hero = await getTranslations("landing.hero");

  return (
    <>
      <PageHeader id="page-title" eyebrow={t("eyebrow")} title={t("title")} lead={hero("lead")} />
      <Features heading={false} />
      <Week />
      <Costs />
      <More detailed />
      <Cta />
    </>
  );
}
