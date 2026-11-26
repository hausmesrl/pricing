import { Badge } from "@/components/ui/Badge";
import { ActivationBanner } from "@/components/pricing/ActivationBanner";
import { BillingProvider } from "@/components/pricing/BillingContext";
import { BillingToggle } from "@/components/pricing/BillingToggle";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { Faq } from "@/components/pricing/Faq";
import { FinalCta } from "@/components/pricing/FinalCta";
import { LogoStrip } from "@/components/pricing/LogoStrip";
import { PricingCards } from "@/components/pricing/PricingCards";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { CARD_COPY, HERO } from "@/config/pricingContent";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <BillingProvider>
          <section aria-labelledby="pricing-title" className="bg-lavender pt-16 pb-20 sm:pt-20">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <Badge>{HERO.eyebrow}</Badge>
                <h1
                  id="pricing-title"
                  className="mt-5 text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-6xl"
                >
                  {HERO.title}
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
                  {HERO.subtitle}
                </p>
              </div>

              <div className="mt-10">
                <ActivationBanner />
              </div>

              <div className="mt-10">
                <BillingToggle />
              </div>

              <div className="mt-12">
                <PricingCards />
              </div>

              <p className="mt-4 text-center text-xs text-slate-600 lg:mt-10">{CARD_COPY.vatNote}</p>
            </div>
          </section>

          <LogoStrip />
          <ComparisonTable />
          <Faq />
          <FinalCta />
        </BillingProvider>
      </main>
      <Footer />
    </>
  );
}
