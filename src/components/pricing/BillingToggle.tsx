"use client";

import { useRef, type KeyboardEvent } from "react";
import { BILLING_TOGGLE } from "@/config/pricingContent";
import {
  ANNUAL_DISCOUNT_LABEL,
  BILLING_LABELS,
  BILLING_PERIODS,
  type BillingPeriod,
} from "@/config/pricingPlans";
import { useBilling } from "./BillingContext";

/** Toggle a pillola Mensile/Annuale: vero radiogroup navigabile con le frecce. */
export function BillingToggle() {
  const { billing, setBilling } = useBilling();
  const refs = useRef<Record<BillingPeriod, HTMLButtonElement | null>>({
    monthly: null,
    annual: null,
  });

  const select = (next: BillingPeriod) => {
    setBilling(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = BILLING_PERIODS.indexOf(billing);
    const last = BILLING_PERIODS.length - 1;
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index === 0 ? last : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = last;
    if (nextIndex === null) return;
    event.preventDefault();
    select(BILLING_PERIODS[nextIndex]);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        role="radiogroup"
        aria-label={BILLING_TOGGLE.label}
        className="inline-flex rounded-pill border border-navy/10 bg-white p-1.5 shadow-soft"
      >
        {BILLING_PERIODS.map((period) => {
          const checked = billing === period;
          return (
            <button
              key={period}
              ref={(el) => {
                refs.current[period] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => select(period)}
              onKeyDown={onKeyDown}
              className={`inline-flex min-h-11 items-center gap-2 rounded-pill px-5 font-display text-base font-bold transition-colors duration-200 sm:px-7 ${
                checked ? "bg-navy text-white" : "text-navy hover:bg-lavender"
              }`}
            >
              {BILLING_LABELS[period]}
              {period === "annual" && (
                <span className="rounded-pill bg-lime-100 px-2 py-0.5 text-xs font-bold text-navy">
                  {ANNUAL_DISCOUNT_LABEL}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {billing === "annual" ? BILLING_TOGGLE.liveAnnual : BILLING_TOGGLE.liveMonthly}
      </p>
    </div>
  );
}
