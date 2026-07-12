/* ─────────────────────────────────────────────
 * BestWork — summary cards linking to case studies
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { bestWork } from "@/lib/content";
import PaperCard from "../PaperCard";
import StatChip from "../StatChip";
import HandDrawnUnderline from "../HandDrawnUnderline";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, rotate: 1 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 18 },
  },
};

export default function BestWork() {
  return (
    <section id="best-work" className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12"
      >
        <h2 className="font-[family-name:var(--font-caveat)] text-5xl md:text-7xl font-bold text-white mb-2">
          Best Work
        </h2>
        <HandDrawnUnderline width={200} color="#D8F24E" />
        <p className="text-blue-muted mt-4 text-sm">
          click any card to see the full case study →
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {bestWork.map((project, i) => {
          const rotations = [-1, 1.2, -0.8, 0.6];
          const rotation = rotations[i % rotations.length];

          return (
            <motion.div key={project.slug} variants={cardVariant}>
              <Link href={`/best-work/${project.slug}`} className="block group">
                <PaperCard
                  variant={i % 2 === 0 ? "navy" : "dark"}
                  rotation={rotation}
                  className="p-7 md:p-8 cursor-pointer h-full"
                >
                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-5">{project.subtitle}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-white/8 text-white/60 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Impact stats */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.impactStats.slice(0, 3).map((stat) => (
                      <StatChip
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        variant="dark"
                        className="text-xs"
                      />
                    ))}
                  </div>

                  {/* Read more hint */}
                  <div className="flex items-center gap-2 text-blue-muted group-hover:text-white transition-colors duration-300">
                    <span className="font-[family-name:var(--font-caveat)] text-base">
                      → read full case study
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    >
                      <path
                        d="M 4 10 Q 8 8, 12 10 L 16 10 M 13 7 L 16 10 L 13 13"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </PaperCard>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
