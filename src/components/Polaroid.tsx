/* ─────────────────────────────────────────────
 * Polaroid — photo frame with white border
 * ───────────────────────────────────────────── */
"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  className?: string;
  width?: number;
  height?: number;
}

export default function Polaroid({
  src,
  alt,
  caption,
  rotation = 2,
  className = "",
  width = 280,
  height = 320,
}: PolaroidProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    setIsHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
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

  return (
    <motion.div
      ref={cardRef}
      className={`relative inline-block bg-white p-3 pb-14 ${className}`}
      style={{
        rotate: rotation,
        rotateX,
        rotateY,
        transformPerspective: 600,
        boxShadow: "var(--shadow-polaroid)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, rotate: rotation + 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {/* Tape */}
      <div className="tape-strip absolute -top-2.5 left-1/2 -translate-x-1/2 z-10" />

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        style={{ width: width - 24, height: height - 80 }}
      />

      {caption && (
        <p className="absolute bottom-3 left-0 right-0 text-center font-[family-name:var(--font-caveat)] text-base text-dark/70">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
