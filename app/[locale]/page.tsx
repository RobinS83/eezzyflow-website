import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/landing/hero";
import { Audience } from "@/components/landing/audience";
import { Features } from "@/components/landing/features";
import { Costs } from "@/components/landing/costs";
import { Steps } from "@/components/landing/steps";
import { Trust } from "@/components/landing/trust";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Audience />
      <Features />
      <Costs />
      <Steps />
      <Trust />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
