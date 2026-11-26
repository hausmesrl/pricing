import Image from "next/image";
import { COMPARISON } from "@/config/pricingContent";
import type { PartnerId } from "@/config/pricingPlans";
import { PARTNERS } from "@/config/site";

/**
 * "In partnership con [logo]". Il logo mantiene le proporzioni originali
 * e ha un'area di rispetto (padding) su fondo bianco.
 */
export function PartnerBadge({
  partner,
  logoHeight = 40,
  className = "",
}: {
  partner: PartnerId;
  logoHeight?: number;
  className?: string;
}) {
  const { logo } = PARTNERS[partner];
  const width = Math.round((logo.width / logo.height) * logoHeight);
  return (
    <span
      className={`inline-flex items-center gap-3 rounded-tile border border-navy/10 bg-white py-2 pr-3 pl-3.5 ${className}`}
    >
      <span className="text-xs font-medium text-slate-600">{COMPARISON.inPartnershipWith}</span>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={width}
        height={logoHeight}
        className="block shrink-0"
        style={{ width, height: logoHeight }}
      />
    </span>
  );
}
