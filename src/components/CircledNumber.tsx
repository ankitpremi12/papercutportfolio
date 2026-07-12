/* ─────────────────────────────────────────────
 * CircledNumber — rough hand-drawn circle + number
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";

interface CircledNumberProps {
  number: number;
  size?: number;
  color?: string;
  className?: string;
}

export default function CircledNumber({
  number,
  size = 44,
  color = "#FFFFFF",
  className = "",
}: CircledNumberProps) {
  const r = size / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;

  // Slightly imperfect circle path
  const circlePath = `
    M ${cx} ${cy - r}
    C ${cx + r * 0.6} ${cy - r - 1}, ${cx + r + 1} ${cy - r * 0.5}, ${cx + r} ${cy + 1}
    C ${cx + r + 1} ${cy + r * 0.6}, ${cx + r * 0.5} ${cy + r + 1}, ${cx - 1} ${cy + r}
    C ${cx - r * 0.6} ${cy + r + 1}, ${cx - r - 1} ${cy + r * 0.4}, ${cx - r} ${cy - 2}
    C ${cx - r} ${cy - r * 0.5}, ${cx - r * 0.4} ${cy - r - 1}, ${cx} ${cy - r}
  `;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <motion.path
          d={circlePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.svg>
      <span
        className="relative z-10 font-[family-name:var(--font-caveat)] text-lg font-bold"
        style={{ color }}
      >
        {number}
      </span>
    </div>
  );
}
