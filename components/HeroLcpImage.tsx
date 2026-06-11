import Image from "next/image";
import { picSrc, sitePics } from "@/lib/site-pics";

/** Première image du hero — rendue côté serveur pour affichage immédiat (LCP). */
export default function HeroLcpImage() {
  const first = sitePics[0];
  if (!first) return null;

  const Wrapper = "div" as const;

  return (
    <Wrapper className="absolute inset-0 -z-20 bg-slate-900" aria-hidden>
      <Image
        src={picSrc(first)}
        alt=""
        fill
        priority
        fetchPriority="high"
        unoptimized
        className="object-cover object-center"
        sizes="100vw"
      />
    </Wrapper>
  );
}
