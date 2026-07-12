"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MiniChartProps {
  type: string;
  className?: string;
}

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

export default function MiniChart({ type, className = "" }: MiniChartProps) {
  const prefersReducedMotion = useReducedMotion();

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { type: "spring" as const, duration: 1.2, bounce: 0 }, opacity: { duration: 0.3 } }
    }
  };

  if (prefersReducedMotion) {
    return (
      <div className={`w-full h-24 flex items-center justify-center bg-dark/20 rounded p-2 ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 100 50">
          <line x1="10" y1="25" x2="90" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="50" y="28" textAnchor="middle" fill="#7C89E8" fontSize="6" fontFamily="monospace">
            [ {type.toUpperCase()} STATIC ]
          </text>
        </svg>
      </div>
    );
  }

  const renderVisual = () => {
    switch (type) {
      // ─── COMPARISON ───
      case "bar":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Horizontal bars */}
            <motion.rect x="10" y="8" width="75" height="6" fill="#D8F24E" rx="1" initial={{ width: 0 }} animate={{ width: 75 }} transition={{ duration: 0.6 }} />
            <motion.rect x="10" y="20" width="55" height="6" fill="#7C89E8" rx="1" initial={{ width: 0 }} animate={{ width: 55 }} transition={{ duration: 0.6, delay: 0.15 }} />
            <motion.rect x="10" y="32" width="40" height="6" fill="#1E2FE0" rx="1" initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 0.6, delay: 0.3 }} />
            <line x1="10" y1="5" x2="10" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "column":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Vertical columns */}
            <motion.rect x="15" y="15" width="8" height="25" fill="#D8F24E" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 25, y: 15 }} transition={{ duration: 0.5 }} />
            <motion.rect x="35" y="8" width="8" height="32" fill="#7C89E8" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 32, y: 8 }} transition={{ duration: 0.5, delay: 0.1 }} />
            <motion.rect x="55" y="22" width="8" height="18" fill="#1E2FE0" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 18, y: 22 }} transition={{ duration: 0.5, delay: 0.2 }} />
            <motion.rect x="75" y="12" width="8" height="28" fill="#FFF" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 28, y: 12 }} transition={{ duration: 0.5, delay: 0.3 }} />
            <line x1="10" y1="40" x2="90" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "stacked-bar":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Stacked sections */}
            <g className="opacity-90">
              <motion.rect x="10" y="12" width="40" height="8" fill="#D8F24E" initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 0.5 }} />
              <motion.rect x="50" y="12" width="25" height="8" fill="#7C89E8" initial={{ width: 0, x: 10 }} animate={{ width: 25, x: 50 }} transition={{ duration: 0.5, delay: 0.1 }} />
              <motion.rect x="75" y="12" width="15" height="8" fill="#1E2FE0" initial={{ width: 0, x: 10 }} animate={{ width: 15, x: 75 }} transition={{ duration: 0.5, delay: 0.2 }} />
            </g>
            <g className="opacity-90">
              <motion.rect x="10" y="26" width="25" height="8" fill="#D8F24E" initial={{ width: 0 }} animate={{ width: 25 }} transition={{ duration: 0.5, delay: 0.15 }} />
              <motion.rect x="35" y="26" width="35" height="8" fill="#7C89E8" initial={{ width: 0, x: 10 }} animate={{ width: 35, x: 35 }} transition={{ duration: 0.5, delay: 0.25 }} />
              <motion.rect x="70" y="26" width="10" height="8" fill="#1E2FE0" initial={{ width: 0, x: 10 }} animate={{ width: 10, x: 70 }} transition={{ duration: 0.5, delay: 0.35 }} />
            </g>
            <line x1="10" y1="8" x2="10" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "100-percent-stacked-bar":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* 100% stack bar */}
            <g className="opacity-90">
              <motion.rect x="10" y="15" width="50" height="8" fill="#D8F24E" initial={{ width: 0 }} animate={{ width: 50 }} transition={{ duration: 0.5 }} />
              <motion.rect x="60" y="15" width="20" height="8" fill="#7C89E8" initial={{ width: 0, x: 10 }} animate={{ width: 20, x: 60 }} transition={{ duration: 0.5, delay: 0.1 }} />
              <motion.rect x="80" y="15" width="10" height="8" fill="#1E2FE0" initial={{ width: 0, x: 10 }} animate={{ width: 10, x: 80 }} transition={{ duration: 0.5, delay: 0.2 }} />
            </g>
            <g className="opacity-90">
              <motion.rect x="10" y="28" width="30" height="8" fill="#D8F24E" initial={{ width: 0 }} animate={{ width: 30 }} transition={{ duration: 0.5, delay: 0.1 }} />
              <motion.rect x="40" y="28" width="40" height="8" fill="#7C89E8" initial={{ width: 0, x: 10 }} animate={{ width: 40, x: 40 }} transition={{ duration: 0.5, delay: 0.2 }} />
              <motion.rect x="80" y="28" width="10" height="8" fill="#1E2FE0" initial={{ width: 0, x: 10 }} animate={{ width: 10, x: 80 }} transition={{ duration: 0.5, delay: 0.3 }} />
            </g>
            <line x1="10" y1="10" x2="10" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="90" y1="10" x2="90" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2" />
          </svg>
        );
      case "pareto":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Sorted bars */}
            <motion.rect x="12" y="15" width="10" height="25" fill="#7C89E8" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 25, y: 15 }} transition={{ duration: 0.4 }} />
            <motion.rect x="28" y="22" width="10" height="18" fill="#7C89E8" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 18, y: 22 }} transition={{ duration: 0.4, delay: 0.1 }} />
            <motion.rect x="44" y="28" width="10" height="12" fill="#7C89E8" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 12, y: 28 }} transition={{ duration: 0.4, delay: 0.2 }} />
            <motion.rect x="60" y="32" width="10" height="8" fill="#7C89E8" rx="1" initial={{ height: 0, y: 40 }} animate={{ height: 8, y: 32 }} transition={{ duration: 0.4, delay: 0.3 }} />
            {/* Line representing cumulative % */}
            <motion.path d="M 17 30 L 33 20 L 49 14 L 65 10" fill="none" stroke="#D8F24E" strokeWidth="2" variants={draw} initial="hidden" animate="visible" />
            <circle cx="17" cy="30" r="1.5" fill="#D8F24E" />
            <circle cx="33" cy="20" r="1.5" fill="#D8F24E" />
            <circle cx="49" cy="14" r="1.5" fill="#D8F24E" />
            <circle cx="65" cy="10" r="1.5" fill="#D8F24E" />
            <line x1="8" y1="40" x2="80" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );

      // ─── TREND & TIME ───
      case "line":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <motion.path
              d="M 10 38 Q 25 15, 45 32 T 85 10"
              fill="none"
              stroke="#D8F24E"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={draw}
              initial="hidden"
              animate="visible"
            />
            <line x1="10" y1="42" x2="90" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "area":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <motion.path
              d="M 10 40 Q 25 18, 45 35 T 85 15 L 85 40 Z"
              fill="rgba(216, 242, 78, 0.15)"
              stroke="#D8F24E"
              strokeWidth="2"
              strokeLinecap="round"
              variants={draw}
              initial="hidden"
              animate="visible"
            />
            <line x1="10" y1="40" x2="90" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "candlestick":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Candle 1 (Green/Lime) */}
            <line x1="20" y1="10" x2="20" y2="40" stroke="#D8F24E" strokeWidth="1.5" />
            <motion.rect x="17" y="15" width="6" height="15" fill="#D8F24E" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4 }} />
            {/* Candle 2 (Red/Blue-muted) */}
            <line x1="45" y1="5" x2="45" y2="35" stroke="#7C89E8" strokeWidth="1.5" />
            <motion.rect x="42" y="12" width="6" height="18" fill="#7C89E8" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
            {/* Candle 3 (Green/Lime) */}
            <line x1="70" y1="18" x2="70" y2="45" stroke="#D8F24E" strokeWidth="1.5" />
            <motion.rect x="67" y="22" width="6" height="14" fill="#D8F24E" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
            <line x1="10" y1="45" x2="90" y2="45" stroke="rgba(255,255,255,0.15)" />
          </svg>
        );
      case "control-chart":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Upper & Lower Limits */}
            <line x1="10" y1="10" x2="90" y2="10" stroke="#7C89E8" strokeWidth="1" strokeDasharray="3" opacity="0.6" />
            <line x1="10" y1="25" x2="90" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="10" y1="40" x2="90" y2="40" stroke="#7C89E8" strokeWidth="1" strokeDasharray="3" opacity="0.6" />
            {/* Wavy run line with one outlier */}
            <motion.path
              d="M 12 26 L 25 18 L 38 36 L 51 8 L 64 28 L 77 22 L 88 38"
              fill="none"
              stroke="#D8F24E"
              strokeWidth="2"
              variants={draw}
              initial="hidden"
              animate="visible"
            />
            {/* Outlier circle highlight */}
            <motion.circle cx="51" cy="8" r="3" fill="none" stroke="red" strokeWidth="1" initial={{ scale: 0 }} animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </svg>
        );
      case "calendar-heatmap":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <g transform="translate(10, 8)">
              {Array.from({ length: 7 }).map((_, r) => (
                <g key={r} transform={`translate(0, ${r * 5.5})`}>
                  {Array.from({ length: 12 }).map((_, c) => {
                    const intensities = [
                      "rgba(216, 242, 78, 0.9)",
                      "rgba(216, 242, 78, 0.4)",
                      "rgba(124, 137, 232, 0.7)",
                      "rgba(30, 47, 224, 0.2)",
                      "rgba(255,255,255,0.05)"
                    ];
                    const seed = (r * 7 + c * 3) % intensities.length;
                    return (
                      <rect
                        key={c}
                        x={c * 6.5}
                        y="0"
                        width="5"
                        height="5"
                        fill={intensities[seed]}
                        rx="0.5"
                      />
                    );
                  })}
                </g>
              ))}
            </g>
          </svg>
        );
      case "gantt":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Row guidelines */}
            <line x1="10" y1="12" x2="90" y2="12" stroke="rgba(255,255,255,0.08)" />
            <line x1="10" y1="22" x2="90" y2="22" stroke="rgba(255,255,255,0.08)" />
            <line x1="10" y1="32" x2="90" y2="32" stroke="rgba(255,255,255,0.08)" />
            <line x1="10" y1="42" x2="90" y2="42" stroke="rgba(255,255,255,0.08)" />
            
            {/* Gantt bars */}
            <motion.rect x="15" y="8" width="30" height="5" fill="#D8F24E" rx="1" initial={{ width: 0 }} animate={{ width: 30 }} transition={{ duration: 0.5 }} />
            <motion.rect x="38" y="18" width="25" height="5" fill="#7C89E8" rx="1" initial={{ width: 0 }} animate={{ width: 25 }} transition={{ duration: 0.5, delay: 0.1 }} />
            <motion.rect x="55" y="28" width="32" height="5" fill="#1E2FE0" rx="1" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.5, delay: 0.2 }} />
            <motion.rect x="25" y="38" width="40" height="5" fill="#FFF" rx="1" initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 0.5, delay: 0.3 }} />
            <line x1="10" y1="5" x2="10" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );

      // ─── COMPOSITION ───
      case "pie":
        return (
          <svg className="w-full h-full" viewBox="-25 -25 50 50">
            {/* 3 slices manually positioned using simple polygons for simplicity and visual appeal */}
            <motion.path d="M 0 0 L 0 -20 A 20 20 0 0 1 17.3 -10 Z" fill="#D8F24E" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} />
            <motion.path d="M 0 0 L 17.3 -10 A 20 20 0 0 1 -10 17.3 Z" fill="#7C89E8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
            <motion.path d="M 0 0 L -10 17.3 A 20 20 0 0 1 0 -20 Z" fill="#1E2FE0" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
          </svg>
        );
      case "donut":
        return (
          <svg className="w-full h-full" viewBox="-25 -25 50 50">
            <circle cx="0" cy="0" r="19" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            {/* Lime slice */}
            <motion.circle
              cx="0"
              cy="0"
              r="19"
              fill="none"
              stroke="#D8F24E"
              strokeWidth="6"
              strokeDasharray="119.3"
              strokeDashoffset="35"
              initial={{ strokeDashoffset: 119.3 }}
              animate={{ strokeDashoffset: 35 }}
              transition={{ duration: 0.8 }}
            />
            {/* Blue slice */}
            <motion.circle
              cx="0"
              cy="0"
              r="19"
              fill="none"
              stroke="#7C89E8"
              strokeWidth="6"
              strokeDasharray="119.3"
              strokeDashoffset="75"
              initial={{ strokeDashoffset: 119.3 }}
              animate={{ strokeDashoffset: 75 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <text x="0" y="3" textAnchor="middle" fill="#FFF" fontSize="8" fontWeight="bold" fontFamily="monospace">70%</text>
          </svg>
        );
      case "treemap":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <g className="stroke-dark/20 stroke-1">
              <motion.rect x="8" y="6" width="40" height="38" fill="#D8F24E" initial={{ scale: 0 }} animate={{ scale: 1 }} />
              <motion.rect x="50" y="6" width="42" height="18" fill="#7C89E8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
              <motion.rect x="50" y="26" width="22" height="18" fill="#1E2FE0" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 }} />
              <motion.rect x="74" y="26" width="18" height="18" fill="#FFF" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
            </g>
          </svg>
        );
      case "sunburst":
        return (
          <svg className="w-full h-full" viewBox="-25 -25 50 50">
            {/* Core */}
            <circle cx="0" cy="0" r="7" fill="#1E2FE0" />
            {/* Ring 1 */}
            <circle cx="0" cy="0" r="12" fill="none" stroke="#7C89E8" strokeWidth="4" strokeDasharray="75.3" strokeDashoffset="15" opacity="0.8" />
            {/* Ring 2 */}
            <circle cx="0" cy="0" r="18" fill="none" stroke="#D8F24E" strokeWidth="4" strokeDasharray="113" strokeDashoffset="30" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="#FFF" strokeWidth="4" strokeDasharray="113" strokeDashoffset="90" opacity="0.6" />
          </svg>
        );
      case "waterfall":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Positive baseline */}
            <motion.rect x="10" y="22" width="12" height="18" fill="#D8F24E" initial={{ height: 0, y: 40 }} animate={{ height: 18, y: 22 }} />
            {/* Adjustments */}
            <motion.rect x="26" y="10" width="12" height="12" fill="#D8F24E" initial={{ height: 0, y: 22 }} animate={{ height: 12, y: 10 }} transition={{ delay: 0.1 }} />
            <motion.rect x="42" y="10" width="12" height="20" fill="#7C89E8" initial={{ height: 0, y: 10 }} animate={{ height: 20, y: 10 }} transition={{ delay: 0.2 }} />
            <motion.rect x="58" y="30" width="12" height="6" fill="#7C89E8" initial={{ height: 0, y: 30 }} animate={{ height: 6, y: 30 }} transition={{ delay: 0.3 }} />
            {/* Final sum */}
            <motion.rect x="74" y="16" width="12" height="24" fill="#1E2FE0" initial={{ height: 0, y: 40 }} animate={{ height: 24, y: 16 }} transition={{ delay: 0.4 }} />
            <line x1="8" y1="40" x2="90" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );

      // ─── RELATIONSHIP & CORRELATION ───
      case "scatter":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Cartesian dots */}
            {[
              { x: 18, y: 36 }, { x: 30, y: 28 }, { x: 42, y: 32 },
              { x: 50, y: 18 }, { x: 62, y: 20 }, { x: 74, y: 12 },
              { x: 82, y: 15 }, { x: 34, y: 22 }, { x: 58, y: 14 }
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="2"
                fill={i % 2 === 0 ? "#D8F24E" : "#7C89E8"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
            <line x1="10" y1="42" x2="90" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="10" y1="5" x2="10" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "bubble":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Variable circle diameters */}
            {[
              { x: 22, y: 32, r: 4 }, { x: 38, y: 18, r: 8 }, { x: 55, y: 28, r: 3 },
              { x: 70, y: 12, r: 6 }, { x: 80, y: 30, r: 10 }
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={i % 2 === 0 ? "rgba(216, 242, 78, 0.75)" : "rgba(124, 137, 232, 0.75)"}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
            <line x1="10" y1="42" x2="90" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "heatmap":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Grid layout */}
            <g transform="translate(18, 6)">
              {Array.from({ length: 4 }).map((_, r) => (
                <g key={r} transform={`translate(0, ${r * 9.5})`}>
                  {Array.from({ length: 7 }).map((_, c) => {
                    const intensities = [
                      "#D8F24E",
                      "rgba(216, 242, 78, 0.5)",
                      "#7C89E8",
                      "#1E2FE0",
                      "rgba(255,255,255,0.05)"
                    ];
                    const seed = (r * 4 + c * 3) % intensities.length;
                    return (
                      <rect
                        key={c}
                        x={c * 9.5}
                        y="0"
                        width="8"
                        height="8"
                        fill={intensities[seed]}
                        rx="1"
                      />
                    );
                  })}
                </g>
              ))}
            </g>
          </svg>
        );
      case "network-graph":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Connecting lines */}
            <line x1="20" y1="25" x2="50" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="20" y1="25" x2="50" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="50" y1="10" x2="80" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="50" y1="40" x2="80" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="50" y1="10" x2="50" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            
            {/* Node circles */}
            <motion.circle cx="20" cy="25" r="4" fill="#D8F24E" initial={{ scale: 0 }} animate={{ scale: 1 }} />
            <motion.circle cx="50" cy="10" r="5" fill="#7C89E8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
            <motion.circle cx="50" cy="40" r="5" fill="#7C89E8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 }} />
            <motion.circle cx="80" cy="25" r="4" fill="#1E2FE0" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
          </svg>
        );
      case "chord-diagram":
        return (
          <svg className="w-full h-full" viewBox="-25 -25 50 50">
            {/* Outer ring */}
            <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            {/* Arc linkages */}
            <motion.path d="M -14 -14 Q 0 0, 14 14" fill="none" stroke="#D8F24E" strokeWidth="1.5" opacity="0.7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.path d="M -20 0 Q 0 0, 20 0" fill="none" stroke="#7C89E8" strokeWidth="1.5" opacity="0.7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1 }} />
            <motion.path d="M -14 14 Q 0 0, 0 -20" fill="none" stroke="#1E2FE0" strokeWidth="1.5" opacity="0.7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
            {/* Segment handles */}
            <circle cx="-14" cy="-14" r="2.5" fill="#FFF" />
            <circle cx="14" cy="14" r="2.5" fill="#FFF" />
            <circle cx="20" cy="0" r="2.5" fill="#FFF" />
            <circle cx="-20" cy="0" r="2.5" fill="#FFF" />
          </svg>
        );
      case "sankey":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Left nodes */}
            <rect x="10" y="8" width="5" height="15" fill="#D8F24E" />
            <rect x="10" y="27" width="5" height="15" fill="#7C89E8" />
            {/* Right nodes */}
            <rect x="85" y="5" width="5" height="10" fill="#1E2FE0" />
            <rect x="85" y="18" width="5" height="12" fill="#D8F24E" />
            <rect x="85" y="33" width="5" height="12" fill="#FFF" />
            {/* Flow bands */}
            <motion.path d="M 15 12 C 40 12, 50 8, 85 8" fill="none" stroke="rgba(216, 242, 78, 0.3)" strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.path d="M 15 15 C 40 15, 50 24, 85 24" fill="none" stroke="rgba(216, 242, 78, 0.2)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.path d="M 15 34 C 40 34, 50 24, 85 26" fill="none" stroke="rgba(124, 137, 232, 0.3)" strokeWidth="8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.path d="M 15 38 C 40 38, 50 40, 85 39" fill="none" stroke="rgba(124, 137, 232, 0.15)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          </svg>
        );

      // ─── DISTRIBUTION ───
      case "histogram":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Bell curve distribution columns */}
            <motion.rect x="10" y="32" width="10" height="8" fill="#7C89E8" initial={{ height: 0, y: 40 }} animate={{ height: 8, y: 32 }} />
            <motion.rect x="21" y="24" width="10" height="16" fill="#7C89E8" initial={{ height: 0, y: 40 }} animate={{ height: 16, y: 24 }} transition={{ delay: 0.05 }} />
            <motion.rect x="32" y="12" width="10" height="28" fill="#D8F24E" initial={{ height: 0, y: 40 }} animate={{ height: 28, y: 12 }} transition={{ delay: 0.1 }} />
            <motion.rect x="43" y="8" width="10" height="32" fill="#D8F24E" initial={{ height: 0, y: 40 }} animate={{ height: 32, y: 8 }} transition={{ delay: 0.15 }} />
            <motion.rect x="54" y="16" width="10" height="24" fill="#D8F24E" initial={{ height: 0, y: 40 }} animate={{ height: 24, y: 16 }} transition={{ delay: 0.2 }} />
            <motion.rect x="65" y="22" width="10" height="18" fill="#7C89E8" initial={{ height: 0, y: 40 }} animate={{ height: 18, y: 22 }} transition={{ delay: 0.25 }} />
            <motion.rect x="76" y="30" width="10" height="10" fill="#7C89E8" initial={{ height: 0, y: 40 }} animate={{ height: 10, y: 30 }} transition={{ delay: 0.3 }} />
            <line x1="8" y1="40" x2="88" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        );
      case "box-plot":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Whiskers */}
            <line x1="50" y1="8" x2="50" y2="42" stroke="#FFF" strokeWidth="1.5" />
            <line x1="42" y1="8" x2="58" y2="8" stroke="#FFF" strokeWidth="1.5" />
            <line x1="42" y1="42" x2="58" y2="42" stroke="#FFF" strokeWidth="1.5" />
            {/* Box */}
            <motion.rect x="36" y="16" width="28" height="18" fill="#7C89E8" stroke="#D8F24E" strokeWidth="1.5" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} />
            {/* Median */}
            <line x1="36" y1="24" x2="64" y2="24" stroke="#FFF" strokeWidth="2" />
            <line x1="15" y1="45" x2="85" y2="45" stroke="rgba(255,255,255,0.15)" />
          </svg>
        );
      case "violin-plot":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Symmetrical outline path */}
            <motion.path
              d="M 50 6 C 58 12, 65 20, 58 32 C 54 38, 54 41, 50 44 C 46 41, 46 38, 42 32 C 35 20, 42 12, 50 6 Z"
              fill="rgba(124, 137, 232, 0.25)"
              stroke="#7C89E8"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
            {/* Whisker center line */}
            <line x1="50" y1="12" x2="50" y2="38" stroke="#D8F24E" strokeWidth="1.5" />
            {/* Median dot */}
            <circle cx="50" cy="24" r="3" fill="#D8F24E" />
          </svg>
        );

      // ─── PERFORMANCE & KPI ───
      case "gauge":
        return (
          <svg className="w-full h-full" viewBox="-25 -25 50 50">
            {/* Dial arc */}
            <path d="M -18 0 A 18 18 0 0 1 18 0" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round" />
            <motion.path
              d="M -18 0 A 18 18 0 0 1 6 -13"
              fill="none"
              stroke="#D8F24E"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
            {/* Pointer needle */}
            <motion.line
              x1="0"
              y1="0"
              x2="8"
              y2="-14"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ rotate: -90 }}
              animate={{ rotate: 15 }}
              style={{ originX: 0, originY: 0 }}
              transition={{ duration: 1 }}
            />
            <circle cx="0" cy="0" r="3.5" fill="#1E2FE0" stroke="#FFF" strokeWidth="1" />
          </svg>
        );
      case "radar":
        return (
          <svg className="w-full h-full" viewBox="-25 -25 50 50">
            {/* Outer hexagon */}
            <polygon points="0,-20 17.3,-10 17.3,10 0,20 -17.3,10 -17.3,-10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Inner hexagon */}
            <polygon points="0,-12 10.4,-6 10.4,6 0,12 -10.4,6 -10.4,-6" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {/* Competency polygon overlay */}
            <motion.polygon
              points="0,-16 14.5,-8 8,-3 0,14 -12,8 -6,-8"
              fill="rgba(216, 242, 78, 0.2)"
              stroke="#D8F24E"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          </svg>
        );
      case "funnel":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Funnel segments */}
            <motion.polygon points="20,6 80,6 74,14 26,14" fill="#D8F24E" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            <motion.polygon points="28,16 72,16 66,24 34,24" fill="#7C89E8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
            <motion.polygon points="36,26 64,26 58,34 42,34" fill="#1E2FE0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
            <motion.polygon points="44,36 56,36 52,44 48,44" fill="#FFF" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
          </svg>
        );

      // ─── TEXT & GEO ───
      case "word-cloud":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <g fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              <motion.text x="50" y="27" fontSize="11" fill="#D8F24E" initial={{ scale: 0 }} animate={{ scale: 1 }}>SQL</motion.text>
              <motion.text x="30" y="16" fontSize="8" fill="#7C89E8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>Python</motion.text>
              <motion.text x="75" y="18" fontSize="7" fill="#7C89E8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 }}>DAX</motion.text>
              <motion.text x="25" y="38" fontSize="6" fill="#FFF" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>Pandas</motion.text>
              <motion.text x="70" y="38" fontSize="7" fill="#1E2FE0" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25 }}>KPI</motion.text>
              <motion.text x="50" y="12" fontSize="5" fill="#FFF" opacity="0.6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>RAG</motion.text>
            </g>
          </svg>
        );
      case "geo-map":
        return (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            {/* Outlines of stylized global land shapes */}
            <motion.path
              d="M 12 18 Q 20 8, 28 20 T 36 28 T 20 38 Z"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <motion.path
              d="M 52 24 Q 65 14, 75 22 T 88 28 T 68 42 Z"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            {/* Interactive geographic marker dots */}
            <motion.circle cx="22" cy="20" r="3.5" fill="rgba(216, 242, 78, 0.85)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
            <motion.circle cx="68" cy="26" r="5" fill="rgba(124, 137, 232, 0.85)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
            <motion.circle cx="80" cy="32" r="2.5" fill="rgba(216, 242, 78, 0.85)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
          </svg>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-[10px] font-mono text-white/40">
            [Chart Preview]
          </div>
        );
    }
  };

  return (
    <div className={`w-full h-24 flex items-center justify-center bg-dark/20 rounded p-2 ${className}`}>
      {renderVisual()}
    </div>
  );
}
