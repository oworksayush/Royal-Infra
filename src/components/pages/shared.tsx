import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Eyebrow, Marquee, RiseText } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap gap-2">
        {items.map((c, i) => (
          <li key={c.label} className="flex gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.to ? (
              <a href={c.to} className="underline-offset-4 hover:underline">{c.label}</a>
            ) : (
              <span aria-current="page" className="opacity-75">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** S10: topographic contour lines that draw with scroll. Solid strokes only. */
export function ContourLines({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const paths = [
    "M-20 260 C 200 180, 380 320, 620 230 S 1000 120, 1460 210",
    "M-20 320 C 220 240, 400 380, 640 290 S 1020 180, 1460 270",
    "M-20 380 C 240 300, 420 440, 660 350 S 1040 240, 1460 330",
    "M-20 440 C 260 360, 440 500, 680 410 S 1060 300, 1460 390",
    "M-20 500 C 280 420, 460 560, 700 470 S 1080 360, 1460 450",
  ];
  return (
    <svg ref={ref as never} aria-hidden viewBox="0 0 1440 600" preserveAspectRatio="none" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} fill="none">
      {paths.map((d) => (
        <motion.path key={d} d={d} stroke="currentColor" strokeWidth="1" style={{ pathLength: draw }} />
      ))}
    </svg>
  );
}

export function PageHeader({ crumbs, title, intro, marquee, contours }: { crumbs: Crumb[]; title: string; intro: string; marquee?: readonly string[]; contours?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-charcoal pt-40 text-limestone">
      {contours && <ContourLines className="text-terracotta/30" />}
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-display-l mt-10 max-w-[16ch]"><RiseText>{title}</RiseText></h1>
        <p className="mt-8 max-w-xl text-lg text-limestone/85">{intro}</p>
      </div>
      {marquee ? <Marquee items={marquee} className="relative mt-24 border-t border-limestone/15" /> : <div className="h-24" />}
    </section>
  );
}

export function SectionHead({ eyebrow, title, children, className, id }: { eyebrow: string; title: string; children?: ReactNode; className?: string; id?: string }) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-h2 mt-6 max-w-[20ch]"><RiseText>{title}</RiseText></h2>
      {children}
    </div>
  );
}
