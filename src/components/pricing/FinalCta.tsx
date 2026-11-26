"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { FINAL_CTA } from "@/config/pricingContent";
import { getPlanCtaLabel, getRecommendedPlan } from "@/config/pricingPlans";
import { CTA_LINKS, buildPlanUrl } from "@/config/site";
import { useBilling } from "./BillingContext";

export function FinalCta() {
  const { billing } = useBilling();
  const plan = getRecommendedPlan();
  return (
    <section aria-labelledby="final-cta-title" className="bg-white px-4 py-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-panel bg-navy px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-magenta/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-green/30 blur-3xl"
        />
        <h2 id="final-cta-title" className="relative text-3xl sm:text-5xl">
          {FINAL_CTA.title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-white/85 sm:text-lg">{FINAL_CTA.text}</p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={buildPlanUrl(plan.id, billing)} variant="primary">
            {getPlanCtaLabel(plan)}
          </ButtonLink>
          <ButtonLink href={CTA_LINKS.demo} variant="onDark">
            {FINAL_CTA.demoLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
