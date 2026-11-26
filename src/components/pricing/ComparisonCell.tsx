"use client";

import Image from "next/image";
import { CheckIcon, DashIcon } from "@/components/ui/icons";
import { CARD_COPY, COMPARISON } from "@/config/pricingContent";
import {
  ACTIVATION,
  MONTHS_PER_YEAR,
  UNLIMITED,
  UNLIMITED_CELL_TEXT,
  type BillingPeriod,
  type ComparisonRow,
  type Plan,
} from "@/config/pricingPlans";
import { PARTNERS } from "@/config/site";
import { Price } from "./Price";

function Included() {
  return (
    <span className="inline-flex items-center">
      <CheckIcon className="size-5 text-green-ink" />
      <span className="sr-only">{COMPARISON.included}</span>
    </span>
  );
}

function NotIncluded() {
  return (
    <span className="inline-flex items-center">
      <DashIcon className="size-5 text-slate-600" />
      <span className="sr-only">{COMPARISON.notIncluded}</span>
    </span>
  );
}

/** Contenuto di una cella della tabella di confronto (usato su desktop e mobile). */
export function ComparisonCell({
  row,
  plan,
  billing,
}: {
  row: ComparisonRow;
  plan: Plan;
  billing: BillingPeriod;
}) {
  const annual = billing === "annual";

  switch (row.kind) {
    case "included":
      return <Included />;

    case "limit": {
      const value = plan.limits[row.key];
      return (
        <span className="font-semibold">{value === UNLIMITED ? UNLIMITED_CELL_TEXT : value}</span>
      );
    }

    case "opportunity": {
      if (!plan.opportunities[row.key]) return <NotIncluded />;
      if (!row.partner) return <Included />;
      const logo = PARTNERS[row.partner].logo;
      const h = 36;
      const w = Math.round((logo.width / logo.height) * h);
      return (
        <span className="inline-flex flex-col items-center gap-1.5">
          <Included />
          <span className="inline-flex items-center gap-2 rounded-tile border border-navy/10 bg-white px-2 py-1.5">
            <span className="text-[11px] font-medium text-slate-600">
              {COMPARISON.inPartnershipWith}
            </span>
            <Image src={logo.src} alt={logo.alt} width={w} height={h} style={{ width: w, height: h }} />
          </span>
        </span>
      );
    }

    case "cost": {
      if (row.metric === "price") {
        return (
          <span className="inline-flex flex-wrap items-baseline justify-center gap-x-1">
            <Price
              value={annual ? plan.pricing.annual.perMonth : plan.pricing.monthly.perMonth}
              previous={annual ? plan.pricing.monthly.perMonth : undefined}
              suffix={`al mese ${CARD_COPY.vat}`}
              valueClassName="font-display text-lg font-bold"
              previousClassName="text-sm text-slate-600"
              className="justify-center"
            />
            <span aria-hidden="true" className="text-xs text-slate-600">
              {COMPARISON.perMonth}
            </span>
          </span>
        );
      }
      if (row.metric === "yearTotal") {
        const total = annual
          ? plan.pricing.annual.totalPerYear
          : plan.pricing.monthly.perMonth * MONTHS_PER_YEAR;
        return (
          <span className="inline-flex flex-col items-center">
            <Price value={total} suffix={CARD_COPY.vat} valueClassName="font-display text-lg font-bold" />
            <span key={billing} className="animate-fade-in text-xs text-slate-600">
              {annual ? COMPARISON.annualYearNote : COMPARISON.monthlyYearNote}
            </span>
          </span>
        );
      }
      const activation = plan.activation[billing];
      return (
        <span className="inline-flex flex-col items-center">
          <Price
            value={activation}
            previous={activation !== ACTIVATION.fullPrice ? ACTIVATION.fullPrice : undefined}
            suffix={CARD_COPY.vat}
            valueClassName="font-display text-lg font-bold"
            previousClassName="text-sm text-slate-600"
            className="justify-center"
          />
          <span key={billing} className="animate-fade-in text-xs text-slate-600">
            {annual && activation === 0 ? CARD_COPY.activationIncluded : CARD_COPY.oneOff}
          </span>
        </span>
      );
    }
  }
}
