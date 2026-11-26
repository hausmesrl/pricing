import { PLANS } from "@/config/pricingPlans";
import { PlanCard } from "./PlanCard";

/** 3 card affiancate su desktop; impilate su mobile/tablet con la consigliata per prima. */
export function PricingCards() {
  return (
    <div className="mx-auto grid max-w-xl grid-cols-1 gap-x-6 lg:max-w-none lg:grid-cols-3">
      {PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
