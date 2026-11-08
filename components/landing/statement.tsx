import type React from "react";
import { getTranslations } from "next-intl/server";
import { Leaf, Scale, ShieldCheck, type LucideIcon } from "lucide-react";

/** The brand's core line on the spotlight stage, with the three promises below. */
export async function Statement() {
  const s = await getTranslations("site.statement");
  const t = await getTranslations("landing.trust");
  const title = s("title");
  const cut = title.indexOf(". ");
  const [first, rest] = cut < 0 ? ["", title] : [title.slice(0, cut + 1), title.slice(cut + 2)];

  const items: { key: string; icon: LucideIcon }[] = [
    { key: "private", icon: ShieldCheck },
    { key: "fair", icon: Scale },
    { key: "calm", icon: Leaf },
  ];

  return (
    <section
      id="trust"
      aria-labelledby="statement-title"
      className="on-spotlight follow-light grain relative overflow-hidden bg-(image:--brand-spotlight) px-[18px] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-30%] left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-(image:--brand-champagne) opacity-[0.08] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-6 text-xs font-bold tracking-[0.08em] text-spotlight-sub uppercase">{s("eyebrow")}</p>
        <h2
          id="statement-title"
          className="light-words max-w-5xl text-[clamp(36px,6.4vw,80px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-spotlight-ink"
        >
          {[...first.split(" ").filter(Boolean).map((w) => ({ w, accent: false })), ...rest.split(" ").map((w) => ({ w, accent: true }))].map(
            ({ w, accent }, i) => (
              <span key={i} className="light-word" style={{ "--i": i } as React.CSSProperties}>
                <span className={accent ? "text-champagne" : undefined}>{w}</span>{" "}
              </span>
            ),
          )}
        </h2>
        <p className="reveal mt-8 max-w-2xl text-[clamp(17px,1.6vw,20px)] leading-relaxed text-spotlight-sub">{s("body")}</p>

        <ul className="mt-16 grid gap-8 border-t border-spotlight-ink/15 pt-10 md:grid-cols-3">
          {items.map(({ key, icon: Icon }) => (
            <li key={key} className="reveal hover-rise">
              <span className="rise-icon mb-4 inline-flex size-11 items-center justify-center rounded-[12px] bg-spotlight-ink/10">
                <Icon aria-hidden size={22} className="text-spotlight-ink" />
              </span>
              <h3 className="text-[18px] leading-snug font-bold text-spotlight-ink">{t(`${key}Title`)}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
