/* ─────────────────────────────────────────────
 * Header — sticky nav with responsive mobile drawer
 * ───────────────────────────────────────────── */
"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { siteConfig, navItems } from "@/lib/content";
import Link from "next/link";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const blur = useTransform(scrollY, [0, 100], [0, 16]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(30, 47, 224, ${v})`),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 font-[family-name:var(--font-caveat)] font-bold text-2xl md:text-3xl"
        >
          <Link href="/#hero" className="text-white hover:text-white/80 transition-colors" onClick={() => setIsOpen(false)}>
            {siteConfig.name}
          </Link>
        </motion.div>

        {/* Right: Desktop Nav trail */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          {navItems.map((item, i) => (
            <span key={item.href} className="flex items-center gap-2">
              <Link
                href={item.href}
                className="text-blue-muted hover:text-white transition-colors duration-300 font-[family-name:var(--font-caveat)] text-lg"
              >
                {item.label}
              </Link>
              {i < navItems.length - 1 && (
                <span className="text-blue-muted/40">→</span>
              )}
            </span>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none z-50 relative p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M 6 18 L 18 6 M 6 6 L 18 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M 4 6 h 16 M 4 12 h 16 M 4 18 h 16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-blue-primary/95 border-b border-white/10 shadow-2xl backdrop-blur-md py-8 px-6 flex flex-col gap-6 md:hidden z-40"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-lime text-2xl font-[family-name:var(--font-caveat)] font-bold text-center transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
