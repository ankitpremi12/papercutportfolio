import type { Metadata } from "next";
import WhyDataAnalystClient from "./WhyDataAnalystClient";

export const metadata: Metadata = {
  title: "Why Ankit is a Data Analyst — Philosophy & Mindset",
  description: "Ankit Premi's core data philosophy, solving business problems first before opening dashboards, exploratory data steps, and timeline.",
};

export default function WhyDataAnalystPage() {
  return <WhyDataAnalystClient />;
}
