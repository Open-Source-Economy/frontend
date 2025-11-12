import { DeveloperProfile, DeveloperProjectItem, Owner, ProjectItemId, ProjectItemType, ProjectItemWithDetails } from "@open-source-economy/api-types";
import { NumberUtils } from "../NumberUtils";
import { ProjectItemDetailsCompanion } from "./ProjectItemDetails.companion";

export interface ProjectStats {
  totalProjects: number;
  totalStars: string;
  totalForks: string;
  totalMaintainers: number;
}

export interface ProjectItemWithDetailsCardView {
  projectId: ProjectItemId;
  projectItemType?: ProjectItemType;
  displayName: string | null;
  projectDescription: string | null;
  githubUrl: string | null;
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
  /**
   * Creates a view model for displaying a project item in a card.
   * This centralizes all the display logic and calculations.
   */
  export function toCardView(item: ProjectItemWithDetails, visibleDevelopersCount: number = 3): ProjectItemWithDetailsCardView {
    const isOwnerProject = item.projectItem.projectItemType === ProjectItemType.GITHUB_OWNER;

    return {
      projectId: item.projectItem.id,
      projectItemType: item.projectItem.projectItemType,
      displayName: ProjectItemDetailsCompanion.getDisplayName(item),
      projectDescription: ProjectItemDetailsCompanion.getDescription(item),
      githubUrl: ProjectItemDetailsCompanion.getGithubUrl(item),
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
