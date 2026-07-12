import type { Metadata } from "next";
import ChartLibraryClient from "./ChartLibraryClient";

export const metadata: Metadata = {
  title: "Chart Library — Choosing the Right Visualization",
  description: "A comprehensive reference guide for chart selection literacy. Learn when to use and avoid Bar, Area, Chord, Sankey, and other chart types.",
};

export default function ChartLibraryPage() {
  return <ChartLibraryClient />;
}
