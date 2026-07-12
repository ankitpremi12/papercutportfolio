/* ─────────────────────────────────────────────
 * HandDrawnArrow — wobbly SVG arrow
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";

interface HandDrawnArrowProps {
  direction?: "right" | "left" | "down";
  color?: string;
  size?: number;
  className?: string;
}

export default function HandDrawnArrow({
  direction = "right",
  color = "#FFFFFF",
  size = 60,
  className = "",
}: HandDrawnArrowProps) {
  const paths: Record<string, { line: string; head: string }> = {
    right: {
      line: `M 2 ${size / 2} Q ${size * 0.3} ${size / 2 - 4}, ${size * 0.5} ${size / 2 + 2} Q ${size * 0.7} ${size / 2 + 6}, ${size - 12} ${size / 2}`,
      head: `M ${size - 18} ${size / 2 - 7} L ${size - 6} ${size / 2} L ${size - 18} ${size / 2 + 7}`,
    },
    left: {
      line: `M ${size - 2} ${size / 2} Q ${size * 0.7} ${size / 2 + 4}, ${size * 0.5} ${size / 2 - 2} Q ${size * 0.3} ${size / 2 - 6}, 12 ${size / 2}`,
      head: `M 18 ${size / 2 - 7} L 6 ${size / 2} L 18 ${size / 2 + 7}`,
    },
    down: {
      line: `M ${size / 2} 2 Q ${size / 2 + 4} ${size * 0.3}, ${size / 2 - 2} ${size * 0.5} Q ${size / 2 - 5} ${size * 0.7}, ${size / 2} ${size - 12}`,
      head: `M ${size / 2 - 7} ${size - 18} L ${size / 2} ${size - 6} L ${size / 2 + 7} ${size - 18}`,
    },
  };

  const { line, head } = paths[direction];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d={head}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
      />
    </motion.svg>
  );
}
