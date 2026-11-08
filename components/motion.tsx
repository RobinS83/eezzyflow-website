"use client";

import { useEffect } from "react";

/**
 * Scroll motion for every browser (Safari on iPhone included):
 * - .reveal, .curtain and .pop get .in-view when they enter the screen
 * - --progress on <html>: how far you are on the page (progress bar)
 * - --hero-p on the hero: how far it has scrolled away
 * - --p on .light-words: how far the core line has been read
 * Nothing runs with reduced motion; the page is then simply still.
 */
export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("js-motion");

    // Stagger siblings in the same list, so cards arrive one after another.
    const targets = [...document.querySelectorAll<HTMLElement>(".reveal, .curtain, .pop")];
    for (const el of targets) {
      const parent = el.parentElement;
      if (!parent) continue;
      const siblings = [...parent.children].filter((c) => c.matches(".reveal, .pop"));
      const i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty("--stagger", String(Math.min(i, 8)));
    }
    // A clipped element (the curtain) has no visible area to observe, so we
    // watch its parent instead and switch the element itself.
    const watched = new Map<Element, HTMLElement[]>();
    for (const el of targets) {
      const key = el.classList.contains("curtain") && el.parentElement ? el.parentElement : el;
      watched.set(key, [...(watched.get(key) ?? []), el]);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            watched.get(e.target)?.forEach((el) => el.classList.add("in-view"));
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    watched.forEach((_, key) => io.observe(key));

    const hero = document.querySelector<HTMLElement>(".hero-scroll");
    const words = [...document.querySelectorAll<HTMLElement>(".light-words")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
      if (hero) {
        const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.9)));
        hero.style.setProperty("--hero-p", p.toFixed(3));
      }
      for (const el of words) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55)));
        el.style.setProperty("--p", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("js-motion");
    };
  }, []);

  return null;
}
