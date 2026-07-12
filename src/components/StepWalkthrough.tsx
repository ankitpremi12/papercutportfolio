/* ─────────────────────────────────────────────
 * StepWalkthrough — before → after torn cards
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import HandDrawnArrow from "./HandDrawnArrow";

interface StepWalkthroughProps {
  steps: { title: string; before: string; after: string }[];
  className?: string;
}

export default function StepWalkthrough({ steps, className = "" }: StepWalkthroughProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <h4 className="font-[family-name:var(--font-caveat)] text-xl text-white/80">
            {step.title}
          </h4>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Before card */}
            <div
              className="flex-1 bg-cream/10 backdrop-blur-sm border border-white/10 rounded-sm p-4 torn-edge-bottom"
              style={{ boxShadow: "var(--shadow-sticky)" }}
            >
              <span className="text-xs uppercase tracking-wider text-red-accent font-bold mb-1 block">
                Input
              </span>
              <p className="font-mono text-sm text-white/80">{step.before}</p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 rotate-90 md:rotate-0">
              <HandDrawnArrow direction="right" color="#D8F24E" size={40} />
            </div>

            {/* After card */}
            <div
              className="flex-1 bg-lime/10 backdrop-blur-sm border border-lime/20 rounded-sm p-4 torn-edge-top"
              style={{ boxShadow: "var(--shadow-sticky)" }}
            >
              <span className="text-xs uppercase tracking-wider text-lime font-bold mb-1 block">
                Output
              </span>
              <p className="font-mono text-sm text-white/80">{step.after}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
