import { getTranslations } from "next-intl/server";
import { Check, Info } from "lucide-react";
import { links } from "@/lib/links";
import { plans } from "@/lib/plans";
import { ButtonLink, Section, SectionHeading } from "../ui";

export async function Pricing() {
  const t = await getTranslations("pricing");
  const s = await getTranslations("site.pricing");

  return (
    <Section id="pricing" className="bg-surface/50">
      <SectionHeading eyebrow={s("eyebrow")} title={s("title")} />
      <p className="-mt-4 mb-8 max-w-2xl text-[15px] leading-relaxed text-sub">{t("subtitle")}</p>

      <div className="mb-8 flex gap-3 rounded-[14px] border border-line bg-highlight-soft p-4 sm:items-center">
        <Info aria-hidden size={20} className="mt-0.5 shrink-0 text-highlight-chip-text sm:mt-0" />
        <p className="text-[14.5px] leading-relaxed text-ink">
          <strong className="font-bold">{t("testPhaseTitle")}.</strong> {t("testPhaseBody")}
        </p>
      </div>

      <ul className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <li
            key={plan.id}
            className={`reveal tile flex flex-col rounded-[24px] p-7`}
          >
            <h3 className="text-xl leading-[1.2] font-bold tracking-[-0.02em]">{t(`plans.${plan.id}.name`)}</h3>
            <p className="mt-1.5 min-h-[3em] text-[14.5px] leading-snug text-sub">{t(`plans.${plan.id}.tagline`)}</p>
            <p className="mt-4 text-[17px] font-bold">
              {plan.id === "free" ? s("freeForever") : s("testPhase")}
            </p>
            {plan.audience && <p className="text-[13px] text-sub">{t(plan.audience)}</p>}

            <p className="mt-6 mb-3 text-[12px] font-bold tracking-[0.06em] text-sub uppercase">{s("included")}</p>
            <ul className="mb-6 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[14.5px] leading-snug">
                  <Check aria-hidden size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-success-text" />
                  {t(`features.${f}`)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {(["apart", "together"] as const).map((k) => (
          <div key={k} className="rounded-[14px] border border-line p-5">
            <h3 className="mb-1.5 text-[15.5px] font-bold">{t(`who.${k}Title`)}</h3>
            <p className="text-[14.5px] leading-relaxed text-sub">{t(`who.${k}Body`)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ButtonLink href={links.register}>{t("startFree")}</ButtonLink>
      </div>
    </Section>
  );
}
