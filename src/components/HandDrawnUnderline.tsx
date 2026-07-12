/* ─────────────────────────────────────────────
 * HandDrawnUnderline — wobbly SVG underline
 * Animates stroke-dashoffset on scroll into view
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";

interface HandDrawnUnderlineProps {
  width?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export default function HandDrawnUnderline({
  width = 200,
  color = "#D8F24E",
  strokeWidth = 3,
  className = "",
}: HandDrawnUnderlineProps) {
  // Slightly wobbly path that looks hand-drawn
  const pathD = `M 0 8 Q ${width * 0.15} 2, ${width * 0.25} 7 Q ${width * 0.35} 12, ${width * 0.5} 6 Q ${width * 0.65} 0, ${width * 0.75} 8 Q ${width * 0.85} 14, ${width} 5`;

  return (
    <motion.svg
      width={width}
      height={18}
      viewBox={`0 0 ${width} 18`}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
