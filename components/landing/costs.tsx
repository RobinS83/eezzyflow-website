import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Section } from "../ui";

export async function Costs() {
  const t = await getTranslations("landing.costs");
  const rows = [1, 2].map((n) => ({
    title: t(`row${n}Title`),
    sub: t(`row${n}Sub`),
    amount: t(`row${n}Amount`),
    status: t(`row${n}Status`),
    open: n === 1,
    who: n === 1 ? t("you") : t("other"),
  }));

  return (
    <Section id="costs">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">{t("eyebrow")}</p>
          <h2 className="mb-5 text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
            {t("title")}
          </h2>
          <p className="mb-6 text-[15px] leading-relaxed text-sub">{t("body")}</p>
          <ul className="space-y-3">
            {[1, 2, 3].map((n) => (
              <li key={n} className="hover-rise flex items-center gap-3 text-[15px]">
                <span className="rise-icon inline-flex size-6 items-center justify-center rounded-full bg-success-soft text-success-text">
                  <Check aria-hidden size={14} strokeWidth={3} />
                </span>
                {t(`check${n}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustration of the costs screen; the text beside it says the same. */}
        <div aria-hidden className="reveal tile tile-lift tilt-card rounded-[18px] p-5 sm:p-6">
          <div className="pop-z rounded-[14px] bg-primary-soft p-5">
            <p className="text-[12px] font-bold tracking-[0.06em] text-sub uppercase">{t("openBalance")}</p>
            <p className="mt-1 text-[32px] leading-none font-extrabold tracking-[-0.02em] tabular-nums">{t("amount")}</p>
            <p className="mt-2 text-[14px] text-sub">{t("owes")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex h-10 items-center rounded-[11px] bg-primary px-4 text-[14px] font-semibold text-on-primary">
                {t("settle")}
              </span>
              <span className="inline-flex h-10 items-center rounded-[11px] border border-line bg-surface px-4 text-[14px] font-semibold">
                {t("pdf")}
              </span>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {rows.map((row) => (
              <li key={row.title} className="flex items-center gap-3 py-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-chip text-[13px] font-bold text-primary-chip-text">
                  {row.who}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-semibold">{row.title}</span>
                  <span className="block truncate text-[12.5px] text-sub">{row.sub}</span>
                </span>
                <span className="text-right">
                  <span className="block text-[14.5px] font-bold tabular-nums">{row.amount}</span>
                  <span
                    className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${
                      row.open ? "bg-highlight-soft text-highlight-chip-text" : "bg-success-soft text-success-text"
                    }`}
                  >
                    {row.status}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
