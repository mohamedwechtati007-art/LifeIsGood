"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function StickyOfferBar() {
  const t = useTranslations("stickyOffer");
  const pathname = usePathname();
  const isHome = pathname === "/fr" || pathname === "/en" || pathname === "/";

  if (!isHome) return null;

  return (
    <a
      href="#devis"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center font-bold text-sm py-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] safe-area-pb"
    >
      {t("label")}
    </a>
  );
}
