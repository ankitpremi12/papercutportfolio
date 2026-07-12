/* ─────────────────────────────────────────────
 * Homepage — assembles all sections
 * ───────────────────────────────────────────── */
"use client";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TableOfContents from "@/components/sections/TableOfContents";
import AboutMe from "@/components/sections/AboutMe";
import ProjectsInternships from "@/components/sections/ProjectsInternships";
import Certifications from "@/components/sections/Certifications";
import BeyondModels from "@/components/sections/BeyondModels";
import BestWork from "@/components/sections/BestWork";
import InsomniacWork from "@/components/sections/InsomniacWork";
import CVCloud from "@/components/sections/CVCloud";
import Contact from "@/components/sections/Contact";
import ScrollTracedPath from "@/components/ScrollTracedPath";

export default function Home() {
  return (
    <div className="relative">
      {/* Global scroll-traced route line */}
      <div className="hidden md:block">
        <ScrollTracedPath
          milestones={[
            { at: 0.15, label: "About" },
            { at: 0.30, label: "Experience" },
            { at: 0.45, label: "Certifications" },
            { at: 0.60, label: "Beyond Models" },
            { at: 0.75, label: "Best Work" },
            { at: 0.85, label: "Insomniac" },
            { at: 0.95, label: "Contact" },
          ]}
        />
      </div>

      {/* Sticky header */}
      <Header />

      {/* Page sections */}
      <main>
        <Hero />
        <TableOfContents />
        <AboutMe />
        <ProjectsInternships />
        <Certifications />
        <BeyondModels />
        <BestWork />
        <InsomniacWork />
        <CVCloud />
        <Contact />
      </main>
    </div>
  );
}
