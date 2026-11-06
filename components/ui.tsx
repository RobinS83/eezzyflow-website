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
    <section id={id} className={`px-[18px] py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="reveal mb-12 max-w-3xl">
      <p className="mb-3 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
        {title}
      </h2>
    </div>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-2 shrink-0 rounded-full bg-highlight ${className}`} />;
}
