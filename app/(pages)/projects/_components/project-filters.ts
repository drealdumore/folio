export type ProjectFilterKey =
  | "all"
  | "mobile"
  | "web"
  | "client"
  | "tools";

export type FilterableProject = {
  projectName: string | undefined | null;
  projectLink: string;
  projectDescription: string | undefined | null;
  projectType: string | undefined | null;
  technologies?: string[];
};

export const PROJECT_FILTERS: { key: ProjectFilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile" },
  { key: "web", label: "Web" },
  { key: "client", label: "Client" },
  { key: "tools", label: "Tools" },
];

export const classifyProject = (
  p: FilterableProject
): Exclude<ProjectFilterKey, "all"> => {
  const type = (p.projectType ?? "").toLowerCase();
  const desc = (p.projectDescription ?? "").toLowerCase();
  const techs = (p.technologies ?? []).join(" ").toLowerCase();

  if (/mobile/i.test(type)) return "mobile";
  if (/\bclient\b/i.test(type)) return "client";
  if (
    /tool|utility|cli|api|backend|rest|security|game/i.test(
      `${type} ${techs} ${desc}`
    )
  )
    return "tools";
  return "web";
};

export const filterProjects = <T extends FilterableProject>(
  projects: T[],
  filter: ProjectFilterKey
): T[] =>
  filter === "all"
    ? projects
    : projects.filter((p) => classifyProject(p) === filter);