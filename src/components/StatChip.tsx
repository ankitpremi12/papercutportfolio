/* ─────────────────────────────────────────────
 * StatChip — rounded-rect stat display
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";

interface StatChipProps {
  value: string;
  label: string;
  variant?: "dark" | "lime" | "cream" | "blue";
  className?: string;
}

const chipStyles = {
  dark: "bg-dark text-white",
  lime: "bg-lime text-dark",
  cream: "bg-cream text-dark",
  blue: "bg-blue-primary text-white border border-blue-muted/30",
};

export default function StatChip({
  value,
  label,
  variant = "dark",
  className = "",
}: StatChipProps) {
  return (
    <motion.div
      className={`inline-flex flex-col items-center justify-center rounded-lg px-4 py-3 ${chipStyles[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <span className="text-2xl font-bold leading-tight font-[family-name:var(--font-inter)]">
        {value}
      </span>
      <span className="text-xs uppercase tracking-wider opacity-70 mt-0.5">
        {label}
      </span>
    </motion.div>
  );
}
