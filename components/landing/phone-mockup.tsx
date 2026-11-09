import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import frameBlue from "@/assets/iphone-frame.webp";
import frameOrange from "@/assets/iphone-frame-orange.webp";
import frameBurgundy from "@/assets/iphone-frame-burgundy.webp";
import { screensFor } from "@/lib/screens";
import { ScreenCycle } from "../screen-cycle";

// Where the screen sits inside the frame image (980 × 2000), in percent.
const SCREEN = { left: "5.2%", top: "2.25%", width: "89.6%", height: "95.5%" };

/** The iPhone with the app's screenshots for this language taking turns. */
export async function PhoneMockup({
  variant = "burgundy",
  className = "w-[290px] sm:w-[320px]",
  offset = 0,
}: {
  variant?: "blue" | "orange" | "burgundy";
  className?: string;
  /** Extra delay (ms) before the first change, so two devices don't switch together. */
  offset?: number;
}) {
  const s = await getTranslations("site.phone");
  const locale = await getLocale();
  const frame = { blue: frameBlue, orange: frameOrange, burgundy: frameBurgundy }[variant];

  return (
    <figure
      role="img"
      aria-label={s("label")}
      className={`relative aspect-[980/2000] shrink-0 [transform-style:preserve-3d] ${className} ${
        variant === "blue" ? "" : `phone-${variant}`
      }`}
    >
      {/* Shadow on the "desk", and the phone's body: stacked layers behind the
          frame give it real thickness when it turns. */}
      <span aria-hidden className="phone-floor" style={{ transform: "translateZ(-60px)" }} />
      <span aria-hidden className="phone-body">
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} style={{ transform: `translateZ(${-(i + 1)}px)` }} />
        ))}
      </span>
      <div aria-hidden className="absolute overflow-hidden rounded-[13%/6.4%] bg-paper" style={SCREEN}>
        <ScreenCycle srcs={screensFor(locale, "phone")} offset={offset} />
      </div>
      <Image src={frame} alt="" fill sizes="320px" priority className="pointer-events-none select-none" />
    </figure>
  );
}
