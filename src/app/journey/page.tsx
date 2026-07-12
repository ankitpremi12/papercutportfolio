"use client";

import Header from "@/components/sections/Header";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";
import StickyNote from "@/components/StickyNote";
import { motion } from "framer-motion";
import Link from "next/link";
import HandDrawnArrow from "@/components/HandDrawnArrow";

export default function JourneyPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-blue-primary">
      <Header />
      
      <main className="pt-32 pb-24 md:pt-40 md:pb-32 max-w-4xl mx-auto px-6 md:px-12">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-16">
          
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-12 relative">
            <h1 className="font-[family-name:var(--font-caveat)] text-6xl md:text-8xl font-bold text-white leading-none">
              My Journey into <br />
              <span className="text-[#D8F24E] relative inline-block">
                AI Engineering
                <HandDrawnUnderline width={300} color="#D8F24E" className="absolute -bottom-4 left-0" strokeWidth={4} />
              </span>
            </h1>
            <div className="absolute -top-12 -right-4 hidden md:block opacity-50 text-white">
               <HandDrawnArrow direction="right" width={100} color="white" />
            </div>
          </motion.div>

          {/* Intro */}
          <motion.div variants={fadeUp} className="prose prose-lg prose-invert max-w-none">
            <p className="font-mono text-xl text-white/90 leading-relaxed">
              I didn't start by wanting to build AI.
            </p>
            <p className="font-sans text-lg text-white/80 leading-relaxed mt-4">
              Like many students, I was simply curious about how machines could learn from data and make decisions. That curiosity led me to Python, then machine learning, and eventually to building systems that could solve real problems instead of just completing assignments.
            </p>
          </motion.div>

          {/* The Shift */}
          <motion.div variants={fadeUp} className="relative my-16">
            <StickyNote rotation={-2} tapePosition="top" color="bg-[#FFFDF5]" className="p-8 md:p-12 shadow-2xl max-w-3xl border border-dark/10">
              <p className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl text-dark leading-snug">
                Over time, I realized that writing a model is only a small part of building AI. The real challenge is creating systems that people can actually use.
              </p>
              <div className="mt-8 pt-8 border-t-2 border-dashed border-dark/20">
                <p className="font-mono text-lg text-dark/70 mb-4">That shift changed how I approached every project.</p>
                <p className="font-sans text-xl text-blue-primary font-medium italic">
                  Instead of asking, <span className="line-through decoration-red-500 opacity-70">"Which algorithm should I use?"</span>, I started asking, <strong className="text-dark">"What problem am I solving?"</strong>
                </p>
              </div>
            </StickyNote>
          </motion.div>

          {/* Projects Walkthrough */}
          <motion.div variants={fadeUp} className="space-y-8">
            <p className="font-mono text-sm text-[#D8F24E] uppercase tracking-widest">The Evolution</p>
            <p className="font-sans text-lg text-white/80 leading-relaxed">
              That mindset led me to explore different areas of AI engineering:
            </p>

            <ul className="space-y-12 mt-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="font-[family-name:var(--font-caveat)] text-xl">1</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded backdrop-blur border border-white/10 hover:border-white/30 transition-colors">
                  <p className="font-sans text-lg text-white/90">
                    I built <strong className="text-[#D8F24E]">SpreadSim</strong> to understand how graph algorithms can simulate disease propagation across connected populations.
                  </p>
                </div>
              </li>
              
              <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="font-[family-name:var(--font-caveat)] text-xl">2</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded backdrop-blur border border-white/10 hover:border-white/30 transition-colors">
                  <p className="font-sans text-lg text-white/90">
                    I developed <strong className="text-[#D8F24E]">ChurnSense</strong> to predict customer churn and make machine learning models accessible through APIs instead of keeping them inside notebooks.
                  </p>
                </div>
              </li>
              
              <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="font-[family-name:var(--font-caveat)] text-xl">3</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded backdrop-blur border border-white/10 hover:border-white/30 transition-colors">
                  <p className="font-sans text-lg text-white/90">
                    With <strong className="text-[#D8F24E]">InsightFlow AI</strong>, I moved beyond traditional machine learning and into Generative AI, building a RAG system to retrieve information from documents and databases before generating accurate responses.
                  </p>
                </div>
              </li>

              <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="font-[family-name:var(--font-caveat)] text-xl">4</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded backdrop-blur border border-white/10 hover:border-white/30 transition-colors">
                  <p className="font-sans text-lg text-white/90">
                    During my internship at <strong className="text-[#D8F24E]">VOIS</strong>, I worked on LLM-powered reporting solutions, learning how AI can simplify everyday business workflows.
                  </p>
                </div>
              </li>
              
              <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="font-[family-name:var(--font-caveat)] text-xl">5</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded backdrop-blur border border-white/10 hover:border-white/30 transition-colors">
                  <p className="font-sans text-lg text-white/90">
                    Later, at <strong className="text-[#D8F24E]">Rancho Labs</strong>, I worked closely with Generative AI applications, prompt engineering, and backend integrations, gaining experience in building AI features that move beyond experimentation.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* The Philosophy */}
          <motion.div variants={fadeUp} className="pt-16 pb-8">
            <h3 className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl text-white mb-6">
              Today, my interests extend beyond training models.
            </h3>
            <div className="space-y-6 font-sans text-lg text-white/80 leading-relaxed">
              <p>
                I'm fascinated by how modern AI systems are designed—from retrieval pipelines and vector databases to AI agents, cloud deployment, and scalable backend architectures.
              </p>
              <div className="p-6 my-8 border-l-4 border-[#D8F24E] bg-white/5 rounded-r-lg">
                <p className="font-mono text-xl text-white italic">
                  "For me, AI engineering is not about chasing the newest model. It's about understanding a problem, choosing the right tools, and building solutions that are reliable, practical, and genuinely useful."
                </p>
              </div>
              <p>
                I'm still learning every day. The field evolves quickly, and that's exactly what excites me. Every project teaches me something new, and every challenge pushes me to become a better engineer.
              </p>
              <p className="font-[family-name:var(--font-caveat)] text-3xl text-[#D8F24E] mt-12">
                This journey is only beginning, and I'm excited to see where it leads next.
              </p>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div variants={fadeUp} className="pt-12 border-t border-white/10 flex justify-center">
            <Link 
              href="/"
              className="inline-block relative group"
            >
              <span className="font-[family-name:var(--font-caveat)] text-4xl text-white group-hover:text-[#D8F24E] transition-colors">
                Back to Home
              </span>
              <div className="absolute -bottom-2 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                <HandDrawnUnderline width={160} color="#D8F24E" strokeWidth={3} />
              </div>
            </Link>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
