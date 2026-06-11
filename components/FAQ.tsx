"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
type FaqItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f0f7ff 50%, #ffffff 100%)",
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--ink-soft)] text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="glass-frost rounded-2xl border border-white/70 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-[var(--ink)] font-montserrat font-bold">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--blue-deep)] shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p className="px-5 pb-5 text-[var(--ink-soft)] leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href={{ pathname: "/", hash: "devis" }}
            className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-amber-500/25 hover:brightness-110 transition-all"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
