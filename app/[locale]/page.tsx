import { getTranslations, setRequestLocale } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import { Hero } from "@/components/landing/hero";
import { Audience } from "@/components/landing/audience";
import { Features } from "@/components/landing/features";
import { Statement } from "@/components/landing/statement";
import { Steps } from "@/components/landing/steps";
import { Pricing } from "@/components/landing/pricing";
import { Cta } from "@/components/landing/cta";

// The home page stays short: what it is, for whom, the main features, why,
// how to start and what it costs. The detail lives on the sub pages.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cta = await getTranslations("landing.cta");
  const hero = await getTranslations("landing.hero");

  return (
    <>
      <Hero />
      <Audience />
      <Features more={{ href: localePath(locale, "functies"), label: cta("features") }} />
      <Statement />
      <Steps more={{ href: localePath(locale, "hoe-het-werkt"), label: hero("how") }} />
      <Pricing compact />
      <Cta />
    </>
  );
}
