"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import SiteBrandLockup from "@/components/SiteBrandLockup";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHero, setIsHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setIsHero(y < (window.innerHeight * 0.85));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";
  const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
  const altPath = `/${otherLocale}${pathWithoutLocale}`;
  const isHome = pathWithoutLocale === "/";
  const offerHref = isHome ? "#offre-speciale" : `/${locale}#offre-speciale`;
  const quoteHref = isHome ? "#devis" : `/${locale}/contact`;

  const navLinks: { href: "/" | "/services" | "/galerie" | "/contact"; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/galerie", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  const onHero = isHome && isHero;

  const linkClass = onHero
    ? "text-white/80 hover:text-white text-sm font-medium transition-colors drop-shadow"
    : "text-[var(--ink)]/75 hover:text-[var(--ink)] text-sm font-medium transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-frost shadow-[0_8px_32px_rgba(10,24,40,0.08)] border-b border-white/50"
          : "bg-transparent"
      }`}
      data-hero={onHero ? "true" : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            href="/"
            className="group transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <SiteBrandLockup variant="navbar" onHero={onHero} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={altPath}
              className={`text-sm font-semibold rounded-full px-3 py-1.5 transition-colors ${
                onHero
                  ? "text-white/80 border border-white/25 hover:bg-white/15"
                  : "text-[var(--ink)]/80 border border-[var(--ink)]/15 hover:bg-white/60"
              }`}
            >
              {otherLocale.toUpperCase()}
            </a>
            <a
              href={offerHref}
              className={`font-semibold text-sm px-4 py-2.5 rounded-full border transition-all ${
                onHero
                  ? "text-amber-300 border-amber-400/40 hover:bg-white/10"
                  : "text-amber-700 border-amber-400/60 bg-amber-50/80 hover:bg-amber-100"
              }`}
            >
              {t("offerCta")}
            </a>
            <a
              href={quoteHref}
              className="bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md shadow-sky-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              {t("quote")}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <a
              href={altPath}
              className={`text-xs font-bold rounded-full px-2.5 py-1 border transition-colors ${
                onHero
                  ? "text-white/90 border-white/25"
                  : "text-[var(--ink)] border-[var(--ink)]/15"
              }`}
            >
              {otherLocale.toUpperCase()}
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${
                onHero
                  ? "text-white hover:bg-white/15"
                  : "text-[var(--ink)] hover:bg-white/50"
              }`}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[28rem] pb-4" : "max-h-0"
          }`}
        >
          <div className="glass-frost rounded-2xl mt-2 p-2 border border-white/60">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-[var(--ink)] hover:bg-white/50 px-4 py-3 rounded-xl text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={offerHref}
              onClick={() => setIsOpen(false)}
              className="block mt-2 text-center border border-amber-400/60 bg-amber-50 text-amber-800 font-semibold py-3 rounded-full"
            >
              {t("offerCta")}
            </a>
            <a
              href={quoteHref}
              onClick={() => setIsOpen(false)}
              className="block mt-2 text-center bg-gradient-to-r from-[var(--blue-deep)] to-[var(--blue)] text-white font-semibold py-3 rounded-full"
            >
              {t("quote")}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
