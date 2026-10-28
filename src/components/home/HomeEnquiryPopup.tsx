import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { EnquiryForm } from "@/components/pages/EnquiryForm";

const POPUP_SEEN_KEY = "royal-infra-home-enquiry-seen";
const LIVE_OFFER_DURATION_MS = 4000;

/* ── Live Offer notification (right corner, auto-dismiss) ── */
function LiveOfferNotification({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), LIVE_OFFER_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 top-24 z-[95] w-[min(88vw,20rem)] overflow-hidden rounded-2xl border border-limestone/15 bg-charcoal text-limestone shadow-2xl shadow-charcoal/40 sm:right-6"
        >
          <a href="/contact-us" className="group block p-4 pr-12">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-terracotta">
                  Live Offer
                </p>
                <p className="mt-1 text-sm leading-snug text-limestone/85">
                  Ready to Move pricing on Palm Serenity. Talk to our team.
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-limestone/70 transition-colors group-hover:text-limestone">
                  Enquire now
                  <ArrowRight
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </span>
              </div>
            </div>
          </a>

          {/* Animated close button */}
          <button
            type="button"
            aria-label="Dismiss live offer"
            onClick={(e) => {
              e.preventDefault();
              setVisible(false);
            }}
            className="group/close absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-limestone/50 transition-colors duration-300 hover:bg-limestone/10 hover:text-limestone"
          >
            <X
              className="h-4 w-4 transition-transform duration-500 ease-out group-hover/close:rotate-90"
              strokeWidth={1.75}
            />
          </button>

          {/* Auto-dismiss progress bar */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: LIVE_OFFER_DURATION_MS / 1000, ease: "linear" }}
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-terracotta"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Home enquiry popup ── */
export function HomeEnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(POPUP_SEEN_KEY) === "true") return;
    } catch (error) {
      console.warn("Unable to check whether the enquiry popup was previously shown.", error);
    }

    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(POPUP_SEEN_KEY, "true");
      } catch (error) {
        console.warn("Unable to save that the enquiry popup was shown.", error);
      }
      setOpen(true);
    }, 2200);
    return () => window.clearTimeout(timeout);
  }, []);

  /* Show the Live Offer a beat after the enquiry dialog opens */
  useEffect(() => {
    if (!open) {
      setShowOffer(false);
      return;
    }
    const t = window.setTimeout(() => setShowOffer(true), 600);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-charcoal/65 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <Dialog.Content className="fixed left-1/2 top-1/2 z-[90] max-h-[calc(100dvh-2rem)] w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-charcoal/10 bg-limestone p-6 text-charcoal shadow-2xl shadow-charcoal/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-9">
            <div className="mb-7 flex items-start justify-between gap-6 border-b border-charcoal/15 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
                  A thoughtful place to begin
                </p>
                <Dialog.Title className="mt-2 font-display text-3xl leading-tight">
                  Let's find your place.
                </Dialog.Title>
                <Dialog.Description className="mt-2 max-w-sm text-sm text-charcoal/70">
                  Tell us what you're looking for and our team will help you explore the right
                  property.
                </Dialog.Description>
              </div>

              {/* Animated close button */}
              <Dialog.Close
                aria-label="Close enquiry form"
                className="group/close inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-charcoal/20 transition-colors duration-300 hover:bg-charcoal hover:text-limestone"
              >
                <X
                  className="h-5 w-5 transition-transform duration-500 ease-out group-hover/close:rotate-90"
                  aria-hidden
                />
              </Dialog.Close>
            </div>

            <EnquiryForm compact />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <LiveOfferNotification show={showOffer} />
    </>
  );
}