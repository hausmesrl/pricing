"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 450;

/**
 * Numero che "scorre" dal valore precedente al nuovo.
 * Con prefers-reduced-motion il cambio è istantaneo.
 * È decorativo (aria-hidden): il testo per screen reader lo fornisce il genitore.
 */
export function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const from = current.current;
    if (from === value) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : DURATION_MS;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = progress === 1 ? value : Math.round(from + (value - from) * eased);
      current.current = next;
      setDisplay(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span aria-hidden="true" className={`tabular-nums ${className ?? ""}`}>
      {format(display)}
    </span>
  );
}
