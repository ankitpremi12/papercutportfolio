/* ─────────────────────────────────────────────
 * Contact — dark bg, two-tone wordmark, links
 * ───────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import React from "react";
import { siteConfig, contactLinks } from "@/lib/content";
import HandDrawnUnderline from "../HandDrawnUnderline";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconSvgs: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M 8 11 L 8 16" />
      <path d="M 8 8 L 8 8.01" />
      <path d="M 12 16 L 12 13 C 12 11.5 13 11 14 11 C 15 11 16 11.5 16 13 L 16 16" />
    </svg>
  ),
  mail: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M 2 7 L 12 13 L 22 7" />
    </svg>
  ),
  github: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
};

export default function Contact() {
  return (
    <section id="contact" className="relative bg-dark py-24 md:py-32">
      {/* Torn edge transition */}
      <div className="absolute -top-3 left-0 right-0 h-6 bg-blue-primary torn-edge-bottom" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Two-tone wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="mb-12"
        >
          <h2 className="font-[family-name:var(--font-caveat)] text-6xl md:text-8xl lg:text-9xl font-bold leading-none">
            <span className="text-blue-primary">Contact</span>{" "}
            <span className="text-cream">Me</span>
          </h2>
          <HandDrawnUnderline width={200} color="#7C89E8" className="mx-auto mt-2" />
        </motion.div>

        {/* Links */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              variants={fadeUp}
              href={link.href}
              target={link.icon !== "mail" ? "_blank" : undefined}
              rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
            >
              <span className="text-blue-muted group-hover:text-lime transition-colors duration-300">
                {iconSvgs[link.icon]}
              </span>
              <span className="font-[family-name:var(--font-caveat)] text-2xl">
                {link.label}
              </span>
              {/* Hand-drawn underline on hover */}
              <svg
                width="60"
                height="8"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-1"
                aria-hidden="true"
              >
                <path
                  d="M 0 4 Q 15 1, 30 4 Q 45 7, 60 3"
                  fill="none"
                  stroke="#D8F24E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Email directly */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-white/30 text-sm mb-20"
        >
          or just email me at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-blue-muted hover:text-white transition-colors underline"
          >
            {siteConfig.email}
          </a>
        </motion.p>
      </div>

      {/* Footer band */}
      <div className="bg-cream/5 border-t border-white/5 py-8 px-6 text-center">
        <p className="font-[family-name:var(--font-caveat)] text-xl text-white/40 mb-2">
          designed & built by hand (with a lot of coffee)
        </p>
        <p className="font-[family-name:var(--font-caveat)] text-3xl text-cream/60">
          — {siteConfig.name}
        </p>
      </div>
    </section>
  );
}
