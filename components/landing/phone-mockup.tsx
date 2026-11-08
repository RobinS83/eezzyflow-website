import type React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import frameBlue from "@/assets/iphone-frame.webp";
import frameOrange from "@/assets/iphone-frame-orange.webp";
import home from "@/assets/screens/home.webp";
import kalender from "@/assets/screens/kalender.webp";
import kosten from "@/assets/screens/kosten.webp";
import lijstjes from "@/assets/screens/lijstjes.webp";
import weekmenu from "@/assets/screens/weekmenu.webp";

// Real screenshots of the app (Home, Calendar, Costs, Lists, Week menu), taking
// turns inside the iPhone frame (assets/iphone-frame.webp, 980 × 2000, with a
// transparent screen). With reduced motion only the first one shows.
const SCREENS = [home, kalender, kosten, lijstjes, weekmenu];

// Where the screen sits inside the frame image, in percent of the frame.
const SCREEN = { left: "5.2%", top: "2.25%", width: "89.6%", height: "95.5%" };

/**
 * variant: the frame colour (same geometry, so both phones are the same size).
 * start: which screen this phone shows first, so two phones don't show the same.
 * shift: delay in seconds, so two phones don't change screens at the same moment.
 */
export async function PhoneMockup({
  variant = "blue",
  start = 0,
  shift = 0,
  decorative = false,
}: {
  variant?: "blue" | "orange";
  start?: number;
  shift?: number;
  decorative?: boolean;
}) {
  const s = await getTranslations("site.phone");
  const screens = [...SCREENS.slice(start), ...SCREENS.slice(0, start)];
  const frame = variant === "orange" ? frameOrange : frameBlue;

  return (
    <figure
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : s("label")}
      aria-hidden={decorative || undefined}
      className={`relative aspect-[980/2000] w-[290px] shrink-0 [transform-style:preserve-3d] sm:w-[320px] ${
        variant === "orange" ? "phone-orange" : ""
      }`}
    >
      {/* Shadow on the "desk", and the phone's body: stacked layers behind
          the frame give it real thickness when it turns. */}
      <span aria-hidden className="phone-floor" style={{ transform: "translateZ(-60px)" }} />
      <span aria-hidden className="phone-body">
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} style={{ transform: `translateZ(${-(i + 1)}px)` }} />
        ))}
      </span>

      <div aria-hidden className="absolute overflow-hidden rounded-[13%/6.4%] bg-paper" style={SCREEN}>
        {screens.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            fill
            sizes="320px"
            priority={i === 0 && !decorative}
            className="screen-slide object-cover object-top"
            style={{ "--i": i, "--n": screens.length, "--shift": `${shift}s` } as React.CSSProperties}
          />
        ))}
      </div>

      <Image src={frame} alt="" fill sizes="320px" priority className="pointer-events-none select-none" />
    </figure>
  );
}
