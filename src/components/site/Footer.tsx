import { FOOTER } from "@/config/site";

/** Footer del sito Hausme. */
export function Footer() {
  return (
    <footer className="bg-white text-navy">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="border-t border-navy/10 pt-14 pb-10">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <p className="font-display text-xl font-semibold">{FOOTER.tagline}</p>
            <div className="flex gap-16">
              <nav aria-labelledby="footer-sitemap">
                <h2 id="footer-sitemap" className="font-display text-base">
                  Sitemap
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {FOOTER.sitemap.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-display text-base font-medium text-slate-600 underline hover:text-navy"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="max-w-52">
                <h2 className="font-display text-base">Contatti</h2>
                <a
                  href={`mailto:${FOOTER.contacts.email}`}
                  className="mt-5 block font-display font-semibold text-green-ink hover:underline"
                >
                  {FOOTER.contacts.email}
                </a>
                <p className="mt-2 font-display text-[15px] font-medium text-slate-600">
                  {FOOTER.contacts.text}
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="underline hover:text-green-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            {FOOTER.company}{" "}
            <a href={`mailto:${FOOTER.pec}`} className="underline">
              {FOOTER.pec}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
