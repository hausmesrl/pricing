"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { DEFAULT_BILLING, type BillingPeriod } from "@/config/pricingPlans";

interface BillingState {
  billing: BillingPeriod;
  setBilling: (billing: BillingPeriod) => void;
}

const BillingContext = createContext<BillingState | null>(null);

/** Stato condiviso del toggle Mensile/Annuale: card, banner e tabella leggono da qui. */
export function BillingProvider({ children }: { children: ReactNode }) {
  const [billing, setBilling] = useState<BillingPeriod>(DEFAULT_BILLING);
  return <BillingContext value={{ billing, setBilling }}>{children}</BillingContext>;
}

export function useBilling(): BillingState {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error("useBilling deve essere usato dentro <BillingProvider>");
  return ctx;
}
