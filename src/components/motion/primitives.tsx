import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ImageEntry } from "@/data/images";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Eyebrow: small sentence-case label with a short terracotta rule. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[0.85rem] font-medium", className)}>
      <span aria-hidden className="h-px w-8 bg-terracotta" />
      {children}
    </p>
  );
}

/** Line-mask rise for headings. Text is always in the DOM. */
export function RiseText({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={cn("block overflow-hidden pb-[0.08em]", className)}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Reading-light: each word's opacity scrubs from 0.18 to 1 as the paragraph passes. */
export function WordScrub({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const words = text.split(" ");
  if (reduced) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** Count up on enter; final value is server-rendered. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(0, value, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduced, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** Image with solid curtain wipe + slow scale. Placeholder when the original isn't uploaded yet. */
export function CurtainImage({
  image,
  className,
  imgClassName,
  curtain = "bg-charcoal",
  priority,
  parallax,
}: {
  image: ImageEntry;
  className?: string;
  imgClassName?: string;
  curtain?: string;
  priority?: boolean;
  parallax?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {image.src ? (
        <motion.img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...(priority ? { fetchPriority: "high" as const } : {})}
          style={parallax && !reduced ? { y, scale: 1.18 } : {}}
          initial={reduced || parallax ? false : { scale: 1.18 }}
          whileInView={parallax ? {} : { scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.4, ease }}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className="flex h-full w-full items-center justify-center bg-limestone p-6 text-center text-sm text-charcoal/60 outline outline-1 -outline-offset-8 outline-charcoal/20"
        >
          Original photo to be uploaded
          <br />
          {image.id}
        </div>
      )}
      {!reduced && (
        <motion.div
          aria-hidden
          className={cn("absolute inset-0 origin-top", curtain)}
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        />
      )}
      {image.caption && (
        <span className="absolute bottom-3 left-3 bg-charcoal/55 px-2 py-0.5 text-xs text-limestone">
          {image.caption}
        </span>
      )}
    </div>
  );
}

/** Small arch-shaped glyph used as marquee separator. */
export function ArchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 14" className={cn("h-3.5 w-3", className)} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M1 13V6a5 5 0 0 1 10 0v7" />
    </svg>
  );
}

export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-[clamp(1.5rem,3vw,2.5rem)]">
          {t}
          <ArchGlyph className="text-terracotta" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("overflow-hidden py-6", className)}>
      <div className="marquee-track flex w-max">
        {row}
        <div aria-hidden className="flex">{row}</div>
      </div>
    </div>
  );
}
