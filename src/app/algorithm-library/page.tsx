import type { Metadata } from "next";
import AlgorithmLibraryClient from "./AlgorithmLibraryClient";

export const metadata: Metadata = {
  title: "Algorithm Library — Statistical & ML Methods for Business Analysis",
  description: "Explore Ankit Premi's interactive statistical and ML algorithm library. Spot best use cases, real business scenarios, and output results of regression, clustering, and testing models.",
};

export default function AlgorithmLibraryPage() {
  return <AlgorithmLibraryClient />;
}
