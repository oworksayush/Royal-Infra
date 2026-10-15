import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, Phone, Menu, X } from "lucide-react";
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
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const last = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > last.current && y > 200);
    setSolid(y > 80);
    last.current = y;
  });
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-limestone px-4 py-2 text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-limestone transition-colors duration-300",
          (solid || LIGHT_TOP.some((p) => window.location.pathname.startsWith(p))) && "bg-charcoal",
        )}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <a href="/" aria-label="Royal Infra Realty home">
            <Logo />
          </a>
          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
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
                  <a href={n.to} className="py-6 text-[0.95rem]">
                    {n.label}
                  </a>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-1/2 top-full grid w-[640px] -translate-x-1/2 grid-cols-3 gap-5 bg-charcoal p-6"
                      >
                        {homeProjects.map((p) => (
                          <a key={p.slug} href={`/projects/${p.slug}`} className="group block">
                            <div className="arch aspect-[4/5] overflow-hidden">
                              <img
                                src={p.image.src}
                                alt=""
                                width={p.image.width}
                                height={p.image.height}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <p className="mt-3 font-display text-lg">{p.name}</p>
                            <p className="text-sm text-limestone/70">{p.location}</p>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={n.to}
                  href={n.to}
                  className={cn(
                    "text-[0.95rem]",
                    window.location.pathname === n.to && "text-terracotta",
                  )}
                >
                  {n.label}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <ButtonLink href="/contact-us" tone="light" className="hidden sm:inline-flex">
              Book a Site Visit
            </ButtonLink>
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
            className="fixed inset-0 z-[80] flex flex-col bg-rosewood text-limestone"
          >
            <div className="container-x flex h-20 items-center justify-between">
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
                  <a href={n.to} onClick={() => setOpen(false)} className="font-display text-5xl">
                    {n.label}
                  </a>
                </motion.div>
              ))}
            </nav>
            <div className="container-x mt-auto grid grid-cols-3 gap-3 pb-10">
              {homeProjects.map((p) => (
                <a key={p.slug} href={`/projects/${p.slug}`} onClick={() => setOpen(false)}>
                  <img
                    src={p.image.src}
                    alt=""
                    width={p.image.width}
                    height={p.image.height}
                    className="arch aspect-[4/5] w-full object-cover"
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
            <Logo />
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
          className="mt-14 flex overflow-hidden font-display text-[clamp(3rem,10.4vw,10rem)] leading-[1.2] tracking-[-0.045em] sm:mt-16"
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
