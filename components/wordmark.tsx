import Image from "next/image";
import icon from "@/brand/merkpakket-champagne/web/icon-192.png";

export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const iconSize = size === "lg" ? 36 : 30;
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src={icon} alt="" width={iconSize} height={iconSize} className="rounded-[8px]" priority />
      <span
        translate="no"
        className={`${size === "lg" ? "text-[26px]" : "text-[22px]"} leading-none font-extrabold tracking-[-0.03em]`}
      >
        <span className="text-brand-wordmark">eezzy</span>
        <span className="text-brand-wordmark-accent">flow</span>
      </span>
    </span>
  );
}
