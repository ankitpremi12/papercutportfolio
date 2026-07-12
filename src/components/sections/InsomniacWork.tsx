/* ─────────────────────────────────────────────
 * InsomniacWork — chaotic collage/moodboard
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { insomniacWork } from "@/lib/content";
import HandDrawnUnderline from "../HandDrawnUnderline";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function InsomniacWork() {
  // Semi-random positions for collage layout
  const positions = [
    { x: "5%", y: "0%", from: { x: -60, y: -30 } },
    { x: "45%", y: "2%", from: { x: 40, y: -50 } },
    { x: "20%", y: "35%", from: { x: -40, y: 30 } },
    { x: "60%", y: "28%", from: { x: 60, y: -20 } },
    { x: "8%", y: "62%", from: { x: -50, y: 40 } },
    { x: "50%", y: "60%", from: { x: 30, y: 50 } },
  ];

  return (
    <section id="insomniac" className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12"
      >
        <h2 className="font-[family-name:var(--font-caveat)] text-5xl md:text-7xl font-bold text-white mb-2">
          Insomniac Work
        </h2>
        <HandDrawnUnderline width={280} color="#D8F24E" />
        <p className="text-blue-muted mt-4 text-sm font-[family-name:var(--font-caveat)] text-lg">
          things i build when i should be sleeping
        </p>
      </motion.div>

      {/* Collage layout */}
      <style>{`
        @media (min-width: 768px) {
          .insomniac-card {
            left: var(--md-left) !important;
            top: var(--md-top) !important;
            position: absolute !important;
          }
        }
      `}</style>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative flex flex-col md:block min-h-0 md:min-h-[600px] gap-8 md:gap-0"
      >
        {insomniacWork.map((item, i) => {
          const pos = positions[i % positions.length];
          return (
            <motion.div
              key={item.title}
              className="relative w-full sm:w-3/4 md:w-[280px] mx-auto insomniac-card"
              style={{
                "--md-left": pos.x,
                "--md-top": pos.y,
                zIndex: item.zIndex,
              } as React.CSSProperties}
              initial={{
                opacity: 0,
                x: pos.from.x,
                y: pos.from.y,
                rotate: item.rotation - 5,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: item.rotation,
              }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 16,
                delay: i * 0.08,
              }}
            >
              <div
                className="p-5 md:p-6 rounded-sm font-[family-name:var(--font-caveat)]"
                style={{
                  backgroundColor: item.color,
                  boxShadow: "var(--shadow-paper)",
                }}
              >
                {/* Tape */}
                <div className="tape-strip absolute -top-3 left-1/2 -translate-x-1/2" />

                <h4 className="text-xl md:text-2xl font-bold text-dark mb-2">{item.title}</h4>
                <p className="text-base md:text-lg text-dark/70 leading-snug">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
