"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/sections/Header";
import PaperCard from "@/components/PaperCard";
import HandDrawnArrow from "@/components/HandDrawnArrow";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

// Shared components
import MiniChart from "@/components/shared/MiniChart";
import BackToPortfolioButton from "@/components/shared/BackToPortfolioButton";

// Page animations
const slideUpPage = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const chartCategories = [
  {
    category: "Comparison",
    description: "Compare values across categories or groups.",
    charts: [
      {
        id: "bar",
        name: "Bar Chart",
        usedFor: "Compare items vertically",
        bestWhen: "Category labels are long or there are more than 10 categories.",
        avoidWhen: "Showing trends over continuous time intervals."
      },
      {
        id: "column",
        name: "Column Chart",
        usedFor: "Compare items horizontally",
        bestWhen: "Comparing a small number of categories (under 10) side-by-side.",
        avoidWhen: "Category labels are long and overlap on the X-axis."
      },
      {
        id: "stacked-bar",
        name: "Stacked Bar",
        usedFor: "Compare parts of wholes",
        bestWhen: "Analyzing sum totals and the sub-contributions within each category.",
        avoidWhen: "Comparing the relative sizes of individual sub-segments."
      },
      {
        id: "100-percent-stacked-bar",
        name: "100% Stacked Bar",
        usedFor: "Show relative proportions",
        bestWhen: "Displaying percentage distributions without needing absolute values.",
        avoidWhen: "Absolute totals and size variations between categories matter."
      },
      {
        id: "pareto",
        name: "Pareto Chart",
        usedFor: "Highlight major contributors",
        bestWhen: "Identifying the 80/20 rule of key causes behind business issues.",
        avoidWhen: "Frequencies or costs are uniformly distributed across categories."
      }
    ]
  },
  {
    category: "Trend / Time",
    description: "Track performance or changes over time intervals.",
    charts: [
      {
        id: "line",
        name: "Line Chart",
        usedFor: "Track continuous changes",
        bestWhen: "Visualizing long-term continuous trends or datasets with many points.",
        avoidWhen: "Comparing raw nominal category counts."
      },
      {
        id: "area",
        name: "Area Chart",
        usedFor: "Show cumulative trends",
        bestWhen: "Visualizing volume or total size changes over time.",
        avoidWhen: "Comparing more than 3 series due to overlapping occlusion."
      },
      {
        id: "candlestick",
        name: "Candlestick Chart",
        usedFor: "Track price movements",
        bestWhen: "Analyzing high, low, open, and close metrics of financial assets.",
        avoidWhen: "Displaying simple univariate continuous trends."
      },
      {
        id: "control-chart",
        name: "Control Chart",
        usedFor: "Process stability monitoring",
        bestWhen: "Assessing if a manufacturing or deployment run is within limits.",
        avoidWhen: "Exploring static distributions or non-sequential metrics."
      },
      {
        id: "calendar-heatmap",
        name: "Calendar Heatmap",
        usedFor: "Daily activity frequency",
        bestWhen: "Spotting behavioral hotspots over weeks, months, or days of the week.",
        avoidWhen: "Comparing simple monthly summaries or general category ratios."
      },
      {
        id: "gantt",
        name: "Gantt Chart",
        usedFor: "Project schedules",
        bestWhen: "Tracking project phases, task durations, and operational overlaps.",
        avoidWhen: "Comparing quantitative ratios or raw statistical values."
      }
    ]
  },
  {
    category: "Composition",
    description: "Show the breakdown of a total metric.",
    charts: [
      {
        id: "pie",
        name: "Pie Chart",
        usedFor: "Simple parts of whole",
        bestWhen: "Displaying 2 to 5 highly distinct percentage segments.",
        avoidWhen: "Comparing many similar slices or precision is key."
      },
      {
        id: "donut",
        name: "Donut Chart",
        usedFor: "Part-of-whole with center text",
        bestWhen: "Highlighting a single primary metric or ratio in the center space.",
        avoidWhen: "More than 6 categorical segments are represented."
      },
      {
        id: "treemap",
        name: "Treemap",
        usedFor: "Hierarchical nested areas",
        bestWhen: "Analyzing complex hierarchically nested values across hundreds of points.",
        avoidWhen: "Individual slice ratios are highly uniform or small."
      },
      {
        id: "sunburst",
        name: "Sunburst",
        usedFor: "Hierarchical rings",
        bestWhen: "Mapping multi-level categorical breakdowns outward in rings.",
        avoidWhen: "Depth exceeds 3 hierarchical branch levels."
      },
      {
        id: "waterfall",
        name: "Waterfall",
        usedFor: "Cumulative step effects",
        bestWhen: "Tracking positive and negative ledger changes over an interval.",
        avoidWhen: "Comparing simple category sizes or continuous timelines."
      }
    ]
  },
  {
    category: "Relationship / Correlation",
    description: "Examine connections between metrics.",
    charts: [
      {
        id: "scatter",
        name: "Scatter Plot",
        usedFor: "Plot correlation patterns",
        bestWhen: "Mapping correlation bounds between two continuous numerical variables.",
        avoidWhen: "Working with nominal categorical axes."
      },
      {
        id: "bubble",
        name: "Bubble Chart",
        usedFor: "Three-dimensional values",
        bestWhen: "Mapping variables across X, Y, and volume weight circles.",
        avoidWhen: "Overlapping sizes clutter the canvas view."
      },
      {
        id: "heatmap",
        name: "Heatmap Matrix",
        usedFor: "2D density matrix",
        bestWhen: "Plotting a correlation coefficient grid or geographic density maps.",
        avoidWhen: "Representing sparse, unconnected category lists."
      },
      {
        id: "network-graph",
        name: "Network Graph",
        usedFor: "Entity relationships",
        bestWhen: "Mapping complex nodes, links, and system structural hubs.",
        avoidWhen: "Exploring simple sequential timelines or static hierarchies."
      },
      {
        id: "chord-diagram",
        name: "Chord Diagram",
        usedFor: "Inter-group flow links",
        bestWhen: "Tracking multi-stage transition flows and weights inside a circle.",
        avoidWhen: "Comparing simple independent category aggregates."
      },
      {
        id: "sankey",
        name: "Sankey Diagram",
        usedFor: "Source to destination flow",
        bestWhen: "Tracing customer conversion funnels and dropoff stages.",
        avoidWhen: "Comparing minor disjoint metrics with no flow structure."
      }
    ]
  },
  {
    category: "Distribution",
    description: "Analyze the spread of values in a dataset.",
    charts: [
      {
        id: "histogram",
        name: "Histogram",
        usedFor: "Value frequency spreads",
        bestWhen: "Mapping metric data density spreads across numerical bins.",
        avoidWhen: "Comparing non-numerical discrete categories."
      },
      {
        id: "box-plot",
        name: "Box Plot",
        usedFor: "Statistical summaries",
        bestWhen: "Displaying medians, quartiles, and identifying outliers in datasets.",
        avoidWhen: "Small sample sizes where summary scores skew the distribution."
      },
      {
        id: "violin-plot",
        name: "Violin Plot",
        usedFor: "Distribution density shapes",
        bestWhen: "Visualizing probability density and multimodal spreads side-by-side.",
        avoidWhen: "Simple normal spreads easily mapped with a box plot."
      }
    ]
  },
  {
    category: "Performance / KPI",
    description: "Track progress toward operational goals.",
    charts: [
      {
        id: "gauge",
        name: "Gauge Chart",
        usedFor: "Target goal tracking",
        bestWhen: "Showing single key indicators against threshold dials (e.g. speed, limits).",
        avoidWhen: "Comparing multiple categories or dimensions."
      },
      {
        id: "radar",
        name: "Radar Chart",
        usedFor: "Multivariable balance profiles",
        bestWhen: "Mapping multi-axis profiles (e.g. performance stats, capability matrices).",
        avoidWhen: "Representing more than 8 comparative axes."
      },
      {
        id: "funnel",
        name: "Funnel Chart",
        usedFor: "Stage fallout metrics",
        bestWhen: "Visualizing customer conversion fallouts at linear steps.",
        avoidWhen: "Mapping non-sequential workflows."
      }
    ]
  },
  {
    category: "Text / Geo",
    description: "Map spatial locations and textual attributes.",
    charts: [
      {
        id: "word-cloud",
        name: "Word Cloud",
        usedFor: "Keyword frequency weight",
        bestWhen: "Presenting metadata text tags or keyword frequency logs.",
        avoidWhen: "Precision quantitative mapping is required."
      },
      {
        id: "geo-map",
        name: "Geo Map",
        usedFor: "Spatial location densities",
        bestWhen: "Mapping regional density distributions (e.g. state-by-state transactions).",
        avoidWhen: "Comparing spatial zones with extreme population skew."
      }
    ]
  }
];

export default function ChartLibraryClient() {
  const [expandedChartId, setExpandedChartId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedChartId(expandedChartId === id ? null : id);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUpPage}
      className="min-h-screen bg-blue-primary text-white font-[family-name:var(--font-inter)] selection:bg-lime/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="corner-bracket corner-bracket-tl" />
      <div className="corner-bracket corner-bracket-tr" />
      <div className="corner-bracket corner-bracket-bl" />
      <div className="corner-bracket corner-bracket-br" />

      <Header />

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 space-y-20 md:space-y-28">
        
        {/* ── BACK BUTTON ── */}
        <motion.div variants={fadeUp}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-caveat)] text-xl text-blue-muted hover:text-white transition-colors"
          >
            <HandDrawnArrow direction="left" color="#7C89E8" size={30} />
            back to portfolio
          </Link>
        </motion.div>

        {/* ── HERO SECTION ── */}
        <motion.section 
          variants={stagger}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="relative">
            <h1 className="font-[family-name:var(--font-caveat)] text-6xl md:text-8xl font-bold text-white leading-none">
              I&apos;m an Open Book
            </h1>
            <h2 className="text-2xl md:text-3xl text-lime font-bold mt-3 relative inline-block">
              Let&apos;s See Different Types of Charts
              <HandDrawnUnderline width={360} color="#D8F24E" className="absolute -bottom-4 left-0" strokeWidth={3} />
            </h2>
          </motion.div>

          <motion.p variants={fadeUp} className="text-white/80 text-lg max-w-2xl font-mono pt-4 leading-relaxed">
            Every chart tells a story differently. Here&apos;s when I reach for each one. Select any chart category card below to inspect its best use cases and potential limitations.
          </motion.p>

          {/* Sticky jump links */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-wrap gap-2 pt-4 border-t border-white/5"
          >
            {chartCategories.map((cat) => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="bg-white/5 hover:bg-lime hover:text-dark px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase transition-colors duration-200"
              >
                {cat.category}
              </a>
            ))}
          </motion.div>
        </motion.section>

        {/* ── CATEGORY SECTIONS ── */}
        <div className="space-y-20">
          {chartCategories.map((cat, catIdx) => (
            <motion.section
              key={cat.category}
              id={cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="space-y-6 scroll-mt-24"
            >
              <motion.div variants={fadeUp} className="border-b border-white/10 pb-2">
                <span className="font-mono text-xs text-lime uppercase tracking-widest block">
                  Category {catIdx + 1}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                  {cat.category}
                </h3>
                <p className="text-white/60 text-xs mt-1 font-mono">{cat.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.charts.map((chart) => {
                  const isExpanded = expandedChartId === chart.id;
                  return (
                    <motion.div key={chart.id} variants={fadeUp} className="h-full">
                      <div 
                        onClick={() => toggleExpand(chart.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleExpand(chart.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        className="cursor-pointer h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-sm"
                      >
                        <PaperCard
                          variant={isExpanded ? "cream" : "dark"}
                          rotation={0.5}
                          className={`p-5 border transition-all duration-300 h-full flex flex-col justify-between ${
                            isExpanded 
                              ? "border-white bg-[#FFFDF5] text-dark shadow-2xl scale-102"
                              : "border-white/10 hover:border-white/20 text-white"
                          }`}
                        >
                          <div>
                            <span className={`font-mono text-[9px] uppercase tracking-wider block mb-1 font-bold ${isExpanded ? "text-red-accent" : "text-lime"}`}>
                              {chart.usedFor}
                            </span>
                            <h4 className={`font-[family-name:var(--font-caveat)] text-2xl font-bold mb-3 ${isExpanded ? "text-dark" : "text-white"}`}>
                              {chart.name}
                            </h4>
                          </div>

                          <div className="my-3">
                            <MiniChart type={chart.id} className={isExpanded ? "bg-dark/5" : "bg-white/5"} />
                          </div>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden font-mono text-[10px] text-dark/95 leading-relaxed pt-3 border-t border-dark/10 space-y-2 mt-2"
                              >
                                <div>
                                  <span className="font-bold text-blue-primary block uppercase text-[8px]">Best When:</span>
                                  <p>{chart.bestWhen}</p>
                                </div>
                                <div>
                                  <span className="font-bold text-red-accent block uppercase text-[8px]">Avoid When:</span>
                                  <p>{chart.avoidWhen}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="text-right mt-3">
                            <span className={`font-mono text-[9px] font-bold ${isExpanded ? "text-blue-primary" : "text-white/40"}`}>
                              {isExpanded ? "click to collapse ▲" : "click to expand ▼"}
                            </span>
                          </div>
                        </PaperCard>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* ── CLOSING CTA ── */}
        <motion.section
          variants={stagger}
          className="text-center max-w-xl mx-auto pt-12"
        >
          <BackToPortfolioButton href="/#projects" label="Back to Portfolio" />
        </motion.section>

      </main>
    </motion.div>
  );
}
