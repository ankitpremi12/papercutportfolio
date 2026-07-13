import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Ankit Premi — Resume / CV",
  description: "Professional resume of Ankit Premi — AI/ML Engineer & Data Analyst. Experience in GenAI, RAG, and ML systems.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
