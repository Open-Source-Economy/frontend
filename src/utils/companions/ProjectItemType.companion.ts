/**
 * Companion utilities for ProjectItemType enum
 * Centralizes all display logic for project item types
 */

import * as dto from "@open-source-economy/api-types";

// Singular labels
const projectItemTypeLabelMap: Record<dto.ProjectItemType, string> = {
  [dto.ProjectItemType.URL]: "URL",
  [dto.ProjectItemType.GITHUB_REPOSITORY]: "GitHub Repository",
  [dto.ProjectItemType.GITHUB_OWNER]: "GitHub Organization",
};

// Plural labels
const projectItemTypeLabelPluralMap: Record<dto.ProjectItemType, string> = {
  [dto.ProjectItemType.URL]: "URLs",
  [dto.ProjectItemType.GITHUB_REPOSITORY]: "GitHub Repositories",
  [dto.ProjectItemType.GITHUB_OWNER]: "GitHub Organizations",
};

export namespace ProjectItemTypeCompanion {
  /**
   * Get display label for a project item type
   * @param type The project item type
   * @param plural Whether to return plural form (default: false for singular)
   */
  export function label(type: dto.ProjectItemType, plural: boolean = false): string {
    return plural ? projectItemTypeLabelPluralMap[type] : projectItemTypeLabelMap[type];
  }

  /**
   * Get all displays (for EnumSelectInput compatibility)
   */
  export function displays(): Record<dto.ProjectItemType, string> {
    return projectItemTypeLabelMap;
  }
}
