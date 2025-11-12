import type * as dto from "@open-source-economy/api-types";

interface ProjectDisclaimerRule {
  matches: (project: dto.ProjectItemDetails) => boolean;
  message: (projectName: string) => string;
}

const PROJECT_DISCLAIMER_RULES: ProjectDisclaimerRule[] = [
  {
    matches: project => isApacheProject(project),
    message: projectName =>
      `This collective is not officially affiliated with the ${projectName} project (or the Apache Software Foundation) but aims to support development and testing work related to that project. ${projectName} will continue to be Free and Open Source Software.`,
  },
];

export function getProjectDisclaimer(project: dto.ProjectItemDetails | null, projectName: string): string | null {
  if (!project) {
    return null;
  }

  for (const rule of PROJECT_DISCLAIMER_RULES) {
    if (rule.matches(project)) {
      return rule.message(projectName);
    }
  }

  return null;
}

function isApacheProject(project: dto.ProjectItemDetails): boolean {
  return project.owner?.id.login === "apache";
}
