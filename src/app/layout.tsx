import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ankit Premi — AI/ML Engineer & Data Analyst",
  description:
    "Portfolio of Ankit Premi (a4kit) — building AI/ML systems that solve real problems. RAG pipelines, churn prediction, NLP, and more.",
  keywords: [
    "Ankit Premi",
    "AI Engineer",
    "ML Engineer",
    "Data Analyst",
    "Portfolio",
    "Python",
    "Machine Learning",
    "NLP",
    "RAG",
  ],
  authors: [{ name: "Ankit Premi" }],
  openGraph: {
    title: "Ankit Premi — AI/ML Engineer & Data Analyst",
    description:
      "building AI/ML systems that solve real problems. RAG pipelines, churn prediction, NLP, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
