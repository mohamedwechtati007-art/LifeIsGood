"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { picCaptionKey, picSrc, sitePics } from "@/lib/site-pics";

export default function GalerieClient() {
  const t = useTranslations("gallery");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div className="pt-20 md:pt-24" layout>
      <motion.div className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f0f7ff 50%, #ffffff 100%), radial-gradient(ellipse 80% 40% at 50% 0%, rgba(186,230,253,0.5), transparent 55%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h1>
          <p className="text-[var(--ink-soft)] text-xl">{t("subtitle")}</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitePics.map((file) => (
            <motion.button
              key={file}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(file)}
              className="cursor-pointer group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow text-left w-full"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={picSrc(file)}
                alt={t(`captions.${picCaptionKey(file)}`)}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all flex items-end p-4">
                <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                  {t(`captions.${picCaptionKey(file)}`)}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={picSrc(selected)}
                alt={t(`captions.${picCaptionKey(selected)}`)}
                fill
                className="object-contain bg-black"
                sizes="100vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/55 backdrop-blur-sm p-4">
                <p className="text-white font-semibold">{t(`captions.${picCaptionKey(selected)}`)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label={t("close")}
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
