/**
 * Companion utilities for ProjectItemType enum
 * Centralizes all display logic for project item types
 */

import { ProjectItemType } from "@open-source-economy/api-types";

// Singular labels
const projectItemTypeLabelMap: Record<ProjectItemType, string> = {
  [ProjectItemType.URL]: "URL",
  [ProjectItemType.GITHUB_REPOSITORY]: "GitHub Repository",
  [ProjectItemType.GITHUB_OWNER]: "GitHub Organization",
};

// Plural labels
const projectItemTypeLabelPluralMap: Record<ProjectItemType, string> = {
  [ProjectItemType.URL]: "URLs",
  [ProjectItemType.GITHUB_REPOSITORY]: "GitHub Repositories",
  [ProjectItemType.GITHUB_OWNER]: "GitHub Organizations",
};

export namespace ProjectItemTypeCompanion {
  /**
   * Get display label for a project item type
   * @param type The project item type
   * @param plural Whether to return plural form (default: false for singular)
   */
  export function label(type: ProjectItemType, plural: boolean = false): string {
    return plural ? projectItemTypeLabelPluralMap[type] : projectItemTypeLabelMap[type];
  }

  /**
   * Get all displays (for EnumSelectInput compatibility)
   */
  export function displays(): Record<ProjectItemType, string> {
    return projectItemTypeLabelMap;
  }
}
