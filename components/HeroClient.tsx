"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Phone, ChevronDown, FileText } from "lucide-react";
import { siteContact } from "@/lib/contact";
import { picSrc, sitePics } from "@/lib/site-pics";

type StatItem = { value: string; label: string };

export default function HeroClient() {
  const t = useTranslations("specialOfferHero");
  const stats = t.raw("stats") as StatItem[];
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (sitePics.length <= 1) return;
    const id = setInterval(
      () => setImgIndex((i) => (i + 1) % sitePics.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {sitePics.length > 1 && (
        <div className="absolute inset-0 -z-[19] pointer-events-none">
          <AnimatePresence mode="sync">
            {imgIndex !== 0 && (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={picSrc(sitePics[imgIndex])}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
      <div className="absolute top-0 left-0 right-0 h-32 -z-10 bg-gradient-to-b from-black/40 to-transparent" />

      <div className="h-20 md:h-24 shrink-0" />

      <div className="relative flex flex-col flex-1 justify-end pb-14 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 bg-amber-500 text-white rounded-full px-4 py-1.5 text-sm font-bold shadow-lg shadow-amber-900/30">
            <Sparkles className="w-4 h-4" />
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-white font-montserrat font-black leading-[1.05] mb-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl"
        >
          {t("titleLine1")}{" "}
          <span className="text-amber-400">{t("titleLine2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-white/80 text-base sm:text-lg max-w-xl mb-6 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex gap-3 mb-8 flex-col sm:flex-row"
        >
          <a
            href="#devis"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] hover:brightness-110 text-white font-bold text-base px-7 py-4 rounded-full shadow-xl shadow-sky-900/40 active:scale-[0.98] transition-all sm:w-auto"
          >
            <FileText className="w-5 h-5 shrink-0" />
            {t("ctaQuote")}
          </a>
          <a
            href={siteContact.phoneHref}
            className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-semibold text-base px-7 py-4 rounded-full border border-white/30 active:scale-[0.98] transition-all sm:w-auto"
          >
            <Phone className="w-5 h-5 shrink-0" />
            {t("ctaCall")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.34 }}
          className="flex items-center gap-4 sm:gap-6 flex-wrap"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-white font-montserrat font-black text-xl sm:text-2xl">
                  {stat.value}
                </div>
                <div className="text-white/60 text-[11px] sm:text-xs leading-tight mt-0.5">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="h-8 w-px bg-white/25 shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {sitePics.length > 1 && (
        <div className="absolute bottom-6 right-6 flex gap-1.5 z-10">
          {sitePics.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImgIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className={`rounded-full transition-all ${
                i === imgIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </>
  );
}
