import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** True only on desktop (>=1024px) without reduced-motion: gates pins and horizontal sequences. */
export function usePinnedMotion() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop && !reduced;
}
