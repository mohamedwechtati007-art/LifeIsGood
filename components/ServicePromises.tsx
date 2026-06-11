"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Headphones, Bell } from "lucide-react";

const icons = [Clock, Headphones, Bell];

type PromiseItem = { title: string; desc: string };

export default function ServicePromises() {
  const t = useTranslations("promises");
  const items = t.raw("items") as PromiseItem[];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-[var(--bg-soft)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--ink-soft)] text-lg">{t("subtitle")}</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = icons[index] ?? Clock;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-frost rounded-3xl p-6 sm:p-8 border border-white/70 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-white border border-white/80 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[var(--blue-deep)]" strokeWidth={1.75} />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-[var(--ink)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
