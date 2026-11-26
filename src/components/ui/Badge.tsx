import type { ReactNode } from "react";

type Tone = "pink" | "lime" | "onDark";

const tones: Record<Tone, string> = {
  pink: "bg-pink-50 text-magenta-ink",
  lime: "bg-lime-100 text-navy",
  onDark: "bg-pink-200 text-navy",
};

/** Etichetta a pillola, come i tag "SEI UN PROFESSIONISTA?" del sito. */
export function Badge({
  tone = "pink",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.02em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
