import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { EnquiryForm } from "@/components/pages/EnquiryForm";
import { Logo } from "@/components/ui-brand";

import { shouldShowEntranceFlow } from "@/lib/entrance";

const DELAY_MS = 2400;

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

    // Compensate for scrollbar shift on desktop
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
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
        /* Fullscreen backdrop with built-in scroll buffer */
        <motion.div
          key="enquiry-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
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
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-xl my-auto bg-limestone text-charcoal shadow-2xl shadow-charcoal/50 border border-charcoal/10 flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] overflow-hidden"
          >
            {/* ── Compact Architectural Header ────────────────── */}
            <div className="relative shrink-0 overflow-hidden bg-charcoal px-5 py-5 sm:px-8 sm:py-6 text-limestone">
              {/* Subtle Architectural Arch Silhouette Watermark */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-8 h-48 w-36 rounded-[999px_999px_0_0] border border-limestone/[0.08]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-3 top-0 h-36 w-24 rounded-[999px_999px_0_0] border border-terracotta/[0.12]"
              />

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={close}
                aria-label="Close enquiry form"
                className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-limestone/25 text-limestone transition-colors duration-200 hover:bg-limestone hover:text-charcoal focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <X className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.8} aria-hidden />
              </button>

              {/* Title */}
              <h2
                id="site-enquiry-title"
                className="mt-1.5 font-display text-2xl sm:text-3xl leading-tight text-limestone font-light"
              >
                Let’s find your place.
              </h2>

              {/* Description */}
              <p
                id="site-enquiry-desc"
                className="mt-1 max-w-md text-xs sm:text-sm leading-relaxed text-limestone/75"
              >
                Tell us what you are looking for and our senior property advisors will connect with you.
              </p>
            </div>

            {/* ── Scrollable Form Body ────────────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
              <EnquiryForm
                compact
                onSuccess={() => {
                  setTimeout(() => setOpen(false), 4000);
                }}
              />
            </div>

            {/* ── Terracotta Foundation Hairline ───────────────── */}
            <div
              aria-hidden
              className="h-[3px] w-full shrink-0 bg-terracotta"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
