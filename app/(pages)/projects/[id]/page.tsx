"use client";

import { useParams } from "next/navigation";
import ProjectsDetailTemplate from "../_components/project-detail";

const ProjectPage = () => {
  const { id } = useParams();
  console.log("project id: ", id);

  if (!id || typeof id !== "string") {
    return <p>Invalid project</p>;
  }

  return <ProjectsDetailTemplate id={id} />;
};

export default ProjectPage;
