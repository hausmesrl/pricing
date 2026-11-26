"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CARD_COPY, COMPARISON } from "@/config/pricingContent";
import {
  COMPARISON_CTA_LABEL,
  COMPARISON_SECTIONS,
  PLANS,
  getPlanCtaLabel,
  getPlanName,
  getRecommendedPlan,
  type PlanId,
} from "@/config/pricingPlans";
import { buildPlanUrl } from "@/config/site";
import { useBilling } from "./BillingContext";
import { ComparisonCell } from "./ComparisonCell";

export function ComparisonTable() {
  return (
    <section aria-labelledby="compare-title" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="compare-title" className="text-center text-3xl sm:text-4xl">
          {COMPARISON.title}
        </h2>
        <p className="mt-3 text-center text-slate-600">{COMPARISON.subtitle}</p>
        <div className="mt-12 hidden md:block">
          <DesktopTable />
        </div>
        <div className="mt-10 md:hidden">
          <MobileComparison />
        </div>
        <p className="mt-6 text-center text-xs text-slate-600">{CARD_COPY.vatNote}</p>
      </div>
    </section>
  );
}

/* ------------------------------- Desktop -------------------------------- */

function DesktopTable() {
  const { billing } = useBilling();

  return (
    <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
      <caption className="sr-only">{COMPARISON.title}</caption>
      <colgroup>
        <col className="w-[34%]" />
        {PLANS.map((plan) => (
          <col key={plan.id} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <td className="sticky top-0 z-10 border-b border-navy/10 bg-white" />
          {PLANS.map((plan) => (
            <th
              key={plan.id}
              scope="col"
              className={`sticky top-0 z-10 border-b border-navy/10 px-3 pt-4 pb-5 align-bottom ${
                plan.highlighted ? "rounded-t-card bg-lavender" : "bg-white"
              }`}
            >
              <span className="block font-display text-xl font-bold text-navy">
                {getPlanName(plan.id)}
              </span>
              <ButtonLink
                href={buildPlanUrl(plan.id, billing)}
                variant={plan.highlighted ? "primary" : "secondary"}
                size="sm"
                className="mt-3 w-full max-w-44"
                aria-label={`${COMPARISON_CTA_LABEL} ${getPlanName(plan.id)}`}
              >
                {COMPARISON_CTA_LABEL}
              </ButtonLink>
            </th>
          ))}
        </tr>
      </thead>
      {COMPARISON_SECTIONS.map((section) => (
        <tbody key={section.id}>
          <tr>
            <th
              scope="colgroup"
              colSpan={PLANS.length + 1}
              className="px-2 pt-10 pb-3 text-left font-display text-lg font-bold text-navy"
            >
              {section.title}
            </th>
          </tr>
          {section.rows.map((row) => (
            <tr key={row.id}>
              <th
                scope="row"
                className="border-b border-navy/10 px-2 py-4 text-left font-medium text-slate-700"
              >
                {row.label}
              </th>
              {PLANS.map((plan) => (
                <td
                  key={plan.id}
                  className={`border-b border-navy/10 px-3 py-4 text-center text-navy ${
                    plan.highlighted ? "bg-lavender" : ""
                  }`}
                >
                  <ComparisonCell row={row} plan={plan} billing={billing} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}

/* -------------------------------- Mobile -------------------------------- */

function MobileComparison() {
  const { billing } = useBilling();
  const [selected, setSelected] = useState<PlanId>(getRecommendedPlan().id);
  const tabs = useRef<Partial<Record<PlanId, HTMLButtonElement | null>>>({});
  const plan = PLANS.find((p) => p.id === selected) ?? PLANS[0];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = PLANS.findIndex((p) => p.id === selected);
    const last = PLANS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    const id = PLANS[next].id;
    setSelected(id);
    tabs.current[id]?.focus();
  };

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 bg-white/95 px-4 py-3 backdrop-blur">
        <div
          role="tablist"
          aria-label={COMPARISON.planSelectorLabel}
          className="grid grid-cols-3 gap-1 rounded-pill border border-navy/10 bg-lavender p-1"
        >
          {PLANS.map((p) => {
            const active = p.id === selected;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[p.id] = el;
                }}
                id={`compare-tab-${p.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="compare-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(p.id)}
                onKeyDown={onKeyDown}
                className={`min-h-11 rounded-pill px-2 font-display text-sm font-bold transition-colors ${
                  active ? "bg-navy text-white" : "text-navy"
                }`}
              >
                {getPlanName(p.id)}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="compare-panel"
        role="tabpanel"
        aria-labelledby={`compare-tab-${plan.id}`}
        tabIndex={0}
        className="mt-2"
      >
        {COMPARISON_SECTIONS.map((section) => (
          <section key={section.id} aria-label={section.title} className="mt-6">
            <h3 className="px-1 text-lg">{section.title}</h3>
            <dl className="mt-2">
              {section.rows.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between gap-4 border-b border-navy/10 px-1 py-3.5 text-sm"
                >
                  <dt className="text-slate-700">{row.label}</dt>
                  <dd className="shrink-0 text-right text-navy">
                    <ComparisonCell row={row} plan={plan} billing={billing} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <ButtonLink
          href={buildPlanUrl(plan.id, billing)}
          variant={plan.highlighted ? "primary" : "secondary"}
          className="mt-8 w-full"
        >
          {getPlanCtaLabel(plan)}
        </ButtonLink>
      </div>
    </div>
  );
}
