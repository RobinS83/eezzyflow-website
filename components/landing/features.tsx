import { getTranslations } from "next-intl/server";
import { CalendarDays, FileText, FolderHeart, Lock, MessagesSquare, Wallet, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "../ui";

/* Small abstract drawings of each screen. Decorative only. */

function CalendarArt() {
  const marked: Record<number, "y" | "o" | "h"> = { 3: "h", 9: "o", 10: "o", 11: "o", 17: "h", 23: "o", 24: "o", 30: "h" };
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {Array.from({ length: 35 }, (_, i) => {
        const m = marked[i];
        return (
          <span
            key={i}
            className={`aspect-square rounded-[7px] ${
              m === "o" ? "bg-highlight-chip" : m === "h" ? "border-2 border-highlight bg-surface" : "bg-primary-soft"
            }`}
          />
        );
      })}
    </div>
  );
}

function MessagesArt() {
  return (
    <div className="space-y-2.5">
      <div className="w-4/5 rounded-[14px] rounded-bl-[4px] bg-primary-soft p-3">
        <span className="block h-2 w-full rounded-full bg-primary-chip" />
        <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-primary-chip" />
      </div>
      <div className="ml-auto w-3/5 rounded-[14px] rounded-br-[4px] bg-highlight-soft p-3">
        <span className="block h-2 w-full rounded-full bg-highlight-chip" />
      </div>
      <div className="flex items-center gap-1.5 text-sub">
        <Lock size={13} />
        <span className="h-1.5 w-16 rounded-full bg-line" />
      </div>
    </div>
  );
}

function ChildArt() {
  return (
    <div className="relative h-[120px]">
      {[0, 1, 2].map((n) => (
        <div
          key={n}
          className="tile absolute flex w-[70%] items-center gap-3 rounded-[12px] p-3"
          style={{ top: n * 30, left: n * 14 }}
        >
          <FileText size={16} className="shrink-0 text-sub" />
          <span className="h-2 flex-1 rounded-full bg-primary-chip" />
        </div>
      ))}
    </div>
  );
}

function CostsArt({ amount }: { amount: string }) {
  return (
    <div>
      <p className="text-[28px] leading-none font-extrabold tracking-[-0.02em] tabular-nums">{amount}</p>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full">
        <span className="w-1/2 bg-primary" />
        <span className="w-1/2 bg-highlight" />
      </div>
      <div className="mt-2 flex justify-between text-[12px] font-semibold text-sub">
        <span>50%</span>
        <span>50%</span>
      </div>
    </div>
  );
}

export async function Features({ heading = true, more }: { heading?: boolean; more?: { href: string; label: string } }) {
  const t = await getTranslations("landing.features");
  const costs = await getTranslations("landing.costs");

  const cards: { key: string; icon: LucideIcon; art: ReactNode; wide?: boolean }[] = [
    { key: "calendar", icon: CalendarDays, art: <CalendarArt />, wide: true },
    { key: "messages", icon: MessagesSquare, art: <MessagesArt /> },
    { key: "child", icon: FolderHeart, art: <ChildArt /> },
    { key: "costs", icon: Wallet, art: <CostsArt amount={costs("amount")} />, wide: true },
  ];

  return (
    <Section id="features" className="orbs overflow-x-clip">
      {heading && <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />}
      <ul className="grid gap-4 lg:grid-cols-3">
        {cards.map(({ key, icon: Icon, art, wide }) => (
          <li
            key={key}
            className={`reveal glass tilt-card group grid gap-6 rounded-[24px] p-6 sm:p-7 ${
              wide ? "lg:col-span-2 lg:grid-cols-[1fr_1fr] lg:items-center" : ""
            }`}
          >
            <div>
              <span className="pop-z mb-5 inline-flex size-11 items-center justify-center rounded-[12px] bg-highlight-soft text-highlight-chip-text">
                <Icon aria-hidden size={22} />
              </span>
              <h3 className="mb-2 text-[22px] leading-[1.2] font-bold tracking-[-0.02em]">{t(`${key}Title`)}</h3>
              <p className="text-[15px] leading-relaxed text-sub">{t(`${key}Body`)}</p>
            </div>
            <div
              aria-hidden
              className="pop-z rounded-[18px] bg-paper/60 p-5"
            >
              {art}
            </div>
          </li>
        ))}
      </ul>
      {more && (
        <div className="mt-10">
          <ButtonLink href={more.href} variant="secondary">
            {more.label}
            <ArrowRight aria-hidden size={17} />
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}
