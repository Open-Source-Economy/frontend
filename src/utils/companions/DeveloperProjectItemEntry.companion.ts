/**
 * Companion utilities for DeveloperProjectItemEntry
 * Centralizes all display and formatting logic for project entries
 */

import * as dto from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "./SourceIdentifier.companion";
import { DeveloperRoleTypeCompanion } from "./DeveloperRoleType.companion";
import { MergeRightsTypeCompanion } from "./MergeRightsType.companion";

export namespace DeveloperProjectItemEntryCompanion {
  /**
   * Get display name from source identifier
   */
  export function displayName(entry: dto.DeveloperProjectItemEntry): string {
    return SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier);
  }

  /**
   * Get display URL
   */
  export function displayUrl(entry: dto.DeveloperProjectItemEntry): string {
    const projectItem = entry.projectItem;
    // sourceIdentifier is now always a string
    const sourceIdentifier = projectItem.sourceIdentifier;

    if (projectItem.projectItemType === dto.ProjectItemType.GITHUB_REPOSITORY) {
      // sourceIdentifier for repos is typically "owner/name" or a full URL
      if (sourceIdentifier.startsWith("http")) {
        return sourceIdentifier;
      }
      return `https://github.com/${sourceIdentifier}`;
    } else if (projectItem.projectItemType === dto.ProjectItemType.GITHUB_OWNER) {
      // sourceIdentifier for owners is the login string
      if (sourceIdentifier.startsWith("http")) {
        return sourceIdentifier;
      }
      return `https://github.com/${sourceIdentifier}`;
    } else if (projectItem.projectItemType === dto.ProjectItemType.URL) {
      return sourceIdentifier;
    }

    return "";
  }

  /**
   * Check if project is GitHub-based
   */
  export function isGitHub(entry: dto.DeveloperProjectItemEntry): boolean {
    return (
      entry.projectItem.projectItemType === dto.ProjectItemType.GITHUB_REPOSITORY ||
      entry.projectItem.projectItemType === dto.ProjectItemType.GITHUB_OWNER
    );
  }

  /**
   * Get formatted role label
   */
  export function roleLabel(entry: dto.DeveloperProjectItemEntry): string {
    const role = entry.developerProjectItem.roles?.[0];
    if (!role) return "Contributor";
    return DeveloperRoleTypeCompanion.label(role);
  }

  /**
   * Get formatted merge rights label
   */
  export function mergeRightsLabel(entry: dto.DeveloperProjectItemEntry): string {
    const mergeRights = entry.developerProjectItem.mergeRights?.[0];
    if (!mergeRights) return "No access";
    return MergeRightsTypeCompanion.label(mergeRights);
  }

  /**
   * Get role value for design system
   */
  export function roleValue(
    entry: dto.DeveloperProjectItemEntry
  ): "maintainer" | "core_contributor" | "contributor" | "other" {
    const role = entry.developerProjectItem.roles?.[0];

    switch (role) {
      case dto.DeveloperRoleType.MAINTAINER:
        return "maintainer";
      case dto.DeveloperRoleType.ACTIVE_CONTRIBUTOR:
      case dto.DeveloperRoleType.COMMITTER:
      case dto.DeveloperRoleType.CORE_TEAM_MEMBER:
        return "core_contributor";
      case dto.DeveloperRoleType.OCCASIONAL_CONTRIBUTOR:
        return "contributor";
      default:
        return "other";
    }
  }

  /**
   * Get merge rights (first one if multiple)
   */
  export function mergeRights(entry: dto.DeveloperProjectItemEntry): dto.MergeRightsType {
    return entry.developerProjectItem.mergeRights?.[0] || dto.MergeRightsType.NONE;
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
