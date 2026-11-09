"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tilts its content in 3D towards the pointer (desktop only). Writes two CSS
 * variables, --tilt-x and --tilt-y, which .tilt-body in globals.css turns into
 * a rotation. Nothing happens for touch screens or with reduced motion.
 */
export function Tilt3D({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        el.style.setProperty("--tilt-y", `${(x * 8).toFixed(2)}deg`);
        el.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt-body ${className}`}>
      {children}
    </div>
  );
}
