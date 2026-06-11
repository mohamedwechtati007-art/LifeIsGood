"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function Services3D() {
  const t = useTranslations("services");
  const features = t.raw("features") as string[];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,247,255,0) 0%, rgba(224,242,254,0.5) 40%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--ink-soft)] text-lg">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-frost rounded-3xl border border-white/70 shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-sky-600 p-8 sm:p-10 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/40 shrink-0">
              <Building2 className="w-8 h-8 text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-2xl text-white mb-2">
                {t("commercial.title")}
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                {t("commercial.desc")}
              </p>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white/60">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-[var(--ink)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-sky-500/25 hover:brightness-110 transition-all"
            >
              {t("cta")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
