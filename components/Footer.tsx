"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Shield } from "lucide-react";
import { siteContact } from "@/lib/contact";
import SiteBrandLockup from "@/components/SiteBrandLockup";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const links: { href: "/" | "/services" | "/galerie" | "/contact"; label: string }[] = [
    { href: "/", label: tNav("home") },
    { href: "/services", label: tNav("services") },
    { href: "/galerie", label: tNav("gallery") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <footer className="relative border-t border-sky-100/80 bg-gradient-to-b from-[#f8fcff] to-white text-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-4">
              <SiteBrandLockup variant="footer" />
            </div>
            <p className="text-[var(--ink-soft)] text-sm leading-relaxed mb-6">{t("tagline")}</p>
            <div className="inline-flex items-center gap-2 glass-frost rounded-full px-4 py-2 border border-emerald-200/60">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold">{t("licensed")}</span>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat font-bold text-base mb-5 text-[var(--ink)]">{t("links")}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--ink-soft)] hover:text-[var(--blue-deep)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-bold text-base mb-5">{t("contact")}</h3>
            <div className="space-y-2 text-sm text-[var(--ink-soft)]">
              <p>
                <a href={siteContact.phoneHref} className="hover:text-[var(--blue-deep)] transition-colors">
                  {siteContact.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={siteContact.emailHref} className="hover:text-[var(--blue-deep)] transition-colors">
                  {siteContact.email}
                </a>
              </p>
              <p>{siteContact.serviceArea}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-sky-100 mt-12 pt-6 text-center">
          <p className="text-[var(--ink-soft)] text-sm">{t("legal")}</p>
        </div>
      </div>
    </footer>
  );
}
