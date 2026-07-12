/* ─────────────────────────────────────────────
 * ProjectsInternships — numbered paper cards
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { experiences } from "@/lib/content";
import PaperCard from "../PaperCard";
import CircledNumber from "../CircledNumber";
import HandDrawnUnderline from "../HandDrawnUnderline";
import StickyNote from "../StickyNote";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 18 },
  },
};

export default function ProjectsInternships() {
  return (
    <section id="projects" className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12"
      >
        <h2 className="font-[family-name:var(--font-caveat)] text-5xl md:text-7xl font-bold text-white mb-2">
          Experience
        </h2>
        <HandDrawnUnderline width={300} color="#D8F24E" />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-8"
      >
        {experiences.map((exp) => {
          const rotations = [-1.5, 1, -0.8, 1.2];
          const rotation = rotations[exp.number % rotations.length];

          return (
            <motion.div key={exp.company} variants={cardVariant}>
              <PaperCard
                variant={exp.variant}
                rotation={rotation}
                className="p-8 md:p-10"
              >
                {/* Circled number badge */}
                <div className="absolute -top-3 -right-3 md:top-4 md:right-4">
                  <CircledNumber
                    number={exp.number}
                    color={exp.variant === "cream" ? "#0B0B0E" : "#FFFFFF"}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <h3
                      className={`font-[family-name:var(--font-caveat)] text-3xl font-bold mb-1 ${
                        exp.variant === "cream" ? "text-dark" : "text-white"
                      }`}
                    >
                      {exp.company}
                    </h3>
                    <p
                      className={`text-sm mb-1 ${
                        exp.variant === "cream" ? "text-dark/60" : "text-white/60"
                      }`}
                    >
                      {exp.oneLiner}
                    </p>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                        exp.variant === "cream" ? "text-red-accent" : "text-lime"
                      }`}
                    >
                      {exp.role}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((a) => (
                        <li
                          key={a}
                          className={`flex items-start gap-2 text-sm ${
                            exp.variant === "cream" ? "text-dark/70" : "text-white/70"
                          }`}
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-50" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats cluster */}
                  <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
                    {exp.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-lg px-4 py-2 text-center ${
                          exp.variant === "cream"
                            ? "bg-dark text-white"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <span className="text-xl font-bold block">{stat.value}</span>
                        <span className="text-[10px] uppercase tracking-wider opacity-60">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </PaperCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Methodology & Visual Reference Links */}
      <div className="mt-20 border-t border-white/10 pt-16 text-center max-w-4xl mx-auto">
        <h3 className="font-[family-name:var(--font-caveat)] text-3xl font-bold text-white mb-8">
          The Foundations Behind My Answers:
        </h3>
        <div className="flex flex-row overflow-x-auto pb-4 gap-6 scrollbar-none snap-x snap-mandatory justify-start md:justify-center items-center">

          <Link href="/chart-library" className="snap-center flex-shrink-0">
            <div className="inline-block cursor-pointer transform hover:scale-105 hover:rotate-2 active:scale-95 transition-all duration-200">
              <StickyNote rotation={-2} tapePosition="center" color="bg-[#FFFDF5]" className="p-4 shadow-xl border border-dark/5 w-[220px] text-left">
                <p className="font-mono text-[9px] font-bold mb-1 text-blue-primary">VISUAL LITERACY</p>
                <p className="font-[family-name:var(--font-caveat)] text-xl font-bold leading-tight text-dark">
                  I&apos;m an Open Book — Let&apos;s See Different Types of Charts
                </p>
                <span className="font-mono text-[9px] text-red-accent block mt-3 font-semibold">explore library →</span>
              </StickyNote>
            </div>
          </Link>

          <Link href="/algorithm-library" className="snap-center flex-shrink-0">
            <div className="inline-block cursor-pointer transform hover:scale-105 hover:-rotate-2 active:scale-95 transition-all duration-200">
              <StickyNote rotation={-1.5} tapePosition="center" color="bg-blue-muted/30" className="p-4 shadow-xl border border-dark/5 w-[220px] text-left">
                <p className="font-mono text-[9px] font-bold mb-1 text-red-accent">METHODOLOGY</p>
                <p className="font-[family-name:var(--font-caveat)] text-xl font-bold leading-tight text-dark">
                  The Methods Behind My Answers — Algorithms I Use
                </p>
                <span className="font-mono text-[9px] text-[#1E2FE0] block mt-3 font-semibold">explore algorithms →</span>
              </StickyNote>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
