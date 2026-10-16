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
  aboutIntro, cta, faqIntro, faqs, festiveOffer, hero, homeProjects, pathIntro, pillars, projectsIntro,
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
  const textX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-6%"]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.78], [1, 0]);
  const overlay = useTransform(scrollYProgress, [0, 0.6], [0, 0.45]);

  const copy = (
    <div className="relative z-10 w-full">
      <p className="max-w-[42ch] font-sans text-xs font-medium leading-relaxed tracking-normal text-limestone/80 sm:text-sm lg:text-base">
        {hero.kicker}
      </p>

      <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,5.5rem)] font-[300] leading-[1.02] tracking-[-0.025em] sm:mt-5 lg:mt-6">
        <RiseText>{hero.title}</RiseText>
      </h1>

      <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-limestone/85 sm:mt-5 sm:text-base lg:mt-6 lg:text-lg">
        {hero.body}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
        <ButtonLink href="/projects" tone="light">
          Explore Projects
        </ButtonLink>
        <a
          href="/contact-us"
          className="inline-flex min-h-11 items-center rounded-full border border-limestone/40 px-6 py-3 text-sm font-medium transition-colors hover:bg-limestone hover:text-charcoal sm:px-7 sm:text-base"
        >
          Book a Site Visit
        </a>
      </div>
    </div>
  );

  /* No top border, no full-width stretch — sits on the left, grouped tightly */
  const statStrip = (
    <dl className="grid w-fit grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-16">
      {stats.map((s) => (
        <div key={s.label} className="min-w-0">
          <dt
            className="text-[0.65rem] leading-tight text-limestone/70 sm:text-xs lg:text-sm"
            style={{ fontVariantCaps: "all-small-caps" }}
          >
            {s.label}
          </dt>
          <dd className="mt-1 font-display text-2xl leading-none text-terracotta sm:mt-2 sm:text-3xl lg:text-4xl xl:text-5xl">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );

  /* ---------- Fallback: reduced motion / no pinning ---------- */
  if (!pinned) {
    return (
      <section ref={ref} className="bg-charcoal pt-28 text-limestone sm:pt-32">
        <div className="container-x">{copy}</div>
        <div className="container-x mt-12 sm:mt-14">
          <CurtainImage
            image={images.hero}
            priority
            parallax
            className="arch aspect-[4/5] w-full"
            curtain="bg-charcoal"
          />
        </div>
        <div className="container-x flex justify-start py-12 sm:py-14">{statStrip}</div>
      </section>
    );
  }

  /* ---------- Pinned scroll hero ---------- */
  return (
    <section ref={ref} className="relative h-[230vh] bg-charcoal text-limestone">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Arch image that opens into a full-bleed frame */}
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

        {/* Readability scrim — vertical on mobile, horizontal on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/35 lg:bg-gradient-to-r lg:from-charcoal lg:via-charcoal/50 lg:to-transparent"
        />

        {/* Content column — copy then stats, both left-aligned, never overlapping */}
        <div className="container-x relative flex h-full flex-col justify-center gap-6 pb-8 pt-24 sm:gap-8 sm:pb-10 lg:gap-10 lg:pb-14 lg:pt-32">
          <motion.div style={{ x: textX, opacity: textOpacity }} className="w-full">
            {copy}
          </motion.div>
          <motion.div style={{ opacity: textOpacity }} className="flex w-full justify-start">
            {statStrip}
          </motion.div>
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

/* ── Royal Utsav 2026 Festive Offers ──────────────────────── */
import royalUtsavImg from "@/assets/Royal Utsav 2026 Festive Rewards.png";
import { Gift, Home, ShieldCheck, Bike, Plane, MapPin, Sparkles, ArrowRight } from "lucide-react";

const highlightIcons: Record<string, typeof Gift> = { gift: Gift, home: Home, shield: ShieldCheck };
const rewardIcons: Record<string, typeof Bike> = { bike: Bike, plane: Plane };

export function FestiveOffers() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.06]);
  const shimmerX = useTransform(scrollYProgress, [0.1, 0.5], ["-200%", "200%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="festive-h"
      className="relative overflow-hidden bg-charcoal text-limestone"
    >
      {/* Warm ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,oklch(0.37_0.08_45/0.3),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_70%,oklch(0.30_0.06_35/0.25),transparent_60%)]"
      />

      <div className="container-x relative py-16 sm:py-20 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: Festive banner (6 cols — balanced 50/50) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:sticky lg:top-28 lg:col-span-6 lg:mx-0 lg:max-w-none"
          >
            <a
              href="/contact-us"
              aria-label="Royal Utsav 2026 — Reveal your festive reward"
              className="group relative block overflow-hidden rounded-2xl ring-1 ring-terracotta/25 transition-shadow duration-500 hover:shadow-2xl hover:shadow-terracotta/20 sm:rounded-3xl"
            >
              <motion.img
                src={royalUtsavImg}
                alt="Royal Utsav 2026 — Get a Honda Activa or Suzuki Burgman absolutely free, or a fully sponsored Dubai holiday for two, on successful property registration."
                width={1536}
                height={1024}
                loading="lazy"
                style={{ y: imageY, scale: imageScale }}
                className="block h-auto w-full"
              />
              <motion.div
                aria-hidden
                style={{ x: shimmerX }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px oklch(0.55 0.12 45 / 0.45), inset 0 0 60px oklch(0.55 0.12 45 / 0.12)",
                }}
              />
            </a>

            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-64 rounded-full bg-terracotta/[0.14] blur-[80px]"
            />
          </motion.div>

          {/* ── Right: Full reward details (6 cols) ── */}
          <div className="lg:col-span-6 lg:col-start-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/20 text-terracotta">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-terracotta/50"
                />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
                {festiveOffer.eyebrow}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              id="festive-h"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-[clamp(2rem,3.2vw,2.75rem)] font-[330] leading-[1.08] tracking-tight"
            >
              {festiveOffer.title.split(",").map((part, i) =>
                i === 0 ? (
                  <span key={i}>{part},</span>
                ) : (
                  <span key={i} className="italic text-terracotta">
                    {part}
                  </span>
                ),
              )}
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="measure mt-6 text-lg leading-relaxed text-limestone/85"
            >
              {festiveOffer.body}
            </motion.p>

            {/* ── Reward Cards (full details) ── */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {festiveOffer.rewards.map((r, i) => {
                const Icon = rewardIcons[r.icon] ?? Gift;
                return (
                  <motion.div
                    key={r.project}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-limestone/10 bg-limestone/[0.04] p-4 backdrop-blur-sm transition-colors duration-500 hover:border-terracotta/30 hover:bg-limestone/[0.08] sm:p-5"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-terracotta/0 blur-[20px] transition-colors duration-500 group-hover:bg-terracotta/20"
                    />

                    {/* Location + project */}
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-terracotta" strokeWidth={2} />
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-limestone/70">
                        {r.location}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[0.7rem] text-limestone/50">{r.project}</p>

                    {/* Reward */}
                    <div className="mt-4 flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-base font-medium leading-tight">
                        {r.reward}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-limestone/70">
                      {r.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Highlights strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-limestone/10 pt-6 sm:gap-x-8"
            >
              {festiveOffer.highlights.map((h) => {
                const HIcon = highlightIcons[h.icon] ?? Gift;
                return (
                  <div key={h.label} className="flex items-center gap-2.5 text-limestone/80">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                      <HIcon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.12em]">
                      {h.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* ── CTA + disclaimer ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <a
                href="/contact-us"
                className="group/cta inline-flex items-center gap-3 rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-limestone transition-all duration-300 hover:bg-terracotta/90 hover:shadow-lg hover:shadow-terracotta/25"
              >
                {festiveOffer.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                  strokeWidth={2}
                />
              </a>
              <p className="max-w-[30ch] text-xs leading-relaxed text-limestone/45">
                {festiveOffer.disclaimer}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div
        aria-hidden
        className="pointer-events-none h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"
      />
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
  const bg = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    ["oklch(0.37 0.05 35)", "oklch(0.53 0.04 125)", "oklch(0.53 0.04 125)", "oklch(0.27 0.01 90)"],
  );
  const imgX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.round(v * 2)));

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <Eyebrow>{projectsIntro.eyebrow}</Eyebrow>
        <h2 id="projects-h" className="text-h2 mt-4 max-w-[18ch]">
          {projectsIntro.title}
        </h2>
      </div>
      {pinned && (
        <p
          className="font-display text-6xl leading-none text-transparent lg:text-7xl"
          style={{ WebkitTextStroke: "1px var(--limestone)" }}
          aria-hidden
        >
          {idx + 1} / 3
        </p>
      )}
    </div>
  );

  /* ---------- Mobile / reduced-motion: vertical stacked cards ---------- */
  if (!pinned) {
    return (
      <section
        ref={ref}
        aria-labelledby="projects-h"
        className="bg-rosewood py-20 text-limestone sm:py-24"
      >
        <div className="container-x">{header}</div>

        <ol className="container-x mt-12 grid gap-14 sm:gap-16 lg:grid-cols-3 lg:gap-8">
          {homeProjects.map((p) => (
            <li key={p.slug} className="group flex flex-col">
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
                <img
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-6 flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="tag">{p.tag}</span>
                  <span className="text-sm text-limestone/75">{p.location}</span>
                </div>

                <h3 className="text-h3 mt-4">{p.name}</h3>
                <p className="mt-3 max-w-[44ch] text-limestone/85">{p.text}</p>

                <a
                  href={`/projects/${p.slug}`}
                  className="group/link mt-6 inline-flex w-fit items-center gap-3 border-b border-limestone/40 pb-1 font-medium transition-colors hover:border-limestone"
                  aria-label={`Explore Project: ${p.name}, ${p.location}`}
                >
                  Explore Project
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  /* ---------- Desktop: pinned horizontal scroll ---------- */
  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: bg }}
      aria-labelledby="projects-h"
      className="relative h-[300vh] text-limestone"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="container-x pt-20 lg:pt-14">{header}</div>

        <motion.ol style={{ x }} className="flex flex-1 items-center">
          {homeProjects.map((p) => (
            <li key={p.slug} className="w-screen shrink-0">
              <div className="container-x grid grid-cols-12 items-center gap-8 lg:gap-12">
                {/* Image — rounded rectangle */}
                <div className="col-span-6 col-start-1">
                  <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
                    <motion.img
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      loading="lazy"
                      style={{ x: imgX, scale: 1.1 }}
                      className="h-[44vh] w-full object-cover lg:h-[56vh]"
                    />
                  </div>
                </div>

                {/* Content — vertically centered, left aligned */}
                <div className="col-span-5 col-start-8 flex flex-col justify-center">
                  <span className="tag w-fit">{p.tag}</span>

                  <p className="mt-5 text-sm text-limestone/80 lg:text-base">{p.location}</p>

                  <h3 className="text-display-l mt-2">{p.name}</h3>

                  <p className="mt-5 max-w-md font-display text-lg leading-snug lg:text-[1.5rem]">
                    {p.text}
                  </p>

                  <a
                    href={`/projects/${p.slug}`}
                    className="mt-8 inline-flex w-fit items-center gap-3 border-b border-limestone/40 pb-1 font-medium transition-colors hover:border-limestone"
                    aria-label={`Explore Project: ${p.name}, ${p.location}`}
                  >
                    Explore Project
                  </a>
                </div>
              </div>
            </li>
          ))}
        </motion.ol>

        <div className="container-x pb-8">

        </div>
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
      <div className="container-x pt-20 pb-14 sm:pt-24 lg:pt-28">
        <Eyebrow>{whyIntro.eyebrow}</Eyebrow>
        <h2 id="why-h" className="text-h2 mt-6 max-w-[18ch]">
          <RiseText>{whyIntro.title}</RiseText>
        </h2>
      </div>

      <div>
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={cn(
              "sticky top-0 flex items-center text-limestone",
              "min-h-[auto] py-16 sm:py-20 lg:min-h-[70vh] lg:py-24",
              p.bg,
            )}
            style={{ zIndex: i + 1 }}
          >
            <div className="container-x grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <p
                aria-hidden
                className="font-display text-3xl text-terracotta sm:text-4xl lg:col-span-2 lg:text-5xl"
              >
                0{i + 1}
              </p>

              <div className="lg:col-span-6">
                <PillarIcon kind={p.icon} />
                <h3 className="text-display-l mt-6 lg:mt-8">{p.title}</h3>
              </div>

              <p className="font-display text-lg leading-snug sm:text-xl lg:col-span-4 lg:text-[1.6rem]">
                {p.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <dl className="container-x relative z-10 grid grid-cols-1 gap-8 bg-limestone py-16 sm:grid-cols-3 sm:gap-10 lg:py-20">
        {stats.map((s) => (
          <div key={s.label} className="border-t border-charcoal/15 pt-5">
            <dd className="text-display-l">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
            <dt
              className="mt-2 text-charcoal/75"
              style={{ fontVariantCaps: "all-small-caps" }}
            >
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* S6 — Image-reveal list (text-only) */
type Intro = { eyebrow: string; title: string; sub?: string };

export function Services({
  items = services,
  intro = servicesIntro,
}: { items?: typeof services; intro?: Intro } = {}) {
  const [tapped, setTapped] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="svc-h"
      className="section-y relative bg-charcoal text-limestone"
    >
      <div className="container-x">
        <Eyebrow>{intro.eyebrow}</Eyebrow>
        <h2 id="svc-h" className="text-h2 mt-6 max-w-[18ch]">
          <RiseText>{intro.title}</RiseText>
        </h2>

        <ul className="mt-16 border-t border-limestone/15">
          {items.map((s, i) => (
            <li key={s.title} className="border-b border-limestone/15">
              <button
                type="button"
                onClick={() => setTapped(tapped === i ? null : i)}
                aria-expanded={tapped === i}
                className="grid w-full gap-4 py-8 text-left transition-transform duration-300 lg:grid-cols-12 lg:hover:translate-x-4"
              >
                <h3 className="font-display text-[clamp(2.35rem,2.4vw,2rem)] font-[330] leading-tight tracking-tight lg:col-span-7">
                  {s.title}
                </h3>
                <p className="text-limestone/80 lg:col-span-4 lg:col-start-9 lg:self-center">
                  {s.text}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
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

export function Cta({
  title = cta.title,
  body = cta.body,
  children,
}: { title?: string; body?: string; children?: React.ReactNode } = {}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  return (
    <section ref={ref} className="bg-limestone py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <motion.div
          style={{ scale }}
          className="relative overflow-hidden rounded-2xl text-limestone sm:rounded-3xl"
        >
          <img
            src={images.cta.src}
            alt=""
            aria-hidden
            width={images.cta.width}
            height={images.cta.height}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-charcoal/60" />

          <div className="relative flex min-h-[60vh] flex-col items-start justify-center px-6 py-20 sm:px-10 sm:py-24 lg:min-h-[70vh] lg:px-16 lg:py-28">
            <h2 className="text-display-l max-w-[14ch]">{title}</h2>
            <p className="mt-6 max-w-md text-lg">{body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {children ?? (
                <>
                  <ButtonLink href="/contact-us" tone="light">
                    Enquire Now
                  </ButtonLink>
                  <ButtonA
                    href={site.phoneHref}
                    tone="light"
                    className="bg-transparent text-limestone outline outline-1 outline-limestone/50"
                  >
                    Call {site.phone}
                  </ButtonA>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
