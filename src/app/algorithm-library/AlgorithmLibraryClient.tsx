"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/sections/Header";
import HandDrawnArrow from "@/components/HandDrawnArrow";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

// Shared/Data components
import MiniAlgorithm from "@/components/shared/MiniAlgorithm";
import BackToPortfolioButton from "@/components/shared/BackToPortfolioButton";
import { algorithmCategories } from "@/data/algorithms";

// Entry transitions
const slideUpPage = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AlgorithmLibraryClient() {
  // Store the active algorithm ID per category to morph the corresponding canvas
  const [activeAlgos, setActiveAlgos] = useState<Record<string, string>>(() => {
    const initials: Record<string, string> = {};
    algorithmCategories.forEach((cat) => {
      if (cat.algorithms.length > 0) {
        initials[cat.category] = cat.algorithms[0].id;
      }
    });
    return initials;
  });

  const handleSelectAlgo = (category: string, id: string) => {
    setActiveAlgos((prev) => ({ ...prev, [category]: id }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, category: string, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectAlgo(category, id);
    }
  };

  // Assign distinct aesthetic palettes per category to create a beautiful, sequenced gallery
  const getPaletteVariant = (idx: number): "lime" | "purple" | "blue" => {
    const variants: ("lime" | "purple" | "blue")[] = ["lime", "purple", "blue"];
    return variants[idx % 3];
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUpPage}
      className="min-h-screen bg-blue-primary text-white font-[family-name:var(--font-inter)] selection:bg-lime/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="corner-bracket corner-bracket-tl" />
      <div className="corner-bracket corner-bracket-tr" />
      <div className="corner-bracket corner-bracket-bl" />
      <div className="corner-bracket corner-bracket-br" />

      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pt-32 pb-24 relative z-10 space-y-20 md:space-y-28">
        
        {/* ── BACK BUTTON ── */}
        <motion.div variants={fadeUp}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-caveat)] text-xl text-blue-muted hover:text-white transition-colors"
          >
            <HandDrawnArrow direction="left" color="#7C89E8" size={30} />
            back to portfolio
          </Link>
        </motion.div>

        {/* ── HERO SECTION ── */}
        <motion.section 
          variants={stagger}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="relative">
            <h1 className="font-[family-name:var(--font-caveat)] text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-none">
              Algorithm Library
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-lime font-bold mt-3 relative inline-block">
              The Methods Behind My Answers
              <HandDrawnUnderline width={340} color="#D8F24E" className="absolute -bottom-4 left-0" strokeWidth={3} />
            </h2>
          </motion.div>

          <motion.p variants={fadeUp} className="text-white/80 text-base sm:text-lg max-w-2xl font-mono pt-4 leading-relaxed">
            A chart shows what happened. An algorithm tells you why &mdash; and what&apos;s likely to happen next. Explore the analytical tools and models I apply to solve business problems.
          </motion.p>

          {/* Jump Navigation links */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-wrap gap-2 pt-4 border-t border-white/5"
          >
            {algorithmCategories.map((cat) => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="bg-white/5 hover:bg-lime hover:text-dark px-2.5 py-1.5 rounded-sm font-mono text-[9px] sm:text-[10px] uppercase transition-colors duration-200"
              >
                {cat.category}
              </a>
            ))}
          </motion.div>
        </motion.section>

        {/* ── CATEGORY SECTIONS ── */}
        <div className="space-y-24">
          {algorithmCategories.map((cat, catIdx) => {
            const activeId = activeAlgos[cat.category] || cat.algorithms[0]?.id;
            const palette = getPaletteVariant(catIdx);
            
            return (
              <motion.section
                key={cat.category}
                id={cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
                className="space-y-8 scroll-mt-24 border-t border-white/10 pt-10 first:border-0 first:pt-0"
              >
                {/* Category Header */}
                <motion.div variants={fadeUp} className="pb-2">
                  <span className="font-mono text-xs text-lime uppercase tracking-widest block">
                    Category {catIdx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    {cat.category}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-1 font-mono">{cat.description}</p>
                </motion.div>

                {/* Split Responsive Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                  
                  {/* Sticky Canvas Visual Panel */}
                  <div className="lg:col-span-5 lg:sticky lg:top-28 z-20 h-[220px] sm:h-[280px] lg:h-[360px] w-full">
                    <div className="relative w-full h-full">
                      {/* Glow background backing */}
                      <div className="absolute inset-0 bg-[#0D182E]/40 blur-xl -z-10" />
                      <MiniAlgorithm type={activeId} paletteVariant={palette} />
                      {/* Frame description border overlay */}
                      <div className="absolute bottom-2 left-2 bg-dark/80 px-2 py-0.5 rounded text-[8px] font-mono tracking-wider border border-white/10 uppercase opacity-60">
                        {activeId.replace("-", " ")}
                      </div>
                    </div>
                  </div>

                  {/* Descriptions List Panel */}
                  <div className="lg:col-span-7 space-y-6">
                    {cat.algorithms.map((algo) => {
                      const isActive = activeId === algo.id;
                      
                      return (
                        <div
                          key={algo.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleSelectAlgo(cat.category, algo.id)}
                          onKeyDown={(e) => handleKeyDown(e, cat.category, algo.id)}
                          className={`p-5 rounded-sm border transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-lime/50 ${
                            isActive
                              ? "bg-[#FFFDF5] text-dark border-white shadow-xl scale-[1.01]"
                              : "bg-white/5 border-white/5 text-white/90 hover:bg-white/10 hover:border-white/10"
                          }`}
                          aria-expanded={isActive}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h4 className={`font-[family-name:var(--font-caveat)] text-2xl font-bold ${
                              isActive ? "text-dark" : "text-white"
                            }`}>
                              {algo.name}
                            </h4>
                            <span className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${
                              isActive ? "text-red-accent" : "text-lime"
                            }`}>
                              {algo.whyIUseIt}
                            </span>
                          </div>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden font-mono text-xs text-dark/90 leading-relaxed pt-4 mt-3 border-t border-dark/10 space-y-3"
                              >
                                <div>
                                  <span className="font-bold text-blue-primary block uppercase text-[9px] tracking-wider">
                                    Real-World Scenario:
                                  </span>
                                  <p className="mt-0.5">{algo.realExample}</p>
                                </div>
                                <div>
                                  <span className="font-bold text-red-accent block uppercase text-[9px] tracking-wider">
                                    Output It Generates:
                                  </span>
                                  <p className="mt-0.5 font-semibold text-dark">
                                    {algo.output}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="text-right mt-3 sm:hidden">
                            <span className={`font-mono text-[8px] font-bold ${isActive ? "text-blue-primary" : "text-white/30"}`}>
                              {isActive ? "active ▲" : "tap to inspect ▼"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </motion.section>
            );
          })}
        </div>

        {/* ── CLOSING CTA ── */}
        <motion.section
          variants={stagger}
          className="text-center max-w-xl mx-auto pt-12"
        >
          <BackToPortfolioButton href="/#projects" label="Back to Portfolio" />
        </motion.section>

      </main>
    </motion.div>
  );
}
