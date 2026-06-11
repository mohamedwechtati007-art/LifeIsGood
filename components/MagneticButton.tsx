"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MAX = 8;

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Effet « magnétique » au survol (desktop). Sur mobile, pas d'effet (touch).
 */
export default function MagneticButton({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [off, setOff] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = ((e.clientX - cx) / rect.width) * MAX * 2;
    let dy = ((e.clientY - cy) / rect.height) * MAX * 2;
    dx = Math.max(-MAX, Math.min(MAX, dx));
    dy = Math.max(-MAX, Math.min(MAX, dy));
    setOff({ x: dx, y: dy });
  };

  const reset = () => setOff({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      <motion.div
        animate={{ x: off.x, y: off.y }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="md:will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
