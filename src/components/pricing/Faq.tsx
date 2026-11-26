import { ChevronIcon } from "@/components/ui/icons";
import { FAQ } from "@/config/pricingContent";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-lavender py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="faq-title" className="text-center text-3xl sm:text-4xl">
          {FAQ.title}
        </h2>
        <div className="mt-10 space-y-3">
          {FAQ.items.map((item) => (
            <details
              key={item.id}
              className="group rounded-card border border-navy/10 bg-white shadow-soft open:shadow-card"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-card px-5 py-4 font-display text-lg font-bold text-navy sm:px-6 [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronIcon className="size-5 shrink-0 text-green-ink transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-700 sm:px-6">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
