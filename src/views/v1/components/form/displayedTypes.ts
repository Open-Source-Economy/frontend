import * as dto from "@open-source-economy/api-types";

export const displayedDeveloperRoles: Partial<Record<dto.DeveloperRoleType, string>> = {
  [dto.DeveloperRoleType.MAINTAINER]: "Maintainer",
} as const;

export const displayedMergeRights: Partial<Record<dto.MergeRightsType, string>> = {
  [dto.MergeRightsType.NONE]: "None",
} as const;
