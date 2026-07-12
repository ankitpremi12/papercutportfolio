"use client";

import { motion } from "framer-motion";

interface PullQuoteProps {
  text: string;
  author?: string;
  subquotes?: string[];
  className?: string;
}

export default function PullQuote({ text, author, subquotes = [], className = "" }: PullQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`py-12 border-y border-white/10 max-w-4xl mx-auto text-center space-y-6 ${className}`}
    >
      <div className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold text-lime leading-tight">
        &ldquo;{text}&rdquo;
      </div>
      {author && (
        <p className="font-[family-name:var(--font-caveat)] text-xl text-blue-muted">
          — {author}
        </p>
      )}
      {subquotes.length > 0 && (
        <div className="space-y-2 text-white/80 font-mono text-sm max-w-lg mx-auto">
          {subquotes.map((q, idx) => (
            <p key={idx} className={idx === subquotes.length - 1 ? "text-[#D8F24E] font-bold" : ""}>
              {q}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
}
