import type { BillingPeriod, PartnerId, PlanId } from "./pricingPlans";

/** Link e contenuti di navbar e footer, ripresi dal sito www.hausme.it. */
export const SITE_URL = "https://www.hausme.it";

export const NAV_LINKS = [
  { label: "Blog", href: "https://hausme.it/blog/" },
  { label: "Chi siamo", href: `${SITE_URL}/chi-siamo` },
  { label: "HausmePRO", href: `${SITE_URL}/hausme-pro` },
  { label: "HausmeSTUDIO", href: `${SITE_URL}/hausme-studio` },
  { label: "Prezzi", href: "/", current: true },
] as const;

export const ACCOUNT_LINK = { label: "Accedi alla tua area", href: "https://app.hausme.it" };

export const FOOTER = {
  tagline: "Ristrutturare? Finalmente è smart",
  sitemap: [
    { label: "Home", href: `${SITE_URL}/` },
    { label: "Chi siamo", href: `${SITE_URL}/chi-siamo` },
    { label: "Blog", href: "https://hausme.it/blog/" },
    { label: "HausmePRO", href: `${SITE_URL}/hausme-pro` },
  ],
  contacts: {
    email: "info@hausme.it",
    text: "Scrivici per restare aggiornato sui nuovi prodotti Hausme o per avere più informazioni",
  },
  legal: [
    {
      label: "Termini di servizio",
      href: "https://drive.google.com/file/d/1_d6DLCEFsOQ26VCfjl3m3fkfHhVFaDWT/view?usp=sharing",
    },
    {
      label: "Politica sulla Privacy",
      href: "https://drive.google.com/file/d/1jaBusJO0_vDF1gicuWsDpKeXSjmo5v2i/view?usp=sharing",
    },
  ],
  company:
    "HAUSME S.R.L. | Sede legale: Via Luigi Guercio 145, 84134 Salerno (SA) | P.IVA / C.F. 06173480655 | REA SA-502794 | Capitale sociale €8.733,66 i.v. | PEC:",
  pec: "hausme@pec.it",
};

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

export const CTA_LINKS = {
  // TODO: url checkout/demo definitivo. Oggi "Prenota dimostrazione" sul sito punta qui.
  checkout: "https://app.hausme.it/pricing",
  // TODO: url checkout/demo definitivo per "Prenota una demo".
  demo: "https://app.hausme.it/pricing",
};

/** Costruisce l'URL di destinazione con `?plan=<id>&billing=<periodo>`. Usa solo gli id. */
export function buildPlanUrl(planId: PlanId, billing: BillingPeriod, base = CTA_LINKS.checkout) {
  const url = new URL(base);
  url.searchParams.set("plan", planId);
  url.searchParams.set("billing", billing);
  return url.toString();
}

/* -------------------------------------------------------------------------- */
/*  Loghi                                                                     */
/* -------------------------------------------------------------------------- */

export interface LogoAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** Partner premium. Logo ufficiale preso dalla pagina hausme.it/hausme-con-credem. */
export const PARTNERS: Record<PartnerId, { name: string; logo: LogoAsset; logoOnDark: LogoAsset }> =
  {
    credem: {
      name: "Credem",
      logo: { src: "/partners/credem.svg", width: 95, height: 57, alt: "Credem" },
      logoOnDark: { src: "/partners/credem-white.png", width: 453, height: 86, alt: "Credem" },
    },
  };

/** Striscia loghi: stesse aziende e stessi asset della sezione "I partner che si affidano ad Hausme". */
export const CUSTOMER_LOGOS: (LogoAsset & { displayHeight: number })[] = [
  { src: "/partners/zest-white.png", width: 220, height: 72, alt: "Zest", displayHeight: 30 },
  { src: "/partners/avvera-white.png", width: 254, height: 70, alt: "Avvera", displayHeight: 22 },
  { src: "/partners/gabetti-white.png", width: 601, height: 222, alt: "Gabetti", displayHeight: 28 },
  { src: "/partners/enpal-white.png", width: 256, height: 74, alt: "Enpal", displayHeight: 28 },
  {
    src: "/partners/agentpricing-white.png",
    width: 256,
    height: 48,
    alt: "AgentPricing",
    displayHeight: 20,
  },
];

export const BRAND_LOGO: LogoAsset = {
  src: "/brand/hausme-logo-white.svg",
  width: 139,
  height: 48,
  alt: "Hausme",
};
