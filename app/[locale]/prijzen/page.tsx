import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/page-meta";
import { PageHeader } from "@/components/page-header";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const s = await getTranslations({ locale, namespace: "site" });
  const p = await getTranslations({ locale, namespace: "pricing" });
  return pageMetadata(locale, "prijzen", s("nav.pricing"), p("subtitle"));
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const s = await getTranslations("site.pricing");
  const p = await getTranslations("pricing");

  return (
    <>
      <PageHeader id="page-title" eyebrow={s("eyebrow")} title={s("title")} lead={p("subtitle")} />
      <Pricing heading={false} />
      <Faq />
      <Cta />
    </>
  );
}
