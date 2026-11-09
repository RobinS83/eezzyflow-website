import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import frame from "@/assets/macbook-frame.webp";
import { screensFor } from "@/lib/screens";
import { ScreenCycle } from "../screen-cycle";

// Where the display sits inside the frame image (2000 × 1299), in percent.
const SCREEN = { left: "9.35%", top: "9.55%", width: "81.25%", height: "80.9%" };

/** The MacBook with the app's desktop screenshots for this language taking turns. */
export async function LaptopMockup({ className = "" }: { className?: string }) {
  const s = await getTranslations("site.desktop");
  const locale = await getLocale();
  const srcs = screensFor(locale, "desktop");

  return (
    <figure role="img" aria-label={s("label")} className={`relative aspect-[2000/1299] ${className}`}>
      <span aria-hidden className="laptop-floor" />
      <div aria-hidden className="absolute overflow-hidden rounded-[0.6%/0.9%] bg-paper" style={SCREEN}>
        <ScreenCycle srcs={srcs} kind="mouse" position="object-left-top" />
      </div>
      <Image src={frame} alt="" fill sizes="(min-width: 1024px) 720px, 100vw" priority className="pointer-events-none select-none" />
    </figure>
  );
}
