import { motion } from "framer-motion";
import { useRef } from "react";
import { PageHeader } from "@/components/pages/shared";
import { Cta } from "@/components/home/sections";
import { ButtonLink } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

/* ── Video Data ───────────────────────────────────────────────── */

const mainVideo = {
  id: "FEN5jr72odk",
  title: "Royal Infra Realty — Our Vision & Landmark Journey",
  subtitle:
    "An intimate exploration into our seventy-year philosophy of crafting sustainable gated communities, residential plots, and managed farmlands across Karnataka.",
  badge: "Official Film",
};

const galleryVideos = [
  {
    id: "L_jche0H2_c",
    num: "01",
    tag: "Walkthrough",
    title: "Project Walkthrough",
    subtitle: "On-ground and aerial perspective of our master-planned plotted developments.",
  },
  {
    id: "oEZZevElcNU",
    num: "02",
    tag: "Community",
    title: "Community & Sanctuary Living",
    subtitle: "Life amidst open greenery, managed farmlands, and gated sanctuary living.",
  },
  {
    id: "CGcNjc8D0mg",
    num: "03",
    tag: "Heritage",
    title: "Seven Decades of Trust",
    subtitle: "The entrepreneurial legacy and enduring foundational values guiding every project.",
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

/* ── Page Component ───────────────────────────────────────────── */

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
      <VideoGallerySection />
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

/* ── Unified Video Gallery Section on Light Limestone Background ── */

function VideoGallerySection() {
  return (
    <section aria-labelledby="gallery-heading" className="bg-limestone py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        {/* ── Common Section Header (No "Featured Video" Heading) ── */}
        <div className="mb-12 sm:mb-16 lg:mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta"
          >
            <span aria-hidden className="inline-block h-px w-5 bg-terracotta" />
            <span>Curated Films & Walkthroughs</span>
          </motion.div>

          <motion.h2
            id="gallery-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-tight text-charcoal font-light"
          >
            Discover our developments in motion.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-charcoal/75 leading-relaxed"
          >
            Watch real site footage, landscape fly-throughs, and community highlights from
            our prime projects across Bengaluru, Mysuru, Gadag, Bellary, and Gundlupet.
          </motion.p>
        </div>

        {/* ── Top Main Showcase Video ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl sm:rounded-2xl bg-charcoal shadow-2xl shadow-charcoal/15 ring-1 ring-charcoal/10"
        >
          {/* Main 16:9 Video Embed */}
          <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
            <iframe
              src={`https://www.youtube.com/embed/${mainVideo.id}?rel=0&modestbranding=1&color=white`}
              title={mainVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Elegant Architectural Caption Strip Below Video */}
          <div className="border-t border-limestone/10 bg-charcoal px-6 py-5 sm:px-8 sm:py-6 text-limestone flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-terracotta/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-terracotta">
                {mainVideo.badge}
              </span>
              <h3 className="mt-2 font-display text-lg sm:text-xl md:text-2xl text-limestone font-light leading-snug">
                {mainVideo.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-limestone/70 leading-relaxed">
                {mainVideo.subtitle}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Aesthetic Architectural Divider ─────────────────── */}
        <div className="my-16 sm:my-20 lg:my-24 flex items-center justify-center gap-4">
          <span className="h-px w-24 sm:w-40 bg-charcoal/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
          <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-charcoal/50">
            More Project Stories
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
          <span className="h-px w-24 sm:w-40 bg-charcoal/15" />
        </div>

        {/* ── Below: 3 Complementary Videos in a Creative Grid ── */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {galleryVideos.map((video, idx) => (
            <VideoCard key={video.id} video={video} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Secondary Video Card ─────────────────────────────────────── */

function VideoCard({
  video,
  index,
}: {
  video: (typeof galleryVideos)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col justify-between overflow-hidden rounded-xl bg-limestone border border-charcoal/15 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-charcoal/30 hover:shadow-lg hover:shadow-charcoal/5"
    >
      <div>
        {/* Top Tag & Numbering */}
        <div className="mb-3.5 flex items-center justify-between text-xs">
          <span className="font-display font-light text-terracotta text-sm">
            {video.num}
          </span>
          <span className="rounded-full bg-charcoal/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal/60">
            {video.tag}
          </span>
        </div>

        {/* Video Embed Frame */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-charcoal shadow-inner ring-1 ring-charcoal/10">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&color=white`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {/* Title and Subtitle */}
        <div className="mt-4">
          <h3 className="font-display text-lg sm:text-xl font-normal leading-snug tracking-tight text-charcoal group-hover:text-terracotta transition-colors duration-200">
            {video.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-[0.875rem] text-charcoal/70 leading-relaxed">
            {video.subtitle}
          </p>
        </div>
      </div>

      {/* Terracotta Bottom Accent Line */}
      <div className="mt-5 pt-3 border-t border-charcoal/10 flex items-center justify-between text-[11px] text-charcoal/50 font-mono">
        <span>Royal Infra Series</span>
        <span className="text-terracotta transition-transform duration-300 group-hover:translate-x-1">
          ▶ Watch
        </span>
      </div>
    </motion.div>
  );
}
