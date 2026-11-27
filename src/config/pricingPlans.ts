/**
 * Unica fonte di verità per piani, prezzi, limiti e testi derivati.
 *
 * Regole:
 * - Nel codice e negli URL si usano SEMPRE gli id (`entry`, `recommended`, `pro`),
 *   mai i nomi visualizzati.
 * - I prezzi annuali sono valori espliciti (non calcolati) per evitare decimali.
 * - Nessun numero va scritto nel JSX: i componenti leggono tutto da qui.
 */

export const PLAN_IDS = ["entry", "recommended", "pro"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export const BILLING_PERIODS = ["monthly", "annual"] as const;
export type BillingPeriod = (typeof BILLING_PERIODS)[number];

export const DEFAULT_BILLING: BillingPeriod = "monthly";

/**
 * TODO_NOME: nomi commerciali dei piani NON ancora definitivi.
 * È l'unico punto da modificare: card, liste feature, tabella, CTA e FAQ si aggiornano da soli.
 */
export const PLAN_NAMES: Record<PlanId, string> = {
  entry: "Piano 1",
  recommended: "Piano 2",
  pro: "Piano 3",
};

export const BILLING_LABELS: Record<BillingPeriod, string> = {
  monthly: "Mensile",
  annual: "Annuale",
};

/** Etichetta dello sconto annuale (tutti i piani). Valore esplicito, non calcolato. */
export const ANNUAL_DISCOUNT_LABEL = "-20%";

/** Mesi usati solo per mostrare il costo annuo equivalente della fatturazione mensile. */
export const MONTHS_PER_YEAR = 12;

/* -------------------------------------------------------------------------- */
/*  Attivazione                                                               */
/* -------------------------------------------------------------------------- */

export const ACTIVATION = {
  /** Prezzo pieno una tantum (fatturazione mensile). */
  fullPrice: 850,
  /** Prezzo con fatturazione annuale per entry e recommended. */
  annualDiscountedPrice: 425,
  annualDiscountLabel: "-50%",
} as const;

/* -------------------------------------------------------------------------- */
/*  Moduli inclusi in tutti i piani                                           */
/* -------------------------------------------------------------------------- */

export const MODULES = [
  { id: "preventivatore", name: "Modulo Preventivatore" },
  { id: "gestione-cantieri", name: "Modulo Gestione Cantieri" },
  { id: "amministrazione-finanza", name: "Modulo Amministrazione & Finanza" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Limiti                                                                    */
/* -------------------------------------------------------------------------- */

export const UNLIMITED = "unlimited" as const;
export type Limit = number | typeof UNLIMITED;

export const LIMITS = [
  {
    key: "quotesPerYear",
    label: "Preventivi all'anno",
    singular: "preventivo all'anno",
    plural: "preventivi all'anno",
    unlimitedText: "Preventivi illimitati",
  },
  {
    key: "users",
    label: "Accessi utente",
    singular: "accesso utente",
    plural: "accessi utente",
    unlimitedText: "Accessi utente illimitati",
  },
  {
    key: "whatsappNumbers",
    label: "Numeri WhatsApp",
    singular: "numero WhatsApp",
    plural: "numeri WhatsApp",
    unlimitedText: "Numeri WhatsApp illimitati",
  },
  {
    key: "concurrentSites",
    label: "Cantieri gestiti in contemporanea",
    singular: "cantiere gestito in contemporanea",
    plural: "cantieri gestiti in contemporanea",
    unlimitedText: "Cantieri in contemporanea illimitati",
  },
] as const;
export type LimitKey = (typeof LIMITS)[number]["key"];

/** Testo usato nelle celle della tabella per i limiti illimitati. */
export const UNLIMITED_CELL_TEXT = "Illimitati";

/* -------------------------------------------------------------------------- */
/*  Opportunità                                                               */
/* -------------------------------------------------------------------------- */

export const PARTNER_IDS = ["credem"] as const;
export type PartnerId = (typeof PARTNER_IDS)[number];

export const OPPORTUNITIES = [
  {
    key: "qualifiedProjects",
    label: "Accesso a progetti qualificati",
    partner: undefined,
  },
  {
    key: "premiumPartnerProjects",
    label: "Progetti qualificati dei Premium Partner",
    partner: "credem" as PartnerId,
  },
] as const;
export type OpportunityKey = (typeof OPPORTUNITIES)[number]["key"];

/* -------------------------------------------------------------------------- */
/*  Formazione                                                                */
/* -------------------------------------------------------------------------- */

export type Training =
  | { type: "webinar" }
  | { type: "oneToOne"; sessions: number; frequency: "once" | "monthly" };

export const TRAINING_COPY = {
  rowLabel: "Formazione",
  webinarFeature: "Formazione inclusa tramite webinar",
  webinarCell: "Webinar",
  trainer: "con un nostro tecnico",
};

function formatSessions(t: Extract<Training, { type: "oneToOne" }>): string {
  const base = `${t.sessions} ${t.sessions === 1 ? "formazione" : "formazioni"} 1:1`;
  return t.frequency === "monthly" ? `${base} al mese` : base;
}

/** Testo per la lista feature della card. */
export function formatTrainingFeature(t: Training): string {
  if (t.type === "webinar") return TRAINING_COPY.webinarFeature;
  return `${formatSessions(t)} ${TRAINING_COPY.trainer}`;
}

/** Testo breve per la cella della tabella di confronto. */
export function formatTrainingCell(t: Training): string {
  if (t.type === "webinar") return TRAINING_COPY.webinarCell;
  return formatSessions(t);
}

/* -------------------------------------------------------------------------- */
/*  Piani                                                                     */
/* -------------------------------------------------------------------------- */

export interface Plan {
  id: PlanId;
  /** Breve descrizione mostrata nella card. */
  tagline: string;
  highlighted: boolean;
  badge?: string;
  highlightNote?: string;
  limits: Record<LimitKey, Limit>;
  opportunities: Record<OpportunityKey, boolean>;
  training: Training;
  pricing: {
    monthly: { perMonth: number };
    annual: { perMonth: number; totalPerYear: number };
  };
  /** Costo di attivazione una tantum per periodo di fatturazione. */
  activation: Record<BillingPeriod, number>;
  ctaVariant: "primary" | "secondary";
}

export const PLANS: readonly Plan[] = [
  {
    id: "entry",
    // TODO: copy da validare
    tagline: "Per l'impresa che inizia a digitalizzare preventivi e cantieri.",
    highlighted: false,
    limits: { quotesPerYear: 20, users: 1, whatsappNumbers: 5, concurrentSites: 3 },
    opportunities: { qualifiedProjects: false, premiumPartnerProjects: false },
    training: { type: "webinar" },
    pricing: {
      monthly: { perMonth: 249 },
      annual: { perMonth: 199, totalPerYear: 2388 },
    },
    activation: { monthly: ACTIVATION.fullPrice, annual: ACTIVATION.annualDiscountedPrice },
    ctaVariant: "secondary",
  },
  {
    id: "recommended",
    // TODO: copy da validare
    tagline: "Per l'impresa in crescita, con più persone e più cantieri aperti.",
    highlighted: true,
    badge: "Consigliato",
    highlightNote: "Il più scelto dalle imprese",
    limits: { quotesPerYear: 50, users: 3, whatsappNumbers: 15, concurrentSites: 7 },
    opportunities: { qualifiedProjects: true, premiumPartnerProjects: false },
    training: { type: "oneToOne", sessions: 1, frequency: "once" },
    pricing: {
      monthly: { perMonth: 349 },
      annual: { perMonth: 279, totalPerYear: 3348 },
    },
    activation: { monthly: ACTIVATION.fullPrice, annual: ACTIVATION.annualDiscountedPrice },
    ctaVariant: "primary",
  },
  {
    id: "pro",
    // TODO: copy da validare
    tagline: "Per l'impresa strutturata che vuole lavorare senza limiti.",
    highlighted: false,
    limits: {
      quotesPerYear: UNLIMITED,
      users: UNLIMITED,
      whatsappNumbers: UNLIMITED,
      concurrentSites: UNLIMITED,
    },
    opportunities: { qualifiedProjects: true, premiumPartnerProjects: true },
    training: { type: "oneToOne", sessions: 1, frequency: "monthly" },
    pricing: {
      monthly: { perMonth: 499 },
      annual: { perMonth: 399, totalPerYear: 4788 },
    },
    activation: { monthly: ACTIVATION.fullPrice, annual: 0 },
    ctaVariant: "secondary",
  },
];

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Piano sconosciuto: ${id}`);
  return plan;
}

export function getPlanName(id: PlanId): string {
  return PLAN_NAMES[id];
}

export function getRecommendedPlan(): Plan {
  return PLANS.find((p) => p.highlighted) ?? PLANS[0];
}

/** Piani con attivazione gratuita sul piano annuale (oggi solo `pro`). */
export function getPlansWithFreeAnnualActivation(): Plan[] {
  return PLANS.filter((p) => p.activation.annual === 0);
}

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

export function getPlanCtaLabel(plan: Plan): string {
  return plan.ctaVariant === "primary" ? `Scegli ${getPlanName(plan.id)}` : "Inizia ora";
}

export const COMPARISON_CTA_LABEL = "Scegli";

/* -------------------------------------------------------------------------- */
/*  Liste feature (derivate dai dati, elenco completo per ogni piano)         */
/* -------------------------------------------------------------------------- */

export interface FeatureItem {
  id: string;
  text: string;
  partner?: PartnerId;
}

export interface FeatureList {
  intro: string;
  items: FeatureItem[];
}

export function formatLimit(key: LimitKey, value: Limit): string {
  const def = LIMITS.find((l) => l.key === key);
  if (!def) return String(value);
  if (value === UNLIMITED) return def.unlimitedText;
  return `${value} ${value === 1 ? def.singular : def.plural}`;
}

/**
 * Ogni piano elenca per esteso tutto ciò che include (niente "Tutto in [piano], più:"):
 * "Include tutti e 3 i moduli:" + i 3 moduli + i propri limiti + la formazione + le opportunità incluse
 * + l'attivazione inclusa sull'annuale, se prevista.
 */
export function getPlanFeatures(plan: Plan): FeatureList {
  return {
    intro: `Include tutti e ${MODULES.length} i moduli:`,
    items: [
      ...MODULES.map((m) => ({ id: `module-${m.id}`, text: m.name })),
      ...LIMITS.map((l) => ({ id: `limit-${l.key}`, text: formatLimit(l.key, plan.limits[l.key]) })),
      { id: "training", text: formatTrainingFeature(plan.training) },
      ...OPPORTUNITIES.filter((o) => plan.opportunities[o.key]).map((o) => ({
        id: `opp-${o.key}`,
        text: o.label,
        partner: o.partner,
      })),
      ...(plan.activation.annual === 0
        ? [{ id: "activation-included", text: "Attivazione inclusa con il piano annuale" }]
        : []),
    ],
  };
}

/* -------------------------------------------------------------------------- */
/*  Tabella di confronto                                                      */
/* -------------------------------------------------------------------------- */

export type CostMetric = "price" | "yearTotal" | "activation";

export type ComparisonRow =
  | { id: string; kind: "included"; label: string }
  | { id: string; kind: "limit"; label: string; key: LimitKey }
  | { id: string; kind: "opportunity"; label: string; key: OpportunityKey; partner?: PartnerId }
  | { id: string; kind: "training"; label: string }
  | { id: string; kind: "cost"; label: string; metric: CostMetric };

export interface ComparisonSection {
  id: string;
  title: string;
  rows: ComparisonRow[];
}

export const COMPARISON_SECTIONS: ComparisonSection[] = [
  {
    id: "moduli",
    title: "Moduli",
    rows: MODULES.map((m) => ({ id: `module-${m.id}`, kind: "included", label: m.name })),
  },
  {
    id: "limiti",
    title: "Limiti",
    rows: LIMITS.map((l) => ({ id: `limit-${l.key}`, kind: "limit", label: l.label, key: l.key })),
  },
  {
    id: "formazione",
    title: "Formazione",
    rows: [{ id: "training", kind: "training", label: TRAINING_COPY.rowLabel }],
  },
  {
    id: "opportunita",
    title: "Opportunità",
    rows: OPPORTUNITIES.map((o) => ({
      id: `opp-${o.key}`,
      kind: "opportunity",
      label: o.label,
      key: o.key,
      partner: o.partner,
    })),
  },
  {
    id: "costi",
    title: "Costi",
    rows: [
      { id: "cost-price", kind: "cost", label: "Prezzo mensile", metric: "price" },
      { id: "cost-year", kind: "cost", label: "Totale annuo", metric: "yearTotal" },
      { id: "cost-activation", kind: "cost", label: "Attivazione", metric: "activation" },
    ],
  },
];
