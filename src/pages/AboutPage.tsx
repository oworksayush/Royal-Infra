import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { about } from "@/data/pages";
import { PageHeader, SectionHead } from "@/components/pages/shared";
import { CurtainImage, WordScrub } from "@/components/motion/primitives";
import { Cta, Services, Testimonials } from "@/components/home/sections";
import { ButtonLink } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

export function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: about.crumb }]} title={about.title} intro={about.intro} marquee={about.marquee} contours />
      <Story />
      <section aria-labelledby="purpose-h" className="bg-limestone">
        <div className="container-x pt-24"><SectionHead id="purpose-h" eyebrow={about.purposeEyebrow} title={about.purposeTitle} /></div>
        <div className="mt-14 grid md:grid-cols-2">
          <div className="flex min-h-[70vh] flex-col justify-end bg-rosewood p-[var(--gutter)] py-16 text-limestone">
            <h3 className="text-h2">Our Vision</h3>
            <p className="mt-6 max-w-lg font-display text-[1.5rem] leading-snug">{about.vision}</p>
          </div>
          <div className="flex min-h-[70vh] flex-col justify-end bg-olive p-[var(--gutter)] py-16 text-limestone">
            <h3 className="text-h2">Our Mission</h3>
            <p className="mt-6 max-w-lg font-display text-[1.6rem] leading-snug">{about.mission}</p>
          </div>
        </div>
      </section>
      <Values />
      <Leaders />
      <Testimonials intro={about.testimonialsIntro} />
      <Services items={about.services} intro={about.servicesIntro} />
      <Cta title={about.cta.title} body={about.cta.body}>
        <ButtonLink href="/projects" tone="light">View Projects</ButtonLink>
        <ButtonLink href="/contact-us" tone="light" className="bg-transparent text-limestone outline outline-1 outline-limestone/50">Contact Us</ButtonLink>
      </Cta>
    </>
  );
}

function Story() {
  return (
    <section aria-labelledby="story-h" className="section-y bg-limestone">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <CurtainImage image={about.storyImage} parallax className="arch aspect-[4/5] w-full" curtain="bg-rosewood" />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHead id="story-h" eyebrow={about.storyEyebrow} title={about.storyTitle} />
          <WordScrub text={about.p1} className="measure mt-10 font-display text-[clamp(1.2rem,1.6vw,1.45rem)] leading-snug" />
          <p className="measure mt-8 text-lg">
            Royal Infra represents the culmination of this legacy where traditional values meet modern vision. We've transformed <strong className="font-semibold">over 300 acres</strong> into thriving communities, delivered keys to <strong className="font-semibold">5,000+ families</strong>, and partnered with industry giants like <em>{about.partners}</em> across <strong className="font-semibold">5.5 lakh square feet</strong> of premium commercial space.
          </p>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-charcoal/15 pt-10">
            {about.figures.map((f) => (
              <div key={f.value}>
                <dd className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none">{f.value}</dd>
                <dt className="mt-3 text-sm text-charcoal/75">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section aria-labelledby="values-h" className="section-y bg-charcoal text-limestone">
      <div className="container-x">
        <SectionHead id="values-h" eyebrow={about.valuesEyebrow} title={about.valuesTitle} />
        <ul className="mt-16 border-t border-limestone/15">
          {about.values.map((v, i) => (
            <li key={v.title} className="group border-b border-limestone/15" onMouseEnter={() => setOpen(i)} onMouseLeave={() => setOpen(null)}>
              <button type="button" onFocus={() => setOpen(i)} onBlur={() => setOpen(null)} className="grid w-full gap-4 py-10 text-left lg:grid-cols-12">
                <span aria-hidden className="font-display text-terracotta lg:col-span-1">0{i + 1}</span>
                <h3 className="text-h2 lg:col-span-6">{v.title}</h3>
                <p className={cn("text-limestone/85 transition-opacity duration-500 lg:col-span-4 lg:col-start-9 lg:self-center", "lg:opacity-0", open === i && "lg:opacity-100")}>{v.text}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Leaders() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const down = useTransform(scrollYProgress, [0, 1], [-20, 60]);
  return (
    <section aria-labelledby="leaders-h" className="section-y bg-limestone">
      <div className="container-x">
        <SectionHead id="leaders-h" eyebrow={about.leadersEyebrow} title={about.leadersTitle}>
          <p className="measure mt-6">{about.leadersSub}</p>
        </SectionHead>
        <div ref={ref} className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
          {about.leaders.map((l, i) => (
            <motion.article key={l.name} style={{ y: i === 0 ? up : down }} className={cn(i === 1 && "md:mt-32")}>
              <CurtainImage image={l.image} className="aspect-square w-full max-w-md rounded-full" curtain="bg-olive" />
              <h3 className="text-h3 mt-8">{l.name}</h3>
              <p className="text-sm text-charcoal/75">{l.role}</p>
              <p className="measure mt-5">{l.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
