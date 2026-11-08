import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, ChevronDown, KeyRound, LogIn, Mail, MessageSquareText, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import { localePath, routing } from "@/i18n/routing";
import { CONTACT_EMAIL, links } from "@/lib/links";
import { buttonStyles } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site.help" });
  return {
    title: `${t("metaTitle")} · eezzyflow`,
    description: t("metaDescription"),
    alternates: {
      canonical: localePath(locale, "hulp"),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l, "hulp")])),
        "x-default": localePath(routing.defaultLocale, "hulp"),
      },
    },
  };
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("site.help");
  const pricingFaq = await getTranslations("pricing.faq");

  const actions: { key: string; icon: LucideIcon; href: string; button: string; external?: boolean }[] = [
    { key: "reset", icon: KeyRound, href: links.forgotPassword, button: t("resetButton") },
    { key: "login", icon: LogIn, href: links.login, button: t("loginButton") },
    { key: "form", icon: MessageSquareText, href: links.support, button: t("formButton") },
    { key: "mail", icon: Mail, href: `mailto:${CONTACT_EMAIL}`, button: CONTACT_EMAIL },
  ];

  const problems = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: pricingFaq("a4") },
  ];

  return (
    <>
      <section className="bg-(image:--hero) px-[18px] pt-16 pb-14 sm:pt-24 sm:pb-20" aria-labelledby="help-title">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-bold tracking-[0.08em] text-hero-sub uppercase">{t("eyebrow")}</p>
          <h1
            id="help-title"
            className="max-w-3xl text-[clamp(38px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-hero-ink"
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(17px,1.6vw,20px)] leading-relaxed text-hero-sub">{t("intro")}</p>
        </div>
      </section>

      <section className="orbs overflow-x-clip px-[18px] py-16 sm:py-20">
        <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map(({ key, icon: Icon, href, button }) => (
            <li key={key} className="glass tilt-card flex flex-col rounded-[22px] p-6">
              <span className="pop-z mb-5 inline-flex size-11 items-center justify-center rounded-[12px] bg-highlight-soft text-highlight-chip-text">
                <Icon aria-hidden size={22} />
              </span>
              <h2 className="mb-2 text-[19px] leading-[1.2] font-bold tracking-[-0.02em]">{t(`${key}Title`)}</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-sub">{t(`${key}Body`)}</p>
              <a
                href={href}
                className={`mt-auto ${key === "reset" ? buttonStyles.primary : buttonStyles.secondary} w-full px-3 text-center text-[14.5px] ${key === "mail" ? "[overflow-wrap:anywhere]" : ""}`}
              >
                {button}
                {key !== "mail" && <ArrowUpRight aria-hidden size={16} className="shrink-0" />}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-[18px] pb-16 sm:pb-24" aria-labelledby="problems-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="problems-title" className="mb-8 text-[clamp(26px,3.4vw,38px)] leading-[1.1] font-extrabold tracking-[-0.03em]">
            {t("problemsTitle")}
          </h2>
          <div className="max-w-3xl divide-y divide-line border-y border-line">
            {problems.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-[16px] font-semibold">
                  {item.q}
                  <ChevronDown aria-hidden size={20} className="shrink-0 text-sub transition-transform duration-180 group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-[15px] leading-relaxed text-sub">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[18px] pb-20 sm:pb-28" aria-labelledby="legal-title">
        <div className="on-spotlight mx-auto grid max-w-6xl gap-8 rounded-[32px] bg-(image:--brand-spotlight) p-8 text-spotlight-ink sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 id="legal-title" className="mb-3 text-[clamp(26px,3.4vw,38px)] leading-[1.1] font-extrabold tracking-[-0.03em]">
              {t("legalTitle")}
            </h2>
            <p className="max-w-xl text-[16px] leading-relaxed text-spotlight-sub">{t("legalBody")}</p>
          </div>
          <ul className="grid gap-3">
            {[
              { href: links.privacy, label: t("privacy"), icon: ShieldCheck },
              { href: links.terms, label: t("terms"), icon: Scale },
            ].map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex min-h-14 items-center gap-3 rounded-[14px] border border-spotlight-ink/20 px-5 text-[16px] font-semibold hover:bg-spotlight-ink/10"
                >
                  <Icon aria-hidden size={20} />
                  <span className="flex-1">{label}</span>
                  <ArrowUpRight aria-hidden size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
