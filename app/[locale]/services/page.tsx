import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Building2, CheckCircle } from "lucide-react";
import { buildSiteMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildSiteMetadata(locale, "services");
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const tBanner = await getTranslations("servicesPage");
  const features = t.raw("features") as string[];

  return (
    <div className="pt-20 md:pt-24">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-semibold text-sm sm:text-base">{tBanner("offerBanner")}</p>
          <Link
            href="/contact"
            className="shrink-0 bg-white text-amber-700 font-bold text-sm px-5 py-2 rounded-full hover:bg-amber-50 transition-colors"
          >
            {tBanner("offerCta")}
          </Link>
        </div>
      </div>

      <div className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f0f7ff 50%, #ffffff 100%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(186,230,253,0.5), transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h1>
          <p className="text-[var(--ink-soft)] text-xl">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass-frost rounded-3xl overflow-hidden border border-white/70 shadow-xl">
          <div className="bg-gradient-to-br from-indigo-500 to-sky-600 p-8 sm:p-10">
            <div className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/40 mb-5">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-white mb-3">
              {t("commercial.title")}
            </h2>
            <p className="text-white/90 leading-relaxed">{t("commercial.desc")}</p>
          </div>
          <div className="p-6 sm:p-8 bg-white/50">
            <ul className="space-y-3 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-[var(--ink)]">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] hover:brightness-110 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl shadow-sky-500/25 transition-all"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
