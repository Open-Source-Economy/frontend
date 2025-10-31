/**
 * Adapter functions to convert between API data structures and design system types
 */

import { DeveloperProjectItemEntry, DeveloperRoleType, MergeRightsType, ProjectItemType } from "@open-source-economy/api-types";
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion, SourceIdentifierCompanion } from "src/ultils/companions";

export interface ProjectDisplayData {
  id: string;
  projectType: "github_repo" | "github_org" | "other_url";
  url: string;
  role: string;
  mainBranchAccess: string;
  ecosystems?: string[];
  verified: boolean;
}

/**
 * Convert DeveloperProjectItemEntry to design system Project format
 */
export function convertToProjectDisplayData(entry: DeveloperProjectItemEntry): ProjectDisplayData {
  const projectItem = entry.projectItem;
  const developerProjectItem = entry.developerProjectItem;

  // Extract role and merge rights (take first one if array)
  const role = developerProjectItem.roles?.[0] || DeveloperRoleType.ACTIVE_CONTRIBUTOR;
  const mergeRights = developerProjectItem.mergeRights?.[0] || MergeRightsType.NONE;

  // Determine project type and URL
  let projectType: "github_repo" | "github_org" | "other_url" = "other_url";
  let url = "";

  if (projectItem.projectItemType === ProjectItemType.GITHUB_REPOSITORY) {
    projectType = "github_repo";
    // Extract URL from RepositoryId
    const sourceIdentifier = projectItem.sourceIdentifier;
    if (typeof sourceIdentifier === "object" && "name" in sourceIdentifier && "ownerId" in sourceIdentifier) {
      const ownerLogin =
        typeof sourceIdentifier.ownerId === "object" && "login" in sourceIdentifier.ownerId ? sourceIdentifier.ownerId.login : sourceIdentifier.ownerId;
      url = `https://github.com/${ownerLogin}/${sourceIdentifier.name}`;
    }
  } else if (projectItem.projectItemType === ProjectItemType.GITHUB_OWNER) {
    projectType = "github_org";
    // Extract URL from OwnerId
    const sourceIdentifier = projectItem.sourceIdentifier;
    if (typeof sourceIdentifier === "object" && "login" in sourceIdentifier) {
      url = `https://github.com/${sourceIdentifier.login}`;
    }
  } else if (projectItem.projectItemType === ProjectItemType.URL) {
    projectType = "other_url";
    // Use string URL directly
    if (typeof projectItem.sourceIdentifier === "string") {
      url = projectItem.sourceIdentifier;
    }
  }

  return {
    id: developerProjectItem.id.uuid,
    projectType,
    url,
    role: role.toLowerCase().replace(/_/g, "_") as any, // Map to design system role format
    mainBranchAccess: mergeRights.toLowerCase().replace(/_/g, "_") as any, // Map to design system access format
    ecosystems: undefined, // Not supported by API yet
    verified: false, // Not tracked in API
  };
}

/**
 * Helper to get display name from source identifier
 */
export function getProjectDisplayName(entry: DeveloperProjectItemEntry): string {
  return SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier);
}

/**
 * Helper to get display URL from source identifier
 */
export function getProjectDisplayUrl(entry: DeveloperProjectItemEntry): string {
  const projectItem = entry.projectItem;

  if (projectItem.projectItemType === ProjectItemType.GITHUB_REPOSITORY) {
    const sourceIdentifier = projectItem.sourceIdentifier;
    if (typeof sourceIdentifier === "object" && "name" in sourceIdentifier && "ownerId" in sourceIdentifier) {
      const ownerLogin =
        typeof sourceIdentifier.ownerId === "object" && "login" in sourceIdentifier.ownerId ? sourceIdentifier.ownerId.login : sourceIdentifier.ownerId;
      return `https://github.com/${ownerLogin}/${sourceIdentifier.name}`;
    }
  } else if (projectItem.projectItemType === ProjectItemType.GITHUB_OWNER) {
    const sourceIdentifier = projectItem.sourceIdentifier;
    if (typeof sourceIdentifier === "object" && "login" in sourceIdentifier) {
      return `https://github.com/${sourceIdentifier.login}`;
    }
  } else if (projectItem.projectItemType === ProjectItemType.URL) {
    if (typeof projectItem.sourceIdentifier === "string") {
      return projectItem.sourceIdentifier;
    }
  }

  return "";
}

/**
 * Helper to get formatted role label
 */
export function getRoleLabel(entry: DeveloperProjectItemEntry): string {
  const role = entry.developerProjectItem.roles?.[0];
  if (!role) return "Contributor";
  return DeveloperRoleTypeCompanion.label(role);
}

/**
 * Helper to get formatted merge rights label
 */
export function getMergeRightsLabel(entry: DeveloperProjectItemEntry): string {
  const mergeRights = entry.developerProjectItem.mergeRights?.[0];
  if (!mergeRights) return "No access";
  return MergeRightsTypeCompanion.label(mergeRights);
}

/**
 * Helper to get role value for design system
 */
export function getRoleValue(entry: DeveloperProjectItemEntry): "maintainer" | "core_contributor" | "contributor" | "other" {
  const role = entry.developerProjectItem.roles?.[0];

  switch (role) {
    case DeveloperRoleType.MAINTAINER:
      return "maintainer";
    case DeveloperRoleType.ACTIVE_CONTRIBUTOR:
    case DeveloperRoleType.COMMITTER:
    case DeveloperRoleType.CORE_TEAM_MEMBER:
      return "core_contributor";
    case DeveloperRoleType.OCCASIONAL_CONTRIBUTOR:
      return "contributor";
    default:
      return "other";
  }
}

/**
 * Helper to get merge rights value for an entry
 */
export function getAccessValue(entry: DeveloperProjectItemEntry): MergeRightsType {
  return entry.developerProjectItem.mergeRights?.[0] || MergeRightsType.NONE;
}

/**
 * Helper to determine if project is GitHub-based
 */
export function isGitHubProject(entry: DeveloperProjectItemEntry): boolean {
  return entry.projectItem.projectItemType === ProjectItemType.GITHUB_REPOSITORY || entry.projectItem.projectItemType === ProjectItemType.GITHUB_OWNER;
}
