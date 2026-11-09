"use client";

import { useEffect, useState } from "react";

const SHOW_MS = 7000;
/** How long before the switch the pointer appears, and when it clicks. */
const AIM_BEFORE_MS = 1600;
const PRESS_BEFORE_MS = 380;

type Target = { match: string; x: number; y: number };
// The MacBook clicks the item in the app's sidebar (desktop screenshots, shown from the top left).
const MOUSE_TARGETS: Target[] = [
  { match: "01-home", x: 6, y: 10.7 },
  { match: "02-kalender", x: 6, y: 15.6 },
  { match: "03-kosten", x: 6, y: 20.4 },
  { match: "04-lijstjes", x: 6, y: 25.3 },
  { match: "05-berichten", x: 6, y: 30.2 },
];
// The iPhone taps the tab bar at the bottom of the app.
const TOUCH_TARGETS: Target[] = [
  { match: "01-home", x: 7, y: 95.5 },
  { match: "02-kalender", x: 24, y: 95.5 },
  { match: "03-kosten", x: 41, y: 95.5 },
  { match: "04-lijstjes", x: 58, y: 95.5 },
  { match: "05-berichten", x: 75, y: 95.5 },
];
const IDLE = { x: 55, y: 62 };

/** "01-home_wijn_licht" from ".../eezzyflow_nl_gsm_01-home_wijn_licht.webp": the same view on any device. */
const viewOf = (src: string) => src.match(/_(?:gsm|desktop|phone)_(.+)\.[a-z]+$/)?.[1] ?? src;

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- One shared clock, so the MacBook and iPhone always show the same view ---------- */

type Phase = { step: number; order: string[]; aim: string | null; press: boolean; actor: "mouse" | "touch" };
const listeners = new Set<(p: Phase) => void>();
let phase: Phase | null = null;
let running = false;

function emit(next: Partial<Phase>) {
  phase = { ...(phase as Phase), ...next };
  listeners.forEach((l) => l(phase as Phase));
}

function start(views: string[]) {
  if (running) return;
  running = true;
  phase = { step: 0, order: shuffle(views), aim: null, press: false, actor: "mouse" };
  listeners.forEach((l) => l(phase as Phase));
  const loop = () => {
    const p = phase as Phase;
    const upcoming = p.order[(p.step + 1) % p.order.length];
    // Turns: the MacBook clicks, then the iPhone taps, and so on.
    const actor = p.step % 2 === 0 ? "mouse" : "touch";
    setTimeout(() => emit({ aim: upcoming, actor }), SHOW_MS - AIM_BEFORE_MS);
    setTimeout(() => emit({ press: true }), SHOW_MS - PRESS_BEFORE_MS);
    setTimeout(() => emit({ press: false }), SHOW_MS - PRESS_BEFORE_MS + 220);
    setTimeout(() => {
      emit({ step: (phase as Phase).step + 1 });
      setTimeout(() => emit({ aim: null }), 500);
      loop();
    }, SHOW_MS);
  };
  loop();
}

/**
 * Shows app screenshots one at a time, in a random order shared by every
 * device on the page: the MacBook and iPhone always show the same screen in
 * the same colours. Before each switch either the mouse pointer clicks on the
 * MacBook or a glowing tap appears on the iPhone. Reduced motion: the first
 * screenshot simply stays.
 */
export function ScreenCycle({
  srcs,
  kind,
  position = "object-top",
  zoom = 1,
}: {
  srcs: string[];
  /** Which device this is: decides the pointer (mouse) or the tap (touch). */
  kind: "mouse" | "touch";
  position?: string;
  /** Show the screenshot larger than the screen (cropped right and bottom), so its text is readable. */
  zoom?: number;
}) {
  const [p, setP] = useState<Phase | null>(null);

  useEffect(() => {
    if (srcs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = (next: Phase) => setP(next);
    listeners.add(l);
    if (phase) l(phase);
    start(srcs.map(viewOf));
    return () => {
      listeners.delete(l);
    };
  }, [srcs]);

  const byView = new Map(srcs.map((s) => [viewOf(s), s]));
  const order = p ? p.order.map((v) => byView.get(v)).filter((s): s is string => !!s) : srcs;
  if (order.length === 0) return null;
  const current = p ? p.step % order.length : 0;
  const next = (current + 1) % order.length;

  const mine = p && p.aim && p.actor === kind;
  const targets = kind === "touch" ? TOUCH_TARGETS : MOUSE_TARGETS;
  const t = mine ? targets.find((x) => p!.aim!.includes(x.match)) : undefined;
  const pos = t ? { x: t.x * zoom, y: t.y * zoom } : IDLE;
  const pressing = !!(mine && p!.press);

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
            fetchPriority={i === current && !p ? "high" : "low"}
            style={zoom !== 1 ? { width: `${zoom * 100}%`, height: `${zoom * 100}%` } : undefined}
            className={`absolute top-0 left-0 size-full object-cover ${position} transition-opacity duration-700 ease-(--ease-natural) ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null,
      )}

      {kind === "touch" && p && (
        // A finger tap: a soft glowing dot on the next tab, pulsing as it taps.
        <span className="pointer-events-none absolute z-10 -translate-1/2" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
          <span
            className={`block size-[clamp(18px,3.4vw,30px)] rounded-full bg-white/70 shadow-[0_0_18px_6px_rgb(255_255_255/0.55)] ring-2 ring-highlight/70 transition-[opacity,scale] duration-300 ${
              pressing ? "scale-90 opacity-100" : mine ? "scale-100 opacity-85" : "scale-50 opacity-0"
            }`}
          />
          <span
            className={`absolute inset-0 rounded-full border-2 border-highlight transition-[opacity,scale] duration-500 ${
              pressing ? "scale-[2.2] opacity-0" : "scale-100 opacity-0"
            }`}
          />
        </span>
      )}

      {kind === "mouse" && p && (
        <span
          className="pointer-events-none absolute z-10 transition-[left,top] duration-[1100ms] ease-(--ease-natural)"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        >
          <span
            className={`absolute -top-3 -left-3 size-6 rounded-full border-2 border-highlight transition-[opacity,scale] duration-500 ${
              pressing ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
          <svg
            viewBox="0 0 24 24"
            className={`relative block w-[clamp(12px,1.6vw,22px)] drop-shadow-[0_2px_3px_rgb(0_0_0/0.35)] transition-transform duration-150 ${
              pressing ? "scale-[0.82]" : "scale-100"
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
