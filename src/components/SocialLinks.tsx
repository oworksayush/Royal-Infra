import { motion, useReducedMotion } from "framer-motion";
import { AtSign, Facebook, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";
import { site } from "@/data/site";

type SocialLinksProps = { variant: "footer" | "contact" };

const brandIcons: Record<string, LucideIcon> = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Threads: AtSign,
};

export function SocialLinks({ variant }: SocialLinksProps) {
  const reduceMotion = useReducedMotion();
  const footer = variant === "footer";

  return (
    <motion.ul
      aria-label="Social media"
      className={`flex flex-wrap ${footer ? "gap-3" : "gap-x-5 gap-y-4"}`}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
      }}
    >
      {site.social.map((social) => {
        const Icon = brandIcons[social.label];
        return (
          <motion.li
            key={social.href}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.06 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className={`group flex items-center justify-center rounded-full border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta ${
                footer
                  ? "h-11 w-11 border-limestone/20 text-limestone/75 hover:border-terracotta hover:bg-terracotta hover:text-charcoal"
                  : "h-12 w-12 border-charcoal/20 text-charcoal/75 hover:border-charcoal hover:bg-charcoal hover:text-limestone"
              }`}
            >
              {social.label === "X" ? (
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="currentColor"
                >
                  <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-8.14L4.92 22H1.8l7.25-8.29L1.2 2h6.4l4.43 7.42L18.9 2Zm-1.1 18h1.73L6.67 3.88H4.81L17.8 20Z" />
                </svg>
              ) : (
                <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.7} />
              )}
              {!footer && <span className="sr-only">{social.label}</span>}
            </motion.a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
