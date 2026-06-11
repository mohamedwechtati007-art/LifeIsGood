"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { sitePics } from "@/lib/site-pics";

const frameClass =
  "relative w-full aspect-[16/10] min-h-[160px] max-h-[min(38vh,360px)] rounded-2xl overflow-hidden shadow-[0_16px_48px_-12px_rgba(10,24,40,0.15)] ring-1 ring-white/60";

export default function HeroPics() {
  const [index, setIndex] = useState(0);
  const count = sitePics.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5000);
    return () => window.clearInterval(id);
  }, [count]);

  if (count === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className={`${frameClass} glass-frost border border-white/70 flex flex-col items-center justify-center gap-3 text-[var(--ink-soft)]`}
      >
        <ImageIcon className="w-12 h-12 opacity-40" strokeWidth={1.25} />
        <p className="text-sm font-medium text-center px-6">
          Ajoutez vos photos dans{" "}
          <code className="text-[var(--blue-deep)] bg-sky-50 px-1.5 py-0.5 rounded">
            public/pics/
          </code>{" "}
          puis listez-les dans{" "}
          <code className="text-[var(--blue-deep)] bg-sky-50 px-1.5 py-0.5 rounded">
            lib/site-pics.ts
          </code>
        </p>
      </motion.div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.18 }}
      className={frameClass}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={sitePics[index]}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        >
          <Image
            src={`/pics/${sitePics[index]}`}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-frost border border-white/80 flex items-center justify-center text-[var(--ink)] hover:bg-white/90 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-frost border border-white/80 flex items-center justify-center text-[var(--ink)] hover:bg-white/90 transition-colors shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {sitePics.map((file, i) => (
              <button
                key={file}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
