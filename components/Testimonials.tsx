"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const glassCard =
  "glass-frost rounded-2xl md:rounded-3xl p-6 md:p-8 relative border border-white/70 shadow-xl shadow-sky-900/5";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    name: string;
    location: string;
    rating: number;
    text: string;
  }>;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(224,242,254,0.75), transparent 55%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--ink-soft)] text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="hidden md:grid grid-cols-2 gap-6">
          {items.slice(0, 4).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={glassCard}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[var(--blue-deep)]/15" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-[var(--ink-soft)] text-base leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--blue-deep)] to-sky-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[var(--ink)] text-sm">{item.name}</div>
                  <div className="text-[var(--ink-soft)] text-xs">{item.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.28 }}
                className={glassCard}
              >
                <Quote className="w-8 h-8 text-[var(--blue-deep)]/15 mb-3" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: items[current].rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--ink-soft)] text-base leading-relaxed mb-6 italic">
                  &ldquo;{items[current].text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--blue-deep)] to-sky-400 flex items-center justify-center text-white font-bold text-sm">
                    {items[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--ink)] text-sm">
                      {items[current].name}
                    </div>
                    <div className="text-[var(--ink-soft)] text-xs">{items[current].location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              className="w-11 h-11 rounded-full glass-frost border border-white/70 flex items-center justify-center hover:bg-white/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--ink)]" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "bg-[var(--blue-deep)] w-7" : "bg-sky-200 w-2"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-11 h-11 rounded-full glass-frost border border-white/70 flex items-center justify-center hover:bg-white/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[var(--ink)]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
