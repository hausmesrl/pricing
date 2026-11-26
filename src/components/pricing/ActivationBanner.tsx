"use client";

import { ACTIVATION_BANNER } from "@/config/pricingContent";
import { ACTIVATION } from "@/config/pricingPlans";
import { KeyIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/Badge";
import { useBilling } from "./BillingContext";
import { Price } from "./Price";

/** Banner attivazione sopra le card: reagisce al toggle. */
export function ActivationBanner() {
  const { billing } = useBilling();
  const annual = billing === "annual";
  const copy = annual ? ACTIVATION_BANNER.annual : ACTIVATION_BANNER.monthly;

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-card border border-green/30 bg-mint px-5 py-5 sm:flex-row sm:items-center sm:gap-5 sm:px-7">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-tile bg-white text-green-ink shadow-soft">
        <KeyIcon className="size-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-bold text-navy sm:text-2xl">
          <span>{copy.title}</span>
          <Price
            value={annual ? ACTIVATION.annualDiscountedPrice : ACTIVATION.fullPrice}
            previous={annual ? ACTIVATION.fullPrice : undefined}
            suffix="+ IVA"
            previousClassName="text-lg font-semibold text-slate-600"
          />
          {annual && (
            <Badge tone="lime" className="animate-fade-in">
              {ACTIVATION.annualDiscountLabel}
            </Badge>
          )}
        </p>
        <p key={billing} className="mt-1 animate-fade-in text-sm text-slate-600">
          {annual && (
            <strong className="font-display text-base font-bold text-green-ink">
              {ACTIVATION_BANNER.annual.label}.{" "}
            </strong>
          )}
          {copy.note}
        </p>
      </div>
    </div>
  );
}
