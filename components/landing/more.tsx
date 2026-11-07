import { getTranslations } from "next-intl/server";
import {
  BellRing, Camera, CalendarSync, Eye, FileText, FolderOpen, Gavel, History,
  ListChecks, Receipt, Sparkles, UserRound, type LucideIcon,
} from "lucide-react";

// Extra features (texts from the app: pricing.features). Most read
// "Title: explanation"; we show the part before the colon as the title.
const ITEMS: { key: string; icon: LucideIcon }[] = [
  { key: "photoImport", icon: Camera },
  { key: "receipts", icon: Receipt },
  { key: "calendarSync", icon: CalendarSync },
  { key: "reminders", icon: BellRing },
  { key: "documents", icon: FolderOpen },
  { key: "reportPdf", icon: FileText },
  { key: "aiRewrite", icon: Sparkles },
  { key: "judgmentImport", icon: Gavel },
  { key: "lists", icon: ListChecks },
  { key: "viewers", icon: Eye },
  { key: "childAccounts", icon: UserRound },
  { key: "history", icon: History },
];

function split(text: string) {
  const m = text.match(/^(.+?)\s?:\s(.+)$/);
  return m ? { title: m[1], body: m[2] } : { title: text, body: "" };
}

export async function More() {
  const s = await getTranslations("site.more");
  const f = await getTranslations("pricing.features");
  const faq = await getTranslations("landing.faq");

  return (
    <section aria-labelledby="more-title" className="px-[18px] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold tracking-[0.08em] text-landing-accent uppercase">{s("eyebrow")}</p>
          <h2
            id="more-title"
            className="text-[clamp(30px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance"
          >
            {s("title")}
          </h2>
        </div>

        <ul className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ key, icon: Icon }) => {
            const { title, body } = split(f(key));
            return (
              <li key={key} className="reveal flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-highlight-soft text-highlight-chip-text">
                  <Icon aria-hidden size={21} />
                </span>
                <div className="pt-0.5">
                  <h3 className="text-[16px] leading-snug font-bold first-letter:uppercase">{title}</h3>
                  {body && <p className="mt-1 text-[14.5px] leading-relaxed text-sub first-letter:uppercase">{body}</p>}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-12 text-[14.5px] text-sub">
          {s("note")}{" "}
          <a href="#pricing" className="font-semibold text-ink underline underline-offset-4">
            {faq("pricing")}
          </a>
        </p>
      </div>
    </section>
  );
}
