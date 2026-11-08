import type React from "react";

/** The opening of a detail page: eyebrow, big title, one line of intro, on the hero light. */
export function PageHeader({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  const words = title.split(" ");
  return (
    <section aria-labelledby={id} className="relative overflow-hidden bg-(image:--hero) px-[18px] pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[620px] rounded-full bg-(image:--brand-champagne) opacity-50 blur-3xl dark:opacity-15"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-paper" />
      <div className="relative mx-auto max-w-6xl">
        <p className="glass intro mb-6 inline-flex rounded-full px-3.5 py-1.5 text-xs font-bold tracking-[0.08em] text-hero-ink uppercase" style={{ "--d": "0s" } as React.CSSProperties}>
          {eyebrow}
        </p>
        <h1
          id={id}
          className="max-w-4xl text-[clamp(38px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-hero-ink"
        >
          {words.map((w, i) => (
            <span key={i}>
              <span className="word-in" style={{ "--i": i } as React.CSSProperties}>
                {w}
              </span>{" "}
            </span>
          ))}
        </h1>
        {lead && (
          <p className="intro mt-6 max-w-2xl text-[clamp(17px,1.6vw,20px)] leading-relaxed text-hero-sub" style={{ "--d": "0.6s" } as React.CSSProperties}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
