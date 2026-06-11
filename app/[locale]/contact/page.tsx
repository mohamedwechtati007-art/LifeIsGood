import { getTranslations } from "next-intl/server";
import QuoteForm from "@/components/QuoteForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteContact } from "@/lib/contact";
import { buildSiteMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildSiteMetadata(locale, "contact");
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const info = [
    { icon: Phone, label: t("phone"), value: siteContact.phoneDisplay, href: siteContact.phoneHref },
    { icon: Mail, label: t("email"), value: siteContact.email, href: siteContact.emailHref },
    { icon: MapPin, label: t("address"), value: siteContact.serviceArea, href: null },
    { icon: Clock, label: t("hours"), value: t("hoursValue"), href: null },
  ];

  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f0f7ff 55%, #ffffff 100%), radial-gradient(ellipse 70% 50% at 50% 0%, rgba(186,230,253,0.45), transparent 55%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h1>
          <p className="text-[var(--ink-soft)] text-xl">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: info + map */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {info.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="glass-frost rounded-2xl p-6 border border-white/70 shadow-lg"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-white rounded-xl flex items-center justify-center mb-3 border border-white/80">
                    <Icon className="w-5 h-5 text-[var(--blue-deep)]" />
                  </div>
                  <div className="text-xs text-[var(--ink-soft)] uppercase tracking-wide mb-1">{label}</div>
                  {href ? (
                    <a href={href} className="text-[var(--ink)] font-semibold text-sm hover:text-[var(--blue-deep)] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-[var(--ink)] font-semibold text-sm">{value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/70 glass-frost" style={{ height: "280px" }}>
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
          </div>

          {/* Right: form */}
          <div className="glass-frost rounded-3xl p-6 sm:p-10 border border-white/70 shadow-xl">
            <h2 className="font-montserrat font-bold text-2xl text-[var(--ink)] mb-8">
              {t("formTitle")}
            </h2>
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
