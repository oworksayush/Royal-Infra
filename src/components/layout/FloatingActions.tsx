import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Official WhatsApp Vector Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.19 8.19 0 01-5.82 2.41c-1.44 0-2.85-.38-4.09-1.11l-.29-.17-3.12.82.83-3.04-.19-.31a8.214 8.214 0 01-1.26-4.43c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.31 3.8 2.53 1.09 2.53.73 2.99.68.46-.05 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.3z" />
    </svg>
  );
}

export function FloatingActions() {
  const [hovered, setHovered] = useState<"phone" | "whatsapp" | "contact" | null>(null);

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7 sm:gap-3.5 select-none"
    >
      {/* ── 1. Phone Call Button ──────────────────────────────── */}
      <div className="relative flex items-center justify-end">
        {/* Desktop Slide-out Tooltip / Badge */}
        <AnimatePresence>
          {hovered === "phone" && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-xl bg-charcoal/95 px-3.5 py-2 text-right shadow-xl shadow-charcoal/30 ring-1 ring-limestone/15 backdrop-blur-md sm:block"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-terracotta">
                Direct Line • Advisory
              </p>
              <p className="font-mono text-xs text-limestone">{site.phone}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Button with Radar Ring Animation */}
        <motion.a
          href={site.phoneHref}
          aria-label={`Call Royal Infra Realty at ${site.phone}`}
          onMouseEnter={() => setHovered("phone")}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full text-limestone",
            "bg-gradient-to-br from-charcoal via-[#232a26] to-[#181d1a]",
            "shadow-lg shadow-charcoal/40 ring-1 ring-terracotta/40 transition-shadow duration-300",
            "hover:ring-terracotta hover:shadow-terracotta/25"
          )}
        >
          {/* Subtle Radar Wave Ping */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-terracotta/40 animate-ping opacity-60"
            style={{ animationDuration: "3.2s" }}
          />

          {/* Secondary ambient pulse */}
          <span
            aria-hidden
            className="absolute -inset-0.5 rounded-full bg-terracotta/15 blur-sm transition-opacity group-hover:opacity-100 opacity-60"
          />

          {/* Icon with Periodic Ringing Wobble */}
          <motion.span
            animate={{
              rotate: [0, -14, 14, -10, 10, -4, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 3.4,
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="relative z-10 text-terracotta transition-colors duration-300 group-hover:text-limestone"
          >
            <Phone className="h-[21px] w-[21px] sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
          </motion.span>
        </motion.a>
      </div>

      {/* ── 2. WhatsApp Button ───────────────────────────────── */}
      <div className="relative flex items-center justify-end">
        {/* Desktop Slide-out Tooltip / Badge */}
        <AnimatePresence>
          {hovered === "whatsapp" && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-xl bg-charcoal/95 px-3.5 py-2 text-right shadow-xl shadow-charcoal/30 ring-1 ring-[#25D366]/30 backdrop-blur-md sm:block"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#25D366]">
                WhatsApp Consultation
              </p>
              <p className="font-sans text-xs text-limestone">Chat with property specialist</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Button with Glowing Green Aura */}
        <motion.a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Royal Infra Realty on WhatsApp"
          onMouseEnter={() => setHovered("whatsapp")}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full text-white",
            "bg-gradient-to-br from-[#29db6c] to-[#128C7E]",
            "shadow-lg shadow-[#25D366]/35 ring-1 ring-white/30 transition-shadow duration-300",
            "hover:shadow-[#25D366]/50 hover:ring-white/60"
          )}
        >
          {/* Ambient WhatsApp Glow Ring */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-[#25D366]/60 animate-ping opacity-60"
            style={{ animationDuration: "3.6s", animationDelay: "1s" }}
          />

          {/* Green backlight blur */}
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full bg-[#25D366]/25 blur-md opacity-70 group-hover:opacity-100 transition-opacity"
          />

          {/* Subtle live active dot */}
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-white flex items-center justify-center shadow-md z-20"
          >
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
          </span>

          {/* WhatsApp SVG Icon with Gentle Breathing Pulse */}
          <motion.span
            animate={{
              scale: [1, 1.07, 1],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2.8,
              duration: 0.9,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <WhatsAppIcon className="h-6 w-6 sm:h-[26px] sm:w-[26px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
          </motion.span>
        </motion.a>
      </div>

      {/* ── 3. Contact / Enquiry Page Button ─────────────────── */}
      <div className="relative flex items-center justify-end">
        {/* Desktop Slide-out Tooltip / Badge */}
        <AnimatePresence>
          {hovered === "contact" && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-xl bg-charcoal/95 px-3.5 py-2 text-right shadow-xl shadow-charcoal/30 ring-1 ring-limestone/15 backdrop-blur-md sm:block"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-terracotta">
                Express Interest
              </p>
              <p className="font-sans text-xs text-limestone">Book Site Visit & Enquiry</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Button with Architectural Terracotta Theme & Glimmer */}
        <motion.a
          href="/contact-us"
          aria-label="Navigate to Contact and Enquiry page"
          onMouseEnter={() => setHovered("contact")}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full text-limestone overflow-hidden",
            "bg-gradient-to-br from-charcoal via-rosewood to-charcoal",
            "shadow-lg shadow-charcoal/40 ring-1 ring-limestone/25 transition-all duration-300",
            "hover:ring-terracotta hover:shadow-rosewood/30"
          )}
        >
          {/* Subtle Glimmer Sweep Line */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-limestone/25 to-transparent"
            animate={{
              translateX: ["-100%", "200%"],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 3.2,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />

          {/* Ambient Glow */}
          <span
            aria-hidden
            className="absolute -inset-0.5 rounded-full bg-rosewood/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity"
          />

          {/* Sparkle micro-badge on corner */}
          <span
            aria-hidden
            className="absolute top-1.5 right-1.5 z-20 text-terracotta opacity-85 group-hover:rotate-12 transition-transform"
          >
            <Sparkles className="h-2.5 w-2.5" />
          </span>

          {/* Mail / Enquiry Icon */}
          <motion.span
            whileHover={{ y: -1 }}
            className="relative z-10 transition-transform duration-200"
          >
            <Mail className="h-5 w-5 sm:h-[22px] sm:w-[22px] text-limestone group-hover:text-terracotta transition-colors duration-200" strokeWidth={1.8} />
          </motion.span>
        </motion.a>
      </div>
    </aside>
  );
}
