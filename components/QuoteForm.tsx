"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { siteContact, buildGmailComposeUrl } from "@/lib/contact";
import SpecialOfferPromo from "./SpecialOfferPromo";

function useQuoteSchema() {
  const t = useTranslations("quote");
  return z.object({
    name: z.string().min(1, t("required")),
    email: z.string().email(t("invalidEmail")),
    phone: z.string().min(1, t("required")),
    from: z.string().min(1, t("required")),
    to: z.string().min(1, t("required")),
    date: z.string().min(1, t("required")),
    type: z.string().min(1, t("required")),
    requestType: z.string().min(1, t("required")),
    surface: z.string().optional(),
    message: z.string().optional(),
  });
}

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  type: string;
  requestType: string;
  surface?: string;
  message?: string;
};

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("quote");
  const schema = useQuoteSchema();
  const [submitted, setSubmitted] = useState(false);
  const [gmailUrl, setGmailUrl] = useState<string | null>(null);
  const [specialOfferApplied, setSpecialOfferApplied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(schema),
  });

  const applySpecialOffer = () => {
    const prefix = t("specialOffer.messagePrefix");
    const current = getValues("message")?.trim() ?? "";
    if (!current.includes(prefix)) {
      setValue("message", current ? `${prefix}\n\n${current}` : prefix, { shouldDirty: true });
    }
    setValue("type", "industrial", { shouldDirty: true });
    setSpecialOfferApplied(true);
    document.getElementById("quote-message")?.focus();
  };

  const typeLabels: Record<string, string> = {
    parking: t("typeOptions.parking"),
    retail: t("typeOptions.retail"),
    office: t("typeOptions.office"),
    industrial: t("typeOptions.industrial"),
    mall: t("typeOptions.mall"),
  };
  const requestLabels: Record<string, string> = {
    seasonal: t("requestOptions.seasonal"),
    oneTime: t("requestOptions.oneTime"),
    emergency: t("requestOptions.emergency"),
  };

  const onSubmit = (data: QuoteFormData) => {
    const subjectText = specialOfferApplied
      ? t("specialOffer.emailSubject")
      : t("emailSubject");
    const body = [
      `${t("name")}: ${data.name}`,
      `${t("email")}: ${data.email}`,
      `${t("phone")}: ${data.phone}`,
      `${t("from")}: ${data.from}`,
      `${t("to")}: ${data.to}`,
      `${t("date")}: ${data.date}`,
      `${t("type")}: ${typeLabels[data.type] ?? data.type}`,
      `${t("requestType")}: ${requestLabels[data.requestType] ?? data.requestType}`,
      `${t("surface")}: ${data.surface || "-"}`,
      `${t("message")}: ${data.message || "-"}`,
    ].join("\n");

    const url = buildGmailComposeUrl({
      to: siteContact.email,
      subject: subjectText,
      body,
    });

    setGmailUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white/90 border border-sky-100 rounded-xl px-4 py-3.5 text-[var(--ink)] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-[var(--blue-deep)] transition-all min-h-[48px]";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const errorClass = "text-red-500 text-xs mt-1";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-[var(--ink)] font-semibold text-lg mb-2">{t("success")}</p>
        <p className="text-[var(--ink-soft)] text-sm mb-6">{t("successHint")}</p>
        {gmailUrl && (
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-all"
          >
            {t("successOpenGmail")}
          </a>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!compact && (
        <SpecialOfferPromo onApply={applySpecialOffer} applied={specialOfferApplied} />
      )}
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <div>
          <label className={labelClass}>{t("name")} *</label>
          <input {...register("name")} className={inputClass} placeholder="Jean Dupont" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("email")} *</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="jean@email.com" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("phone")} *</label>
          <input {...register("phone")} type="tel" autoComplete="tel" className={inputClass} placeholder="(613) 716-9988" />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("date")} *</label>
          <input {...register("date")} type="date" className={inputClass} />
          {errors.date && <p className={errorClass}>{errors.date.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("from")} *</label>
          <input {...register("from")} className={inputClass} placeholder="123 Innes Rd, Orléans" />
          {errors.from && <p className={errorClass}>{errors.from.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("to")} *</label>
          <input {...register("to")} className={inputClass} placeholder="Parc industriel, Innes-Est..." />
          {errors.to && <p className={errorClass}>{errors.to.message}</p>}
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelClass}>{t("type")} *</label>
          <select {...register("type")} className={inputClass}>
            <option value="">—</option>
            <option value="parking">{t("typeOptions.parking")}</option>
            <option value="retail">{t("typeOptions.retail")}</option>
            <option value="office">{t("typeOptions.office")}</option>
            <option value="industrial">{t("typeOptions.industrial")}</option>
            <option value="mall">{t("typeOptions.mall")}</option>
          </select>
          {errors.type && <p className={errorClass}>{errors.type.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("requestType")} *</label>
          <select {...register("requestType")} className={inputClass}>
            <option value="">—</option>
            <option value="seasonal">{t("requestOptions.seasonal")}</option>
            <option value="oneTime">{t("requestOptions.oneTime")}</option>
            <option value="emergency">{t("requestOptions.emergency")}</option>
          </select>
          {errors.requestType && <p className={errorClass}>{errors.requestType.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("surface")}</label>
          <input {...register("surface")} className={inputClass} placeholder={t("surfacePlaceholder")} />
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelClass}>{t("message")}</label>
          <textarea
            id="quote-message"
            {...register("message")}
            className={`${inputClass} min-h-[100px] resize-none`}
            rows={3}
            placeholder="..."
          />
        </div>
      </div>

      <p className="text-center text-sm text-[var(--ink-soft)]">{t("submitHint")}</p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] hover:brightness-110 disabled:opacity-60 text-white font-bold py-4 rounded-full transition-all shadow-lg shadow-sky-500/25 active:scale-95 flex items-center justify-center gap-2 text-base min-h-[56px]"
      >
        {isSubmitting ? (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
