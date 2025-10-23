import { ProjectItemWithDetails, ProjectItemType } from "@open-source-economy/api-types";
import { NumberUtils } from "../NumberUtils";

export interface ProjectStats {
  totalProjects: number;
  totalStars: string;
  totalForks: string;
  totalMaintainers: number;
}

export namespace ProjectItemWithDetailsCompanion {
  export function getProjectId(item: ProjectItemWithDetails): string {
    return item.projectItem.id.uuid;
  }

  export function getProjectName(item: ProjectItemWithDetails): string {
    if (item.repository?.id.name) {
      return item.repository.id.name;
    }
    if (item.owner?.id.login) {
      return item.owner.id.login;
    }
    // For URL-type projects, extract domain name from sourceIdentifier
    if (item.projectItem.projectItemType === ProjectItemType.URL && typeof item.projectItem.sourceIdentifier === "string") {
      try {
        const url = new URL(item.projectItem.sourceIdentifier);
        return url.hostname.replace("www.", "");
      } catch {
        return item.projectItem.sourceIdentifier;
      }
    }
    return "Unknown Project";
  }

  export function getProjectDescription(item: ProjectItemWithDetails): string {
    return item.repository?.description || "";
  }

  export function getGithubUrl(item: ProjectItemWithDetails): string {
    if (item.repository?.htmlUrl) {
      return item.repository.htmlUrl;
    }
    if (item.owner?.htmlUrl) {
      return item.owner.htmlUrl;
    }
    // For URL-type projects, use the sourceIdentifier if it's a string
    if (item.projectItem.projectItemType === ProjectItemType.URL && typeof item.projectItem.sourceIdentifier === "string") {
      return item.projectItem.sourceIdentifier;
    }
    return "";
  }

  export function getStars(item: ProjectItemWithDetails): string {
    const count = item.repository?.stargazersCount || 0;
    return NumberUtils.formatCompactNumber(count);
  }

  export function getForks(item: ProjectItemWithDetails): string {
    const count = item.repository?.forksCount || 0;
    return NumberUtils.formatCompactNumber(count);
  }

  export function getMainLanguage(item: ProjectItemWithDetails): string | undefined {
    return item.repository?.language;
  }

  export function isUrlProject(item: ProjectItemWithDetails): boolean {
    return item.projectItem.projectItemType === ProjectItemType.URL;
  }

  // Functions that operate on the entire database

  export function searchProjectItems(projectItems: ProjectItemWithDetails[], query: string): ProjectItemWithDetails[] {
    const lowerQuery = query.toLowerCase();
    return projectItems.filter(item => {
      const repoName = item.repository?.id.name.toLowerCase() || "";
      const ownerLogin = item.owner?.id.login.toLowerCase() || "";
      // Handle sourceIdentifier which can be OwnerId | RepositoryId | string
      const sourceIdentifier = typeof item.projectItem.sourceIdentifier === "string" ? item.projectItem.sourceIdentifier.toLowerCase() : "";
      return repoName.includes(lowerQuery) || ownerLogin.includes(lowerQuery) || sourceIdentifier.includes(lowerQuery);
    });
  }

  export function getProjectItemsStats(projectItems: ProjectItemWithDetails[]): ProjectStats {
    const totalStars = projectItems.reduce((sum, item) => {
      return sum + (item.repository?.stargazersCount || 0);
    }, 0);

    const totalForks = projectItems.reduce((sum, item) => {
      return sum + (item.repository?.forksCount || 0);
    }, 0);

    const totalMaintainers = projectItems.reduce((sum, item) => {
      return sum + item.developers.length;
    }, 0);

    return {
      totalProjects: projectItems.length,
      totalStars: NumberUtils.formatCompactNumber(totalStars),
      totalForks: NumberUtils.formatCompactNumber(totalForks),
      totalMaintainers,
    };
  }
}
