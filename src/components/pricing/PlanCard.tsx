"use client";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckIcon } from "@/components/ui/icons";
import { CARD_COPY } from "@/config/pricingContent";
import {
  ACTIVATION,
  ANNUAL_DISCOUNT_LABEL,
  getPlanCtaLabel,
  getPlanFeatures,
  getPlanName,
  type Plan,
} from "@/config/pricingPlans";
import { buildPlanUrl } from "@/config/site";
import { formatEuro } from "@/lib/format";
import { useBilling } from "./BillingContext";
import { PartnerBadge } from "./PartnerBadge";
import { Price } from "./Price";

export function PlanCard({ plan }: { plan: Plan }) {
  const { billing } = useBilling();
  const annual = billing === "annual";
  const dark = plan.highlighted;
  const name = getPlanName(plan.id);
  const features = getPlanFeatures(plan);
  const headingId = `plan-${plan.id}-title`;

  const price = annual ? plan.pricing.annual.perMonth : plan.pricing.monthly.perMonth;
  const activation = plan.activation[billing];
  const activationDiscounted = activation !== ACTIVATION.fullPrice;

  const muted = dark ? "text-white/80" : "text-slate-600";

  return (
    <article
      aria-labelledby={headingId}
      className={`mb-12 row-span-2 grid grid-rows-subgrid gap-6 lg:mb-0 ${dark ? "order-first lg:order-none" : ""}`}
    >
      {/* Card prezzo */}
      <div
        className={`relative flex flex-col overflow-hidden rounded-card p-6 sm:p-7 ${
          dark
            ? "border border-transparent bg-navy text-white shadow-card ring-2 ring-magenta"
            : "border border-navy/10 bg-white text-navy shadow-soft"
        }`}
      >
        {dark && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-magenta/30 blur-3xl"
          />
        )}

        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <h3 id={headingId} className="text-[1.75rem] leading-tight">
            {name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {annual && (
              <Badge tone="lime" className="animate-fade-in">
                {ANNUAL_DISCOUNT_LABEL}
              </Badge>
            )}
            {plan.badge && <Badge tone={dark ? "onDark" : "pink"}>{plan.badge}</Badge>}
          </div>
        </div>

        {plan.highlightNote && (
          <p className="relative mt-2 font-display text-sm font-bold text-pink-200">
            {plan.highlightNote}
          </p>
        )}
        <p className={`relative mt-2 text-sm leading-relaxed ${muted}`}>{plan.tagline}</p>

        <div className="relative mt-auto pt-8">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <Price
              value={price}
              previous={annual ? plan.pricing.monthly.perMonth : undefined}
              suffix={`al mese ${CARD_COPY.vat}`}
              valueClassName="font-display text-5xl font-bold tracking-tight"
              previousClassName={`font-display text-xl font-semibold ${dark ? "text-pink-200" : "text-slate-600"}`}
            />
            <span aria-hidden="true" className={`text-sm font-medium ${muted}`}>
              {CARD_COPY.perMonth} {CARD_COPY.vat}
            </span>
          </p>

          <p key={`note-${billing}`} className={`mt-2 min-h-10 animate-fade-in text-sm ${muted}`}>
            {annual
              ? CARD_COPY.billedAnnually(formatEuro(plan.pricing.annual.totalPerYear))
              : CARD_COPY.billedMonthly}
          </p>

          <div
            className={`mt-4 rounded-tile px-4 py-3 text-sm ${dark ? "bg-white/10" : "bg-lavender"}`}
          >
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-semibold">{CARD_COPY.activation}</span>
              <Price
                value={activation}
                previous={activationDiscounted ? ACTIVATION.fullPrice : undefined}
                suffix={CARD_COPY.vat}
                valueClassName="font-display text-base font-bold"
                previousClassName={dark ? "text-pink-200" : "text-slate-600"}
              />
            </p>
            <p key={`act-${billing}`} className="mt-1.5 flex min-h-6 animate-fade-in items-center">
              {annual && activation === 0 ? (
                <Badge tone={dark ? "onDark" : "lime"}>{CARD_COPY.activationIncluded}</Badge>
              ) : (
                <span className={`text-xs ${muted}`}>
                  {annual ? CARD_COPY.activationAnnualNote : CARD_COPY.oneOff}
                </span>
              )}
            </p>
          </div>

          <ButtonLink
            href={buildPlanUrl(plan.id, billing)}
            variant={plan.ctaVariant === "primary" ? "primary" : "secondary"}
            className="mt-6 w-full"
          >
            {getPlanCtaLabel(plan)}
          </ButtonLink>
        </div>
      </div>

      {/* Lista feature */}
      <div className="px-2">
        <p className="font-display text-base font-bold text-navy">{features.intro}</p>
        <ul className="mt-2">
          {features.items.map((item) => (
            <li key={item.id} className="border-b border-navy/10 py-3 last:border-b-0">
              <span className="flex gap-3 text-sm text-slate-700">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-green-ink" />
                <span>{item.text}</span>
              </span>
              {item.partner && <PartnerBadge partner={item.partner} className="mt-3 ml-7" />}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
