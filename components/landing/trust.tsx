import { getTranslations } from "next-intl/server";
import { Leaf, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "../ui";

export async function Trust() {
  const t = await getTranslations("landing.trust");
  const s = await getTranslations("site.trust");
  const items: { key: string; icon: LucideIcon }[] = [
    { key: "private", icon: ShieldCheck },
    { key: "fair", icon: Scale },
    { key: "calm", icon: Leaf },
  ];

  return (
    <Section id="trust">
      <SectionHeading eyebrow={s("eyebrow")} title={s("title")} />
      <ul className="grid gap-4 md:grid-cols-3">
        {items.map(({ key, icon: Icon }) => (
          <li key={key} className="flex gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[11px] bg-primary-soft text-primary-text">
              <Icon aria-hidden size={22} />
            </span>
            <div>
              <h3 className="mb-1.5 text-[15.5px] font-bold">{t(`${key}Title`)}</h3>
              <p className="text-[15px] leading-relaxed text-sub">{t(`${key}Body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
