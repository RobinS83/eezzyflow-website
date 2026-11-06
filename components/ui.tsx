import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[11px] px-6 text-[15px] font-semibold transition-[background-color,box-shadow,transform] duration-180 ease-(--ease-natural)";

export const buttonStyles = {
  primary: `${base} bg-primary text-on-primary hover:brightness-110 dark:hover:brightness-95`,
  secondary: `${base} border border-line bg-surface text-ink hover:bg-primary-soft`,
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonStyles }) {
  return <a className={`${buttonStyles[variant]} ${className}`} {...props} />;
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-[18px] py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="text-[clamp(24px,3vw,32px)] leading-[1.2] font-bold tracking-[-0.02em] text-balance">
        {title}
      </h2>
    </div>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-2 shrink-0 rounded-full bg-highlight ${className}`} />;
}
