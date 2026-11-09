"use client";

import { useEffect, useState } from "react";

const SHOW_MS = 7000;

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
 * With reduced motion the first one simply stays.
 */
export function ScreenCycle({ srcs, offset = 0 }: { srcs: string[]; offset?: number }) {
  const [order, setOrder] = useState(srcs);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (srcs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A fresh random order per visit; done after mount so the first paint matches the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(shuffle(srcs));
    let timer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setIndex((i) => i + 1);
      timer = setInterval(() => setIndex((i) => i + 1), SHOW_MS);
    }, SHOW_MS + offset);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [srcs, offset]);

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
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-1000 ease-(--ease-natural) ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null,
      )}
    </>
  );
}
