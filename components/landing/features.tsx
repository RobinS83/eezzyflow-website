import { getTranslations } from "next-intl/server";
import { CalendarDays, FolderHeart, MessagesSquare, Wallet, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "../ui";

export async function Features() {
  const t = await getTranslations("landing.features");
  const features: { key: string; icon: LucideIcon }[] = [
    { key: "calendar", icon: CalendarDays },
    { key: "costs", icon: Wallet },
    { key: "messages", icon: MessagesSquare },
    { key: "child", icon: FolderHeart },
  ];

  return (
    <Section id="features" className="bg-surface/40">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <ul className="grid gap-4 md:grid-cols-2">
        {features.map(({ key, icon: Icon }) => (
          <li key={key} className="tile flex gap-4 rounded-[18px] p-6">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[11px] bg-highlight-soft text-highlight-chip-text">
              <Icon aria-hidden size={22} />
            </span>
            <div>
              <h3 className="mb-2 text-xl leading-[1.2] font-bold tracking-[-0.02em]">{t(`${key}Title`)}</h3>
              <p className="mb-4 text-[15px] leading-relaxed text-sub">{t(`${key}Body`)}</p>
              <ul className="flex flex-wrap gap-2">
                {[1, 2].map((n) => (
                  <li
                    key={n}
                    className="rounded-full bg-primary-chip px-3 py-1 text-[12.5px] font-semibold text-primary-chip-text"
                  >
                    {t(`${key}Chip${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
