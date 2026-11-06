import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "../ui";

export async function Steps() {
  const t = await getTranslations("landing.steps");

  return (
    <Section id="how" className="bg-surface/40">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <ol className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <li key={n} className="tile rounded-[18px] p-6">
            <p className="mb-4 inline-flex items-center gap-2 text-[13px] font-bold text-landing-accent">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-highlight-soft text-[15px] text-highlight-chip-text">
                {n}
              </span>
              {t("step", { n })}
            </p>
            <h3 className="mb-2 text-xl leading-[1.2] font-bold tracking-[-0.02em]">{t(`s${n}Title`)}</h3>
            <p className="text-[15px] leading-relaxed text-sub">{t(`s${n}Body`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
