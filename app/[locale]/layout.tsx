import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localePath, routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/links";
import { brand } from "@/lib/brand";
import { themeScript } from "@/lib/theme";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TiltCards } from "@/components/tilt-cards";
import { Motion } from "@/components/motion";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const pathFor = localePath;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = await getTranslations({ locale, namespace: "meta" });
  const site = await getTranslations({ locale, namespace: "site.meta" });
  const title = meta("tagline");
  const description = site("description");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: "eezzyflow",
    alternates: {
      canonical: pathFor(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, pathFor(l)])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: "eezzyflow",
      title,
      description,
      locale,
      url: pathFor(locale),
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "eezzyflow" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image.png"] },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brand.paperLight },
    { media: "(prefers-color-scheme: dark)", color: brand.paperDark },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("site.nav");

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded-[11px] bg-surface px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t("skip")}
        </a>
        <div aria-hidden className="progress-bar" />
        <NextIntlClientProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <TiltCards />
          <Motion />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
