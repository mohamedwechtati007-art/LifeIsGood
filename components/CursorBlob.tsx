"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Halo lumineux qui suit le curseur (large écrans). Désactivé si motion réduite.
 */
export default function CursorBlob() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      setPos((p) => ({
        x: lerp(p.x, target.current.x, 0.09),
        y: lerp(p.y, target.current.y, 0.09),
      }));
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(() => setEnabled(true));
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[4] hidden lg:block"
      aria-hidden
    >
      <div
        className="absolute w-[min(45vw,380px)] h-[min(45vw,380px)] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-[0.12] blur-3xl"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(0,102,255,0.55) 0%, rgba(14,165,233,0.2) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
