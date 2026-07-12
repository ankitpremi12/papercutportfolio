"use client";

import Link from "next/link";

interface BackToPortfolioButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function BackToPortfolioButton({
  href = "/#about",
  label = "Back to Portfolio",
  className = "",
}: BackToPortfolioButtonProps) {
  return (
    <div className={`pt-4 ${className}`}>
      <Link href={href}>
        <button className="bg-lime hover:bg-lime-dark text-dark px-8 py-3 rounded-sm font-bold text-sm tracking-wider uppercase transition-colors duration-200 shadow-xl active:scale-95 transform">
          {label}
        </button>
      </Link>
    </div>
  );
}
