import { useEffect, useRef, useState } from "react";
import type React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  aboutIntro, cta, faqIntro, faqs, hero, homeProjects, pathIntro, pillars, projectsIntro,
  services, servicesIntro, stats, steps, testimonials, testimonialsIntro, ticker, whereWeBuild, whyIntro,
} from "@/data/home";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { usePinnedMotion } from "@/hooks/use-motion-ok";
import { ButtonA, ButtonLink, TextLink } from "@/components/ui-brand";
import { CountUp, CurtainImage, Eyebrow, Marquee, RiseText, WordScrub } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

/* S1 — Arch Portal hero */
export function Hero() {
  const pinned = usePinnedMotion();
  return <HeroInner key={String(pinned)} pinned={pinned} />;
}
function HeroInner({ pinned }: { pinned: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["inset(10% 6% 10% 52% round 999px 999px 0px 0px)", "inset(0% 0% 0% 0% round 0px 0px 0px 0px)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-12%"]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.75], [1, 0]);
  const overlay = useTransform(scrollYProgress, [0, 0.6], [0, 0.45]);

  const copy = (
    <div className="relative z-10">

      <h1 className="mt-8">
        <span className="block max-w-xl font-sans text-base font-medium leading-snug tracking-normal text-limestone/80">{hero.kicker}</span>
        <span className="mt-6 block max-w-[12ch] font-display text-[clamp(2.75rem,5.4vw,6.25rem)] font-[330] leading-[0.98] tracking-[-0.025em]">
          <RiseText>{hero.title}</RiseText>
        </span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-limestone/85">{hero.body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/projects" tone="light">Explore Projects</ButtonLink>
        <a href="/contact-us" className="inline-flex min-h-11 items-center rounded-full border border-limestone/40 px-7 py-3 font-medium transition-colors hover:bg-limestone hover:text-charcoal">
          Book a Site Visit
        </a>
      </div>
    </div>
  );

  const statStrip = (
    <dl className="grid grid-cols-3 gap-6 border-t border-limestone/20 pt-6">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="text-sm text-limestone/70" style={{ fontVariantCaps: "all-small-caps" }}>{s.label}</dt>
          <dd className="font-display text-4xl text-terracotta lg:text-5xl"><CountUp value={s.value} suffix={s.suffix} /></dd>
        </div>
      ))}
    </dl>
  );

  if (!pinned) {
    return (
      <section ref={ref} className="bg-charcoal pt-32 text-limestone">
        <div className="container-x">{copy}</div>
        <div className="container-x mt-14">
          <CurtainImage image={images.hero} priority parallax className="arch aspect-[4/5] w-full" curtain="bg-charcoal" />
        </div>
        <div className="container-x py-12">{statStrip}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[230vh] bg-charcoal text-limestone">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.img
            src={images.hero.src}
            alt={images.hero.alt}
            width={images.hero.width}
            height={images.hero.height}
            fetchPriority="high"
            style={{ scale }}
            className="h-full w-full object-cover"
          />
          <motion.div aria-hidden className="absolute inset-0 bg-charcoal" style={{ opacity: overlay }} />
        </motion.div>
        <div className="container-x relative flex h-full flex-col justify-center pb-8 pt-24">
          <motion.div style={{ x: textX, opacity: textOpacity }} className="max-w-[48%]">{copy}</motion.div>
          <div className="mt-12 max-w-[48%]">{statStrip}</div>
        </div>
      </div>
    </section>
  );
}

export function Ticker() {
  return <Marquee items={ticker} className="border-y border-charcoal/15 bg-limestone text-charcoal" />;
}

/* S2 + S3 — About intro */
export function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  return (
    <section className="section-y bg-limestone">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>{aboutIntro.eyebrow}</Eyebrow>
          <h2 className="text-h2 mt-6 max-w-[16ch]"><RiseText>{aboutIntro.title}</RiseText></h2>
          <WordScrub text={aboutIntro.p1} className="measure mt-10 font-display text-[clamp(1.25rem,1.8vw,1.6rem)] leading-snug" />
          <WordScrub text={aboutIntro.p2} className="measure mt-6 text-lg" />
          <TextLink href="/about-us" className="mt-10">{aboutIntro.link}</TextLink>
        </div>
        <div ref={ref} className="relative lg:col-span-5 lg:col-start-8">
          <CurtainImage image={images.heritage} parallax className="arch aspect-[4/5] w-full" curtain="bg-rosewood" />
          <motion.svg
            aria-hidden
            viewBox="0 0 200 200"
            style={reduced ? {} : { rotate }}
            className="absolute -left-10 -top-10 h-36 w-36 text-rosewood lg:h-44 lg:w-44"
          >
            <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <circle cx="100" cy="100" r="99" className="fill-limestone" />
            <text fontSize="15" letterSpacing="3.2" fill="currentColor">
              <textPath href="#circ">70+ Years of Legacy · 70+ Years of Legacy ·</textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </section>
  );
}

/* S4 — Horizontal Estate Gallery */
export function ProjectsGallery() {
  const pinned = usePinnedMotion();
  return <ProjectsGalleryInner key={String(pinned)} pinned={pinned} />;
}
function ProjectsGalleryInner({ pinned }: { pinned: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);
  const bg = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["oklch(0.37 0.05 35)", "oklch(0.53 0.04 125)", "oklch(0.53 0.04 125)", "oklch(0.27 0.01 90)"]);
  const imgX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.round(v * 2)));

  return (
    <motion.section
      ref={ref}
      style={pinned ? { backgroundColor: bg } : {}}
      className={cn("text-limestone", pinned ? "h-[300vh]" : "bg-rosewood py-24")}
      aria-labelledby="projects-h"
    >
      <div className={cn(pinned && "sticky top-0 flex h-screen flex-col overflow-hidden")}>
        <div className="container-x flex items-end justify-between pt-24">
          <div>
            <Eyebrow>{projectsIntro.eyebrow}</Eyebrow>
            <h2 id="projects-h" className="text-h2 mt-4 max-w-[18ch]">{projectsIntro.title}</h2>
          </div>
          {pinned && (
            <p className="font-display text-7xl text-transparent" style={{ WebkitTextStroke: "1px var(--limestone)" }} aria-hidden>
              {idx + 1} / 3
            </p>
          )}
        </div>
        <motion.ol
          style={pinned ? { x } : {}}
          className={cn("flex", pinned ? "mt-8 flex-1" : "mt-12 snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6")}
        >
          {homeProjects.map((p, i) => (
            <li key={p.slug} className={cn(pinned ? "w-screen shrink-0" : "w-[85vw] shrink-0 snap-start sm:w-[60vw]")}>
              <div className={cn(pinned && "container-x grid h-full grid-cols-12 items-center gap-10 pb-16")}>
                <div className={cn("arch overflow-hidden", pinned ? "col-span-5 h-[62vh]" : "aspect-[4/5]")}>
                  {pinned ? (
                    <motion.img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" style={{ x: imgX, scale: 1.15 }} className="h-full w-full object-cover" />
                  ) : (
                    <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className={cn(pinned ? "col-span-6 col-start-7" : "mt-6")}>
                  <span className="tag">{p.tag}</span>
                  <p className="mt-6 text-limestone/80">{p.location}</p>
                  <h3 className={cn("mt-2", pinned ? "text-display-l" : "text-h2")}>{p.name}</h3>
                  <p className="mt-6 max-w-md font-display text-[1.5rem] leading-snug">{p.text}</p>
                  <a
                    href={`/projects/${p.slug}`}
                    className="group mt-8 inline-flex items-center gap-3 border-b border-limestone/40 pb-1 font-medium hover:border-limestone"
                    aria-label={`Explore Project: ${p.name}, ${p.location}`}
                  >
                    Explore Project <span className="sr-only">{p.name}</span>
                  </a>
                  {"caption" in p.image && <p className="mt-6 text-xs text-limestone/60">{p.image.caption}</p>}
                </div>
                {pinned && i === 0 && null}
              </div>
            </li>
          ))}
        </motion.ol>
        {pinned && (
          <div className="container-x pb-8">
            <div className="h-px bg-limestone/20">
              <motion.div className="h-px origin-left bg-terracotta" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function PillarIcon({ kind }: { kind: string }) {
  const paths: Record<string, string> = {
    arch: "M8 56V28a24 24 0 0 1 48 0v28M20 56V30a12 12 0 0 1 24 0v26",
    shield: "M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z M22 31l7 7 13-14",
    pin: "M32 58s-18-18-18-32a18 18 0 0 1 36 0c0 14-18 32-18 32z M32 32a6 6 0 1 0 0-12a6 6 0 0 0 0 12",
    hands: "M6 40l14-12 10 6 10-6 18 12 M14 34l12 12a4 4 0 0 0 6 0l14-14",
  };
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <motion.path d={paths[kind]} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} />
    </svg>
  );
}

/* S7 — Stacking pillars */
export function WhyChoose() {
  return (
    <section aria-labelledby="why-h" className="bg-limestone">
      <div className="container-x section-y pb-16">
        <Eyebrow>{whyIntro.eyebrow}</Eyebrow>
        <h2 id="why-h" className="text-h2 mt-6 max-w-[18ch]"><RiseText>{whyIntro.title}</RiseText></h2>
      </div>
      <div>
        {pillars.map((p, i) => (
          <div key={p.title} className={cn("sticky top-0 flex min-h-[80vh] items-center text-limestone lg:h-screen", p.bg)} style={{ zIndex: i + 1 }}>
            <div className="container-x grid gap-10 py-20 lg:grid-cols-12">
              <p className="font-display text-terracotta lg:col-span-2" aria-hidden>0{i + 1}</p>
              <div className="lg:col-span-6">
                <PillarIcon kind={p.icon} />
                <h3 className="text-display-l mt-8">{p.title}</h3>
              </div>
              <p className="self-end font-display text-[1.6rem] leading-snug lg:col-span-4">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
      <dl className="container-x relative z-10 grid grid-cols-1 gap-10 bg-limestone py-24 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border-t border-charcoal/15 pt-6">
            <dd className="text-display-l"><CountUp value={s.value} suffix={s.suffix} /></dd>
            <dt className="mt-2 text-charcoal/75" style={{ fontVariantCaps: "all-small-caps" }}>{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* S6 — Image-reveal list */
type Intro = { eyebrow: string; title: string; sub?: string };
export function Services({ items = services, intro = servicesIntro }: { items?: typeof services; intro?: Intro } = {}) {
  const [active, setActive] = useState<number | null>(null);
  const [tapped, setTapped] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  return (
    <section aria-labelledby="svc-h" className="section-y relative bg-charcoal text-limestone"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}>
      <div className="container-x">
        <Eyebrow>{intro.eyebrow}</Eyebrow>
        <h2 id="svc-h" className="text-h2 mt-6 max-w-[18ch]"><RiseText>{intro.title}</RiseText></h2>
        <ul className="mt-16 border-t border-limestone/15">
          {items.map((s, i) => (
            <li key={s.title} className="border-b border-limestone/15" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
              <button type="button" onClick={() => setTapped(tapped === i ? null : i)} aria-expanded={tapped === i}
                className="grid w-full gap-4 py-8 text-left transition-transform duration-300 lg:grid-cols-12 lg:hover:translate-x-4">
                <h3 className="text-h2 lg:col-span-7">{s.title}</h3>
                <p className="text-limestone/80 lg:col-span-4 lg:col-start-9 lg:self-center">{s.text}</p>
              </button>
              <AnimatePresence>
                {tapped === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden lg:hidden">
                    <img src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} loading="lazy" className="arch mb-8 aspect-[4/5] w-2/3 object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 hidden lg:block">
        <AnimatePresence>
          {active !== null && (
            <motion.img
              key={active}
              src={items[active]?.image.src}
              alt=""
              width={320}
              height={400}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="arch -ml-40 -mt-56 h-[400px] w-[320px] object-cover"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* NEW (SEO) — Where we build, with a light route line */
export function WhereWeBuild() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  return (
    <section aria-labelledby="where-h" className="section-y bg-limestone">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{whereWeBuild.eyebrow}</Eyebrow>
          <h2 id="where-h" className="text-h2 mt-6"><RiseText>{whereWeBuild.title}</RiseText></h2>
        </div>
        <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-charcoal/15">
            <motion.div className="h-full w-px origin-top bg-terracotta" style={{ scaleY: scrollYProgress }} />
          </div>
          {whereWeBuild.items.map((it) => (
            <li key={it.city} className="relative pb-14 pl-12 last:pb-0">
              <span aria-hidden className="absolute left-0 top-3 h-[15px] w-[15px] rounded-full border border-charcoal bg-limestone" />
              <h3 className="text-h3">{it.city}</h3>
              <p className="measure mt-3">{it.text}</p>
              <TextLink href={it.to} className="mt-4">{it.link}</TextLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* NEW (SEO) — Path to ownership */
export function PathToOwnership() {
  return (
    <section aria-labelledby="path-h" className="section-y bg-olive text-limestone">
      <div className="container-x">
        <Eyebrow>{pathIntro.eyebrow}</Eyebrow>
        <h2 id="path-h" className="text-h2 mt-6 max-w-[20ch]"><RiseText>{pathIntro.title}</RiseText></h2>
      </div>
      <ol className="container-x mt-16 grid gap-px bg-limestone/20 md:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="bg-charcoal p-8">
            <p aria-hidden className="font-display text-5xl text-terracotta">0{i + 1}</p>
            <h3 className="text-h3 mt-8">{s.title}</h3>
            <p className="mt-4 text-limestone/85">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-terracotta" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

/* S8 — Pinned quote cross-fade */
export function Testimonials({ intro = testimonialsIntro }: { intro?: Intro } = {}) {
  const pinned = usePinnedMotion();
  return <TestimonialsInner key={String(pinned)} pinned={pinned} intro={intro} />;
}
function TestimonialsInner({ pinned, intro }: { pinned: boolean; intro: Intro }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(3, Math.floor(v * 4))));
  const head = (
    <div>
      <Eyebrow>{intro.eyebrow}</Eyebrow>
      <h2 className="text-h2 mt-6 max-w-[16ch]">{intro.title}</h2>
      <p className="mt-6 max-w-md text-limestone/85">{intro.sub}</p>
    </div>
  );
  if (!pinned) {
    return (
      <section ref={ref} className="section-y bg-rosewood text-limestone">
        <div className="container-x">{head}</div>
        <ul className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4">
          {testimonials.map((t) => (
            <li key={t.name} className="w-[85vw] shrink-0 snap-start border border-limestone/20 p-7 sm:w-[60vw]">
              <Stars />
              <blockquote className="mt-6 font-display text-xl leading-snug">"{t.quote}"</blockquote>
              <p className="mt-6 font-medium">{t.name}</p>
              <p className="text-sm text-limestone/75">{t.meta}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section ref={ref} className="relative h-[300vh] bg-rosewood text-limestone">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-x grid w-full grid-cols-12 gap-10">
          <div className="col-span-4">{head}
            <div className="mt-12 flex gap-2" aria-hidden>
              {testimonials.map((_, i) => <span key={i} className={cn("h-px w-10 transition-colors", i === idx ? "bg-terracotta" : "bg-limestone/25")} />)}
            </div>
          </div>
          <ul className="relative col-span-7 col-start-6 min-h-[420px]">
            {testimonials.map((t, i) => (
              <motion.li
                key={t.name}
                className="absolute inset-0"
                animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : i < idx ? -24 : 24 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={i !== idx}
              >
                <Stars />
                <blockquote className="mt-8 font-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-snug">"{t.quote}"</blockquote>
                <div className="mt-10 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-limestone/40 font-display text-lg">{t.initials}</span>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-limestone/75">{t.meta}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Faq({
  items = faqs,
  intro = faqIntro,
}: {
  items?: { q: string; a: string }[];
  intro?: Intro;
} = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Monitor internal scroll position and progress
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      setCanScrollDown(false);
      return;
    }
    const current = el.scrollTop;
    setScrollProgress(Math.min(100, Math.max(0, Math.round((current / maxScroll) * 100))));
    setCanScrollDown(current < maxScroll - 6);
  };

  useEffect(() => {
    checkScroll();
  }, [items, open]);

  // Lock wheel scrolling strictly inside FAQ box when hovering:
  // When cursor is inside the FAQ box, scrolling stays within the box and never moves the page!
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const atTop = el.scrollTop <= 0 && e.deltaY < 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0;

      // Keep event from bubbling up to page or Lenis
      e.stopPropagation();

      // At top or bottom boundaries, prevent default so parent page doesn't scroll while hovering
      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section aria-labelledby="faq-h" className="section-y bg-limestone">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        {/* ── Left Column: Sticky Title & Interactive Indicator ("the other side") ── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2 id="faq-h" className="text-h2 mt-6">
              {intro.title}
            </h2>

            {/* Interactive Scroll Status & Indicator */}
            <div className="mt-8 border-t border-charcoal/15 pt-6 hidden sm:block">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em]">
              </div>

              <p className="mt-3 text-xs text-charcoal/50 max-w-[28ch] leading-relaxed">
                Hover or touch outside the box on this side to scroll the website.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right Column: Framed FAQ Scroll Container ── */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div
            className={cn(
              "relative bg-limestone border transition-all duration-300 overflow-hidden",
              isHovered
                ? "border-charcoal/30 shadow-lg shadow-charcoal/5"
                : "border-charcoal/15"
            )}
          >
            {/* Top Minimalist Header */}
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-3.5 bg-charcoal/[0.03]">
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-charcoal/60">
                Frequently Asked Questions
              </span>
            </div>

            {/* Scrollable Questions List with Lenis Prevent */}
            <div
              ref={scrollRef}
              data-lenis-prevent="true"
              onScroll={checkScroll}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="faq-scroll-box max-h-[460px] sm:max-h-[520px] lg:max-h-[560px] overflow-y-auto overscroll-contain px-6 sm:px-8 py-2"
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <ul className="divide-y divide-charcoal/10">
                {items.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <li key={f.q} className="py-2">
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-${i}`}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-6 py-4 text-left font-display text-[1.2rem] sm:text-[1.3rem] leading-snug transition-colors hover:text-terracotta"
                        >
                          <span>{f.q}</span>
                          <span aria-hidden className="relative h-4 w-4 shrink-0">
                            <span className="absolute left-0 top-1/2 h-px w-4 bg-charcoal" />
                            <span
                              className={cn(
                                "absolute left-0 top-1/2 h-px w-4 bg-charcoal transition-transform duration-300",
                                !isOpen && "rotate-90"
                              )}
                            />
                          </span>
                        </button>
                      </h3>
                      <motion.div
                        id={`faq-${i}`}
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="measure pb-5 pt-1 text-[0.95rem] leading-relaxed text-charcoal/80">
                          {f.a}
                        </p>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Subtle Gradient Shadow Indicator at Bottom when more items exist */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-limestone via-limestone/80 to-transparent transition-opacity duration-300",
                canScrollDown ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Bottom Status / Guidance Bar */}
            <div className="flex items-center justify-between border-t border-charcoal/10 px-6 py-2.5 bg-charcoal/[0.02] text-[11px] text-charcoal/50">
              <span className="hidden sm:inline font-mono text-[10px]">
                Hover outside box to scroll page
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cta({ title = cta.title, body = cta.body, children }: { title?: string; body?: string; children?: React.ReactNode } = {}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);
  return (
    <section ref={ref} className="relative overflow-hidden text-limestone">
      <img src={images.cta.src} alt="" aria-hidden width={images.cta.width} height={images.cta.height} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0 bg-charcoal/55" />
      <motion.div style={{ scale }} className="container-x relative flex min-h-[80vh] flex-col items-start justify-center py-28">
        <h2 className="text-display-l max-w-[14ch]">{title}</h2>
        <p className="mt-6 max-w-md text-lg">{body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {children ?? <>
            <ButtonLink href="/contact-us" tone="light">Enquire Now</ButtonLink>
            <ButtonA href={site.phoneHref} tone="light" className="bg-transparent text-limestone outline outline-1 outline-limestone/50">Call {site.phone}</ButtonA>
          </>}
        </div>
      </motion.div>
    </section>
  );
}
