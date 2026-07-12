/* ─────────────────────────────────────────────
 * Hero — full-viewport hero with silhouette,
 * wordmark, career progression, corner brackets
 * ───────────────────────────────────────────── */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/lib/content";
import StickyNote from "../StickyNote";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: silhouette moves slower
  const silhouetteY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Corner brackets */}
      <div className="corner-bracket corner-bracket-tl" />
      <div className="corner-bracket corner-bracket-tr" />
      <div className="corner-bracket corner-bracket-bl" />
      <div className="corner-bracket corner-bracket-br" />

      {/* Background wordmark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="font-[family-name:var(--font-caveat)] text-[12rem] md:text-[20rem] lg:text-[28rem] font-bold text-white whitespace-nowrap">
          {siteConfig.nickname}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
        {/* Left content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          {/* Location sticky note */}
          <motion.div variants={fadeUp} className="mb-8">
            <StickyNote rotation={-3} className="inline-block text-base md:text-lg px-5 py-2.5">
              📍 {siteConfig.location}
            </StickyNote>
          </motion.div>

          {/* Career progression */}
          <div className="space-y-4 mb-10">
            {siteConfig.roleProgression.map((item, i) => (
              <motion.div
                key={item.prefix}
                variants={fadeUp}
                whileHover={{ scale: 1.03, x: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-baseline gap-3 cursor-pointer select-none origin-left group"
              >
                <span className="text-blue-muted group-hover:text-lime text-base md:text-xl font-[family-name:var(--font-caveat)] transition-colors duration-200">
                  {item.prefix}
                </span>
                <span
                  className="font-[family-name:var(--font-caveat)] text-white group-hover:text-[#D8F24E] font-bold leading-none transition-colors duration-200"
                  style={{ fontSize: `${2.0 + i * 0.7}rem` }}
                >
                  {item.role}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-blue-muted text-xl md:text-2xl max-w-lg mt-4 font-mono leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>
        </motion.div>

        {/* Right: Silhouette */}
        <motion.div
          className="relative flex justify-center md:justify-end"
          style={{ y: silhouetteY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="/images/IMG_1430_Original.png"
              alt="Ankit Premi"
              width={420}
              height={448}
              priority
              className="drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Annotation doodle — top right */}
      <motion.div
        className="absolute top-28 right-8 md:right-16 font-[family-name:var(--font-caveat)] text-blue-muted/60 text-sm max-w-[160px] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ rotate: 3 }}
      >
        <p>{siteConfig.heroAnnotation}</p>
        {/* Small hand-drawn line chart doodle */}
        <svg width="80" height="30" className="mt-2 opacity-50" aria-hidden="true">
          <path
            d="M 2 25 Q 10 20, 18 22 Q 26 24, 34 15 Q 42 6, 50 10 Q 58 14, 66 5 L 78 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="font-[family-name:var(--font-caveat)] text-blue-muted/50 text-sm flex flex-col items-center gap-1"
        >
          scroll down
          <svg width="16" height="16" viewBox="0 0 16 16" className="opacity-50">
            <path d="M 3 6 L 8 11 L 13 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
