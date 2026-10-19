import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bike, Plane, Sparkles, X } from "lucide-react";
import { EnquiryForm } from "@/components/pages/EnquiryForm";
import { shouldShowEntranceFlow } from "@/lib/entrance";
import logoImg from "@/assets/Royal_Infra_Logo.png";

const DELAY_MS = 2400;              // initial wait before popup opens
const OFFER_GAP_MS = 450;           // pause between popup closing and offer appearing
const LIVE_OFFER_DURATION_MS = 5000; // offer stays on screen this long

/* ─────────────────────────────────────────────────────────────
   Motion variants
   ───────────────────────────────────────────────────────────── */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
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

/* ─────────────────────────────────────────────────────────────
   Flow state machine
   waiting → popup → gap → offer → done
   ───────────────────────────────────────────────────────────── */
type FlowStage = "waiting" | "popup" | "gap" | "offer" | "done";

/* ─────────────────────────────────────────────────────────────
   Live Offer Notification — Royal Utsav 2026 Festive Card
   Fully controlled by parent via `visible` + `onDismiss`.
   Keeps the 5-second countdown and progress bar.
   ───────────────────────────────────────────────────────────── */
function LiveOfferNotification({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.ceil(LIVE_OFFER_DURATION_MS / 1000),
  );

  // Visual countdown — actual dismissal is driven by the parent state machine
  useEffect(() => {
    if (!visible) return;
    setSecondsLeft(Math.ceil(LIVE_OFFER_DURATION_MS / 1000));
    const end = Date.now() + LIVE_OFFER_DURATION_MS;
    const interval = window.setInterval(() => {
      setSecondsLeft(Math.max(0, Math.ceil((end - Date.now()) / 1000)));
    }, 250);
    return () => window.clearInterval(interval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, x: 80, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.94 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed right-4 top-24 z-[100] w-[min(90vw,22rem)] overflow-hidden rounded-2xl border border-terracotta/30 shadow-2xl shadow-charcoal/60 sm:right-6"
        >
          {/* Warm festive gradient background */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[oklch(0.34_0.07_45)] via-charcoal to-charcoal"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.55_0.12_45/0.28),transparent_60%)]"
          />

          {/* Shimmering gold top line */}
          <motion.div
            aria-hidden
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.8,
            }}
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta to-transparent"
          />

          {/* Ornamental corner arcs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-terracotta/25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-full border border-terracotta/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-7 -left-7 h-20 w-20 rounded-full border border-terracotta/10"
          />

          <a
            href="/contact-us"
            className="relative block p-4 pr-12 text-limestone"
          >
            {/* Header: badge + label + countdown */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/20 text-terracotta">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-full border border-terracotta/60"
                  />
                </span>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-terracotta">
                  Royal Utsav 2026
                </p>
              </div>

              <span
                aria-live="polite"
                className="font-mono text-[0.6rem] font-medium tabular-nums text-limestone/45"
              >
                {secondsLeft}s
              </span>
            </div>

            {/* Headline */}
            <p className="mt-3 font-display text-[1.05rem] leading-snug text-limestone">
              This festive season,
              <br />
              <span className="italic text-terracotta">celebrate more.</span>
            </p>

            {/* Exclusive rewards label */}
            <p className="mt-3 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-limestone/50">
              Exclusive Rewards
            </p>

            {/* Reward chips */}
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-limestone/15 bg-limestone/[0.06] px-2 py-0.5 text-[0.62rem] font-medium text-limestone/85">
                <Bike className="h-3 w-3" strokeWidth={1.75} />
                Activa
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-limestone/15 bg-limestone/[0.06] px-2 py-0.5 text-[0.62rem] font-medium text-limestone/85">
                <Bike className="h-3 w-3" strokeWidth={1.75} />
                Burgman
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-limestone/15 bg-limestone/[0.06] px-2 py-0.5 text-[0.62rem] font-medium text-limestone/85">
                <Plane className="h-3 w-3" strokeWidth={1.75} />
                Bali Trip
              </span>
            </div>

            {/* CTA */}
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta transition-colors group-hover:text-limestone">
              Reveal your reward
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.2}
              />
            </span>
          </a>

          {/* Animated close button */}
          <button
            type="button"
            aria-label="Dismiss live offer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDismiss();
            }}
            className="group/close absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full text-limestone/50 transition-colors duration-300 hover:bg-limestone/10 hover:text-limestone"
          >
            <X
              className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover/close:rotate-90"
              strokeWidth={1.75}
            />
          </button>

          {/* Auto-dismiss progress bar */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: LIVE_OFFER_DURATION_MS / 1000,
              ease: "linear",
            }}
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-terracotta"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Site-wide Enquiry Popup + orchestrated Live Offer reveal
   ───────────────────────────────────────────────────────────── */
export function SiteEnquiryPopup() {
  const [stage, setStage] = useState<FlowStage>("waiting");

  /* 1 · Kick off the sequence on fresh visit / refresh */
  useEffect(() => {
    if (!shouldShowEntranceFlow()) {
      setStage("done");
      return;
    }
    const t = window.setTimeout(() => setStage("popup"), DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  /* 2 · Brief gap so the popup exit animation finishes */
  useEffect(() => {
    if (stage !== "gap") return;
    const t = window.setTimeout(() => setStage("offer"), OFFER_GAP_MS);
    return () => window.clearTimeout(t);
  }, [stage]);

  /* 3 · Auto-dismiss offer after 5s */
  useEffect(() => {
    if (stage !== "offer") return;
    const t = window.setTimeout(() => setStage("done"), LIVE_OFFER_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [stage]);

  /* 4 · Scroll lock while the popup is open */
  const popupOpen = stage === "popup";
  useEffect(() => {
    if (!popupOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [popupOpen]);

  /* 5 · Escape key — popup → gap, offer → done */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setStage((prev) => {
        if (prev === "popup") return "gap";
        if (prev === "offer") return "done";
        return prev;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closePopup = () =>
    setStage((prev) => (prev === "popup" ? "gap" : prev));
  const closeOffer = () =>
    setStage((prev) => (prev === "offer" ? "done" : prev));

  return (
    <>
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            key="enquiry-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closePopup}
            className="fixed inset-0 z-[95] flex min-h-screen items-center justify-center overflow-y-auto overscroll-contain bg-charcoal/80 p-3 backdrop-blur-sm sm:p-5 md:p-6"
          >
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
              className="relative my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-limestone text-charcoal shadow-2xl shadow-charcoal/50 ring-1 ring-charcoal/10 sm:max-h-[calc(100dvh-3rem)] sm:rounded-3xl"
            >
              {/* ══ Compact Architectural Header ══════════════════ */}
              <motion.div
                variants={childVariants}
                className="relative shrink-0 overflow-hidden px-5 py-5 text-limestone sm:px-8 sm:py-7"
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
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40"
                />
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
                  onClick={closePopup}
                  aria-label="Close enquiry form"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-limestone/25 bg-charcoal/20 text-limestone backdrop-blur-sm transition-colors duration-200 hover:bg-limestone hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta sm:h-10 sm:w-10"
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
                    className="h-8 w-auto max-w-[140px] object-contain opacity-95 brightness-0 invert sm:h-9"
                  />
                </div>

                {/* Title */}
                <h2
                  id="site-enquiry-title"
                  className="relative mt-1.5 font-display text-2xl font-light leading-tight tracking-tight text-limestone sm:text-3xl"
                >
                  Let's find your place.
                </h2>

                {/* Description */}
                <p
                  id="site-enquiry-desc"
                  className="relative mt-1.5 max-w-md text-xs leading-relaxed text-limestone/80 sm:text-sm"
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
                    // Wait a beat so the user sees confirmation, then close
                    setTimeout(() => {
                      setStage((prev) => (prev === "popup" ? "gap" : prev));
                    }, 2500);
                  }}
                />
              </motion.div>

              {/* ══ Static terracotta foundation hairline ═════════ */}
              <div className="h-[3px] w-full shrink-0 bg-gradient-to-r from-terracotta via-terracotta to-terracotta/60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Offer — controlled entirely by the parent state machine */}
      <LiveOfferNotification
        visible={stage === "offer"}
        onDismiss={closeOffer}
      />
    </>
  );
}