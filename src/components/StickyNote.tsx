/* ─────────────────────────────────────────────
 * StickyNote — cream note with tape strip
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StickyNoteProps {
  children: ReactNode;
  rotation?: number;
  className?: string;
  color?: string;
  tapePosition?: "center" | "left" | "right";
}

export default function StickyNote({
  children,
  rotation = -2,
  className = "",
  color = "bg-cream",
  tapePosition = "center",
}: StickyNoteProps) {
  const tapeOffset =
    tapePosition === "left"
      ? "left-4"
      : tapePosition === "right"
        ? "right-4"
        : "left-1/2 -translate-x-1/2";

  return (
    <motion.div
      className={`relative p-5 font-[family-name:var(--font-caveat)] text-dark ${color} ${className}`}
      style={{
        rotate: rotation,
        boxShadow: "var(--shadow-sticky)",
      }}
      initial={{ opacity: 0, y: 20, rotate: rotation - 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {/* Tape strip */}
      <div
        className={`tape-strip absolute -top-2.5 ${tapeOffset} z-10`}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
