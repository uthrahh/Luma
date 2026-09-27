"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  // Animates in on mount rather than on scroll-into-view: whileInView depends
  // on an IntersectionObserver callback actually firing, which can silently
  // never happen (fast/programmatic scroll, some browser quirks) and leaves
  // content stuck at opacity 0 — unacceptable on a marketing page's first
  // impression. Mount-triggered fade keeps the same look with no such risk.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
