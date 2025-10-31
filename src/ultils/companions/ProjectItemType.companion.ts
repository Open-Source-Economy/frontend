/**
 * Companion utilities for ProjectItemType enum
 * Centralizes all display logic for project item types
 */

import { ProjectItemType } from "@open-source-economy/api-types";

const projectItemTypeLabelMap: Record<ProjectItemType, string> = {
  [ProjectItemType.URL]: "Single URL",
  [ProjectItemType.GITHUB_REPOSITORY]: "Github Repositories",
  [ProjectItemType.GITHUB_OWNER]: "Github Organisation",
};

export namespace ProjectItemTypeCompanion {
  /**
   * Get display label for a project item type
   */
  export function label(type: ProjectItemType): string {
    return projectItemTypeLabelMap[type];
  }

  /**
   * Get all displays (for EnumSelectInput compatibility)
   */
  export function displays(): Record<ProjectItemType, string> {
    return projectItemTypeLabelMap;
  }
}
