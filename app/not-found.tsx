import { Inter } from "next/font/google";
import { defaultLocale } from "@/i18n/routing";
import { NotFoundContent } from "@/components/not-found-content";
import { Wordmark } from "@/components/wordmark";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Site-wide 404 (becomes out/404.html). Shown in Dutch, the default language.
export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale} className={inter.variable} suppressHydrationWarning translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <header className="border-b border-line px-[18px]">
          <div className="mx-auto flex h-[68px] max-w-6xl items-center">
            {/* A full page load on purpose: the static export has no client route for "/". */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="rounded-[8px]">
              <Wordmark />
            </a>
          </div>
        </header>
        <main>
          <NotFoundContent locale={defaultLocale} />
        </main>
      </body>
    </html>
  );
}
