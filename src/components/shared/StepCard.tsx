"use client";

import PaperCard from "../PaperCard";

interface StepCardProps {
  step: string;
  title: string;
  details: string;
  variant?: "cream" | "dark" | "navy" | "blue";
  rotation?: number;
  className?: string;
}

export default function StepCard({
  step,
  title,
  details,
  variant = "cream",
  rotation = 0,
  className = "",
}: StepCardProps) {
  const isDark = variant === "dark" || variant === "navy" || variant === "blue";

  return (
    <PaperCard
      variant={variant}
      rotation={rotation}
      className={`p-5 h-full flex flex-col justify-between border ${
        isDark ? "border-white/10 hover:border-white/20" : "border-dark/10 shadow-lg"
      } ${className}`}
    >
      <div>
        <span className={`font-mono text-xs block mb-2 font-bold ${isDark ? "text-lime" : "text-red-accent"}`}>
          {step}
        </span>
        <h3 className={`font-[family-name:var(--font-caveat)] text-2xl font-bold mb-2 leading-none ${isDark ? "text-white" : "text-dark"}`}>
          {title}
        </h3>
        <p className="text-[11px] leading-relaxed font-mono opacity-80">
          {details}
        </p>
      </div>
    </PaperCard>
  );
}
