/* ─────────────────────────────────────────────
 * AboutMe — stylized notebook entry
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import StickyNote from "../StickyNote";
import Polaroid from "../Polaroid";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutMe() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-[#F0EDE4] notebook-paper">
      
      {/* Decorative Winding SVG Path */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block opacity-50">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 250 250 C 400 100, 700 150, 800 200 C 900 250, 950 400, 850 500 C 700 650, 400 500, 300 650 C 200 800, 300 900, 400 950"
            stroke="#1E2FE0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="font-mono text-sm text-dark/50 tracking-widest uppercase mb-4 block ml-4 md:ml-12">
            01 — THE BEGINNING
          </span>
          <span className="font-[family-name:var(--font-caveat)] text-3xl text-blue-primary block ml-4 md:ml-12 mb-6">
            how it all started.
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start ml-4 md:ml-12">
          
          {/* Left Column: Big Handwritten Text & Paragraphs */}
          <div className="flex flex-col gap-12">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 className="font-[family-name:var(--font-caveat)] text-6xl md:text-8xl font-bold text-dark leading-[0.9]">
                I Started learning <br/>
                <span className="text-blue-primary relative inline-block group">
                  Data & AI
                  {/* Rough circle outline over the text */}
                  <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none opacity-80" viewBox="0 0 200 80" preserveAspectRatio="none">
                    <motion.path 
                      d="M 10 40 C 10 10, 190 10, 190 40 C 190 70, 10 70, 10 40 Z" 
                      fill="none" 
                      stroke="#1E2FE0" 
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                </span> <br/>
                Four years ago <br/>
                Coz' I wanted to <br/>
                Build Cool Stuff <br/>
                on my own :)
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-md">
              <p className="font-mono text-sm md:text-base text-dark/80 leading-relaxed mb-6">
                It started with curiosity. I picked up Python, fell into data, and realized I could make machines learn patterns that humans miss. That felt like a superpower.
              </p>
              <p className="font-[family-name:var(--font-caveat)] text-2xl text-blue-primary leading-snug">
                Since then, I've built RAG systems,<br/>
                churn prediction pipelines,<br/>
                and NLP models that solve real problems.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Image and Decor */}
          <div className="relative h-full min-h-[500px] flex justify-center lg:justify-end items-center mt-12 lg:mt-0">
            
            {/* Sticky Note */}
            <motion.div 
              className="absolute -top-12 lg:-top-24 right-0 lg:-right-12 z-20"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <StickyNote rotation={-4} tapePosition="left" color="bg-[#FFF1F2]" className="p-4 shadow-xl max-w-[200px]">
                <p className="font-mono text-xs font-bold mb-2">I'm an open book.</p>
                <p className="font-[family-name:var(--font-caveat)] text-xl leading-tight text-dark/80">
                  Here is the unfiltered timeline of how I figured things out.
                </p>
              </StickyNote>
            </motion.div>

            {/* Main Portrait Image */}
            <motion.div
              className="relative z-10 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Dashed background circle */}
              <div className="absolute inset-[-10%] rounded-full border-[3px] border-dashed border-blue-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-spin-slow"></div>
              
              {/* Solid glow behind image (replacing the black shade) */}
              <div className="absolute inset-0 bg-blue-primary/20 blur-3xl rounded-full scale-110"></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-white shadow-2xl">
                <Image
                  src="/images/IMG_1430_Original.png"
                  alt="Ankit Premi"
                  fill
                  className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Polaroid Graphic */}
            <motion.div 
              className="absolute -bottom-12 right-12 md:-bottom-20 md:-right-8 z-30 hidden sm:block"
              initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.6 }}
            >
              <Polaroid 
                src="/images/IMG_1403.png"
                alt="Ankit Snapshot"
                rotation={8} 
                caption="Delhi + Code addicted" 
                className="w-48 shadow-2xl"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
