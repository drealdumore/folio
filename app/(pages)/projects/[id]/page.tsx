import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsDetailTemplate from "../_components/project-detail";
import { CASE_STUDY_LABELS, MOBILE_APPS } from "@/content/site";

type ProjectParams = { id: string };

export function generateStaticParams() {
  return MOBILE_APPS.map((project) => ({ id: project.id }));
}

export function generateMetadata({
  params,
}: {
  params: ProjectParams;
}): Metadata {
  const project = MOBILE_APPS.find((p) => p.id === params.id);

  if (!project) {
    return { title: CASE_STUDY_LABELS.notFound, robots: { index: false } };
  }

  const description = project.oneLiner ?? project.intro;

  return {
    title: project.sub,
    description,
    openGraph: {
      title: project.sub,
      description,
      type: "article",
      images: project.heroImage ? [{ url: project.heroImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.sub,
      description,
      images: project.heroImage ? [project.heroImage] : undefined,
    },
  };
}

const ProjectPage = ({ params }: { params: ProjectParams }) => {
  const project = MOBILE_APPS.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return <ProjectsDetailTemplate id={params.id} />;
};

export default ProjectPage;
