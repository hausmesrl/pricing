"use client";

import { formatEuro } from "@/lib/format";
import { AnimatedNumber } from "./AnimatedNumber";

/**
 * Prezzo con eventuale prezzo precedente barrato.
 * Gli screen reader leggono "prima 249 €, ora 199 €" invece della versione visiva.
 */
export function Price({
  value,
  previous,
  suffix,
  className = "",
  valueClassName = "",
  previousClassName = "",
}: {
  value: number;
  previous?: number;
  suffix?: string;
  className?: string;
  valueClassName?: string;
  previousClassName?: string;
}) {
  const hasPrevious = previous !== undefined && previous !== value;
  const srText = hasPrevious
    ? `prima ${formatEuro(previous)}, ora ${formatEuro(value)}${suffix ? ` ${suffix}` : ""}`
    : `${formatEuro(value)}${suffix ? ` ${suffix}` : ""}`;

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 ${className}`}>
      {hasPrevious && (
        <s
          key={`prev-${previous}`}
          aria-hidden="true"
          className={`animate-fade-in tabular-nums ${previousClassName}`}
        >
          {formatEuro(previous)}
        </s>
      )}
      <AnimatedNumber value={value} format={formatEuro} className={valueClassName} />
      <span className="sr-only">{srText}</span>
    </span>
  );
}
