"use client";

import { useEffect, useRef, useState } from "react";
import { getAlgorithmTargets, Particle } from "@/lib/particleEngine";

interface MiniAlgorithmProps {
  type: string;
  paletteVariant?: "lime" | "purple" | "blue";
  className?: string;
}

// Custom hook to detect prefers-reduced-motion
function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);
  return reduceMotion;
}

export default function MiniAlgorithm({ type, paletteVariant = "lime", className = "" }: MiniAlgorithmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isSettledRef = useRef(false);

  // Palettes tailored to matching visual system
  const palette = {
    lime: { primary: "#7C89E8", secondary: "#FFF", accent: "#D8F24E" },
    purple: { primary: "#D8F24E", secondary: "#FFF", accent: "#a855f7" },
    blue: { primary: "#D8F24E", secondary: "#7C89E8", accent: "#1E2FE0" }
  }[paletteVariant];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Responsive resize handler
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight || 120;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resizeCanvas();

    // Particle pool size
    const pCount = 50;

    // Initialize particles with random starting coordinates
    const targets = getAlgorithmTargets(type, pCount, palette);
    const initialParticles: Particle[] = targets.map((t) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      tx: t.tx,
      ty: t.ty,
      color: t.color,
      size: t.size,
      alpha: 0,
      targetAlpha: 1
    }));
    particlesRef.current = initialParticles;
    isSettledRef.current = false;

    // IntersectionObserver to auto-sleep off-screen scenes
    let isVisible = false;
    let isLoopRunning = false;

    // Main animation loop
    const runLoop = () => {
      if (!isVisible || isSettledRef.current) {
        isLoopRunning = false;
        return;
      }
      isLoopRunning = true;

      ctx.clearRect(0, 0, width, height);

      // Simple dark grid pattern context lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let x = 20; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 15; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      let allSettled = true;
      const particles = particlesRef.current;

      // Draw connection lines for sequential structures
      if (["linear-regression", "logistic-regression", "moving-average", "arima", "exponential-smoothing", "z-score"].includes(type)) {
        ctx.beginPath();
        ctx.strokeStyle = palette.accent;
        ctx.lineWidth = 1.5;
        // Neon glow trail path
        ctx.shadowBlur = 8;
        ctx.shadowColor = palette.accent;
        
        let started = false;
        particles.forEach((p) => {
          if (p.color === palette.accent) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
        });
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow
      }

      // Draw branching node link paths for trees
      if (["decision-trees", "random-forest", "isolation-forest"].includes(type)) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        // Link lines drawn between consecutive nodes
        for (let i = 0; i < Math.min(particles.length, 7); i++) {
          const p = particles[i];
          if (i === 1 || i === 2) {
            ctx.beginPath();
            ctx.moveTo(particles[0].x, particles[0].y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
          if (i === 3 || i === 4) {
            ctx.beginPath();
            ctx.moveTo(particles[1].x, particles[1].y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
          if (i === 5 || i === 6) {
            ctx.beginPath();
            ctx.moveTo(particles[2].x, particles[2].y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      // Particle movements
      particles.forEach((p) => {
        const destX = p.tx * width;
        const destY = p.ty * height;

        if (prefersReducedMotion) {
          p.x = destX;
          p.y = destY;
          p.alpha = p.targetAlpha;
        } else {
          // Morph physics towards targets
          const dx = destX - p.x;
          const dy = destY - p.y;
          p.x += dx * 0.08 + p.vx;
          p.y += dy * 0.08 + p.vy;

          // Damp target random velocities over time
          p.vx *= 0.95;
          p.vy *= 0.95;

          // Smooth progressive alpha fade-in (dark-to-light reveal)
          p.alpha += (p.targetAlpha - p.alpha) * 0.05;

          // Check if particle is still far from target
          if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
            allSettled = false;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.color === palette.accent ? 6 : 0;
        ctx.shadowColor = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      ctx.globalAlpha = 1.0;

      if (allSettled && !prefersReducedMotion) {
        isSettledRef.current = true; // Enter sleep mode to conserve cycles
        isLoopRunning = false;
      } else {
        animationFrameRef.current = requestAnimationFrame(runLoop);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !isLoopRunning) {
            isSettledRef.current = false;
            runLoop();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Watch for window resize events
    const resizeListener = () => {
      resizeCanvas();
      isSettledRef.current = false;
      if (!isLoopRunning) {
        runLoop();
      }
    };
    window.addEventListener("resize", resizeListener);

    // Initial loop execution
    runLoop();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resizeListener);
      observer.disconnect();
    };
  }, [type, palette, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block bg-[#0D182E] border border-white/5 rounded-sm shadow-inner transition-colors duration-300 ${className}`}
    />
  );
}
