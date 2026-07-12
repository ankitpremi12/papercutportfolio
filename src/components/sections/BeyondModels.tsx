/* ─────────────────────────────────────────────
 * Beyond Models — personal hobbies section
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { beyondModelsContent } from "@/lib/content";
import HandDrawnUnderline from "../HandDrawnUnderline";
import StickyNote from "../StickyNote";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BeyondModels() {
  return (
    <section id="beyond-models" className="relative py-20 md:py-32">
      {/* Background styling for contrast */}
      <div className="absolute inset-0 bg-[#F0EDE4] notebook-paper opacity-100" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-dark">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-[family-name:var(--font-caveat)] text-5xl md:text-7xl font-bold mb-2">
            Beyond Models <br className="md:hidden" />
            <span className="text-red-accent">& Metrics</span>
          </h2>
          <HandDrawnUnderline width={350} color="#B23A3A" />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl font-semibold max-w-3xl mb-12"
            style={{ paddingLeft: "80px" }} // align slightly past red margin line
          >
            {beyondModelsContent.intro}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beyondModelsContent.hobbies.map((hobby, i) => {
              const rotations = [-2, 1.5, -1];
              const rotation = rotations[i % rotations.length];
              const tapePositions = ["left", "center", "right"] as const;
              
              return (
                <motion.div key={hobby.title} variants={fadeUp}>
                  <StickyNote
                    rotation={rotation}
                    tapePosition={tapePositions[i % tapePositions.length]}
                    className="h-full"
                    color={i % 2 === 0 ? "bg-white" : "bg-lime/20"}
                  >
                    <div className="text-4xl mb-4">{hobby.emoji}</div>
                    <h3 className="text-2xl font-bold mb-3">{hobby.title}</h3>
                    <p className="text-dark/80 text-lg leading-relaxed">
                      {hobby.description}
                    </p>
                  </StickyNote>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
