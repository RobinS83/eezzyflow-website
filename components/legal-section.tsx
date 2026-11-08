import type { ReactNode } from "react";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="reveal border-t border-line pt-8">
      <h2 className="mb-3 text-[20px] leading-snug font-bold tracking-[-0.02em]">{title}</h2>
      <div className="flex flex-col gap-3 text-[15.5px] leading-relaxed text-sub [&_strong]:text-ink">{children}</div>
    </section>
  );
}

export const legalLink = "font-semibold text-ink underline underline-offset-4";
