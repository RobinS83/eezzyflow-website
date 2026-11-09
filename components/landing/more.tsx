import { getLocale, getTranslations } from "next-intl/server";
import { localePath } from "@/i18n/routing";
import {
  BellRing, Camera, ChefHat, CalendarSync, Eye, FileText, FolderOpen, Gavel, History,
  ListChecks, LockKeyhole, Receipt, Sparkles, UserRound, type LucideIcon,
} from "lucide-react";

// Extra features (texts from the app: pricing.features). Most read
// "Title: explanation"; we show the part before the colon as the title.
const ITEMS: { key: string; icon: LucideIcon }[] = [
  { key: "vault", icon: LockKeyhole },
  { key: "photoImport", icon: Camera },
  { key: "receipts", icon: Receipt },
  { key: "calendarSync", icon: CalendarSync },
  { key: "reminders", icon: BellRing },
  { key: "documents", icon: FolderOpen },
  { key: "reportPdf", icon: FileText },
  { key: "aiRewrite", icon: Sparkles },
  { key: "judgmentImport", icon: Gavel },
  { key: "lists", icon: ListChecks },
  { key: "recipeHelp", icon: ChefHat },
  { key: "viewers", icon: Eye },
  { key: "childAccounts", icon: UserRound },
  { key: "history", icon: History },
];

/** "Title: explanation" from the app's text; otherwise a short site title and the whole text as explanation. */
function split(text: string, ownTitle?: string, ownBody?: string) {
  // "Title: explanation", or a question as title: "What can I make? A photo…"
  const m = text.match(/^(.+?)\s?:\s(.+)$/) ?? text.match(/^(.+?\s?\?)\s(.+)$/);
  if (m) return { title: m[1], body: m[2] };
  return { title: ownTitle ?? text, body: ownBody ?? (ownTitle ? text : "") };
}

export async function More({ detailed = false }: { detailed?: boolean }) {
  const s = await getTranslations("site.more");
  const f = await getTranslations("pricing.features");
  const faq = await getTranslations("landing.faq");
  const locale = await getLocale();

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

        <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ key, icon: Icon }) => {
            const ownTitle = s.has(`titles.${key}`) ? s(`titles.${key}`) : undefined;
            const ownBody = s.has(`bodies.${key}`) ? s(`bodies.${key}`) : undefined;
            const { title, body } = split(f(key), ownTitle, ownBody);
            return (
              <li key={key} className="reveal hover-rise flex gap-4">
                <span className="rise-icon inline-flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-highlight-soft text-highlight-chip-text">
                  <Icon aria-hidden size={21} />
                </span>
                <div className="self-center">
                  <h3 className="text-[16px] leading-snug font-bold first-letter:uppercase">{title}</h3>
                  {detailed && body && (
                    <p className="mt-1 text-[14.5px] leading-relaxed text-sub first-letter:uppercase">{body}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-12 text-[14.5px] text-sub">
          {s("note")}{" "}
          <a href={localePath(locale, "prijzen")} className="font-semibold text-ink underline underline-offset-4">
            {faq("pricing")}
          </a>
        </p>
      </div>
    </section>
  );
}
