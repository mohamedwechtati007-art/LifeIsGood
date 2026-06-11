"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteContact } from "@/lib/contact";

export default function MapSection() {
  const t = useTranslations("contact");
  const tLoc = useTranslations("location");

  const info = [
    {
      icon: Phone,
      label: t("phone"),
      value: siteContact.phoneDisplay,
      href: siteContact.phoneHref,
    },
    {
      icon: Mail,
      label: t("email"),
      value: siteContact.email,
      href: siteContact.emailHref,
    },
    {
      icon: MapPin,
      label: t("address"),
      value: siteContact.serviceArea,
      href: "#map",
    },
    {
      icon: Clock,
      label: t("hours"),
      value: t("hoursValue"),
      href: null,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--blue-deep)] mb-2">
            {tLoc("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-[var(--ink)] mb-4">
            {tLoc("title")}
          </h2>
          <p className="text-[var(--ink-soft)] text-lg">{tLoc("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {info.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-frost rounded-2xl p-6 border border-white/70 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-white flex items-center justify-center mb-4 border border-white/80">
                  <Icon className="w-5 h-5 text-[var(--blue-deep)]" />
                </div>
                <div className="text-xs text-[var(--ink-soft)] font-medium uppercase tracking-wide mb-1">
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    className="text-[var(--ink)] font-semibold text-sm hover:text-[var(--blue-deep)] transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-[var(--ink)] font-semibold text-sm">{value}</p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            id="map"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/70 glass-frost"
          >
            <div className="h-[250px] md:h-[420px] lg:h-[450px]">
              <iframe
                src={siteContact.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
