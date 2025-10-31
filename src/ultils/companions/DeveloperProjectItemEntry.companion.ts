/**
 * Companion utilities for DeveloperProjectItemEntry
 * Centralizes all display and formatting logic for project entries
 */

import { DeveloperProjectItemEntry, DeveloperRoleType, MergeRightsType, ProjectItemType } from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "./SourceIdentifier.companion";
import { DeveloperRoleTypeCompanion } from "./DeveloperRoleType.companion";
import { MergeRightsTypeCompanion } from "./MergeRightsType.companion";

export namespace DeveloperProjectItemEntryCompanion {
  /**
   * Get display name from source identifier
   */
  export function displayName(entry: DeveloperProjectItemEntry): string {
    return SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier);
  }

  /**
   * Get display URL
   */
  export function displayUrl(entry: DeveloperProjectItemEntry): string {
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
   * Check if project is GitHub-based
   */
  export function isGitHub(entry: DeveloperProjectItemEntry): boolean {
    return entry.projectItem.projectItemType === ProjectItemType.GITHUB_REPOSITORY || entry.projectItem.projectItemType === ProjectItemType.GITHUB_OWNER;
  }

  /**
   * Get formatted role label
   */
  export function roleLabel(entry: DeveloperProjectItemEntry): string {
    const role = entry.developerProjectItem.roles?.[0];
    if (!role) return "Contributor";
    return DeveloperRoleTypeCompanion.label(role);
  }

  /**
   * Get formatted merge rights label
   */
  export function mergeRightsLabel(entry: DeveloperProjectItemEntry): string {
    const mergeRights = entry.developerProjectItem.mergeRights?.[0];
    if (!mergeRights) return "No access";
    return MergeRightsTypeCompanion.label(mergeRights);
  }

  /**
   * Get role value for design system
   */
  export function roleValue(entry: DeveloperProjectItemEntry): "maintainer" | "core_contributor" | "contributor" | "other" {
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
   * Get merge rights (first one if multiple)
   */
  export function mergeRights(entry: DeveloperProjectItemEntry): MergeRightsType {
    return entry.developerProjectItem.mergeRights?.[0] || MergeRightsType.NONE;
  }

  /**
   * Extract project name from URL
   */
  export function projectNameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/").filter(Boolean);
      if (pathParts.length >= 2) {
        return `${pathParts[pathParts.length - 2]}/${pathParts[pathParts.length - 1]}`;
      }
      return urlObj.hostname;
    } catch {
      return url;
    }
  }
}
