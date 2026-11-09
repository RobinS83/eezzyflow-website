"use client";

import { useEffect, useState } from "react";

const SHOW_MS = 7000;
/** How long before the switch the pointer starts moving, and when it clicks. */
const MOVE_BEFORE_MS = 1600;
const CLICK_BEFORE_MS = 380;

// Where the pointer goes to "click" the next screen, in percent of the screen.
// Roughly the app's navigation; adjust once the desktop screenshots are in.
const TARGETS = [
  { x: 9, y: 24 },
  { x: 9, y: 33 },
  { x: 9, y: 42 },
  { x: 9, y: 51 },
  { x: 9, y: 60 },
  { x: 62, y: 18 },
  { x: 78, y: 18 },
];

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Shows app screenshots one at a time, in a random order, each for 7 seconds
 * with a soft cross-fade. Only the current and the next image are in the page.
 * With `pointer`, a mouse pointer moves to a spot and clicks just before each
 * switch, as if someone clicks through the app. Reduced motion: the first
 * screenshot simply stays.
 */
export function ScreenCycle({ srcs, offset = 0, pointer = false }: { srcs: string[]; offset?: number; pointer?: boolean }) {
  const [order, setOrder] = useState(srcs);
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState({ x: 55, y: 62 });
  const [clicking, setClicking] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (srcs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A fresh random order per visit; done after mount so the first paint matches the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(shuffle(srcs));
    setActive(true);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    let last = -1;

    const cycle = (startIn: number) => {
      if (pointer) {
        later(startIn - MOVE_BEFORE_MS, () => {
          let t = Math.floor(Math.random() * TARGETS.length);
          if (t === last) t = (t + 1) % TARGETS.length;
          last = t;
          setPos(TARGETS[t]);
        });
        later(startIn - CLICK_BEFORE_MS, () => setClicking(true));
        later(startIn - CLICK_BEFORE_MS + 220, () => setClicking(false));
      }
      later(startIn, () => {
        setIndex((i) => i + 1);
        cycle(SHOW_MS);
      });
    };
    cycle(SHOW_MS + offset);
    return () => timers.forEach(clearTimeout);
  }, [srcs, offset, pointer]);

  if (order.length === 0) return null;
  const current = index % order.length;
  const next = (index + 1) % order.length;

  return (
    <>
      {order.map((src, i) =>
        i === current || i === next ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            decoding="async"
            fetchPriority={i === current && index === 0 ? "high" : "low"}
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ease-(--ease-natural) ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null,
      )}
      {pointer && active && (
        <span
          className="pointer-events-none absolute z-10 transition-[left,top] duration-[1100ms] ease-(--ease-natural)"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        >
          {/* Click ripple */}
          <span
            className={`absolute -top-3 -left-3 size-6 rounded-full border-2 border-highlight transition-[opacity,scale] duration-500 ${
              clicking ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
          {/* The pointer itself: a classic arrow, black with a white edge on any screen. */}
          <svg
            viewBox="0 0 24 24"
            className={`relative block w-[clamp(12px,1.6vw,22px)] drop-shadow-[0_2px_3px_rgb(0_0_0/0.35)] transition-transform duration-150 ${
              clicking ? "scale-[0.82]" : "scale-100"
            }`}
            style={{ transformOrigin: "2px 2px" }}
          >
            <path d="M3 2 L3 19 L7.6 14.8 L10.6 21.4 L13.4 20.2 L10.5 13.8 L16.8 13.8 Z" fill="black" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );
}
