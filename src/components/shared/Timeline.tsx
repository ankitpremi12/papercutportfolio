"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stage {
  label: string;
  details?: string;
  desc?: string;
}

interface TimelineProps {
  stages: Stage[];
  className?: string;
}

export default function Timeline({ stages, className = "" }: TimelineProps) {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((stage, idx) => (
          <div
            key={stage.label}
            onClick={() => setActiveStage(activeStage === idx ? null : idx)}
            className={`p-5 rounded-md border cursor-pointer select-none transition-all duration-300 relative ${
              activeStage === idx
                ? "bg-white text-dark border-white shadow-xl scale-102"
                : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs w-6 h-6 flex items-center justify-center rounded-full border ${
                  activeStage === idx ? "bg-blue-primary border-blue-primary text-white" : "border-white/25 text-white/50"
                }`}>
                  {idx + 1}
                </span>
                <span className="font-bold text-sm md:text-base">{stage.label}</span>
              </div>
              <span className={`transition-transform duration-300 font-mono text-xs ${activeStage === idx ? "rotate-90 text-blue-primary" : "text-white/30"}`}>
                ▶
              </span>
            </div>
            <AnimatePresence>
              {activeStage === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 text-xs md:text-sm leading-relaxed text-dark/80 font-mono pt-2 border-t border-dark/10"
                >
                  {stage.details || stage.desc}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
