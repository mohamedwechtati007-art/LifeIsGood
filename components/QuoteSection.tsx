import { getTranslations } from "next-intl/server";
import QuoteForm from "./QuoteForm";

export default async function QuoteSection() {
  const t = await getTranslations("quote");

  return (
    <section id="devis" className="relative py-20 md:py-28 overflow-hidden scroll-mt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f0f7ff 45%, #ffffff 100%)",
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-[var(--ink)] mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--ink-soft)] text-lg">{t("subtitle")}</p>
        </div>
        <div className="glass-frost rounded-3xl border border-white/70 p-6 sm:p-10 shadow-2xl shadow-sky-900/10">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
