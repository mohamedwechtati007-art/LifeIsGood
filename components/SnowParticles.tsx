"use client";

import { useMemo } from "react";

/** Flocons CSS uniquement — desktop (md+) pour économiser la batterie mobile */
export default function SnowParticles() {
  const flakes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 7.3) % 100}%`,
      size: 2 + (i % 4),
      duration: 8 + (i % 12),
      delay: (i * 0.4) % 6,
    }));
  }, []);

  return (
    <div
      className="hidden md:block pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {flakes.map((f) => (
        <div
          key={f.id}
          className="snowflake"
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: 0.45,
          }}
        />
      ))}
    </div>
  );
}
