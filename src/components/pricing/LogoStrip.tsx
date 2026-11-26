import Image from "next/image";
import { LOGO_STRIP } from "@/config/pricingContent";
import { CUSTOMER_LOGOS, PARTNERS } from "@/config/site";

/** Striscia loghi su fondo navy (come sul sito). Credem è mostrato a parte, come Premium Partner. */
export function LogoStrip() {
  const credem = PARTNERS.credem.logoOnDark;
  const credemHeight = 22;
  return (
    <section aria-labelledby="logos-title" className="bg-navy py-14 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="logos-title" className="text-center text-2xl sm:text-3xl">
          {LOGO_STRIP.title}
        </h2>
        <div className="mt-10 flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
            {CUSTOMER_LOGOS.map((logo) => {
              const width = Math.round((logo.width / logo.height) * logo.displayHeight);
              return (
                <li key={logo.src}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={width}
                    height={logo.displayHeight}
                    style={{ width, height: logo.displayHeight }}
                  />
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4 border-white/20 lg:border-l lg:pl-12">
            <span className="font-display text-xs font-bold tracking-[0.08em] text-pink-200 uppercase">
              {LOGO_STRIP.premiumPartnerLabel}
            </span>
            <Image
              src={credem.src}
              alt={credem.alt}
              width={Math.round((credem.width / credem.height) * credemHeight)}
              height={credemHeight}
              style={{
                width: Math.round((credem.width / credem.height) * credemHeight),
                height: credemHeight,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
