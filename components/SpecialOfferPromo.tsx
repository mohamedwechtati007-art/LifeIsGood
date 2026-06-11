"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, ChevronDown, CheckCircle2 } from "lucide-react";

type SpecialOfferPromoProps = {
  onApply: () => void;
  applied: boolean;
};

export default function SpecialOfferPromo({ onApply, applied }: SpecialOfferPromoProps) {
  const t = useTranslations("quote.specialOffer");
  const [open, setOpen] = useState(false);

  return (
    <div
      id="offre-speciale"
      className="relative mb-6 rounded-2xl p-[2px] overflow-hidden scroll-mt-28"
    >
      <div
        className="absolute inset-0 rounded-2xl special-offer-shimmer pointer-events-none"
        aria-hidden
      />
      <div className="relative rounded-[14px] bg-gradient-to-br from-amber-50 via-white to-amber-50/80">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

        <div className="relative p-4 sm:p-5">
          <div className="flex flex-wrap items-start gap-3 justify-between">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md shadow-amber-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                  {t("badge")}
                </p>
                <p className="text-[var(--ink)] font-semibold text-sm sm:text-base leading-snug mt-0.5">
                  {t("teaser")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto sm:shrink-0 relative z-10">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-amber-900 font-semibold text-sm px-4 py-2.5 rounded-full border border-amber-300/80 bg-white/80 hover:bg-white transition-colors cursor-pointer"
              >
                {open ? t("collapse") : t("expand")}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  onApply();
                }}
                disabled={applied}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 disabled:opacity-70 text-white font-bold text-sm px-4 py-2.5 rounded-full shadow-md shadow-amber-500/25 transition-all cursor-pointer"
              >
                {applied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    {t("applied")}
                  </>
                ) : (
                  t("apply")
                )}
              </button>
            </div>
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-4 mt-4 border-t border-amber-200/60 text-left">
                <h3 className="font-montserrat font-bold text-[var(--ink)] text-lg mb-1">
                  {t("title")}
                </h3>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{t("desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
