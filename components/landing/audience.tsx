import { getTranslations } from "next-intl/server";
import { Clock, HeartHandshake, House, User, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "../ui";

export async function Audience() {
  const t = await getTranslations("landing.audience");
  const groups: { key: string; icon: LucideIcon }[] = [
    { key: "busy", icon: Clock },
    { key: "apart", icon: House },
    { key: "new", icon: HeartHandshake },
    { key: "solo", icon: User },
  ];

  return (
    <Section id="audience">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map(({ key, icon: Icon }) => (
          <li key={key} className="reveal tile tilt-card rounded-[20px] p-6">
            <span className="pop-z mb-4 inline-flex size-10 items-center justify-center rounded-[11px] bg-primary-soft text-primary-text">
              <Icon aria-hidden size={20} />
            </span>
            <h3 className="mb-2 text-[15.5px] font-bold">{t(`${key}Title`)}</h3>
            <p className="text-[14.5px] leading-relaxed text-sub">{t(`${key}Body`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
