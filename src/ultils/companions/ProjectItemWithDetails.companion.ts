import { DeveloperProfile, DeveloperProjectItem, Owner, ProjectItemId, ProjectItemType, ProjectItemWithDetails } from "@open-source-economy/api-types";
import { NumberUtils } from "../NumberUtils";

export interface ProjectStats {
  totalProjects: number;
  totalStars: string;
  totalForks: string;
  totalMaintainers: number;
}

export interface ProjectItemWithDetailsCardView {
  projectId: ProjectItemId;
  projectItemType?: ProjectItemType;
  displayName: string;
  projectDescription: string;
  githubUrl: string;
  stars: string | null;
  forks: string | null;
  followers: string | null;
  mainLanguage: string | undefined;
  category: string | null;
  maintainersCount: number;
  visibleDevelopers: Array<{
    developerProfile: DeveloperProfile;
    developerProjectItem: DeveloperProjectItem;
    developerOwner: Owner;
  }>;
  remainingMaintainersCount: number;
}

export namespace ProjectItemWithDetailsCompanion {
  // Simple helper for getting project ID (used in multiple places)
  export function getProjectId(item: ProjectItemWithDetails): ProjectItemId {
    return item.projectItem.id;
  }

  /**
   * Helper to get display name (owner's full name for owners, otherwise project name)
   */
  function getDisplayName(item: ProjectItemWithDetails): string {
    if (item.repository) {
      return item.repository.fullName || `${item.owner?.id.login ?? ""}/${item.repository.id.name}`;
    } else if (item.owner) {
      return item.owner.name || item.owner.id.login;
    } else if (typeof item.projectItem.sourceIdentifier === "string") {
      try {
        const url = new URL(item.projectItem.sourceIdentifier);
        return url.hostname.replace("www.", "");
      } catch {
        return item.projectItem.sourceIdentifier;
      }
    } else {
      return "Unknown Project";
    }
  }

  /**
   * Helper to get GitHub URL or project URL
   */
  function getGithubUrl(item: ProjectItemWithDetails, isUrlProject: boolean): string {
    if (item.repository?.htmlUrl) {
      return item.repository.htmlUrl;
    }
    if (item.owner?.htmlUrl) {
      return item.owner.htmlUrl;
    }
    // For URL-type projects, use the sourceIdentifier if it's a string
    if (isUrlProject && typeof item.projectItem.sourceIdentifier === "string") {
      return item.projectItem.sourceIdentifier;
    }
    return "";
  }

  /**
   * Creates a view model for displaying a project item in a card.
   * This centralizes all the display logic and calculations.
   */
  export function toCardView(item: ProjectItemWithDetails, visibleDevelopersCount: number = 3): ProjectItemWithDetailsCardView {
    const isOwnerProject = item.projectItem.projectItemType === ProjectItemType.GITHUB_OWNER;
    const isUrlProject = item.projectItem.projectItemType === ProjectItemType.URL;

    const displayName = getDisplayName(item);
    const githubUrl = getGithubUrl(item, isUrlProject);

    return {
      projectId: getProjectId(item),
      projectItemType: item.projectItem.projectItemType,
      displayName,
      projectDescription: item.repository?.description || "",
      githubUrl,
      stars: isOwnerProject ? null : NumberUtils.formatCompactNumber(item.repository?.stargazersCount || 0),
      forks: isOwnerProject ? null : NumberUtils.formatCompactNumber(item.repository?.forksCount || 0),
      followers: isOwnerProject ? NumberUtils.formatCompactNumber(item.owner?.followers || 0) : null,
      mainLanguage: item.repository?.language,
      category: null, // Category should be passed from parent component or calculated separately
      maintainersCount: item.developers.length,
      visibleDevelopers: item.developers.slice(0, visibleDevelopersCount),
      remainingMaintainersCount: Math.max(0, item.developers.length - visibleDevelopersCount),
    };
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

    // Calculate unique maintainers by developer profile ID
    const uniqueDeveloperIds = new Set<string>();
    projectItems.forEach(item => {
      item.developers.forEach(dev => {
        uniqueDeveloperIds.add(dev.developerProfile.id.uuid);
      });
    });

    return {
      totalProjects: projectItems.length,
      totalStars: NumberUtils.formatCompactNumber(totalStars),
      totalForks: NumberUtils.formatCompactNumber(totalForks),
      totalMaintainers: uniqueDeveloperIds.size,
    };
  }
}
