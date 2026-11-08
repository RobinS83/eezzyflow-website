"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { THEME_KEY, type ThemeChoice } from "@/lib/theme";

const ORDER: ThemeChoice[] = ["auto", "light", "dark"];

function apply(choice: ThemeChoice) {
  const dark = choice === "dark" || (choice === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

/** One button that cycles through automatic, light and dark. */
export function ThemeToggle({ labels }: { labels: Record<ThemeChoice | "label", string> }) {
  const [choice, setChoice] = useState<ThemeChoice>("auto");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {}
    // Reading the browser's stored choice once on mount is exactly what this effect is for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "light" || stored === "dark") setChoice(stored);
  }, []);

  useEffect(() => {
    if (choice !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("auto");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [choice]);

  const next = () => {
    const n = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length];
    setChoice(n);
    try {
      if (n === "auto") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, n);
    } catch {}
    apply(n);
  };

  const Icon = choice === "dark" ? Moon : choice === "light" ? Sun : Monitor;
  return (
    <button
      type="button"
      onClick={next}
      title={`${labels.label}: ${labels[choice]}`}
      className="inline-flex size-11 items-center justify-center rounded-[11px] text-sub hover:bg-primary-soft hover:text-ink"
    >
      <Icon aria-hidden size={18} />
      <span className="sr-only">{`${labels.label}: ${labels[choice]}`}</span>
    </button>
  );
}
