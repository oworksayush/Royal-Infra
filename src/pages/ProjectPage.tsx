import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProject, plotChecklist, projects, type Project } from "@/data/projects";
import type { ImageEntry } from "@/data/images";
import { Breadcrumbs, SectionHead } from "@/components/pages/shared";
import { CurtainImage, RiseText } from "@/components/motion/primitives";
import { Cta, Faq } from "@/components/home/sections";
import { ButtonLink, TextLink } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

export function ProjectPage({ slug }: { slug: string }) {
  const p = getProject(slug);
  if (!p) return <NotFound />;
  const others = projects.filter((x) => x.slug !== p.slug);
  const next = projects[(projects.indexOf(p) + 1) % projects.length]!;
  return (
    <>
      <Hero p={p} />
      <Overview p={p} />
      <section aria-labelledby="who-h" className="bg-limestone pb-24">
        <div className="container-x grid gap-10 border-t border-charcoal/15 pt-16 lg:grid-cols-12">
          <h2 id="who-h" className="text-h3 lg:col-span-4">Who this is for</h2>
          <p className="measure text-lg lg:col-span-7 lg:col-start-6">{p.whoFor}</p>
        </div>
      </section>
      <Highlights p={p} />
      <Amenities p={p} />
      <Gallery images={p.gallery} />
      <Location p={p} />
      <Approvals p={p} />
      <Faq items={p.faqs} intro={{ eyebrow: "Frequently Asked Questions", title: `${p.name} questions` }} />
      <section aria-labelledby="rel-h" className="section-y bg-rosewood text-limestone">
        <div className="container-x">
          <SectionHead id="rel-h" eyebrow="Related projects" title="More from Royal Infra" />
          <ul className="mt-14 grid gap-10 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <a href={`/projects/${o.slug}`} className="group grid grid-cols-[120px_1fr] items-center gap-6">
                  <img src={o.hero.src} alt="" width={o.hero.width} height={o.hero.height} loading="lazy" className="arch aspect-[4/5] w-full object-cover" />
                  <span>
                    <span className="text-h3 block group-hover:underline">{o.name}</span>
                    <span className="mt-1 block text-limestone/80">{o.listMeta}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-14 flex flex-wrap gap-8">
            <TextLink href="/locations">See all Royal Infra locations across Karnataka</TextLink>
            <TextLink href="/contact-us">Book a site visit with our team</TextLink>
          </p>
        </div>
      </section>
      <Cta title={p.cta.title} body={p.cta.body}>
        <ButtonLink href="/contact-us" tone="light">{p.cta.button}</ButtonLink>
      </Cta>
      <NextProject p={next} />
      <p className="bg-limestone py-6 text-center text-sm text-charcoal/75">Images are representative; actual development may vary.</p>
    </>
  );
}

function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-limestone px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4 text-xl">Project not found</p>
        <a href="/projects" className="mt-6 inline-block underline">View projects</a>
      </div>
    </section>
  );
}

function Hero({ p }: { p: Project }) {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden text-limestone">
      <CurtainImage image={{ id: p.hero.id, alt: p.hero.alt, width: p.hero.width, height: p.hero.height, kind: p.hero.kind, ...(p.hero.src ? { src: p.hero.src } : {}) }} priority className="!absolute inset-0" curtain="bg-charcoal" />
      <div aria-hidden className="absolute inset-0 bg-charcoal/55" />
      <div className="container-x relative pb-12 pt-40">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Projects", to: "/projects" }, { label: p.name }]} />
        <span className="tag mt-10">{p.tag}</span>
        <h1 className="mt-6">
          <span className="text-display-xl block"><RiseText>{p.name}</RiseText></span>
          <span className="mt-6 block max-w-2xl font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-snug">{p.subtitle}</span>
        </h1>
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-limestone/25 pt-6 md:grid-cols-4">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dd className="font-display text-2xl lg:text-3xl">{f.value}</dd>
              <dt className="mt-1 text-sm text-limestone/80">{f.label}</dt>
            </div>
          ))}
        </dl>
        {p.hero.caption && <p className="mt-6 text-xs text-limestone/70">{p.hero.caption}</p>}
      </div>
    </section>
  );
}

function Overview({ p }: { p: Project }) {
  return (
    <section aria-labelledby="ov-h" className="section-y bg-limestone">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <CurtainImage image={p.gallery.find((g) => g.src) ?? p.hero} parallax className="arch aspect-[4/5] w-full" curtain="bg-olive" />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHead id="ov-h" eyebrow={p.overview.eyebrow} title={p.overview.title} />
          <p className="measure mt-10 text-lg">{p.overview.text}</p>
          <dl className="mt-12 border-t border-charcoal/15">
            {p.overview.specs.map((s) => (
              <div key={s.label} className="grid gap-2 border-b border-charcoal/15 py-5 sm:grid-cols-2">
                <dt className="text-charcoal/75">{s.label}</dt>
                <dd className="font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Highlights({ p }: { p: Project }) {
  return (
    <section aria-labelledby="hl-h" className="section-y bg-charcoal text-limestone">
      <div className="container-x">
        <SectionHead id="hl-h" eyebrow="Highlights" title={p.highlightsTitle} />
        <ul className="mt-16 grid gap-x-16 md:grid-cols-2">
          {p.highlights.map((h, i) => (
            <li key={h.title} className={cn("border-t border-limestone/15 py-10", i % 2 === 1 && "md:translate-y-16")}>
              <svg viewBox="0 0 24 28" className="h-7 w-6 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden><path d="M2 27V12a10 10 0 0 1 20 0v15" /></svg>
              <h3 className="text-h3 mt-6">{h.title}</h3>
              <p className="mt-3 max-w-md text-limestone/85">{h.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Amenities({ p }: { p: Project }) {
  return (
    <section aria-labelledby="am-h" className="section-y bg-limestone lg:pt-40">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <SectionHead id="am-h" eyebrow="Amenities" title={p.amenitiesTitle} className="lg:col-span-4" />
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {p.amenities.map((a, i) => (
            <motion.li key={a} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 border-b border-charcoal/15 py-5 font-display text-xl">
              <Check strokeWidth={1.25} className="h-5 w-5 text-rosewood" aria-hidden />
              {a}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* S5 — Opposing columns gallery + lightbox */
function Gallery({ images }: { images: ImageEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [open, setOpen] = useState<number | null>(null);
  const cols: ImageEntry[][] = [[], [], []];
  images.forEach((img, i) => cols[i % 3]!.push(img));
  return (
    <section aria-labelledby="gal-h" className="section-y overflow-hidden bg-olive text-limestone">
      <div className="container-x">
        <SectionHead id="gal-h" eyebrow="Visual Tour" title="Project Gallery" />
      </div>
      <div ref={ref} className="container-x mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {cols.map((col, ci) => (
          <motion.div key={ci} style={{ y: ci === 1 ? down : up }} className={cn("flex flex-col gap-4 md:gap-6", ci === 2 && "hidden md:flex")}>
            {col.map((img) => {
              const idx = images.indexOf(img);
              return (
                <button key={img.id} type="button" onClick={() => setOpen(idx)} aria-label={`Open image: ${img.alt}`} className="block text-left">
                  <motion.div layoutId={`g-${img.id}`}>
                    <CurtainImage image={img} className={cn("w-full", idx % 2 ? "aspect-[4/5]" : "aspect-[3/2]")} curtain="bg-olive" />
                  </motion.div>
                </button>
              );
            })}
          </motion.div>
        ))}
      </div>
      {/* Mobile: third column items flow into the 2 visible columns */}
      <div className="container-x mt-4 grid grid-cols-2 gap-4 md:hidden">
        {cols[2]!.map((img) => (
          <button key={img.id} type="button" onClick={() => setOpen(images.indexOf(img))} aria-label={`Open image: ${img.alt}`}>
            <CurtainImage image={img} className="aspect-[4/5] w-full" curtain="bg-olive" />
          </button>
        ))}
      </div>
      <Lightbox images={images} index={open} setIndex={setOpen} />
    </section>
  );
}

function Lightbox({ images, index, setIndex }: { images: ImageEntry[]; index: number | null; setIndex: (i: number | null) => void }) {
  const go = useCallback((d: number) => index !== null && setIndex((index + d + images.length) % images.length), [index, images.length, setIndex]);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, setIndex]);
  const img = index !== null ? images[index] : undefined;
  return (
    <AnimatePresence>
      {img && (
        <motion.div role="dialog" aria-modal="true" aria-label={img.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/95 p-6" onClick={() => setIndex(null)}>
          <motion.figure layoutId={`g-${img.id}`} className="max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {img.src ? (
              <img src={img.src} alt={img.alt} width={img.width} height={img.height} className="max-h-[78vh] w-full object-contain" />
            ) : (
              <div className="flex aspect-[3/2] items-center justify-center bg-limestone text-charcoal/60">Original photo to be uploaded</div>
            )}
            <figcaption className="mt-4 text-sm text-limestone/85">{img.alt}{img.caption ? ` · ${img.caption}` : ""}</figcaption>
          </motion.figure>
          <button ref={closeRef} type="button" aria-label="Close gallery" onClick={() => setIndex(null)} className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center text-limestone"><X strokeWidth={1.25} /></button>
          <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-limestone"><ChevronLeft strokeWidth={1.25} /></button>
          <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-limestone"><ChevronRight strokeWidth={1.25} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Location({ p }: { p: Project }) {
  return (
    <section aria-labelledby="loc-h" className="section-y bg-limestone">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <SectionHead id="loc-h" eyebrow={p.location.eyebrow} title={p.location.title} className="lg:col-span-5" />
        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="text-h3">Neighbourhood and connectivity</h3>
          {p.location.text && <p className="measure mt-6 text-lg">{p.location.text}</p>}
          {p.location.figures && (
            <dl className="mt-8 grid gap-8 sm:grid-cols-3">
              {p.location.figures.map((f) => (
                <div key={f.label} className="border-t border-charcoal/15 pt-5">
                  <dd className="text-display-l">{f.value}</dd>
                  <dt className="mt-2 text-charcoal/75">{f.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

function Approvals({ p }: { p: Project }) {
  return (
    <section aria-labelledby="ap-h" className="section-y bg-charcoal text-limestone">
      <div className="container-x grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHead id="ap-h" eyebrow="Documentation" title="Approvals and documentation" />
          <dl className="mt-10 border-t border-limestone/15">
            {p.approvals.map((a) => (
              <div key={a.label} className="border-b border-limestone/15 py-6">
                <dt className="text-limestone/75">{a.label}</dt>
                <dd className="mt-2 font-display text-2xl">{a.value}</dd>
                {a.note && <dd className="mt-2 text-sm text-limestone/80">{a.note}</dd>}
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="text-h3">{plotChecklist.title}</h3>
          <p className="mt-4 text-sm text-limestone/80">{plotChecklist.note}</p>
          <ul className="mt-8 space-y-6">
            {plotChecklist.items.map((c) => (
              <li key={c.title} className="border-l border-terracotta pl-5">
                <p className="font-medium">{c.title}</p>
                <p className="mt-1 text-limestone/85">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* S12 — Next project */
function NextProject({ p }: { p: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(12% 30% 12% 30% round 999px 999px 0px 0px)", "inset(0% 0% 0% 0% round 0px 0px 0px 0px)"]);
  return (
    <a ref={ref} href={`/projects/${p.slug}`} className="relative flex h-screen items-center justify-center overflow-hidden bg-charcoal text-limestone">
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <img src={p.hero.src} alt="" width={p.hero.width} height={p.hero.height} loading="lazy" className="h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-charcoal/50" />
      </motion.div>
      <span className="relative text-center">
        <span className="block text-sm">Next project</span>
        <span className="text-display-xl mt-4 block">{p.name}</span>
      </span>
    </a>
  );
}
