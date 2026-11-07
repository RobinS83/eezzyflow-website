import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "../ui";

export async function Faq() {
  const t = await getTranslations("landing.faq");
  const p = await getTranslations("pricing.faq");
  const s = await getTranslations("site.pricingFaq");
  const join = await getTranslations("site.joinFaq");

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: join("q"), a: join("a") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q2"), a: t("a2") },
    { q: s("q1"), a: p("a1") },
    { q: p("q3"), a: p("a3") },
    { q: p("q5"), a: p("a5") },
  ];

  return (
    <Section id="faq">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group hover-rise">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-[16px] font-semibold">
              {item.q}
              <ChevronDown
                aria-hidden
                size={20}
                className="shrink-0 text-sub transition-transform duration-180 group-open:rotate-180"
              />
            </summary>
            <p className="pb-5 text-[15px] leading-relaxed text-sub">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
