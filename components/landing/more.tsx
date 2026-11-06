import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

const ROW_A = ["calendarSync", "photoImport", "receipts", "lists", "reportPdf", "documents"];
const ROW_B = ["viewers", "reminders", "aiRewrite", "yearOverview", "judgmentImport", "childAccounts"];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const pill = (text: string, key: string) => (
    <li key={key} className="tile flex shrink-0 items-center gap-2.5 rounded-full py-2.5 pr-5 pl-3 text-[14.5px] font-medium">
      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-text">
        <Check aria-hidden size={13} strokeWidth={3} />
      </span>
      {text}
    </li>
  );
  return (
    <div className="marquee-wrap overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className={`marquee-track flex w-max gap-3 ${reverse ? "marquee-reverse" : "marquee"}`}>
        <ul className="flex gap-3">{items.map((t, i) => pill(t, `a${i}`))}</ul>
        <ul aria-hidden className="marquee-copy flex gap-3">
          {items.map((t, i) => pill(t, `b${i}`))}
        </ul>
      </div>
    </div>
  );
}

export async function More() {
  const s = await getTranslations("site.more");
  const f = await getTranslations("pricing.features");
  const faq = await getTranslations("landing.faq");

  return (
    <section aria-labelledby="more-title" className="py-16 sm:py-24">
      <div className="mx-auto mb-10 max-w-6xl px-[18px]">
        <p className="mb-3 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">{s("eyebrow")}</p>
        <h2 id="more-title" className="max-w-3xl text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
          {s("title")}
        </h2>
      </div>
      <div className="space-y-2">
        <Row items={ROW_A.map((k) => f(k))} />
        <Row items={ROW_B.map((k) => f(k))} reverse />
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-[18px] text-[14px] text-sub">
        {s("note")}{" "}
        <a href="#pricing" className="font-semibold text-ink underline underline-offset-4">
          {faq("pricing")}
        </a>
      </p>
    </section>
  );
}
