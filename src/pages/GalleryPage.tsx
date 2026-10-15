import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { PageHeader, SectionHead } from "@/components/pages/shared";
import { RiseText } from "@/components/motion/primitives";
import { Cta } from "@/components/home/sections";
import { ButtonLink } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

/* ── Video data ───────────────────────────────────────────────── */

const heroVideo = {
  id: "FEN5jr72odk",
  title: "Royal Infra Realty — Our Vision",
};

const secondaryVideos = [
  {
    id: "L_jche0H2_c",
    title: "Project Walkthrough",
    subtitle: "Explore our flagship developments",
  },
  {
    id: "oEZZevElcNU",
    title: "Community Living",
    subtitle: "Life at Royal Infra communities",
  },
  {
    id: "CGcNjc8D0mg",
    title: "Building Trust",
    subtitle: "Our journey of 70+ years",
  },
];

const marqueeItems = [
  "Video Gallery",
  "Royal Infra Realty",
  "Premium Living",
  "Managed Farmland",
  "Gated Communities",
  "Plots & Farmland",
] as const;

/* ── Page ─────────────────────────────────────────────────────── */

export function GalleryPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        title="Our Visual Story"
        intro="Experience Royal Infra Realty through our curated collection of project walkthroughs, community life, and the vision that drives us."
        marquee={marqueeItems}
        contours
      />
      <HeroVideo />
      <SecondaryVideos />
      <Cta
        title="Ready to build your future?"
        body="Explore our premium plots and managed farmland across Karnataka."
      >
        <ButtonLink href="/projects" tone="light">
          View Projects
        </ButtonLink>
        <ButtonLink
          href="/contact-us"
          tone="light"
          className="bg-transparent text-limestone outline outline-1 outline-limestone/50"
        >
          Book a Site Visit
        </ButtonLink>
      </Cta>
    </>
  );
}

/* ── S1 — Full-screen hero video ──────────────────────────────── */

function HeroVideo() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0px", "0px"],
  );
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.96, 1]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-video-h"
      className="bg-charcoal"
    >
      <div className="container-x py-12 sm:py-16 lg:py-20">
        {/* Label */}
        <div className="mb-10 flex flex-col items-center text-center text-limestone">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 h-px bg-terracotta"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-3 text-[0.85rem] font-medium uppercase tracking-[0.14em] text-terracotta"
          >
            <Play className="h-3.5 w-3.5" strokeWidth={2} />
            Featured Video
          </motion.p>
          <h2
            id="hero-video-h"
            className="text-h2 mt-5 max-w-[20ch] text-limestone"
          >
            <RiseText>{heroVideo.title}</RiseText>
          </h2>
        </div>

        {/* Video embed — full-width, cinema aspect ratio */}
        <motion.div
          style={{ scale, borderRadius }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full overflow-hidden"
        >
          {/* Decorative frame corners */}
          <FrameCorners />

          <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
            <iframe
              src={`https://www.youtube.com/embed/${heroVideo.id}?rel=0&modestbranding=1&color=white`}
              title={heroVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── S2 — Three secondary videos ──────────────────────────────── */

function SecondaryVideos() {
  return (
    <section
      aria-labelledby="more-videos-h"
      className="section-y bg-limestone"
    >
      <div className="container-x">
        <SectionHead
          id="more-videos-h"
          eyebrow="More Videos"
          title="Explore Our Journey"
        >
          <p className="measure mt-6 text-charcoal/75">
            Dive deeper into our projects, community living, and the legacy
            that defines Royal Infra Realty.
          </p>
        </SectionHead>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {secondaryVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Video card ───────────────────────────────────────────────── */

function VideoCard({
  video,
  index,
}: {
  video: (typeof secondaryVideos)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      {/* Video frame */}
      <div className="relative overflow-hidden rounded-sm">
        {/* Curtain wipe overlay */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-10 origin-top bg-rosewood"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            delay: index * 0.12,
            ease: [0.65, 0, 0.35, 1],
          }}
        />

        <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&color=white`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      {/* Meta */}
      <div className="mt-5">
        <motion.span
          aria-hidden
          className="mb-2 block font-display text-sm text-terracotta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
        >
          0{index + 1}
        </motion.span>
        <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.5rem)] leading-snug tracking-tight">
          {video.title}
        </h3>
        <p className="mt-2 text-[0.95rem] text-charcoal/65">
          {video.subtitle}
        </p>

        {/* Animated underline */}
        <motion.div
          className="mt-4 h-px bg-charcoal/15"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.4 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
}

/* ── Decorative frame corners ─────────────────────────────────── */

function FrameCorners() {
  const size = "h-6 w-6 sm:h-8 sm:w-8";
  const stroke = "stroke-terracotta/50";
  return (
    <>
      {/* Top-left */}
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        fill="none"
        className={cn("absolute left-3 top-3 z-10", size)}
      >
        <path d="M0 16V2a2 2 0 0 1 2-2h14" className={stroke} strokeWidth="1.5" />
      </svg>
      {/* Top-right */}
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        fill="none"
        className={cn("absolute right-3 top-3 z-10", size)}
      >
        <path d="M32 16V2a2 2 0 0 0-2-2H16" className={stroke} strokeWidth="1.5" />
      </svg>
      {/* Bottom-left */}
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        fill="none"
        className={cn("absolute bottom-3 left-3 z-10", size)}
      >
        <path d="M0 16v14a2 2 0 0 0 2 2h14" className={stroke} strokeWidth="1.5" />
      </svg>
      {/* Bottom-right */}
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        fill="none"
        className={cn("absolute bottom-3 right-3 z-10", size)}
      >
        <path d="M32 16v14a2 2 0 0 1-2 2H16" className={stroke} strokeWidth="1.5" />
      </svg>
    </>
  );
}
