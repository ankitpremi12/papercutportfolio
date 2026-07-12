/* ─────────────────────────────────────────────
 * CaseStudyPage — reusable case study template
 * Renders whichever sections are present in data
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import PaperCard from "./PaperCard";
import StatChip from "./StatChip";
import HandDrawnUnderline from "./HandDrawnUnderline";
import HandDrawnArrow from "./HandDrawnArrow";
import StepWalkthrough from "./StepWalkthrough";
import HandInkedTable from "./HandInkedTable";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface CaseStudyPageProps {
  data: CaseStudy;
}

export default function CaseStudyPage({ data }: CaseStudyPageProps) {
  return (
    <div className="min-h-screen bg-blue-primary text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* ── Back link ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/#best-work"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-caveat)] text-xl text-blue-muted hover:text-white transition-colors"
          >
            <HandDrawnArrow direction="left" color="#7C89E8" size={30} />
            back to portfolio
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <motion.h1
            variants={fadeUp}
            className="font-[family-name:var(--font-caveat)] text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            {data.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-white/70 mb-6">
            {data.subtitle}
          </motion.p>
          {data.duration && (
            <motion.p variants={fadeUp} className="text-sm text-blue-muted mb-6">
              {data.duration}
            </motion.p>
          )}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <HandDrawnUnderline width={300} color="#D8F24E" />
        </motion.header>

        {/* ── Impact Stats ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <div className="flex flex-wrap gap-4">
            {data.impactStats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <StatChip value={stat.value} label={stat.label} variant="dark" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Problem ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-16"
        >
          <PaperCard variant="navy" rotation={-0.5} className="p-8 md:p-10">
            <div className="absolute -left-1 top-8 bottom-8 w-1 bg-red-accent rounded-full" />
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold mb-4"
            >
              <span className="highlighter">{data.problem.headline}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-white/70 leading-relaxed">
              {data.problem.body}
            </motion.p>
          </PaperCard>
        </motion.section>

        {/* ── Solution / Strategy ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold mb-8"
          >
            Strategy
          </motion.h2>
          <div className="space-y-6">
            {data.solution.steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-dark rounded-lg font-bold text-xl text-lime">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-caveat)] text-2xl font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < data.solution.steps.length - 1 && (
                  <div className="hidden md:block absolute -bottom-4 left-7">
                    <HandDrawnArrow direction="down" color="#7C89E8" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Data/Method Walkthrough (optional) ── */}
        {data.dataWalkthrough && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold mb-8"
            >
              Data Pipeline
            </motion.h2>
            <StepWalkthrough steps={data.dataWalkthrough.steps} />
          </motion.section>
        )}

        {/* ── Comparison Table (optional) ── */}
        {data.comparisonTable && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold mb-8"
            >
              Model Comparison
            </motion.h2>
            <motion.div variants={fadeUp}>
              <HandInkedTable
                headers={data.comparisonTable.headers}
                rows={data.comparisonTable.rows}
              />
            </motion.div>
          </motion.section>
        )}

        {/* ── Deployment (optional) ── */}
        {data.deployment && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeUp}>
              <PaperCard variant="dark" rotation={0.5} className="p-8">
                <h2 className="font-[family-name:var(--font-caveat)] text-2xl font-bold mb-3 text-lime">
                  {data.deployment.title}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  {data.deployment.body}
                </p>
              </PaperCard>
            </motion.div>
          </motion.section>
        )}

        {/* ── EDA / Supporting Visuals (optional) ── */}
        {data.eda && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold mb-6"
            >
              Exploratory Analysis
            </motion.h2>
            <motion.ul variants={fadeUp} className="space-y-3">
              {data.eda.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-lime flex-shrink-0" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {/* ── Business Value / Impact ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-16"
        >
          <div className="relative">
            {/* Impact tab */}
            <div
              className="absolute -left-10 top-1/2 -translate-y-1/2 bg-lime text-dark text-xs font-bold uppercase tracking-widest px-3 py-1.5 hidden md:block"
              style={{ transform: "rotate(-90deg) translateX(-50%)", transformOrigin: "left center" }}
            >
              Impact
            </div>

            <PaperCard variant="cream" rotation={0} className="p-8 md:p-10 md:ml-8">
              <motion.h2
                variants={fadeUp}
                className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold mb-4 text-dark"
              >
                {data.businessValue.headline}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-dark/70 leading-relaxed">
                {data.businessValue.body}
              </motion.p>
            </PaperCard>
          </div>
        </motion.section>

        {/* ── Tech Stack ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h3
            variants={fadeUp}
            className="font-[family-name:var(--font-caveat)] text-2xl font-bold mb-4"
          >
            Tech Stack
          </motion.h3>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {data.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm bg-dark rounded-md text-white/80 font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Footer back link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <Link
            href="/#best-work"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-caveat)] text-xl text-blue-muted hover:text-white transition-colors"
          >
            <HandDrawnArrow direction="left" color="#7C89E8" size={30} />
            back to all projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
