import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

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

/** Wordmark stand-in until the original logo file is uploaded. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Royal Infra Realty logo" role="img">
      <svg viewBox="0 0 24 28" className="h-7 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M2 27V12a10 10 0 0 1 20 0v15" />
        <path d="M7 27V14a5 5 0 0 1 10 0v13" />
      </svg>
      <span className="font-display text-xl leading-none tracking-tight">Royal Infra</span>
    </span>
  );
}
