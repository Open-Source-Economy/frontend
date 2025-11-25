import { DeveloperRoleType, MergeRightsType } from "@open-source-economy/api-types";

export const displayedDeveloperRoles: Record<DeveloperRoleType, string> = {
  [DeveloperRoleType.MAINTAINER]: "Maintainer",
  [DeveloperRoleType.CONTRIBUTOR]: "Contributor",
  [DeveloperRoleType.AUTHOR]: "Author",
} as const;

export const displayedMergeRights: Record<MergeRightsType, string> = {
  [MergeRightsType.NONE]: "None",
  [MergeRightsType.READ]: "Read",
  [MergeRightsType.WRITE]: "Write",
  [MergeRightsType.ADMIN]: "Admin",
} as const;

