import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { EnquiryForm } from "@/components/pages/EnquiryForm";
import { shouldShowEntranceFlow } from "@/lib/entrance";
import logoImg from "@/assets/Royal_Infra_Logo.png";

const DELAY_MS = 2400;

/* ─────────────────────────────────────────────────────────────
   Motion variants
   ───────────────────────────────────────────────────────────── */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.09,
      delayChildren: 0.18,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 18,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const hairlineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.15,
    },
  },
};

/**
 * Site-wide enquiry popup that appears on fresh visit and on page refresh.
 * Does not re-trigger when switching internal pages.
 */
export function SiteEnquiryPopup() {
  const [open, setOpen] = useState(false);

  // Trigger popup only on page refresh or initial visit
  useEffect(() => {
    if (!shouldShowEntranceFlow()) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Lock background scrolling while modal is open & handle Escape key
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="enquiry-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={close}
          className="fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-charcoal/80 backdrop-blur-sm p-3 sm:p-5 md:p-6 flex items-center justify-center min-h-screen"
        >
          {/* Dialog Container */}
          <motion.div
            key="enquiry-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-enquiry-title"
            aria-describedby="site-enquiry-desc"
            onClick={(e) => e.stopPropagation()}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-xl my-auto bg-limestone text-charcoal flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] overflow-hidden rounded-2xl sm:rounded-3xl ring-1 ring-charcoal/10 shadow-2xl shadow-charcoal/50"
          >
            {/* ══ Compact Architectural Header ══════════════════ */}
            <motion.div
              variants={childVariants}
              className="relative shrink-0 overflow-hidden px-5 py-5 sm:px-8 sm:py-7 text-limestone"
            >
              {/* Background image */}
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80')",
                }}
              />
              {/* Legibility gradient (dark → transparent left-to-right) */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40"
              />
              {/* Bottom fade into limestone */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-charcoal/60"
              />

              {/* Architectural Arch Watermarks */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-8 h-48 w-36 rounded-[999px_999px_0_0] border border-limestone/[0.10]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-3 top-0 h-36 w-24 rounded-[999px_999px_0_0] border border-terracotta/[0.18]"
              />

              {/* Dismiss Button */}
              <motion.button
                type="button"
                onClick={close}
                aria-label="Close enquiry form"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-limestone/25 text-limestone backdrop-blur-sm bg-charcoal/20 transition-colors duration-200 hover:bg-limestone hover:text-charcoal focus-visible:ring-2 focus-visible:ring-terracotta outline-none"
              >
                <X
                  className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                  strokeWidth={1.8}
                  aria-hidden
                />
              </motion.button>

              {/* Brand Logo */}
              <div className="relative mb-2">
                <img
                  src={logoImg}
                  alt="Royal Infra"
                  className="h-8 sm:h-9 w-auto max-w-[140px] object-contain brightness-0 invert opacity-95"
                />
              </div>

              {/* Title */}
              <h2
                id="site-enquiry-title"
                className="relative mt-1.5 font-display text-2xl sm:text-3xl leading-tight text-limestone font-light tracking-tight"
              >
                Let’s find your place.
              </h2>

              {/* Description */}
              <p
                id="site-enquiry-desc"
                className="relative mt-1.5 max-w-md text-xs sm:text-sm leading-relaxed text-limestone/80"
              >
                Tell us what you are looking for and our senior property
                advisors will connect with you.
              </p>
            </motion.div>

            {/* ══ Scrollable Form Body ══════════════════════════ */}
            <motion.div
              variants={childVariants}
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7"
            >
              <EnquiryForm
                compact
                onSuccess={() => {
                  setTimeout(() => setOpen(false), 4000);
                }}
              />
            </motion.div>

            {/* ══ Terracotta Foundation Hairline (animated) ══════ */}
            <motion.div
              aria-hidden
              variants={hairlineVariants}
              className="h-[3px] w-full shrink-0 bg-gradient-to-r from-terracotta via-terracotta to-terracotta/60"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}