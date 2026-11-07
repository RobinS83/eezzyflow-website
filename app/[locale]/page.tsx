import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/landing/hero";
import { Audience } from "@/components/landing/audience";
import { Week } from "@/components/landing/week";
import { Features } from "@/components/landing/features";
import { More } from "@/components/landing/more";
import { Costs } from "@/components/landing/costs";
import { Statement } from "@/components/landing/statement";
import { Steps } from "@/components/landing/steps";
import { Desktop } from "@/components/landing/desktop";
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
      <Week />
      <Features />
      <More />
      <Costs />
      <Statement />
      <Steps />
      <Desktop />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
