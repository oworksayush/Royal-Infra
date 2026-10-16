import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { nav, quickLinks, site } from "@/data/site";
import { homeProjects } from "@/data/home";
import { ButtonLink, Logo } from "@/components/ui-brand";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/SocialLinks";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.15, syncTouch: false });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-terracotta"
    />
  );
}

export { Preloader } from "./Preloader";

/** Pages whose first section is light; header needs a solid bar there to stay legible. */
const LIGHT_TOP = ["/contact-us", "/privacy-policy", "/terms-of-use"];

export function Header() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 40);
  });

  const forceSolid =
    typeof window !== "undefined" &&
    LIGHT_TOP.some((p) => window.location.pathname.startsWith(p));
  const isSolid = condensed || forceSolid;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-limestone px-4 py-2 text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <motion.header
        initial={false}
        animate={{
          paddingTop: condensed ? 8 : 0,
          paddingBottom: condensed ? 8 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 text-limestone"
      >
        {/* Ambient background layer — fades in when condensed */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: isSolid ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 bg-charcoal/80 backdrop-blur-xl supports-[backdrop-filter]:bg-charcoal/65"
        />

        {/* Bottom hairline — gradient fade */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: isSolid ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-limestone/20 to-transparent"
        />

        {/* Top gradient at rest (over hero) — soft veil */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: isSolid ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/50 to-transparent"
        />

        <div
          className={cn(
            "container-x relative flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            condensed ? "h-16" : "h-20",
          )}
        >
          <motion.a
            href="/"
            aria-label="Royal Infra Realty home"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <motion.div
              animate={{ scale: condensed ? 0.92 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left center" }}
            >
              <Logo />
            </motion.div>
          </motion.a>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) =>
              n.to === "/projects" ? (
                <div
                  key={n.to}
                  className="relative"
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                  onFocus={() => setMega(true)}
                  onBlur={() => setMega(false)}
                >
                  <a
                    href={n.to}
                    className="group flex items-center gap-1.5 py-4 text-[0.95rem] tracking-wide text-limestone/90 transition-colors hover:text-limestone"
                  >
                    <span className="relative">
                      {n.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-500 ease-out",
                        mega && "rotate-180",
                      )}
                      strokeWidth={1.75}
                    />
                  </a>

                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-limestone/10 bg-charcoal/95 shadow-2xl shadow-charcoal/50 backdrop-blur-xl">
                          <div className="grid grid-cols-3 gap-4 p-5">
                            {homeProjects.map((p, i) => (
                              <motion.a
                                key={p.slug}
                                href={`/projects/${p.slug}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: 0.05 + i * 0.06,
                                  duration: 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group block"
                              >
                                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-limestone/5">
                                  <img
                                    src={p.image.src}
                                    alt=""
                                    width={p.image.width}
                                    height={p.image.height}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                  />
                                </div>
                                <p className="mt-3 font-display text-[0.95rem] leading-tight transition-colors group-hover:text-terracotta">
                                  {p.name}
                                </p>
                                <p className="mt-0.5 text-xs text-limestone/60">{p.location}</p>
                              </motion.a>
                            ))}
                          </div>

                          <div className="flex items-center justify-between border-t border-limestone/10 px-5 py-3.5">
                            <p className="text-xs text-limestone/55">
                              Explore premium plots across Karnataka
                            </p>
                            <a
                              href="/projects"
                              className="group inline-flex items-center gap-1.5 text-xs font-medium text-terracotta transition-colors hover:text-limestone"
                            >
                              View all projects
                              <ArrowRight
                                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                                strokeWidth={2}
                              />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={n.to}
                  href={n.to}
                  className={cn(
                    "group relative py-4 text-[0.95rem] tracking-wide transition-colors hover:text-limestone",
                    typeof window !== "undefined" && window.location.pathname === n.to
                      ? "text-terracotta"
                      : "text-limestone/90",
                  )}
                >
                  <span className="relative">
                    {n.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </span>
                </a>
              ),
            )}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <motion.div
              animate={{ scale: condensed ? 0.94 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ButtonLink href="/contact-us" tone="light" className="hidden sm:inline-flex">
                Book a Site Visit
              </ButtonLink>
            </motion.div>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <Menu strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-rosewood text-limestone"
          >
            <div className="container-x flex h-20 shrink-0 items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center"
              >
                <X strokeWidth={1.25} />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-x mt-8 flex flex-col gap-2">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                >
                  <a
                    href={n.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl sm:text-5xl"
                  >
                    {n.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="container-x mt-auto grid grid-cols-3 gap-3 pb-10 pt-10">
              {homeProjects.map((p) => (
                <a key={p.slug} href={`/projects/${p.slug}`} onClick={() => setOpen(false)}>
                  <img
                    src={p.image.src}
                    alt=""
                    width={p.image.width}
                    height={p.image.height}
                    className="aspect-[4/5] w-full rounded-2xl object-cover"
                  />
                  <span className="mt-2 block text-sm">{p.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { FloatingActions } from "./FloatingActions";

/** Curtain footer: fixed behind content; main wrapper reserves its height. */
export function Footer({ onHeight }: { onHeight: (h: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => onHeight(e?.contentRect.height ?? 0));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [onHeight]);
  const letters = "Measure Happiness".split("");
  return (
    <footer
      ref={ref}
      className="bottom-0 left-0 right-0 z-0 overflow-hidden bg-charcoal text-limestone lg:fixed"
    >
      <div className="container-x pb-20 pt-20 sm:pb-10 sm:pt-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-limestone/15 pb-14 sm:gap-y-14 md:grid-cols-12 md:gap-x-6 lg:gap-x-10">
          <div className="col-span-2 md:col-span-4">
            <Logo imgClassName="h-12 sm:h-14 max-w-[210px]" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-limestone/70">
              {site.footerText}
            </p>
            {site.social.length > 0 && (
              <div className="mt-7">
                <SocialLinks variant="footer" />
              </div>
            )}
          </div>
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-terracotta">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-[0.95rem] text-limestone/75">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <a href={l.to} className="transition-colors hover:text-limestone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-terracotta">
              Our Projects
            </p>
            <ul className="mt-5 space-y-3 text-[0.95rem] text-limestone/75">
              {homeProjects.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/projects/${p.slug}`}
                    className="transition-colors hover:text-limestone"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-terracotta">
              Get in touch
            </p>
            <address className="mt-5 max-w-[30ch] space-y-3 break-words text-[0.95rem] leading-relaxed not-italic text-limestone/75">
              <p>{site.address}</p>
              <p>
                <a href={site.phoneHref} className="transition-colors hover:text-limestone">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-limestone">
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>
        <p
          aria-hidden
          className="mt-14 flex overflow-hidden font-display text-[clamp(6rem,10.4vw,3rem)] leading-[1.2] tracking-[-0.045em] sm:mt-16"
        >
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.035, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block whitespace-pre"
            >
              {l}
            </motion.span>
          ))}
        </p>
        <div className="mt-10 flex flex-col gap-4 border-t border-limestone/15 pt-6 text-xs leading-relaxed text-limestone/55 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pr-20 sm:text-sm">
          <p>{site.copyright}</p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/terms-of-use" className="transition-colors hover:text-limestone">
              Terms of Use
            </a>
            <a href="/privacy-policy" className="transition-colors hover:text-limestone">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}