/* ─────────────────────────────────────────────
 * TableOfContents — aesthetic list of sections
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { sections } from "@/lib/content";
import StickyNote from "../StickyNote";
import HandDrawnUnderline from "../HandDrawnUnderline";
import Link from "next/link";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TableOfContents() {
  return (
    <section id="toc" className="relative py-16 md:py-24 w-full min-h-[80vh] flex flex-col justify-center bg-blue-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Top Right Sticky Note */}
        <div className="absolute top-0 right-6 md:right-12 hidden lg:block z-20">
          <motion.div
            initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <StickyNote rotation={4} tapePosition="center" color="bg-[#FFFDF5]" className="max-w-xs shadow-2xl p-6 border border-dark/5">
              <span className="text-blue-primary font-bold text-sm tracking-widest uppercase block mb-3 font-sans">
                A quick note
              </span>
              <p className="font-[family-name:var(--font-caveat)] text-2xl leading-snug text-dark mb-4">
                Entire portfolio is worth a look.
              </p>
              <p className="font-[family-name:var(--font-caveat)] text-xl text-dark/80 leading-tight">
                But if you&apos;re short on time, jump straight to <a href="#best-work" className="text-blue-primary font-bold hover:underline">Best Work</a> section.
              </p>
            </StickyNote>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-4 md:gap-6"
        >
          {sections.filter((s) => s.id !== "hero").map((section) => {
            const href = (section as { href?: string }).href || `#${section.id}`;
            return (
              <motion.div key={section.id} variants={fadeUp} className="group w-fit">
                <Link
                  href={href}
                  className="flex flex-col md:flex-row md:items-end gap-1 md:gap-4"
                >
                  <div className="relative">
                    <span className="font-[family-name:var(--font-caveat)] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none hover:text-white/90 transition-colors">
                      {section.label}
                    </span>
                    {/* Only show underline on hover */}
                    <div className="absolute -bottom-4 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HandDrawnUnderline width={300} color="#D8F24E" strokeWidth={3} />
                    </div>
                  </div>
                  
                  {section.note && (
                    <span className="font-[family-name:var(--font-caveat)] text-xl md:text-2xl text-blue-muted pb-1 md:pb-2 group-hover:text-blue-muted/80 transition-colors">
                      ({section.note})
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Right text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-10 text-right w-full hidden md:block"
        >
          <span className="font-[family-name:var(--font-caveat)] text-2xl text-blue-muted">
            (Directly click on the section name you want to go to)
          </span>
        </motion.div>
      </div>
    </section>
  );
}
