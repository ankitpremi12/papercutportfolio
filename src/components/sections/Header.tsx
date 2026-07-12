/* ─────────────────────────────────────────────
 * Header — sticky nav with blur backdrop
 * ───────────────────────────────────────────── */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig, navItems } from "@/lib/content";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const blur = useTransform(scrollY, [0, 100], [0, 16]);

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
          <a href="#hero" className="text-white hover:text-white/80 transition-colors">
            {siteConfig.name}
          </a>
        </motion.div>

        {/* Right: Nav trail */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          {navItems.map((item, i) => (
            <span key={item.href} className="flex items-center gap-2">
              <a
                href={item.href}
                className="text-blue-muted hover:text-white transition-colors duration-300 font-[family-name:var(--font-caveat)] text-lg"
              >
                {item.label}
              </a>
              {i < navItems.length - 1 && (
                <span className="text-blue-muted/40">→</span>
              )}
            </span>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
