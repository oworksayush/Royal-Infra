import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { shouldShowEntranceFlow } from "@/lib/entrance";
import logoImg from "@/assets/Royal_Infra_Logo.png";

export function Preloader() {
  const [show, setShow] = useState(() => {
    // Only run on page refresh or first load in the tab; never on page switches
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return shouldShowEntranceFlow();
  });

  const [isExiting, setIsExiting] = useState(false);

  // Prevent background scrolling while preloader is active
  useEffect(() => {
    if (!show) return;

    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    window.scrollTo(0, 0);

    const preventScroll = (e: Event) => e.preventDefault();
    const preventKeys = (e: KeyboardEvent) => {
      const blocked = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Space"];
      if (blocked.includes(e.code) || blocked.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevTouchAction;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [show]);

  // Clean, minimalist timer sequence (~1.15s display + smooth curtain exit)
  useEffect(() => {
    if (!show) return;

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      const closeTimer = setTimeout(() => {
        setShow(false);
      }, 700);
      return () => clearTimeout(closeTimer);
    }, 1150);

    return () => clearTimeout(exitTimer);
  }, [show]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <div
        role="status"
        aria-label="Royal Infra Realty"
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto select-none overflow-hidden bg-charcoal"
      >
        {/* ── Top Shutter Curtain ─────────────────────────── */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isExiting ? "-100%" : 0 }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#181d1a] border-b border-terracotta/20 origin-top z-10"
        />

        {/* ── Bottom Shutter Curtain ───────────────────────── */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isExiting ? "100%" : 0 }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#181d1a] border-t border-terracotta/20 origin-bottom z-10"
        />

        {/* ── Subtle Center Ambient Glow ───────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-15 flex items-center justify-center"
        >
          <div className="h-72 w-72 rounded-full bg-terracotta/[0.06] blur-[80px]" />
        </div>

        {/* ── Minimalist Brand Emblem & Content ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            y: isExiting ? -12 : 0,
            scale: isExiting ? 0.98 : 1,
          }}
          transition={{
            duration: isExiting ? 0.35 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-20 flex flex-col items-center text-center px-6"
        >
          {/* Official Royal Infra Company Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-3 flex items-center justify-center"
          >
            <img
              src={logoImg}
              alt="Royal Infra"
              className="h-16 sm:h-20 w-auto max-w-[220px] sm:max-w-[260px] object-contain brightness-0 invert drop-shadow-[0_4px_20px_rgba(196,109,78,0.25)]"
            />
          </motion.div>

          {/* Minimalist Hairline Progress Bar (No Numbers, Pure Sophistication) */}
          <div className="mt-7 w-40 sm:w-48">
            <div className="relative h-[1.5px] w-full bg-limestone/15 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-terracotta shadow-[0_0_8px_rgba(196,109,78,0.6)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
