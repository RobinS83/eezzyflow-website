"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonStyles } from "./ui";

type Props = {
  items: { href: string; label: string }[];
  labels: { menu: string; close: string; main: string; login: string; start: string };
  loginHref: string;
  startHref: string;
};

export function MobileMenu({ items, labels, loginHref, startHref }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-[11px] border border-line bg-surface text-ink"
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        <span className="sr-only">{open ? labels.close : labels.menu}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="glass absolute inset-x-0 top-[68px] rounded-b-[22px] px-[18px] pt-2 pb-6"
      >
        <nav aria-label={labels.main}>
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line text-[17px] font-semibold text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a href={loginHref} className={buttonStyles.secondary}>
            {labels.login}
          </a>
          <a href={startHref} className={buttonStyles.primary}>
            {labels.start}
          </a>
        </div>
      </div>
    </div>
  );
}
