import { DeveloperRoleType, MergeRightsType } from "@open-source-economy/api-types";

export const displayedDeveloperRoles: Partial<Record<DeveloperRoleType, string>> = {
  [DeveloperRoleType.MAINTAINER]: "Maintainer",
} as const;

export const displayedMergeRights: Partial<Record<MergeRightsType, string>> = {
  [MergeRightsType.NONE]: "None",
} as const;
