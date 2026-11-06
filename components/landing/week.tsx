import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeftRight, House } from "lucide-react";
import { Section } from "../ui";

// Two weeks of a 2-2-3 arrangement: "y" = with you, "o" = with the other parent.
const PATTERN = ["y", "y", "o", "o", "y", "y", "y", "o", "o", "y", "y", "o", "o", "o"] as const;
// A Monday, only used to get the weekday names in the visitor's language.
const MONDAY = Date.UTC(2026, 10, 2);

export async function Week() {
  const t = await getTranslations("site.week");
  const locale = await getLocale();
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  const days = PATTERN.map((who, i) => ({
    who,
    name: fmt.format(new Date(MONDAY + (i % 7) * 86_400_000)).replace(".", ""),
    handover: i > 0 && PATTERN[i - 1] !== who,
  }));
  const label = { y: t("withYou"), o: t("withOther") };
  const costs = await getTranslations("landing.costs");
  const initial = { y: costs("you"), o: costs("other") };

  return (
    <Section id="week">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.15fr] [&>*]:min-w-0">
        <div className="reveal">
          <p className="mb-3 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">{t("eyebrow")}</p>
          <h2 className="mb-5 text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
            {t("title")}
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-sub">{t("body")}</p>
        </div>

        <figure role="img" aria-label={t("label")} className="reveal tile tile-lift rounded-[24px] p-5 sm:p-7">
          <div aria-hidden>
            {/* Two homes, one flow between them. */}
            <div className="relative mb-6 flex items-center justify-between">
              {(["y", "o"] as const).map((who) => (
                <div key={who} className="z-10 flex items-center gap-2.5 rounded-[14px] border border-line bg-surface px-3 py-2.5">
                  <span
                    className={`inline-flex size-9 items-center justify-center rounded-[10px] ${
                      who === "y" ? "bg-primary-chip text-primary-chip-text" : "bg-highlight-chip text-highlight-chip-text"
                    }`}
                  >
                    <House size={18} />
                  </span>
                  <span className="text-[14px] font-bold">{label[who]}</span>
                </div>
              ))}
              <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="absolute top-1/2 left-16 h-10 w-[calc(100%-8rem)] -translate-y-1/2">
                <path d="M0 20 C 75 -6, 225 46, 300 20" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
              </svg>
              <span
                className="travel absolute top-1/2 left-1/2 size-3 -translate-1/2 rounded-full bg-highlight shadow-[0_0_0_6px_var(--highlight-soft)]"
                style={{ offsetPath: "path('M -110 0 C -55 -14, 55 14, 110 0')", offsetRotate: "0deg" }}
              />
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {days.map((d, i) => (
                <div key={i} className="pop flex flex-col items-center gap-1.5">
                  {i < 7 && <span className="text-[11px] font-semibold text-sub capitalize">{d.name}</span>}
                  <span
                    className={`relative flex aspect-square w-full items-center justify-center rounded-[10px] text-[14px] font-bold ${
                      d.who === "y" ? "bg-primary-chip text-primary-chip-text" : "bg-highlight-chip text-highlight-chip-text"
                    }`}
                  >
                    {initial[d.who]}
                    {d.handover && (
                      <span className="absolute -top-1.5 -right-1.5 inline-flex size-5 items-center justify-center rounded-full border border-line bg-surface text-ink">
                        <ArrowLeftRight size={11} strokeWidth={2.5} />
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-sub">
              {(["y", "o"] as const).map((who) => (
                <span key={who} className="inline-flex items-center gap-2">
                  <span
                    className={`inline-flex size-5 items-center justify-center rounded-[6px] text-[11px] font-bold ${
                      who === "y" ? "bg-primary-chip text-primary-chip-text" : "bg-highlight-chip text-highlight-chip-text"
                    }`}
                  >
                    {initial[who]}
                  </span>
                  {label[who]}
                </span>
              ))}
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex size-5 items-center justify-center rounded-full border border-line bg-surface text-ink">
                  <ArrowLeftRight size={11} strokeWidth={2.5} />
                </span>
                {t("handover")}
              </span>
            </div>
          </div>
        </figure>
      </div>
    </Section>
  );
}
