import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "../ui";

export async function Steps() {
  const t = await getTranslations("landing.steps");

  return (
    <Section id="how">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {/* The flow line connecting the steps. */}
        <span
          aria-hidden
          className="absolute top-7 right-[16%] left-[16%] hidden h-0.5 rounded-full bg-(image:--brand-champagne) md:block"
        />
        {[1, 2, 3].map((n) => (
          <li key={n} className="reveal hover-rise relative md:text-center">
            <span className="rise-icon relative mb-6 inline-flex size-14 items-center justify-center rounded-full bg-(image:--brand-spotlight) text-[22px] font-extrabold text-spotlight-ink shadow-(--shadow-tile-lift) ring-4 ring-paper">
              <span className="sr-only">{t("step", { n })}: </span>
              {n}
            </span>
            <h3 className="mb-2 text-[22px] leading-[1.2] font-bold tracking-[-0.02em]">{t(`s${n}Title`)}</h3>
            <p className="mx-auto max-w-xs text-[15.5px] leading-relaxed text-sub md:max-w-[30ch]">{t(`s${n}Body`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
