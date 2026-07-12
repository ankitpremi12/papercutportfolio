/* ─────────────────────────────────────────────
 * Certifications — grid of small paper cards
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/content";
import PaperCard from "../PaperCard";
import HandDrawnUnderline from "../HandDrawnUnderline";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 18 },
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12"
      >
        <h2 className="font-[family-name:var(--font-caveat)] text-5xl md:text-7xl font-bold text-white mb-2 leading-tight">
          Global Certifications <br className="md:hidden" />
          <span className="text-lime">&</span> Achievements
        </h2>
        <HandDrawnUnderline width={350} color="#D8F24E" />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certifications.map((cert, i) => {
          const rotations = [-1.5, 2, -1, 1.5, -0.5, 1];
          const rotation = rotations[i % rotations.length];
          const variants = ["navy", "cream", "dark", "blue"] as const;
          const variant = variants[i % variants.length];

          return (
            <motion.div key={cert.title} variants={cardVariant} className="h-full">
              <PaperCard
                variant={variant}
                rotation={rotation}
                className="p-6 h-full flex flex-col justify-center"
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    variant === "cream" ? "text-red-accent" : "text-lime"
                  }`}
                >
                  {cert.issuer}
                </span>
                <h3
                  className={`font-[family-name:var(--font-caveat)] text-2xl font-bold leading-snug ${
                    variant === "cream" ? "text-dark" : "text-white"
                  }`}
                >
                  {cert.title}
                </h3>
              </PaperCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
