type Props = {
  onHero?: boolean;
  className?: string;
};

/** Cercle blanc derrière le logo */
export default function LogoSawArc({ onHero = false, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none ${className}`}
      aria-hidden
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        className={
          onHero
            ? "fill-white/95 drop-shadow-[0_4px_14px_rgba(0,0,0,0.3)]"
            : "fill-white stroke-sky-100/80"
        }
        strokeWidth={onHero ? 0 : 1}
      />
    </svg>
  );
}
