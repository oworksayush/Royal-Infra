import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/Royal_Infra_Logo.png";

type Tone = "dark" | "light"; // dark = on light section (charcoal fill), light = on dark section

const base =
  "group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-7 py-3 text-[0.95rem] font-medium transition-colors duration-300";
const tones: Record<Tone, string> = {
  dark: "bg-charcoal text-limestone",
  light: "bg-limestone text-charcoal hover:text-limestone",
};

function Wipe() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 translate-y-full rounded-full bg-rosewood transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
    />
  );
}

export function ButtonLink({
  tone = "dark",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { tone?: Tone; children: ReactNode }) {
  return (
    <a {...props} className={cn(base, tones[tone], className)}>
      <Wipe />
      <span className="relative">{children}</span>
    </a>
  );
}

export function ButtonA({
  tone = "dark",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { tone?: Tone }) {
  return (
    <a {...props} className={cn(base, tones[tone], className)}>
      <Wipe />
      <span className="relative">{children}</span>
    </a>
  );
}

export function TextLink({ className, children, ...props }: ComponentProps<"a"> & { children: ReactNode }) {
  return (
    <a {...props} className={cn("group inline-flex items-center gap-2 font-medium", className)}>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </a>
  );
}

/** Official Royal Infra company logo from assets */
export function Logo({
  className,
  imgClassName,
  tone = "light",
  alt = "Royal Infra Realty",
}: {
  className?: string;
  imgClassName?: string;
  tone?: "light" | "dark" | "original";
  alt?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center shrink-0", className)}
      aria-label={alt}
    >
      <img
        src={logoImg}
        alt={alt}
        className={cn(
          "h-10 sm:h-11 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-all duration-200",
          // Apply no filter for original logo; avoid brightening/inverting which creates white box.
          tone === "original" && "",
          imgClassName
        )}
      />
    </span>
  );
}
