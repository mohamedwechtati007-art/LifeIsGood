import Image from "next/image";
import { siteBrand, siteBrandFullName } from "@/lib/site-brand";
import LogoSawArc from "@/components/LogoSawArc";

type Variant = "navbar" | "footer";

type Props = {
  variant?: Variant;
  onHero?: boolean;
  className?: string;
};

const config = {
  navbar: {
    wrapperClass: "w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] md:w-[80px] md:h-[80px]",
    imageClass: "w-[88%] h-[88%] mx-auto",
    imageSize: 80,
    nameClass: "text-lg sm:text-xl md:text-2xl",
    subtitleClass: "text-xs sm:text-sm",
    gap: "gap-3 sm:gap-4",
    logoMargin: "mt-1.5",
    arcClass: "absolute inset-[-5%] z-0",
  },
  footer: {
    wrapperClass: "w-[80px] h-[80px]",
    imageClass: "w-[88%] h-[88%] mx-auto",
    imageSize: 80,
    nameClass: "text-lg sm:text-xl",
    subtitleClass: "text-xs sm:text-sm",
    gap: "gap-3.5",
    logoMargin: "",
    arcClass: "absolute inset-[-4%] z-0",
  },
} as const;

export default function SiteBrandLockup({
  variant = "navbar",
  onHero = false,
  className = "",
}: Props) {
  const c = config[variant];

  return (
    <div className={`flex items-center ${c.gap} ${className}`}>
      <div
        className={`relative shrink-0 flex items-center justify-center ${c.logoMargin} ${c.wrapperClass}`}
      >
        <LogoSawArc onHero={onHero} className={c.arcClass} />
        <Image
          src={siteBrand.logoSrc}
          alt={siteBrandFullName()}
          width={c.imageSize}
          height={c.imageSize}
          className={`relative z-10 object-contain ${c.imageClass}`}
          priority={variant === "navbar"}
        />
      </div>

      <div className="flex flex-col leading-tight min-w-0">
        <span
          className={`font-montserrat font-bold ${c.nameClass} ${
            variant === "navbar" && onHero
              ? "text-white drop-shadow"
              : "text-[var(--ink)]"
          }`}
        >
          {siteBrand.name}
        </span>
        <span
          className={`font-medium tracking-wide ${c.subtitleClass} ${
            variant === "navbar" && onHero ? "text-amber-300" : "text-amber-600"
          }`}
        >
          {siteBrand.subtitle}
        </span>
      </div>
    </div>
  );
}
