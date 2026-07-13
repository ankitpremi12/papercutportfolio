/* ─────────────────────────────────────────────
 * PaperCard — the core paper-cutout component
 * 3D tilt on hover, paper shadow, slight rotation
 * ───────────────────────────────────────────── */
"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode, useState, useEffect } from "react";

interface PaperCardProps {
  children: ReactNode;
  rotation?: number;
  variant?: "cream" | "navy" | "blue" | "dark";
  className?: string;
  onClick?: () => void;
  as?: "div" | "article" | "section";
}

const variantStyles = {
  cream: "bg-cream text-dark",
  navy: "bg-[#141430] text-white",
  blue: "bg-blue-primary text-white",
  dark: "bg-dark-card text-white",
};

export default function PaperCard({
  children,
  rotation = 0,
  variant = "cream",
  className = "",
  onClick,
  as: Component = "div",
}: PaperCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    setIsHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!isHoverable || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    if (!isHoverable) return;
    mouseX.set(0);
    mouseY.set(0);
  }

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={cardRef}
      className={`relative rounded-sm ${variantStyles[variant]} ${className}`}
      style={{
        rotate: rotation,
        rotateX,
        rotateY,
        transformPerspective: 800,
        boxShadow: "var(--shadow-paper)",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "var(--shadow-paper-hover)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </MotionComponent>
  );
}
