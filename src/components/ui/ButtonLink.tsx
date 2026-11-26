import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "onDark";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill text-center font-display font-bold uppercase tracking-[0.01em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  // Magenta + bianco = 4.8:1 (AA anche su testo piccolo)
  primary: "border-2 border-transparent bg-magenta text-white hover:bg-magenta-ink",
  secondary: "border-2 border-navy bg-white text-navy hover:bg-navy hover:text-white",
  onDark: "border-2 border-white text-white hover:bg-white hover:text-navy",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 py-3 text-base",
  sm: "min-h-10 px-4 py-2 text-sm",
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  return <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
