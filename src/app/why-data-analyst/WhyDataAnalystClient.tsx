"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/sections/Header";
import PaperCard from "@/components/PaperCard";
import HandDrawnArrow from "@/components/HandDrawnArrow";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";

// Shared components
import PullQuote from "@/components/shared/PullQuote";
import BackToPortfolioButton from "@/components/shared/BackToPortfolioButton";

// Entry transitions
const slideUpPage = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const curiosityQuestions = [
  {
    question: "Which single metric actually correlates with long-term retention?",
    payoff: "This inspired ChurnSense, proving that active session frequency, rather than contract value, is the primary predictor of customer churn.",
    linkText: "View ChurnSense Case Study ➔",
    linkHref: "/best-work/churnsense",
  },
  {
    question: "How can we spot phishing domains before they are blacklisted?",
    payoff: "Led to building our SLD Threat Classifier, utilizing custom lexical feature engineering to identify typosquatting in real time.",
    linkText: "View Classifier Case Study ➔",
    linkHref: "/best-work/sld-threat-classifier",
  },
  {
    question: "Are users engaging with a feature because they love it or because they are lost?",
    payoff: "A tracking analysis showed that high-interaction clicks on a new portal were actually due to a confusing navigation loop, leading to a redesigned menu.",
  },
];

export default function WhyDataAnalystClient() {
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

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 space-y-28 md:space-y-36">
        
        {/* ── BACK BUTTON ── */}
        <motion.div variants={fadeUp}>
          <Link
            href="/#about"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-caveat)] text-xl text-blue-muted hover:text-white transition-colors"
          >
            <HandDrawnArrow direction="left" color="#7C89E8" size={30} />
            back to portfolio
          </Link>
        </motion.div>

        {/* ── 1. HERO SECTION ── */}
        <motion.section 
          variants={staggerChildren}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="relative">
            <h1 className="font-[family-name:var(--font-caveat)] text-6xl md:text-8xl font-bold text-white leading-none">
              Why Data <br className="md:hidden" />
              <span className="text-lime relative inline-block">
                Analytics?
                <HandDrawnUnderline width={220} color="#D8F24E" className="absolute -bottom-4 left-0" strokeWidth={4} />
              </span>
            </h1>
          </motion.div>

          {/* Recruiters' fast exit */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
            <Link href="/data-analyst">
              <button className="bg-lime hover:bg-lime-dark text-dark px-6 py-2.5 rounded-sm font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-lg active:scale-95 transform">
                Skip to Best Work ➔
              </button>
            </Link>
            <Link href="/resume">
              <button className="border border-white/20 hover:border-white hover:bg-white/10 text-white px-6 py-2.5 rounded-sm font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 transform">
                Jump to CV / Resume ➔
              </button>
            </Link>
          </motion.div>
        </motion.section>

        {/* ── 2. THE TURNING POINT ── */}
        <motion.section
          variants={staggerChildren}
          className="space-y-8 max-w-3xl"
        >
          <motion.p variants={fadeUp} className="font-mono text-sm text-lime uppercase tracking-widest">
            The Turning Point
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold leading-tight text-[#7C89E8]">
            The Day the Model Met the Meeting Room
          </motion.h2>
          <motion.div variants={fadeUp} className="space-y-6 text-white/80 text-lg leading-relaxed font-sans">
            <p>
              Not long ago, while analyzing user patterns to model retention—similar to my data analysis work for **VOIS (Vodafone Intelligent Solutions)**—I was deep in code optimization loops, tweaking validation accuracy. I had built a prediction model targeting customer risk profiles that had a validation score of over 90%. I felt proud of the math.
            </p>
            <p>
              The next morning, I presented the output to the operations lead. I clicked through slides showing ROC curves and confusion matrices. I waited for approval.
            </p>
            <p className="font-semibold text-lime">
              The manager paused and asked: &ldquo;This lists several accounts as high risk. But why are they leaving? Is it the pricing, system downtime, or did their customer support tickets expire? How do we stop it?&rdquo;
            </p>
            <p>
              I didn&apos;t have the answers. The mathematical model knew *who*, but it didn&apos;t understand *why*. That was the moment I realized that building code is only half the battle. The real challenge is translating variables into real, actionable decisions. I stepped out of the code sandbox and started asking questions first.
            </p>
            <p>
              I immediately went back, merged the model&apos;s risk scores with customer support logs and billing history, and discovered that accounts waiting over 48 hours for ticket resolution were three times more likely to leave. Presenting that single operational correlation allowed the team to restructure their support queues and successfully retain key accounts.
            </p>
          </motion.div>
        </motion.section>

        {/* ── 3. THE WAY I THINK ── */}
        <motion.section
          variants={staggerChildren}
          className="space-y-8 max-w-3xl"
        >
          <motion.p variants={fadeUp} className="font-mono text-sm text-lime uppercase tracking-widest">
            The Way I Think
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold leading-tight text-[#7C89E8]">
            The Instinct to Look Closer
          </motion.h2>
          <motion.div variants={fadeUp} className="space-y-6 text-white/80 text-lg leading-relaxed font-sans">
            <p>
              I have an inherent skepticism toward aggregates. When an operations team tells me, &ldquo;Average transaction values rose by 8% this month,&rdquo; my immediate instinct isn&apos;t to celebrate. It is to wonder if a single corporate customer skewed the median, or if lower-tier volumes are quietly collapsing.
            </p>
            <p>
              I look at data like a detective story where the most obvious clue is often a distraction. Finding the truth requires joining rows that were never meant to be joined, verifying data definitions, and questioning outlier records before accepting them.
            </p>
          </motion.div>
        </motion.section>

        {/* ── 4. BEYOND DASHBOARDS ── */}
        <motion.section variants={fadeUp}>
          <PullQuote 
            text="Dashboards don&apos;t create value. Decisions do." 
            subquotes={[
              "A standard dashboard tells you what happened.",
              "A thorough analysis explains why it happened.",
              "An exceptional analyst recommends what to do next."
            ]}
          />
        </motion.section>

        {/* ── 5. THE QUESTIONS I LOVE SOLVING ── */}
        <motion.section
          variants={staggerChildren}
          className="space-y-8 overflow-hidden"
        >
          <div className="space-y-1">
            <span className="font-mono text-sm text-lime uppercase tracking-widest block">Inquiries</span>
            <h2 className="text-2xl md:text-3xl font-bold">Personal Curiosities</h2>
            <p className="text-white/60 text-sm">A list of questions that capture my attention on any dataset and where they led:</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {curiosityQuestions.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-80 md:w-96 snap-center">
                <PaperCard
                  variant="cream"
                  rotation={idx % 2 === 0 ? 0.8 : -0.8}
                  className="p-6 h-64 flex flex-col justify-between shadow-lg border border-dark/5 text-dark"
                >
                  <div>
                    <p className="font-[family-name:var(--font-caveat)] text-lg md:text-xl font-bold leading-snug mb-3">
                      &ldquo;{item.question}&rdquo;
                    </p>
                    <p className="text-xs md:text-sm text-dark/70 leading-relaxed font-sans">
                      {item.payoff}
                    </p>
                  </div>
                  {item.linkHref ? (
                    <Link
                      href={item.linkHref}
                      className="text-xs font-bold text-blue-primary hover:underline mt-2 inline-flex items-center gap-1 font-mono uppercase"
                    >
                      {item.linkText}
                    </Link>
                  ) : (
                    <span className="text-[10px] text-dark/45 font-mono uppercase tracking-wider mt-2 block">
                      Internal Finding
                    </span>
                  )}
                </PaperCard>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 6. CLOSING CTA ── */}
        <motion.section
          variants={staggerChildren}
          className="text-center max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-caveat)] text-5xl md:text-6xl font-bold text-white">
            See How This Thinking <br />
            <span className="text-lime">Becomes Real Work</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/80 leading-relaxed text-lg font-mono">
            Mindset is only valuable when paired with technical proof. Explore the case studies, query playgrounds, and interactive metrics that validate my workflow.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/data-analyst">
              <button className="bg-lime hover:bg-lime-dark text-dark px-8 py-3 rounded-sm font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-xl active:scale-95 transform">
                View Interactive Case Study ➔
              </button>
            </Link>
            <BackToPortfolioButton href="/#about" label="Back to Portfolio" />
          </motion.div>
        </motion.section>

      </main>
    </motion.div>
  );
}
