/* ─────────────────────────────────────────────
 * ScrollTracedPath — the signature scroll-traced
 * route line that draws itself on scroll via GSAP
 * ───────────────────────────────────────────── */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MilestoneNode {
  /** Fraction of the path length (0–1) where this node sits */
  at: number;
  label: string;
}

interface ScrollTracedPathProps {
  /** CSS selector or ref for the scroll container (defaults to body) */
  containerSelector?: string;
  milestones?: MilestoneNode[];
  className?: string;
  color?: string;
  mobile?: boolean;
}

export default function ScrollTracedPath({
  containerSelector,
  milestones = [],
  className = "",
  color = "#7C89E8",
  mobile = false,
}: ScrollTracedPathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pageHeight, setPageHeight] = useState(5000);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    // Measure page height
    const h = document.documentElement.scrollHeight;
    setPageHeight(h);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    // Get total path length
    const length = path.getTotalLength();

    // Set initial state
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Animate on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerSelector || document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      ease: "none",
    });

    // Milestone dot animations
    milestones.forEach((milestone, i) => {
      const dot = dotRefs.current[i];
      if (!dot) return;

      gsap.set(dot, { scale: 0, transformOrigin: "center center" });

      ScrollTrigger.create({
        trigger: containerSelector || document.body,
        start: `top+=${milestone.at * 100}% top`,
        onEnter: () => {
          gsap.to(dot, {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
          });
        },
        onLeaveBack: () => {
          gsap.to(dot, {
            scale: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [pageHeight, containerSelector, milestones]);

  if (mobile) {
    // Simplified straight vertical guide for mobile
    return (
      <svg
        ref={svgRef}
        className={`pointer-events-none absolute left-8 top-0 z-0 ${className}`}
        width="4"
        height={pageHeight}
        aria-hidden="true"
      >
        <line
          x1="2"
          y1="0"
          x2="2"
          y2={pageHeight}
          stroke={color}
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.3"
        />
      </svg>
    );
  }

  // Full looping hand-drawn path for desktop
  // Build a path that winds through the page
  const w = 120; // width of the meandering area
  const segments = 12;
  const segHeight = pageHeight / segments;

  let pathD = `M 60 0`;
  for (let i = 0; i < segments; i++) {
    const y1 = i * segHeight;
    const y2 = (i + 0.5) * segHeight;
    const y3 = (i + 1) * segHeight;
    const xOffset = i % 2 === 0 ? w : -w + 120;
    const cp1x = xOffset;
    const cp2x = 120 - xOffset + 60;

    pathD += ` C ${cp1x} ${y1 + segHeight * 0.3}, ${cp2x} ${y2}, 60 ${y3}`;
  }

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 z-0 ${className}`}
      width="200"
      height={pageHeight}
      viewBox={`0 0 200 ${pageHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
        className="hand-drawn-path"
      />

      {/* Milestone dots */}
      {milestones.map((m, i) => {
        const pointOnPath = pathRef.current?.getPointAtLength(
          (pathRef.current?.getTotalLength() || 0) * m.at
        );
        return (
          <circle
            key={m.label}
            ref={(el) => { dotRefs.current[i] = el; }}
            cx={pointOnPath?.x || 100}
            cy={pointOnPath?.y || m.at * pageHeight}
            r="8"
            fill={color}
            opacity="0.8"
          />
        );
      })}
    </svg>
  );
}
