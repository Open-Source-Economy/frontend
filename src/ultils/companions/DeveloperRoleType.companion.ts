/**
 * Companion utilities for DeveloperRoleType enum
 * Centralizes all display logic for developer roles
 */

import * as dto from "@open-source-economy/api-types";

const developerRoleLabelMap: Record<dto.DeveloperRoleType, string> = {
  [dto.DeveloperRoleType.NONE]: "None",
  // Generic Open-Source Roles
  [dto.DeveloperRoleType.OCCASIONAL_CONTRIBUTOR]: "Occasional Contributor",
  [dto.DeveloperRoleType.ACTIVE_CONTRIBUTOR]: "Active Contributor",
  [dto.DeveloperRoleType.COMMITTER]: "Committer",
  [dto.DeveloperRoleType.MAINTAINER]: "Maintainer",
  [dto.DeveloperRoleType.CORE_TEAM_MEMBER]: "Core Team Member",
  [dto.DeveloperRoleType.FOUNDER]: "Founder",
  // Generic Governance & Leadership Roles
  [dto.DeveloperRoleType.BOARD_MEMBER]: "Board Member",
  [dto.DeveloperRoleType.STEERING_COMMITTEE_MEMBER]: "Steering Committee (SC) Member",
  [dto.DeveloperRoleType.PROJECT_LEAD]: "Project Lead",
  [dto.DeveloperRoleType.WORKING_GROUP_CHAIR]: "Working Group Chair",
  [dto.DeveloperRoleType.BENEVOLENT_DICTATOR_FOR_LIFE]: "Benevolent Dictator for Life (BDFL)",
  // Apache Software Foundation (ASF) Roles
  [dto.DeveloperRoleType.ASF_CONTRIBUTOR]: "ASF Contributor",
  [dto.DeveloperRoleType.ASF_COMMITTER]: "ASF Committer",
  [dto.DeveloperRoleType.ASF_PMC_MEMBER]: "ASF PMC Member",
  // Linux Foundation & CNCF Roles
  [dto.DeveloperRoleType.LF_GOVERNING_BOARD_MEMBER]: "LF Governing Board Member",
  [dto.DeveloperRoleType.TSC_MEMBER]: "TSC Member",
  [dto.DeveloperRoleType.CNCF_TOC_MEMBER]: "CNCF TOC Member",
  [dto.DeveloperRoleType.LINUX_FOUNDATION_FELLOW]: "Linux Foundation Fellow",
  // Corporate Membership Roles
  [dto.DeveloperRoleType.STRATEGIC_MEMBER]: "Strategic Member",
  [dto.DeveloperRoleType.CONTRIBUTING_MEMBER]: "Contributing Member",
  [dto.DeveloperRoleType.ASSOCIATE_MEMBER]: "Associate Member",
};

export namespace DeveloperRoleTypeCompanion {
  /**
   * Get display label for a developer role
   */
  export function label(role: dto.DeveloperRoleType): string {
    return developerRoleLabelMap[role];
  }

  /**
   * Get all displays (for EnumSelectInput compatibility)
   */
  export function displays(): Record<dto.DeveloperRoleType, string> {
    return developerRoleLabelMap;
  }
}
