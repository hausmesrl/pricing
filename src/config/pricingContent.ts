/**
 * Testi della pagina prezzi. I valori numerici e i nomi dei piani sono
 * sempre letti da `pricingPlans.ts`, mai scritti a mano.
 */
import { formatEuro } from "@/lib/format";
import {
  ACTIVATION,
  ANNUAL_DISCOUNT_LABEL,
  MODULES,
  PLANS,
  getPlanName,
  getPlansWithFreeAnnualActivation,
  getRecommendedPlan,
} from "./pricingPlans";

const freeActivationNames = getPlansWithFreeAnnualActivation()
  .map((p) => getPlanName(p.id))
  .join(", ");

export const SEO = {
  title: "Prezzi | Hausme – Il software per le imprese edili",
  description: `Scopri i piani Hausme per imprese edili: preventivi, gestione cantieri e amministrazione in un'unica piattaforma. Risparmia ${ANNUAL_DISCOUNT_LABEL.replace("-", "il ")} con la fatturazione annuale.`,
};

export const HERO = {
  eyebrow: "Prezzi",
  title: "Prezzi semplici per ogni impresa edile",
  subtitle: `Preventivi, cantieri e amministrazione in un'unica piattaforma. Tutti i piani includono i ${MODULES.length} moduli Hausme.`,
};

export const BILLING_TOGGLE = {
  label: "Periodo di fatturazione",
  liveAnnual: "Prezzi aggiornati: fatturazione annuale.",
  liveMonthly: "Prezzi aggiornati: fatturazione mensile.",
};

export const ACTIVATION_BANNER = {
  monthly: {
    title: "Attivazione una tantum:",
    note: `Scegli la fatturazione annuale: attivazione dimezzata a ${formatEuro(ACTIVATION.annualDiscountedPrice)} e gratuita con ${freeActivationNames}.`,
  },
  annual: {
    title: "Attivazione:",
    label: "Attivazione dimezzata con il piano annuale",
    note: `Con ${freeActivationNames} l'attivazione è gratuita: ${formatEuro(0)}.`,
  },
};

export const CARD_COPY = {
  perMonth: "/mese",
  vat: "+ IVA",
  billedMonthly: "Fatturazione mensile",
  billedAnnually: (total: string) => `Fatturati ${total} all'anno in un'unica soluzione`,
  activation: "Attivazione",
  oneOff: "una tantum",
  activationAnnualNote: `una tantum, ${ACTIVATION.annualDiscountLabel} con il piano annuale`,
  activationIncluded: "Attivazione inclusa",
  vatNote: "Tutti i prezzi sono IVA esclusa.",
};

export const LOGO_STRIP = {
  title: "I partner che si affidano ad Hausme",
  premiumPartnerLabel: "Premium Partner",
};

export const COMPARISON = {
  title: "Confronta i piani",
  subtitle: "Tutte le differenze, voce per voce.",
  planSelectorLabel: "Scegli il piano da visualizzare",
  included: "Incluso",
  notIncluded: "Non incluso",
  inPartnershipWith: "In partnership con",
  perMonth: "/mese",
  monthlyYearNote: "pagati mese per mese",
  annualYearNote: "in un'unica soluzione",
};

const recommendedName = getPlanName(getRecommendedPlan().id);
const lastPlanName = getPlanName(PLANS[PLANS.length - 1].id);

/** TODO: testi FAQ placeholder, da validare con commerciale e legale. */
export const FAQ = {
  title: "Domande frequenti",
  items: [
    {
      id: "attivazione",
      question: "Cosa comprende il costo di attivazione?",
      // TODO: dettagliare cosa include l'attivazione (setup, import listini, formazione…)
      answer: `L'attivazione è un costo una tantum di ${formatEuro(ACTIVATION.fullPrice)} con la fatturazione mensile. Con la fatturazione annuale scende a ${formatEuro(ACTIVATION.annualDiscountedPrice)} ed è inclusa (${formatEuro(0)}) con ${freeActivationNames}.`,
    },
    {
      id: "fatturazione-annuale",
      question: "Come funziona la fatturazione annuale?",
      // TODO: verificare modalità di pagamento e rinnovo
      answer: `Con la fatturazione annuale paghi l'intero anno in un'unica soluzione e risparmi il ${ANNUAL_DISCOUNT_LABEL.replace("-", "")} sul canone di tutti i piani, oltre allo sconto sull'attivazione.`,
    },
    {
      id: "limiti",
      question: "Cosa succede se supero i limiti del mio piano?",
      // TODO: definire la policy al superamento dei limiti (blocco, upgrade, pacchetti extra)
      answer: `Ti avvisiamo quando ti avvicini ai limiti di preventivi, accessi, numeri WhatsApp o cantieri. Puoi passare in qualsiasi momento a ${recommendedName} o a ${lastPlanName}, che non ha limiti.`,
    },
    {
      id: "disdetta",
      question: "Posso disdire quando voglio?",
      // TODO: inserire condizioni di disdetta e preavviso
      answer:
        "Il piano mensile si rinnova di mese in mese, quello annuale alla scadenza dell'anno. Le condizioni di disdetta sono riportate nei Termini di servizio.",
    },
  ],
};

export const FINAL_CTA = {
  title: "Porta la tua impresa su Hausme",
  text: `Preventivi, cantieri e conti sotto controllo, in un unico posto. Inizia con ${recommendedName} o parla con il nostro team.`,
  demoLabel: "Prenota una demo",
};
