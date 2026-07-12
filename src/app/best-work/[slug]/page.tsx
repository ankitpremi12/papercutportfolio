/* ─────────────────────────────────────────────
 * Case study detail page — dynamic route
 * params is a Promise in this Next.js version
 * ───────────────────────────────────────────── */
import { notFound } from "next/navigation";
import { bestWork } from "@/lib/content";
import CaseStudyPageComponent from "@/components/CaseStudyPage";

// Static params for build-time generation
export async function generateStaticParams() {
  return bestWork.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata per page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = bestWork.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — Ankit Premi`,
    description: project.subtitle,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = bestWork.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyPageComponent data={project} />;
}
