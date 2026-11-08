import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Check, ChevronDown, Equal, Info, Sparkles } from "lucide-react";
import { localePath } from "@/i18n/routing";
import { links } from "@/lib/links";
import { formatEuro, planById, plans } from "@/lib/plans";
import { ButtonLink, buttonStyles, Section, SectionHeading } from "../ui";

/**
 * compact: the home page version (price and one line per plan, link to the
 * prices page). Otherwise the full prices page: every feature, the sum for
 * Family, who-pays-what and the test-phase note.
 */
export async function Pricing({ compact = false, heading = true }: { compact?: boolean; heading?: boolean }) {
  // Full page: every feature open. Elsewhere long lists fold after six.
  const VISIBLE = compact ? 0 : 99;
  const t = await getTranslations("pricing");
  const s = await getTranslations("site.pricing");
  const faq = await getTranslations("landing.faq");
  const locale = await getLocale();
  const euro = (cents: number) => formatEuro(cents, locale);

  const plus = planById("plus").monthlyCents;
  const family = planById("family").monthlyCents;

  return (
    <Section id="pricing" className="orbs overflow-hidden bg-surface/50">
      {heading && <SectionHeading eyebrow={s("eyebrow")} title={s("title")} />}
      {heading && <p className="-mt-6 max-w-2xl text-[16px] leading-relaxed text-sub">{t("subtitle")}</p>}
      <p className="mt-4 mb-12 inline-flex max-w-2xl items-start gap-2.5 rounded-[14px] border border-line bg-surface px-4 py-3 text-[15.5px] leading-snug font-semibold">
        <Equal aria-hidden size={18} className="mt-0.5 shrink-0 text-landing-accent" />
        {t("sameFeatures")}
      </p>

      <ul className="grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const featured = plan.featured;
          return (
            <li
              key={plan.id}
              className={`reveal tilt-card relative flex flex-col rounded-[28px] p-7 sm:p-8 ${
                featured
                  ? "on-spotlight order-first bg-(image:--brand-spotlight) text-spotlight-ink shadow-(--shadow-tile-lift) lg:order-none lg:-my-5 lg:py-12"
                  : "tile"
              }`}
            >
              {featured && (
                <p className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-(image:--brand-champagne) px-3 py-1 text-[12.5px] font-bold text-brand-graphite">
                  <Sparkles aria-hidden size={14} />
                  {t("recommended")}
                </p>
              )}
              <h3 className={`text-[26px] leading-[1.1] font-extrabold tracking-[-0.03em] ${featured ? "text-champagne" : ""}`}>
                {t(`plans.${plan.id}.name`)}
              </h3>
              <p className={`mt-2 min-h-[3em] text-[15px] leading-snug ${featured ? "text-spotlight-sub" : "text-sub"}`}>
                {t(`plans.${plan.id}.tagline`)}
              </p>

              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-[44px] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
                  {euro(plan.monthlyCents)}
                </span>
                <span className={`text-[14px] ${featured ? "text-spotlight-sub" : "text-sub"}`}>
                  {s("perMonth")}
                  {plan.audience && <span className="block">{t(plan.audience)}</span>}
                </span>
              </p>
              {plan.id === "plus" && (
                <p className="mt-4 text-[14px] leading-snug font-semibold text-ink">{s("plusHow")}</p>
              )}

              <a
                href={links.register}
                className={`mt-7 ${buttonStyles.primary} w-full ${
                  featured ? "bg-(image:--brand-champagne)! text-brand-graphite! hover:brightness-105" : ""
                }`}
              >
                {t("startFree")}
              </a>

              {!compact && <ul className="mt-7 space-y-3">
                {plan.features.slice(0, VISIBLE).map((f) => (
                  <li key={f} className="hover-rise flex gap-2.5 text-[14.5px] leading-snug">
                    <Check
                      aria-hidden
                      size={17}
                      strokeWidth={2.5}
                      className={`mt-0.5 shrink-0 ${featured ? "text-spotlight-ink" : "text-success-text"}`}
                    />
                    <span className={f === "everythingFree" || f === "plusForBoth" ? "font-bold" : ""}>
                      {t(`features.${f}`)}
                    </span>
                  </li>
                ))}
              </ul>}
              {!compact && plan.features.length > VISIBLE && (
                <details className="group/more mt-3">
                  <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[14.5px] font-semibold underline underline-offset-4">
                    {s("moreCount", { n: plan.features.length - VISIBLE })}
                    <ChevronDown aria-hidden size={16} className="transition-transform group-open/more:rotate-180" />
                  </summary>
                  <ul className="mt-2 space-y-3">
                    {plan.features.slice(VISIBLE).map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14.5px] leading-snug">
                        <Check aria-hidden size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-success-text" />
                        <span>{t(`features.${f}`)}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              {featured && !compact && (
                // Why Family: the sum, so nobody has to work it out.
                <div className="mt-auto pt-8">
                  <div className="rounded-[18px] border border-spotlight-ink/15 bg-spotlight-ink/5 p-5">
                    <dl aria-hidden className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 text-[14.5px] tabular-nums">
                      <dt className="text-spotlight-sub">2 × {t("plans.plus.name")}</dt>
                      <dd className="text-right text-spotlight-sub line-through">{euro(plus * 2)}</dd>
                      <dt className="font-bold">{t("plans.family.name")}</dt>
                      <dd className="text-right font-extrabold">{euro(family)}</dd>
                    </dl>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-spotlight-sub">
                      {s("saveBody", { twice: euro(plus * 2), family: euro(family), saving: euro(plus * 2 - family) })}
                    </p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {compact ? (
        <div className="mt-12">
          <ButtonLink href={localePath(locale, "prijzen")} variant="secondary">
            {faq("pricing")}
            <ArrowRight aria-hidden size={17} />
          </ButtonLink>
        </div>
      ) : (
        <>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {(["apart", "together"] as const).map((k) => (
              <div key={k} className="tilt-card rounded-[18px] border border-line bg-surface/40 p-5">
                <h3 className="mb-1.5 text-[15.5px] font-bold">{t(`who.${k}Title`)}</h3>
                <p className="text-[14.5px] leading-relaxed text-sub">{t(`who.${k}Body`)}</p>
              </div>
            ))}
          </div>
      <div className="mt-6 flex gap-3 rounded-[18px] bg-highlight-soft p-4 sm:items-center">
        <Info aria-hidden size={20} className="mt-0.5 shrink-0 text-highlight-chip-text sm:mt-0" />
        <p className="text-[14.5px] leading-relaxed text-ink">
          <strong className="font-bold">{t("testPhaseTitle")}.</strong> {t("testPhaseBody")}
        </p>
      </div>
        </>
      )}
    </Section>
  );
}
