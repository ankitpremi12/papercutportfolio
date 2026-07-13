"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/sections/Header";
import HandDrawnArrow from "@/components/HandDrawnArrow";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

// Extracted resume data
const contactInfo = {
  name: "Ankit Premi",
  email: "ankitpremiji@gmail.com",
  linkedin: "linkedin.com/in/ankit-premi",
  linkedinUrl: "https://linkedin.com/in/ankit-premi",
  leetcode: "leetcode.com/u/ankitpremiji/",
  leetcodeUrl: "https://leetcode.com/u/ankitpremiji/",
};

const professionalSummary = {
  official:
    "AI/ML Engineer with practical experience building RAG systems, phishing detection models, and GenAI-based analytics tools. Completed internships at VOIS (Vodafone Intelligent Solutions) and C-DOT, contributing to LLM-powered reporting and URL classification projects. Proficient in Python, LangChain, Scikit-learn, and AWS. Strong interest in scalable AI systems, MLOps, and applied NLP.",
  story:
    "Not long ago, while building customer retention pipelines at VOIS, I realized the math only matters if it changes decisions in the meeting room. Today, I don't just build prediction models—I translate lexical features, RAG configurations, and database query latencies into real-world business value. My goal is to build intelligent systems that bridge code, data, and human operations.",
};

const experiences = [
  {
    role: "AI Associate",
    company: "Rancho Labs, IIT Delhi Startup",
    duration: "Apr 2026 – Present",
    bullets: [
      "Contributing to AI product development including LLM workflow design and backend API integrations",
      "Assisting with prompt engineering, output evaluation, and iterative testing of GenAI features",
      "Supporting internal tooling and automation tasks using Python and REST APIs",
    ],
    techStack: "Python, LangChain, REST APIs, GenAI",
  },
  {
    role: "Data Analyst Intern",
    company: "VOIS (Vodafone Intelligent Solutions)",
    duration: "Sep 2025 – Oct 2025",
    locationType: "Remote",
    bullets: [
      "Built an internal reporting assistant using RAG and LLMs to reduce manual data summarization effort",
      "Designed API-based workflows to generate AI-powered insights from structured enterprise datasets",
      "Integrated Slack-based report delivery to streamline stakeholder access to analytics outputs",
      "Set up deployment pipelines using AWS Lambda and S3 for lightweight inference and storage",
      "Improved retrieval quality through prompt tuning and document chunking strategies",
    ],
    techStack: "Python, LangChain, RAG, REST APIs, AWS (Lambda, S3), OpenAI APIs",
  },
  {
    role: "Research and Development Intern",
    company: "Centre for Development of Telematics (C-DOT)",
    duration: "Jul 2025 – Aug 2025",
    locationType: "New Delhi",
    bullets: [
      "Developed a phishing URL detection system using supervised machine learning techniques",
      "Engineered features from URL structure, domain metadata, and lexical patterns for model input",
      "Trained and evaluated ensemble models (Random Forest, XGBoost) with cross-validated pipelines",
      "Built modular preprocessing and evaluation pipelines for reproducible experimentation",
      "Benchmarked models on a large URL dataset and documented performance trade-offs",
    ],
    techStack: "Python, Scikit-learn, XGBoost, Feature Engineering, Pandas, Jupyter",
  },
];

const projects = [
  {
    title: "InsightFlow AI",
    tech: "LangChain, RAG, Vector Databases, AWS",
    duration: "Jan 2026 – Feb 2026",
    bullets: [
      "Built an AI-powered Q&A assistant retrieving answers from structured tables and unstructured documents",
      "Implemented RAG pipelines with FAISS-based vector search and context-aware prompt construction",
      "Added tool-calling support enabling SQL queries and automated data summary generation",
      "Explored AWS SageMaker for inference endpoint hosting and tested latency under moderate load",
    ],
  },
  {
    title: "ChurnSense",
    tech: "XGBoost, FastAPI, Docker",
    duration: "Aug 2025 – Nov 2025",
    bullets: [
      "Built a customer churn prediction model on behavioral and subscription-based features using XGBoost",
      "Developed REST API endpoints via FastAPI for real-time and batch prediction serving",
      "Added a lightweight explainability layer generating plain-language feature contribution summaries",
      "Containerized the application with Docker for reproducible local and cloud deployment",
    ],
  },
  {
    title: "SpreadSim",
    tech: "Graph Algorithms, Python, NumPy",
    duration: "Mar 2025 – Jun 2025",
    bullets: [
      "Simulated disease propagation across synthetic population networks using BFS, DFS, and Dijkstra",
      "Optimized runtime using NumPy vectorization and visualized spread dynamics with matplotlib",
    ],
  },
];

const education = {
  degree: "Bachelor of Technology in Artificial Intelligence and Data Science",
  duration: "2022 – 2026",
  school: "Maharaja Agrasen Institute of Technology, Delhi",
  coursework: "Machine Learning, Deep Learning, NLP, Data Structures and Algorithms, Computer Vision, MLOps, Cloud Computing",
};

const skills = [
  { category: "GenAI and LLMs", items: "LangChain, OpenAI APIs, Hugging Face, RAG, Prompt Engineering, FAISS, Pinecone" },
  { category: "ML and DL", items: "Scikit-learn, XGBoost, TensorFlow, PyTorch, Feature Engineering, Model Evaluation" },
  { category: "MLOps and Cloud", items: "AWS (Lambda, S3, SageMaker), Docker, MLflow, Git" },
  { category: "Backend and APIs", items: "FastAPI, REST APIs, Python, C++, SQL, JavaScript" },
  { category: "Data and Viz", items: "Pandas, NumPy, Plotly, Power BI, Tableau, MySQL, PostgreSQL, MongoDB" },
];

const certifications = [
  { title: "GenAI Essentials", issuer: "Microsoft", color: "#F25022" },
  { title: "Vertex AI Gemini", issuer: "Google Cloud", color: "#4285F4" },
  { title: "Machine Learning Specialization", issuer: "DeepLearning.AI", color: "#1E2FE0" },
  { title: "BigQuery Analytics", issuer: "Google", color: "#34A853" },
  { title: "Python", issuer: "Google", color: "#EA4335" },
  { title: "Statistics for Data Science", issuer: "Stanford", color: "#8C1515" },
];

const strengths = [
  "End-to-End ML Projects",
  "RAG and GenAI System Design",
  "API-First Deployment",
  "Clean Python Code",
  "Strong DSA Foundation (LeetCode: 100+ Solved)",
];

export default function ResumeClient() {
  const [hoveredSummary, setHoveredSummary] = useState(false);
  const [certCount, setCertCount] = useState(0);
  const [certAnimStarted, setCertAnimStarted] = useState(false);
  const certSectionRef = useRef<HTMLDivElement>(null);
  const isCertInView = useInView(certSectionRef, { once: true, amount: 0.3 });

  // Handle count-up animation for certifications
  useEffect(() => {
    if ((isCertInView || certAnimStarted) && certCount < certifications.length) {
      setCertAnimStarted(true);
      const timer = setInterval(() => {
        setCertCount((prev) => {
          if (prev >= certifications.length - 1) {
            clearInterval(timer);
          }
          return prev + 1;
        });
      }, 150);
      return () => clearInterval(timer);
    }
  }, [isCertInView, certAnimStarted, certCount]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-blue-primary text-white font-[family-name:var(--font-inter)] selection:bg-lime/30 relative overflow-hidden">
      {/* Background decorations - Hidden on print */}
      <div className="corner-bracket corner-bracket-tl print:hidden" />
      <div className="corner-bracket corner-bracket-tr print:hidden" />
      <div className="corner-bracket corner-bracket-bl print:hidden" />
      <div className="corner-bracket corner-bracket-br print:hidden" />

      {/* Sticky Header - Hidden on print */}
      <div className="print:hidden">
        <Header />
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 space-y-8 print:p-0 print:pt-0 print:pb-0">
        
        {/* ── TOP UTILITIES ── */}
        <div className="flex items-center justify-between print:hidden">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/why-data-analyst"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-caveat)] text-xl text-blue-muted hover:text-white transition-colors"
            >
              <HandDrawnArrow direction="left" color="#7C89E8" size={30} />
              back to essay
            </Link>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handlePrint}
            className="bg-lime hover:bg-lime-dark text-dark px-6 py-2.5 rounded-sm font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-lg active:scale-95 transform flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Download PDF / Print
          </motion.button>
        </div>

        {/* ── PHYSICAL RESUME SHEET ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-cream text-dark p-8 md:p-12 shadow-paper border border-dark/5 rounded-sm relative print:p-0 print:shadow-none print:border-none print:bg-white print:text-black print:rounded-none"
        >
          {/* Decorative Tape Strip - Hidden on print */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 tape-strip print:hidden" />

          {/* Print Styles Override */}
          <style jsx global>{`
            @media print {
              html, body {
                background: white !important;
                color: black !important;
                font-size: 11px !important;
                line-height: 1.4 !important;
              }
              main {
                padding: 0 !important;
                margin: 0 !important;
                max-width: 100% !important;
              }
              /* Hide all web decorations */
              .print\\:hidden {
                display: none !important;
              }
              /* Full bleed resume container */
              .shadow-paper {
                box-shadow: none !important;
                border: none !important;
                background: white !important;
                color: black !important;
                padding: 0 !important;
                margin: 0 !important;
              }
              /* Render standard font sizes and details */
              .print-no-zoom {
                transform: none !important;
              }
              /* Force page breaks and spacing */
              h2, h3 {
                page-break-after: avoid;
              }
              li {
                page-break-inside: avoid;
              }
            }
          `}</style>

          {/* ── HEADER ── */}
          <header className="border-b border-dark/10 pb-6 mb-8 text-center print:mb-4 print:pb-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-dark uppercase mb-2 print:text-3xl print:mb-1">
              {contactInfo.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm md:text-base text-dark/70 font-mono print:text-xs">
              <a href={`mailto:${contactInfo.email}`} className="hover:underline hover:text-blue-primary print:text-black">
                {contactInfo.email}
              </a>
              <span>•</span>
              <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-primary print:text-black">
                {contactInfo.linkedin}
              </a>
              <span>•</span>
              <a href={contactInfo.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-primary print:text-black">
                {contactInfo.leetcode}
              </a>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 print:gap-4">
            
            {/* ── PROFESSIONAL SUMMARY (Swappable/Storytelling on Hover) ── */}
            <section className="space-y-3 print:space-y-1.5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-primary font-bold border-b border-dark/5 pb-1">
                Professional Summary
              </h2>
              <div
                className="relative cursor-pointer focus-within:ring-2 focus-within:ring-blue-primary/30 focus-within:outline-none rounded-sm p-1.5 -m-1.5 transition-all print:p-0 print:m-0 print:cursor-default"
                onMouseEnter={() => setHoveredSummary(true)}
                onMouseLeave={() => setHoveredSummary(false)}
                onFocus={() => setHoveredSummary(true)}
                onBlur={() => setHoveredSummary(false)}
                tabIndex={0}
                aria-label="Hover to read the story behind this summary"
              >
                {/* Official Print version: Always visible in print, fades out on hover on screen */}
                <div
                  className={`transition-all duration-300 ${
                    hoveredSummary ? "opacity-0 scale-[0.99] translate-y-[-2px] h-0 overflow-hidden md:h-auto md:relative" : "opacity-100 scale-100"
                  } print:opacity-100 print:scale-100 print:relative`}
                >
                  <p className="font-sans text-dark/80 text-sm md:text-[15px] leading-relaxed text-justify">
                    {professionalSummary.official}
                  </p>
                </div>

                {/* Hand-written story version: visible on screen hover, completely hidden on print */}
                <div
                  className={`transition-all duration-300 print:hidden ${
                    hoveredSummary ? "opacity-100 scale-100 relative" : "opacity-0 scale-[0.98] translate-y-[2px] absolute inset-0 pointer-events-none overflow-hidden"
                  }`}
                >
                  <p className="font-[family-name:var(--font-caveat)] text-dark text-lg md:text-xl font-bold leading-snug">
                    {professionalSummary.story}
                  </p>
                </div>
              </div>
            </section>

            {/* ── TECHNICAL SKILLS (Zoomable on Hover) ── */}
            <section
              className="space-y-3 resume-section-zoom print-no-zoom focus-within:scale-[1.05] focus-within:z-10 focus-within:bg-[#f6f3eb] rounded-sm p-3 -m-3 transition-all duration-300 ease-out border border-transparent focus-within:border-dark/5 focus-within:shadow-md hover:scale-[1.05] hover:z-10 hover:bg-[#f6f3eb] hover:border-dark/5 hover:shadow-md print:p-0 print:m-0 print:hover:scale-100 print:hover:shadow-none print:hover:bg-transparent print:hover:border-transparent outline-none"
              tabIndex={0}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-primary font-bold border-b border-dark/5 pb-1">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 gap-2 text-sm print:text-xs">
                {skills.map((skill) => (
                  <div key={skill.category} className="grid grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    <span className="font-bold text-dark/95 sm:col-span-1">{skill.category}</span>
                    <span className="text-dark/75 sm:col-span-3">{skill.items}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── EXPERIENCE (Zoomable on Hover) ── */}
            <section
              className="space-y-4 resume-section-zoom print-no-zoom focus-within:scale-[1.05] focus-within:z-10 focus-within:bg-[#f6f3eb] rounded-sm p-3 -m-3 transition-all duration-300 ease-out border border-transparent focus-within:border-dark/5 focus-within:shadow-md hover:scale-[1.05] hover:z-10 hover:bg-[#f6f3eb] hover:border-dark/5 hover:shadow-md print:p-0 print:m-0 print:hover:scale-100 print:hover:shadow-none print:hover:bg-transparent print:hover:border-transparent outline-none"
              tabIndex={0}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-primary font-bold border-b border-dark/5 pb-1">
                Experience
              </h2>
              <div className="space-y-4 print:space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.company + exp.role} className="space-y-1.5 print:space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="font-bold text-base text-dark/95 print:text-sm">
                        {exp.role} <span className="font-normal text-dark/60 text-sm print:text-xs">— {exp.company}</span>
                      </h3>
                      <span className="font-mono text-xs text-dark/60 whitespace-nowrap">
                        {exp.duration} {exp.locationType && `| ${exp.locationType}`}
                      </span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-dark/80 print:text-xs print:pl-3 print:space-y-0.5">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="text-xs text-dark/60 pt-0.5">
                      <span className="font-semibold text-blue-primary">Tech Stack:</span> {exp.techStack}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PROJECTS ── */}
            <section className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-primary font-bold border-b border-dark/5 pb-1">
                Projects
              </h2>
              <div className="space-y-4 print:space-y-3">
                {projects.map((proj) => (
                  <div key={proj.title} className="space-y-1.5 print:space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="font-bold text-base text-dark/95 print:text-sm">
                        {proj.title} <span className="font-normal text-dark/60 text-sm print:text-xs">— {proj.tech}</span>
                      </h3>
                      <span className="font-mono text-xs text-dark/60 whitespace-nowrap">
                        {proj.duration}
                      </span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-dark/80 print:text-xs print:pl-3 print:space-y-0.5">
                      {proj.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ── EDUCATION ── */}
            <section className="space-y-3 print:space-y-1.5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-primary font-bold border-b border-dark/5 pb-1">
                Education
              </h2>
              <div className="space-y-1.5 print:space-y-1 text-sm print:text-xs">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-bold text-dark/95">
                    {education.degree}
                  </h3>
                  <span className="font-mono text-xs text-dark/60">
                    {education.duration}
                  </span>
                </div>
                <div className="text-dark/75">
                  <span>{education.school}</span>
                </div>
                <p className="text-xs text-dark/60 pt-0.5">
                  <span className="font-semibold">Relevant Coursework:</span> {education.coursework}
                </p>
              </div>
            </section>

            {/* ── CERTIFICATIONS (Interactive Count-up & Reveal) ── */}
            <section
              ref={certSectionRef}
              className="space-y-4"
              onMouseEnter={() => setCertAnimStarted(true)}
            >
              <div className="flex justify-between items-center border-b border-dark/5 pb-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-blue-primary font-bold">
                  Certifications
                </h2>
                
                {/* Count-Up Animation Number */}
                <div className="flex items-center gap-1.5 text-blue-primary font-bold font-mono text-base print:hidden">
                  <span className="text-2xl font-[family-name:var(--font-caveat)] text-lime-dark bg-dark px-2.5 py-0.5 rounded-sm shadow-inner">
                    {certCount}
                  </span>
                  <span>/ {certifications.length}</span>
                </div>
              </div>

              {/* Certification Logos & Names list */}
              <div className="relative">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: certAnimStarted ? 1 : 0.1,
                    y: certAnimStarted ? 0 : 5,
                  }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1"
                >
                  {certifications.map((cert, index) => {
                    const isVisible = index < certCount || typeof window === "undefined" || !certAnimStarted;
                    return (
                      <motion.div
                        key={cert.title}
                        animate={{
                          opacity: isVisible ? 1 : 0.08,
                          scale: isVisible ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/40 border border-dark/5 p-3 rounded-sm flex items-start gap-2.5 shadow-sm print:bg-transparent print:border-none print:p-0 print:shadow-none print:opacity-100 print:scale-100"
                      >
                        {/* Custom Badge Logo SVG */}
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold text-white print:hidden"
                          style={{ backgroundColor: cert.color }}
                        >
                          {cert.issuer === "Google" || cert.issuer === "Google Cloud"
                            ? "G"
                            : cert.issuer === "Microsoft"
                            ? "MS"
                            : cert.issuer === "Stanford"
                            ? "S"
                            : "DL"}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-xs leading-snug text-dark/90">
                            {cert.title}
                          </h4>
                          <p className="text-[10px] text-dark/50 font-mono uppercase tracking-wider print:text-dark/70">
                            {cert.issuer}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </section>

            {/* ── STRENGTHS ── */}
            <section className="space-y-3 print:space-y-1.5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-primary font-bold border-b border-dark/5 pb-1">
                Key Strengths
              </h2>
              <div className="flex flex-wrap gap-2 pt-1 print:block print:space-y-0.5 print:pt-0">
                {strengths.map((str) => (
                  <span
                    key={str}
                    className="px-3 py-1 rounded-sm bg-blue-primary/10 border border-blue-primary/5 text-xs text-blue-primary font-semibold print:bg-transparent print:border-none print:p-0 print:text-dark print:font-normal print:before:content-['•_']"
                  >
                    {str}
                  </span>
                ))}
              </div>
            </section>

          </div>
        </motion.div>

        {/* ── BACK BUTTON BOTTOM ── */}
        <div className="flex justify-center pt-8 print:hidden">
          <BackToPortfolioButton href="/#cv-cloud" label="Back to Portfolio" />
        </div>

      </main>
    </div>
  );
}

// Simple Back to Portfolio Button mapping
function BackToPortfolioButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <button className="bg-[#141430] hover:bg-[#0b0b18] text-white px-8 py-3 rounded-sm font-bold text-sm tracking-wider uppercase transition-all duration-200 border border-white/10 active:scale-95 transform">
        {label}
      </button>
    </Link>
  );
}
