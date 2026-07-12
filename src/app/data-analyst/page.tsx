import type { Metadata } from "next";
import DataAnalystClient from "./DataAnalystClient";

export const metadata: Metadata = {
  title: "Data Analyst — Ankit's Interactive Case Study",
  description: "Explore Ankit Premi's interactive data analyst case study. Run simulated queries, interact with executive operations dashboard gallery models, and explore data toolkit balances.",
};

export default function DataAnalystPage() {
  return <DataAnalystClient />;
}
