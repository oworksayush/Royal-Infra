import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { locationsPage as L } from "@/data/pages";
import { ContourLines, PageHeader, SectionHead } from "@/components/pages/shared";
import { CurtainImage, Eyebrow, WordScrub } from "@/components/motion/primitives";
import { Cta } from "@/components/home/sections";
import { ButtonLink } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

export function LocationsPage() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.7"] });
  return (
    <>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: L.crumb }]} title={L.title} intro={L.intro} marquee={L.marquee} contours />
      <section aria-labelledby="fp-h" className="section-y relative bg-limestone">
        <ContourLines className="text-olive/25" />
        <div className="container-x relative">
          <Eyebrow>{L.footprintEyebrow}</Eyebrow>
          <h2 id="fp-h" className="text-h2 mt-6 max-w-[24ch]">{L.footprint}</h2>
          <ol ref={ref} className="relative mt-24">
            <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-charcoal/15 md:left-1/2">
              <motion.div className="h-full w-px origin-top bg-terracotta" style={{ scaleY: scrollYProgress }} />
            </div>
            {L.places.map((pl, i) => (
              <li key={pl.city} className="relative grid gap-8 pb-24 pl-12 md:grid-cols-2 md:gap-20 md:pl-0">
                <span aria-hidden className="absolute left-[9px] top-2 h-[15px] w-[15px] rounded-full border border-charcoal bg-limestone md:left-[calc(50%-7px)]" />
                <div className={cn(i % 2 === 1 && "md:order-2")}>
                  <CurtainImage image={pl.image} className="arch aspect-[3/4] w-full max-w-sm" curtain="bg-olive" />
                </div>
                <div className={cn("md:self-center", i % 2 === 1 && "md:order-1 md:text-right")}>
                  <h3 className="text-display-l">{pl.city}</h3>
                  <p className={cn("measure mt-6 text-lg", i % 2 === 1 && "md:ml-auto")}>{pl.text}</p>
                  {"slug" in pl && pl.slug && (
                    <a href={`/projects/${pl.slug}`} className="mt-6 inline-flex border-b border-charcoal/40 pb-1 font-medium hover:border-charcoal">{pl.link}</a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="why-k" className="section-y bg-rosewood text-limestone">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHead id="why-k" eyebrow={L.whyEyebrow} title={L.whyTitle} className="lg:col-span-4" />
          <WordScrub text={L.why} className="font-display text-[clamp(1.4rem,2.2vw,2.1rem)] leading-snug lg:col-span-7 lg:col-start-6" />
        </div>
      </section>
      <Cta title={L.cta.title} body={L.cta.body}>
        <ButtonLink href="/contact-us" tone="light">{L.cta.button}</ButtonLink>
      </Cta>
    </>
  );
}
