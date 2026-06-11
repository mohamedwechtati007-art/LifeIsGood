"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ClipboardList,
  CheckCircle,
  CloudSnow,
  Truck,
  ThumbsUp,
} from "lucide-react";

const stepIcons = [ClipboardList, CheckCircle, CloudSnow, Truck, ThumbsUp];

function StepTrack({
  step,
  index,
  onActive,
}: {
  step: { title: string; desc: string };
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.35,
    margin: "-12% 0px -12% 0px",
  });

  useEffect(() => {
    if (isInView) onActive(index);
  }, [isInView, index, onActive]);

  return (
    <div
      ref={ref}
      className="min-h-[52vh] lg:min-h-[70vh] flex items-center py-8 lg:py-16"
    >
      <motion.div
        initial={{ opacity: 0.35, y: 24 }}
        animate={{
          opacity: isInView ? 1 : 0.4,
          y: isInView ? 0 : 16,
          scale: isInView ? 1 : 0.98,
        }}
        transition={{ duration: 0.35 }}
        className="w-full glass-frost rounded-3xl border border-white/70 p-8 md:p-10 shadow-xl shadow-sky-900/5"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--blue-deep)] to-sky-400 flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
            {(() => {
              const Icon = stepIcons[index];
              return <Icon className="w-6 h-6 text-white" />;
            })()}
          </div>
          <div>
            <span className="text-[var(--blue-deep)] text-xs font-bold tracking-wide">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl md:text-2xl font-montserrat font-bold text-[var(--ink)] mt-1 mb-3">
              {step.title}
            </h3>
            <p className="text-[var(--ink-soft)] leading-relaxed text-base">
              {step.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const t = useTranslations("timeline");
  const steps = t.raw("steps") as Array<{ title: string; desc: string }>;
  const [active, setActive] = useState(0);

  const setActiveStable = useCallback((i: number) => {
    setActive(i);
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f0f7ff 35%, #ffffff 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--ink-soft)] text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* Mobile : timeline verticale compacte */}
        <div className="lg:hidden flex flex-col gap-0 mb-10">
          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--blue-deep)] to-sky-400 flex items-center justify-center shadow-md shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-sky-300 to-transparent min-h-[48px] my-1" />
                  )}
                </div>
                <div className="pb-8 pt-0.5">
                  <span className="text-[var(--blue-deep)] text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[var(--ink)] font-montserrat font-bold text-base mt-0.5 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop : rail sticky + storytelling scroll */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(220px,280px)_1fr] gap-12 lg:gap-16 items-start">
          <div className="sticky top-28 space-y-4">
            <div className="glass-frost rounded-3xl border border-white/70 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] mb-4">
                {t("progressRail")}
              </p>
              <ul className="space-y-3">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-300 ${
                      active === i
                        ? "bg-white/90 shadow-md border border-sky-200/80"
                        : "opacity-55 border border-transparent"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        active === i
                          ? "bg-gradient-to-br from-[var(--blue-deep)] to-sky-400 text-white"
                          : "bg-sky-100 text-[var(--ink-soft)]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-sm font-semibold leading-snug ${
                        active === i ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
          </div>

          <div>
            {steps.map((step, i) => (
              <StepTrack key={i} step={step} index={i} onActive={setActiveStable} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] text-white font-bold text-base sm:text-lg px-10 py-4 rounded-full shadow-xl shadow-sky-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            {t("cta")} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
