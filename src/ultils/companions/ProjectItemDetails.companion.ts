import type { ProjectItemDetails } from "@open-source-economy/api-types";
import { NumberUtils } from "../NumberUtils";

export interface ProjectStats {
  totalProjects: number;
  totalStars: string;
  totalForks: string;
}

export namespace ProjectItemDetailsCompanion {
  export function getDisplayName(project: ProjectItemDetails): string | null {
    if (project.repository) {
      return project.repository.fullName || `${project.owner?.id.login ?? ""}/${project.repository.id.name}`;
    }
    if (project.owner) {
      return project.owner.name || project.owner.id.login;
    }
    if (typeof project.projectItem.sourceIdentifier === "string") {
      try {
        const url = new URL(project.projectItem.sourceIdentifier);
        return url.hostname.replace("www.", "");
      } catch {
        return project.projectItem.sourceIdentifier;
      }
    }
    return null;
  }

  export function getDescription(project: ProjectItemDetails): string | null {
    return project.repository?.description ?? null;
  }

  export function getGithubUrl(project: ProjectItemDetails): string | null {
    if (project.repository?.htmlUrl) {
      return project.repository.htmlUrl;
    }
    if (project.owner?.htmlUrl) {
      return project.owner.htmlUrl;
    }
    if (typeof project.projectItem.sourceIdentifier === "string") {
      return project.projectItem.sourceIdentifier;
    }
    return null;
  }

  export function getProjectItemsStats(projects: ProjectItemDetails[], appendLabels?: boolean): ProjectStats {
    const totalStarsValue = projects.reduce((sum, item) => sum + (item.repository?.stargazersCount || 0), 0);
    const totalForksValue = projects.reduce((sum, item) => sum + (item.repository?.forksCount || 0), 0);

    const totalProjects = projects.length;

    const totalStars = appendLabels ? NumberUtils.pluralize(totalStarsValue, "star") : NumberUtils.formatCompactNumber(totalStarsValue);

    const totalForks = appendLabels ? NumberUtils.pluralize(totalForksValue, "fork") : NumberUtils.formatCompactNumber(totalForksValue);

    return {
      totalProjects,
      totalStars,
      totalForks,
    };
  }
}
