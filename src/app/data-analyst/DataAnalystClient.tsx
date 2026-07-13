"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/sections/Header";
import PaperCard from "@/components/PaperCard";
import HandDrawnArrow from "@/components/HandDrawnArrow";

// Shared components
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Timeline from "@/components/shared/Timeline";
import StepCard from "@/components/shared/StepCard";
import BackToPortfolioButton from "@/components/shared/BackToPortfolioButton";

// Section animations
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const slideUpPage = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

// SQL Preset queries and mock tables
const sqlMocks = {
  churn: {
    query: "SELECT customer_id, churn_probability, monthly_charges, risk_reason FROM churn_predictions WHERE churn_probability > 0.75 LIMIT 3;",
    columns: ["customer_id", "churn_probability", "monthly_charges", "risk_reason"],
    rows: [
      ["CUST-9821", "88.4%", "$114.50", "High monthly cost, short contract"],
      ["CUST-1049", "79.1%", "$98.20", "Multiple support tickets"],
      ["CUST-4432", "76.5%", "$105.00", "No autopay, contract ending"],
    ]
  },
  sales: {
    query: "SELECT region, SUM(revenue) as total_rev, COUNT(order_id) FROM sales GROUP BY region ORDER BY total_rev DESC;",
    columns: ["region", "total_rev", "order_id_count"],
    rows: [
      ["North America", "$1,450,200", "12,450"],
      ["Europe", "$980,450", "8,920"],
      ["Asia Pacific", "$620,100", "5,110"],
    ]
  },
  retention: {
    query: "SELECT cohort_month, retention_rate_m3 FROM customer_cohorts WHERE cohort_month >= '2026-01';",
    columns: ["cohort_month", "retention_rate_m3"],
    rows: [
      ["2026-01", "82.4%"],
      ["2026-02", "85.1%"],
      ["2026-03", "89.2%"],
    ]
  }
};

// Timeline steps
const timelineSteps = [
  { label: "Business Question", details: "Define the core query. Deliverable: Stakeholder-signed scope brief." },
  { label: "Understand Stakeholders", details: "Identify decision timelines and metrics. Deliverable: Stakeholder alignment matrix." },
  { label: "Collect Data", details: "Query database instances. Deliverable: CTE extraction script (Postgres/BigQuery)." },
  { label: "Clean & Validate", details: "Run primary key and type audits. Deliverable: Deduplication & outlier audit log." },
  { label: "Explore Patterns", details: "Conduct statistical correlations. Deliverable: EDA correlation matrices & cohort charts." },
  { label: "Build Dashboard", details: "Construct interactive visual hubs. Deliverable: Power BI wireframe layouts & data models." },
  { label: "Generate Insights", details: "Synthesize anomalies and trends. Deliverable: Strategic executive presentation slide deck." },
  { label: "Recommend Actions", details: "Translate findings into operations. Deliverable: ROI optimization strategy document." },
  { label: "Business Impact", details: "Monitor performance lift. Deliverable: Quarterly KPI tracking reports & dashboards." }
];

// Workflow nodes
const workflowNodes = [
  { name: "Raw Data", tool: "Data Sources", desc: "Warehouse schemas, relational DBs, transactional tables." },
  { name: "SQL", tool: "Extraction", desc: "CTE aggregates, window functions, and query optimization patterns." },
  { name: "Cleaning", tool: "Transformation", desc: "Type coercion, timestamp alignment, and duplicate filters." },
  { name: "Python", tool: "EDA", desc: "Exploratory script analyses using Pandas and NumPy arrays." },
  { name: "EDA", tool: "Analysis", desc: "Plotting data distributions, outlier segments, and correlations." },
  { name: "Visualization", tool: "UX Design", desc: "Arranging reporting grids and selecting optimal SVG chart segments." },
  { name: "Power BI", tool: "Reporting", desc: "Implementing DAX columns, relationships, and filter scopes." },
  { name: "Insights", tool: "Synthesis", desc: "Translating charts into metric trends and clear takeaways." },
  { name: "Recommendations", tool: "Action", desc: "Proposing specific business optimizations based on empirical results." }
];

// Toolkit items
const toolkitList = [
  { step: "SQL", title: "Querying Engine", details: "Window Functions, CTEs, Query Optimization, Joins, Aggregations" },
  { step: "Python", title: "Scientific Scripts", details: "Pandas, NumPy, Matplotlib, Plotly, Scikit-learn, Automation" },
  { step: "Power BI", title: "Visual Analytics", details: "DAX formulas, Power Query, Data Modeling, KPI Dashboards, Row-Level Security" },
  { step: "Excel", title: "Data Sheets", details: "Pivot Tables, Power Query, XLOOKUP, Index Match, VBA macros" },
  { step: "Statistics", title: "Quantitative Core", details: "A/B Testing, Hypothesis Tests, Regression, Correlation, Forecasting models" }
];

// Dashboard Gallery state data
const dashboardMocks = {
  executive: {
    title: "Executive Dashboard",
    filters: ["All Regions", "North America", "Europe"],
    metrics: {
      "All Regions": { rev: 3050720, margin: 76.5, growth: 14.8, forecast: 3250000 },
      "North America": { rev: 1850400, margin: 78.2, growth: 16.2, forecast: 1950000 },
      "Europe": { rev: 1200320, margin: 73.9, growth: 12.5, forecast: 1300000 },
    }
  },
  customer: {
    title: "Customer Risk",
    filters: ["All Tier", "Enterprise", "Self-Serve"],
    metrics: {
      "All Tier": { retention: 91.4, churn: 4.8, ltv: 8450, support_time: 14.2 },
      "Enterprise": { retention: 96.8, churn: 1.8, ltv: 45200, support_time: 8.5 },
      "Self-Serve": { retention: 86.2, churn: 7.8, ltv: 1250, support_time: 19.8 },
    }
  },
  marketing: {
    title: "Marketing ROI",
    filters: ["All Campaigns", "Google Ads", "LinkedIn"],
    metrics: {
      "All Campaigns": { roi: 3.4, conv: 4.2, ctr: 2.8, clicks: 120500 },
      "Google Ads": { roi: 4.1, conv: 5.1, ctr: 3.2, clicks: 85200 },
      "LinkedIn": { roi: 2.2, conv: 2.6, ctr: 1.9, clicks: 35300 },
    }
  }
};

export default function DataAnalystClient() {
  const [activeQueryKey, setActiveQueryKey] = useState<"churn" | "sales" | "retention">("churn");
  const [typedQuery, setTypedQuery] = useState(sqlMocks.churn.query);
  const [sqlResults, setSqlResults] = useState(sqlMocks.churn);
  const [isRunningSql, setIsRunningSql] = useState(false);

  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState<number | null>(null);

  const [activeDashboard, setActiveDashboard] = useState<"executive" | "customer" | "marketing">("executive");
  const [selectedFilter, setSelectedFilter] = useState("All Regions");

  const handleDashboardSwitch = (db: "executive" | "customer" | "marketing") => {
    setActiveDashboard(db);
    setSelectedFilter(dashboardMocks[db].filters[0]);
  };

  const handleRunSql = () => {
    setIsRunningSql(true);
    setTimeout(() => {
      setSqlResults(sqlMocks[activeQueryKey]);
      setIsRunningSql(false);
    }, 600);
  };

  const handleQuerySelect = (key: "churn" | "sales" | "retention") => {
    setActiveQueryKey(key);
    setTypedQuery(sqlMocks[key].query);
    setSqlResults(sqlMocks[key]);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={slideUpPage}
      className="min-h-screen bg-blue-primary text-white font-[family-name:var(--font-inter)] selection:bg-lime/30 relative overflow-hidden"
    >
      {/* Background corner anchors */}
      <div className="corner-bracket corner-bracket-tl" />
      <div className="corner-bracket corner-bracket-tr" />
      <div className="corner-bracket corner-bracket-bl" />
      <div className="corner-bracket corner-bracket-br" />

      <Header />

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 space-y-28 md:space-y-36">

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

        {/* ── 1. HERO SECTION WITH STAT COUNTERS ── */}
        <motion.section 
          variants={stagger}
          className="space-y-12"
        >
          <div className="space-y-4">
            <motion.p variants={fadeUp} className="font-mono text-sm text-lime uppercase tracking-widest">
              Flagship Capability
            </motion.p>
            <motion.h1 
              variants={fadeUp}
              className="font-[family-name:var(--font-caveat)] text-6xl md:text-8xl font-bold text-white leading-none"
            >
              Data Analyst
            </motion.h1>
            <motion.h2 
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[#7C89E8] font-bold"
            >
              Turning Data Into Decisions
            </motion.h2>
          </div>

          {/* Metric KPI Counters */}
          <motion.div 
            variants={stagger} 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: 500000, suffix: "+", label: "Rows Analyzed" },
              { value: 12, suffix: "+", label: "End-to-End Projects" },
              { value: 25, suffix: "+", label: "Dashboards Built" },
              { value: 450, suffix: "+", label: "SQL Queries Written" },
            ].map((kpi, idx) => (
              <motion.div key={kpi.label} variants={fadeUp}>
                <PaperCard
                  variant="dark"
                  rotation={idx % 2 === 0 ? -1.2 : 1}
                  className="p-5 border border-white/10 hover:border-lime/30 text-center transition-all duration-300"
                >
                  <span className="text-3xl md:text-4xl font-bold font-mono text-lime">
                    <AnimatedCounter value={kpi.value} suffix={kpi.suffix} />
                  </span>
                  <span className="text-xs uppercase tracking-wider block opacity-70 mt-2 font-mono">{kpi.label}</span>
                </PaperCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── 2. BEFORE I TRUST A DATASET ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="space-y-6 max-w-3xl"
        >
          <motion.p className="font-mono text-sm text-lime uppercase tracking-widest" variants={fadeUp}>
            Data Integrity Checklist
          </motion.p>
          <motion.h2 className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold text-white" variants={fadeUp}>
            Before I Trust a Dataset
          </motion.h2>
          <motion.p className="text-white/80 text-lg leading-relaxed font-sans animate-pulse" variants={fadeUp}>
            Raw datasets contain system anomalies. Before running query analyses, I run this validation checklist:
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              { check: "Primary Key Uniqueness", text: "Execute grouping row counts to verify target primary key IDs are unique." },
              { check: "Row-Count Comparisons", text: "Validate aggregated sums against historical ledgers to catch missing transactions." },
              { check: "Null Constraints Audit", text: "Filter core metric variables to locate missing values or null payloads." },
              { check: "Outlier Boundary Check", text: "Isolate values outside 3 standard deviations to check system logs." },
              { check: "Type & String Formatting", text: "Standardize timestamp string values and offset timezones across pipelines." },
              { check: "Referential Integrity Audit", text: "Log orphan foreign keys to isolate broken table mappings." }
            ].map((c, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="p-4 bg-white/5 border border-white/5 rounded-sm flex flex-col gap-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lime font-bold">✓</span>
                  <span className="font-mono text-xs font-bold text-[#7C89E8] uppercase">{c.check}</span>
                </div>
                <p className="font-mono text-[10px] text-white/80 leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 3. PROCESS TIMELINE ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Process Timeline</span>
            <h2 className="text-3xl md:text-4xl font-bold">My Analytics Process</h2>
            <p className="text-white/60 text-sm">Click each stage to inspect deliverables and core techniques:</p>
          </div>

          <Timeline stages={timelineSteps} />
        </motion.section>

        {/* ── 4. HOW I SOLVE BUSINESS PROBLEMS ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Techniques</span>
            <h2 className="text-3xl md:text-4xl font-bold">How I Solve Business Problems</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Business context", text: "Stakeholder Shadow Sessions. Align target KPIs with core operations timelines." },
              { step: "02", title: "Analyze metrics", text: "Descriptive Statistics. Identify feature distributions, outliers, and variance bounds." },
              { step: "03", title: "Uncover patterns", text: "Cohort Retention Matrices. Explore features using correlation matrices and EDA models." },
              { step: "04", title: "Dashboard metrics", text: "DAX data models. Design responsive wireframes targeting specific business decisions." },
              { step: "05", title: "Recommend lift", text: "Executive ROI Scenarios. Calculate financial impacts with target confidence intervals." }
            ].map((st, idx) => (
              <motion.div key={st.step} variants={fadeUp}>
                <StepCard
                  step={st.step}
                  title={st.title}
                  details={st.text}
                  variant="dark"
                  rotation={idx % 2 === 0 ? 1 : -1}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 5. INTERACTIVE SQL TERMINAL ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Interactive Sandbox</span>
            <h2 className="text-3xl md:text-4xl font-bold">Simulated SQL Playground</h2>
            <p className="text-sm text-white/70">Select a query preset, inspect the syntax, and run to retrieve mock records:</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              {[
                { key: "churn", label: "High Risk Customer Query" },
                { key: "sales", label: "Group By Regional Sales" },
                { key: "retention", label: "Retention Rate cohorts" }
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => handleQuerySelect(btn.key as "churn" | "sales" | "retention")}
                  className={`p-4 text-left border rounded-sm font-mono text-xs transition-all duration-200 ${
                    activeQueryKey === btn.key 
                      ? "bg-white text-dark border-white font-bold"
                      : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* SQL Shell */}
              <div className="bg-dark-card border border-white/15 rounded-md p-4 flex flex-col justify-between h-48 font-mono shadow-inner">
                <div className="space-y-2 text-xs">
                  <span className="text-lime font-bold">SQL Terminal</span>
                  <textarea
                    value={typedQuery}
                    onChange={(e) => setTypedQuery(e.target.value)}
                    className="w-full h-24 bg-transparent outline-none border-none text-[#7C89E8] font-mono text-xs resize-none"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleRunSql}
                    disabled={isRunningSql}
                    className="bg-[#D8F24E] hover:bg-[#C2D940] text-dark font-bold text-xs uppercase px-4 py-2 rounded-sm transition-colors duration-200"
                  >
                    {isRunningSql ? "Running..." : "Run Query ➔"}
                  </button>
                </div>
              </div>

              {/* DB Results Table */}
              <div className="bg-[#FFFDF5] text-dark p-6 rounded-sm shadow-xl relative overflow-x-auto min-h-[160px] flex flex-col justify-between border border-dark/10">
                <div className="absolute -top-2.5 left-4 z-10 tape-strip" />
                <span className="font-mono text-[10px] font-bold text-red-accent tracking-wider uppercase mb-3 block">Query Results Output</span>
                {isRunningSql ? (
                  <div className="flex-1 flex items-center justify-center font-[family-name:var(--font-caveat)] text-xl py-6 animate-pulse text-dark/70">
                    Executing query logical schema...
                  </div>
                ) : (
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b-2 border-dark/20 text-dark/70">
                        {sqlResults.columns.map((col) => (
                          <th key={col} className="pb-2 font-bold uppercase text-[10px]">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sqlResults.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-dark/10 last:border-0">
                          {row.map((val, cellIdx) => (
                            <td key={cellIdx} className="py-2.5 pr-2 font-medium">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 6. CLICKABLE ANALYTICS WORKFLOW CHART ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Interactive Pipeline</span>
            <h2 className="text-3xl md:text-4xl font-bold">Analytics Workflow Diagram</h2>
            <p className="text-white/60 text-sm">Click on any pipeline block to inspect flow transformations:</p>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-md p-6 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-1 text-center w-full">
              {workflowNodes.map((node, idx) => (
                <div key={node.name} className="flex flex-col md:flex-row items-center gap-1 flex-1 w-full min-w-0">
                  <div
                    onClick={() => setSelectedWorkflowIndex(selectedWorkflowIndex === idx ? null : idx)}
                    className={`p-2.5 rounded border text-xs font-mono cursor-pointer transition-all duration-300 w-full min-w-0 ${
                      selectedWorkflowIndex === idx 
                        ? "bg-[#D8F24E] text-dark border-[#D8F24E] shadow-lg font-bold"
                        : "bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="block font-bold text-[10px] lg:text-xs truncate">{node.name}</span>
                    <span className={`text-[8px] lg:text-[9px] uppercase tracking-wider block truncate ${selectedWorkflowIndex === idx ? "text-dark/60" : "text-white/40"}`}>
                      {node.tool}
                    </span>
                  </div>
                  {idx < workflowNodes.length - 1 && (
                    <>
                      <span className="hidden md:block text-[#7C89E8] font-bold text-xs mx-0.5 select-none flex-shrink-0">
                        ➔
                      </span>
                      <span className="block md:hidden text-[#7C89E8] font-bold text-sm my-1 select-none">
                        ⬇
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedWorkflowIndex !== null ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 p-5 bg-[#FFFDF5] text-dark border border-dark/5 rounded-sm relative"
                >
                  <div className="absolute -top-2.5 left-6 tape-strip" />
                  <span className="font-mono text-[9px] font-bold text-[#1E2FE0] uppercase block mb-1">
                    Pipeline Node Details
                  </span>
                  <h4 className="font-[family-name:var(--font-caveat)] text-2xl font-bold text-dark mb-2">
                    {workflowNodes[selectedWorkflowIndex].name} — {workflowNodes[selectedWorkflowIndex].tool}
                  </h4>
                  <p className="font-mono text-xs md:text-sm text-dark/80 leading-relaxed">
                    {workflowNodes[selectedWorkflowIndex].desc}
                  </p>
                </motion.div>
              ) : (
                <div className="mt-6 text-center text-xs font-mono text-white/40 border border-dashed border-white/10 p-5 rounded">
                  (select any pipeline block above to view details)
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* ── 7. MY TOOLKIT FLIP CARDS ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">My Stack</span>
            <h2 className="text-3xl md:text-4xl font-bold">Analytics Toolkit</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {toolkitList.map((tool, idx) => (
              <motion.div key={tool.step} variants={fadeUp}>
                <StepCard
                  step={tool.step}
                  title={tool.title}
                  details={tool.details}
                  variant={idx % 2 === 0 ? "navy" : "dark"}
                  rotation={idx % 2 === 0 ? 1 : -1}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 8. DASHBOARD GALLERY WITH LIVE KPI TOGGLES ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Dashboard Gallery</span>
            <h2 className="text-3xl md:text-4xl font-bold">Simulated Dashboard Hub</h2>
            <p className="text-white/60 text-sm">Select dashboard scope filters and watch variables update:</p>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-md p-6 flex flex-col md:flex-row gap-8 items-stretch relative">
            <div className="flex flex-row md:flex-col gap-2 justify-between md:justify-start">
              {[
                { key: "executive", label: "Executive Ops" },
                { key: "customer", label: "Customer Risk" },
                { key: "marketing", label: "Marketing ROI" }
              ].map((db) => (
                <button
                  key={db.key}
                  onClick={() => handleDashboardSwitch(db.key as "executive" | "customer" | "marketing")}
                  className={`p-3 text-left border rounded-sm font-mono text-xs transition-all duration-200 flex-1 md:flex-none ${
                    activeDashboard === db.key
                      ? "bg-[#D8F24E] text-dark border-[#D8F24E] font-bold"
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
                >
                  {db.label}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#7C89E8]">
                  {dashboardMocks[activeDashboard].title}
                </h3>
                <div className="flex gap-2">
                  {dashboardMocks[activeDashboard].filters.map((flt) => (
                    <button
                      key={flt}
                      onClick={() => setSelectedFilter(flt)}
                      className={`px-3 py-1 font-mono text-[10px] rounded transition-all duration-200 ${
                        selectedFilter === flt
                          ? "bg-white text-dark font-bold"
                          : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeDashboard}-${selectedFilter}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {activeDashboard === "executive" && (() => {
                    const metrics = dashboardMocks.executive.metrics[selectedFilter as "All Regions"];
                    return (
                      <>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Gross Revenue</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            $<AnimatedCounter value={metrics.rev} />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Profit Margin</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.margin} suffix="%" />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">QoQ Growth</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            +<AnimatedCounter value={metrics.growth} suffix="%" />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Forecast Target</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            $<AnimatedCounter value={metrics.forecast} />
                          </span>
                        </div>
                      </>
                    );
                  })()}

                  {activeDashboard === "customer" && (() => {
                    const metrics = dashboardMocks.customer.metrics[selectedFilter as "All Tier"];
                    return (
                      <>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Retention Rate</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.retention} suffix="%" />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Churn Probability</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.churn} suffix="%" />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Average LTV</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            $<AnimatedCounter value={metrics.ltv} />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Avg Support Time</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.support_time} suffix="m" />
                          </span>
                        </div>
                      </>
                    );
                  })()}

                  {activeDashboard === "marketing" && (() => {
                    const metrics = dashboardMocks.marketing.metrics[selectedFilter as "All Campaigns"];
                    return (
                      <>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">ROI Multiplier</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.roi} suffix="x" />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Conv. Rate</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.conv} suffix="%" />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Avg CTR</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.ctr} suffix="%" />
                          </span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                          <span className="text-white/50 text-[10px] uppercase font-mono block">Total Clicks</span>
                          <span className="text-2xl font-bold font-mono text-lime">
                            <AnimatedCounter value={metrics.clicks} />
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>

              {/* Vector trend graphs */}
              <div className="bg-dark border border-white/15 rounded p-4 flex flex-col justify-between h-40">
                <span className="font-mono text-[9px] text-[#7C89E8] uppercase tracking-wide">Trend Vector Line</span>
                <div className="w-full flex-1 flex items-end justify-between relative mt-2 px-4">
                  <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <motion.path
                      d={activeDashboard === "executive" 
                        ? "M 0 45 Q 25 35, 50 20 T 100 10" 
                        : activeDashboard === "customer" 
                        ? "M 0 10 Q 25 15, 50 30 T 100 45" 
                        : "M 0 45 Q 25 10, 50 38 T 100 5"
                      }
                      fill="none"
                      stroke="#D8F24E"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  </svg>
                  <span className="font-mono text-[8px] text-white/30 absolute bottom-1 left-2">Q1</span>
                  <span className="font-mono text-[8px] text-white/30 absolute bottom-1 right-2">Q4</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 9. FEATURED CASE STUDIES ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Project Case Studies</span>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Customer Churn Analytics",
                problem: "Identify high-risk customer behavior blocks to reduce monthly subscription churn rates.",
                eda: "Identified high correlation between short tenure, manual billing contracts, and support tickets.",
                recommend: "Auto-apply auto-billing discounts to expiring self-serve tiers to boost retention by 14%."
              },
              {
                title: "Sales Performance Hub",
                problem: "Build executive oversight views detailing regional performance trends and forecasting targets.",
                eda: "Spotted regional lag in sales cycles during Q3 due to stock gaps.",
                recommend: "Optimize stock distribution models across logistics networks to recover Q4 sales goals."
              },
              {
                title: "Customer Segmentation",
                problem: "Perform RFM analysis to group customer bases and optimize marketing conversion loops.",
                eda: "Grouped customers into loyal high-value, slip-away VIPs, and low-value single orders.",
                recommend: "Target slip-away VIPs with customized loyalty promotions to reactivate 22% of revenue."
              }
            ].map((p, idx) => (
              <motion.div key={p.title} variants={fadeUp}>
                <PaperCard
                  variant="dark"
                  rotation={idx % 2 === 0 ? -1 : 1.2}
                  className="p-6 h-full flex flex-col justify-between border border-white/10 hover:border-white/20"
                >
                  <div className="space-y-4">
                    <h3 className="font-[family-name:var(--font-caveat)] text-3xl font-bold text-white leading-tight">{p.title}</h3>
                    <div className="space-y-2 font-mono text-[11px] leading-relaxed text-white/80">
                      <div>
                        <span className="text-[#D8F24E] block uppercase font-bold text-[9px]">Business Problem</span>
                        <p>{p.problem}</p>
                      </div>
                      <div>
                        <span className="text-[#7C89E8] block uppercase font-bold text-[9px] mt-2">Analysis (EDA)</span>
                        <p>{p.eda}</p>
                      </div>
                      <div>
                        <span className="text-lime block uppercase font-bold text-[9px] mt-2">Recommendations</span>
                        <p className="text-white font-semibold">{p.recommend}</p>
                      </div>
                    </div>
                  </div>
                </PaperCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 10. SKILLS MATRIX RADAR GRAPH ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Competency Balance</span>
            <h2 className="text-3xl md:text-4xl font-bold">Skills Balance Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-dark-card border border-white/10 rounded-md p-6">
            <div className="flex justify-center py-4">
              <svg className="w-64 h-64 overflow-visible" viewBox="-100 -100 200 200">
                <circle cx="0" cy="0" r="90" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const x2 = parseFloat((Math.cos(rad) * 90).toFixed(4));
                  const y2 = parseFloat((Math.sin(rad) * 90).toFixed(4));
                  return (
                    <line key={deg} x1="0" y1="0" x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                  );
                })}

                <motion.polygon
                  points="-35,-60.6 73.6,-42.5 80,0 37.5,65 -76.2,44 -41,0"
                  fill="rgba(216, 242, 78, 0.15)"
                  stroke="#D8F24E"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />

                {[-35,-60.6, 73.6,-42.5, 80,0, 37.5,65, -76.2,44, -41,0].map((coord, idx) => {
                  if (idx % 2 === 0) {
                    const x = coord;
                    const y = [-35,-60.6, 73.6,-42.5, 80,0, 37.5,65, -76.2,44, -41,0][idx+1];
                    return (
                      <circle key={idx} cx={x} cy={y} r="4" fill="#1E2FE0" stroke="#D8F24E" strokeWidth="2" />
                    );
                  }
                  return null;
                })}

                <text x="0" y="-95" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">BUSINESS</text>
                <text x="95" y="-50" textAnchor="start" fill="#FFFFFF" fontSize="8" fontFamily="monospace">ANALYTICS</text>
                <text x="95" y="5" textAnchor="start" fill="#FFFFFF" fontSize="8" fontFamily="monospace">VISUAL</text>
                <text x="45" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">STATS</text>
                <text x="-95" y="50" textAnchor="end" fill="#FFFFFF" fontSize="8" fontFamily="monospace">SQL</text>
                <text x="-95" y="-50" textAnchor="end" fill="#FFFFFF" fontSize="8" fontFamily="monospace">PYTHON</text>
              </svg>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-widest text-[#7C89E8]">
                Multidisciplinary Balance
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-mono">
                My multidisciplinary score tracks competencies aligned to resolve stakeholder data queries:
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div><span className="text-lime">✔ SQL:</span> CTE aggregation & modeling</div>
                <div><span className="text-lime">✔ Python:</span> EDA scripting & cleaning</div>
                <div><span className="text-lime">✔ Visuals:</span> Structured UX reports</div>
                <div><span className="text-lime">✔ Stats:</span> Hypothesis bounds testing</div>
                <div><span className="text-lime">✔ Business:</span> Metric to ROI alignment</div>
                <div><span className="text-lime">✔ Comm:</span> Clear stakeholder briefings</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 11. CLOSING CTA ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto space-y-8"
        >
          <BackToPortfolioButton href="/#projects" label="Back to Portfolio" />
        </motion.section>

      </main>
    </motion.div>
  );
}
