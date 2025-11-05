/**
 * Companion utilities for MergeRightsType enum
 * Centralizes all display and styling logic for merge rights
 */

import * as dto from "@open-source-economy/api-types";

const mergeRightsLabelMap: Record<dto.MergeRightsType, string> = {
  [dto.MergeRightsType.NONE]: "No merge rights",
  [dto.MergeRightsType.REVIEWER]: "Code reviewer",
  [dto.MergeRightsType.LIMITED]: "Limited rights (e.g., docs)",
  [dto.MergeRightsType.FULL_COMMITTER]: "Full committer",
  [dto.MergeRightsType.VOTE_BASED_COMMITTER]: "Vote-based committer",
  [dto.MergeRightsType.RELEASE_MANAGER]: "Release manager",
  [dto.MergeRightsType.EMERITUS]: "Emeritus",
};

const mergeRightsStyleMap: Record<dto.MergeRightsType, string> = {
  [dto.MergeRightsType.NONE]: "bg-brand-neutral-300/20 text-brand-neutral-600 border border-brand-neutral-300/30",
  [dto.MergeRightsType.REVIEWER]: "bg-brand-warning/10 text-brand-warning border border-brand-warning/20",
  [dto.MergeRightsType.LIMITED]: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
  [dto.MergeRightsType.FULL_COMMITTER]: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
  [dto.MergeRightsType.VOTE_BASED_COMMITTER]: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
  [dto.MergeRightsType.RELEASE_MANAGER]: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
  [dto.MergeRightsType.EMERITUS]: "bg-brand-neutral-300/20 text-brand-neutral-600 border border-brand-neutral-300/30",
};

export namespace MergeRightsTypeCompanion {
  /**
   * Get display label for merge rights
   */
  export function label(mergeRights: dto.MergeRightsType): string {
    return mergeRightsLabelMap[mergeRights];
  }

  /**
   * Get Tailwind className for merge rights
   */
  export function className(mergeRights: dto.MergeRightsType): string {
    return mergeRightsStyleMap[mergeRights];
  }

  /**
   * Get all displays (for EnumSelectInput compatibility)
   */
  export function displays(): Record<dto.MergeRightsType, string> {
    return mergeRightsLabelMap;
  }
}
