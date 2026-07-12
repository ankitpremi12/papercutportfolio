/* ─────────────────────────────────────────────
 * CVCloud — word cloud with breathing animation
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { cvWords } from "@/lib/content";
import HandDrawnUnderline from "../HandDrawnUnderline";

const sizeMap = {
  xl: "text-6xl md:text-7xl",
  lg: "text-4xl md:text-5xl",
  md: "text-2xl md:text-3xl",
  sm: "text-xl md:text-2xl",
};

const weightMap = {
  bold: "font-bold",
  semibold: "font-semibold",
  normal: "font-normal",
};

export default function CVCloud() {
  return (
    <section id="cv-cloud" className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 text-center"
      >
        <h2 className="font-[family-name:var(--font-caveat)] text-5xl md:text-7xl font-bold text-white mb-2">
          My CV in ~40 Words
        </h2>
        <HandDrawnUnderline width={240} color="#D8F24E" className="mx-auto" />
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {cvWords.map((word, i) => (
          <span
            key={word.word}
            className={`
              font-[family-name:var(--font-caveat)]
              ${sizeMap[word.size]}
              ${weightMap[word.weight]}
              text-white
              word-float
              word-float-${(i % 8) + 1}
              cursor-default
              transition-colors duration-300
              hover:text-lime
            `}
            style={{
              opacity: word.size === "xl" ? 1 : word.size === "lg" ? 0.85 : word.size === "md" ? 0.65 : 0.45,
            }}
          >
            {word.word}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
