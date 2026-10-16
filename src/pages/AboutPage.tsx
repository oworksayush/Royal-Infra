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
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: about.crumb }]}
        title={about.title}
        intro={about.intro}
        marquee={about.marquee}
        contours
      />
      <Story />

      {/* ── Vision / Mission (top one — kept) ── */}
      <section
        aria-labelledby="purpose-h"
        className="bg-limestone pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="container-x pt-16 sm:pt-20 lg:pt-24">
          <SectionHead id="purpose-h" eyebrow={about.purposeEyebrow} title={about.purposeTitle} />
        </div>

        <div className="container-x mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
          <div className="flex min-h-[260px] flex-col rounded-2xl bg-rosewood p-8 text-limestone sm:min-h-[300px] sm:p-10 lg:min-h-[320px] lg:p-12">
            <h3 className="font-display text-[clamp(1.5rem,2.2vw,2rem)] font-[330] leading-tight tracking-tight">
              Our Vision
            </h3>
            <p className="mt-5 max-w-lg font-display text-[clamp(1.15rem,1.5vw,1.4rem)] leading-snug">
              {about.vision}
            </p>
          </div>

          <div className="flex min-h-[260px] flex-col rounded-2xl bg-olive p-8 text-limestone sm:min-h-[300px] sm:p-10 lg:min-h-[320px] lg:p-12">
            <h3 className="font-display text-[clamp(1.5rem,2.2vw,2rem)] font-[330] leading-tight tracking-tight">
              Our Mission
            </h3>
            <p className="mt-5 max-w-lg font-display text-[clamp(1.15rem,1.5vw,1.4rem)] leading-snug">
              {about.mission}
            </p>
          </div>
        </div>
      </section>

      <Values />
      <Leaders />
      <Testimonials intro={about.testimonialsIntro} />
      <Services items={about.services} intro={about.servicesIntro} />
      <Cta title={about.cta.title} body={about.cta.body}>
        <ButtonLink href="/projects" tone="light">View Projects</ButtonLink>
        <ButtonLink
          href="/contact-us"
          tone="light"
          className="bg-transparent text-limestone outline outline-1 outline-limestone/50"
        >
          Contact Us
        </ButtonLink>
      </Cta>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Story — image left, content right (restored)
   ───────────────────────────────────────────────────────────── */
function Story() {
  return (
    <section aria-labelledby="story-h" className="section-y bg-limestone">
      <div className="container-x grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Image — 5 cols, sticky on desktop */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
              <CurtainImage
                image={about.storyImage}
                parallax
                className="aspect-[4/5] w-full"
                curtain="bg-rosewood"
              />
            </div>
          </div>
        </div>

        {/* Content — 6 cols starting at 7 */}
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHead id="story-h" eyebrow={about.storyEyebrow} title={about.storyTitle} />

          <WordScrub
            text={about.p1}
            className="measure mt-7 font-display text-[clamp(1.15rem,1.5vw,1.35rem)] leading-snug"
          />

          <p className="measure mt-5 text-base leading-relaxed sm:text-lg">
            Royal Infra represents the culmination of this legacy where traditional values meet
            modern vision. We've transformed{" "}
            <strong className="font-semibold">over 300 acres</strong> into thriving communities,
            delivered keys to <strong className="font-semibold">5,000+ families</strong>, and
            partnered with industry giants like <em>{about.partners}</em> across{" "}
            <strong className="font-semibold">5.5 lakh square feet</strong> of premium commercial
            space.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-charcoal/15 pt-8 sm:gap-y-10">
            {about.figures.map((f) => (
              <div key={f.value}>
                <dd className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] leading-none">
                  {f.value}
                </dd>
                <dt className="mt-2 text-sm text-charcoal/75">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Values — hover-reveal list
   ───────────────────────────────────────────────────────────── */
function Values() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section aria-labelledby="values-h" className="section-y bg-charcoal text-limestone">
      <div className="container-x">
        <SectionHead id="values-h" eyebrow={about.valuesEyebrow} title={about.valuesTitle} />

        <ul className="mt-14 border-t border-limestone/15">
          {about.values.map((v, i) => (
            <li
              key={v.title}
              className="group border-b border-limestone/15"
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
            >
              <button
                type="button"
                onFocus={() => setOpen(i)}
                onBlur={() => setOpen(null)}
                className="grid w-full items-center gap-3 py-7 text-left lg:grid-cols-12 lg:gap-6 lg:py-8"
              >
                <span
                  aria-hidden
                  className="font-display text-lg leading-none text-terracotta lg:col-span-1 lg:text-xl"
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-[clamp(1.35rem,2vw,1.85rem)] font-[330] leading-tight tracking-tight lg:col-span-6">
                  {v.title}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed text-limestone/85 transition-opacity duration-500 lg:col-span-4 lg:col-start-9 lg:text-base",
                    "lg:opacity-0",
                    open === i && "lg:opacity-100",
                  )}
                >
                  {v.text}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Leaders — two directors, centered portraits
   ───────────────────────────────────────────────────────────── */
function Leaders() {
  return (
    <section aria-labelledby="leaders-h" className="section-y bg-limestone">
      <div className="container-x">
        <SectionHead id="leaders-h" eyebrow={about.leadersEyebrow} title={about.leadersTitle}>
          <p className="measure mt-6">{about.leadersSub}</p>
        </SectionHead>

        <div className="mt-14 grid gap-12 sm:gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
          {about.leaders.map((l) => (
            <article key={l.name} className="flex flex-col items-center text-center">
              <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl sm:max-w-[320px]">
                <CurtainImage
                  image={l.image}
                  className="aspect-[4/5] w-full"
                  curtain="bg-olive"
                />
              </div>
              <h3 className="text-h3 mt-6">{l.name}</h3>
              <p className="mt-1 text-sm text-charcoal/75">{l.role}</p>
              <p className="measure mt-4">{l.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}