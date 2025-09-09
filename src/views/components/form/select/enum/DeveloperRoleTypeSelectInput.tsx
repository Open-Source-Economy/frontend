import React, { forwardRef, Ref } from "react";
import { DeveloperRoleType } from "@open-source-economy/api-types";
import { GenericInputRef } from "../../input";
import { DisplayedEnum, EnumSelectInput, EnumSelectInputChildrenProps } from "./EnumSelectInput";

export const displayedDeveloperRoles: Record<DeveloperRoleType, DisplayedEnum> = {
  [DeveloperRoleType.NONE]: { name: "None" },
  // Generic Open-Source Roles
  [DeveloperRoleType.OCCASIONAL_CONTRIBUTOR]: { name: "Occasional Contributor" },
  [DeveloperRoleType.ACTIVE_CONTRIBUTOR]: { name: "Active Contributor" },
  [DeveloperRoleType.COMMITTER]: { name: "Committer" },
  [DeveloperRoleType.MAINTAINER]: { name: "Maintainer" },
  [DeveloperRoleType.CORE_TEAM_MEMBER]: { name: "Core Team Member" },
  [DeveloperRoleType.FOUNDER]: { name: "Founder" },

  // Generic Governance & Leadership Roles
  [DeveloperRoleType.BOARD_MEMBER]: { name: "Board Member" },
  [DeveloperRoleType.STEERING_COMMITTEE_MEMBER]: { name: "Steering Committee (SC) Member" },
  [DeveloperRoleType.PROJECT_LEAD]: { name: "Project Lead" },
  [DeveloperRoleType.WORKING_GROUP_CHAIR]: { name: "Working Group Chair" },
  [DeveloperRoleType.BENEVOLENT_DICTATOR_FOR_LIFE]: { name: "Benevolent Dictator for Life (BDFL)" },

  // Apache Software Foundation (ASF) Roles
  [DeveloperRoleType.ASF_CONTRIBUTOR]: { name: "ASF Contributor" },
  [DeveloperRoleType.ASF_COMMITTER]: { name: "ASF Committer" },
  [DeveloperRoleType.ASF_PMC_MEMBER]: { name: "ASF PMC Member" },

  // Linux Foundation & CNCF Roles
  [DeveloperRoleType.LF_GOVERNING_BOARD_MEMBER]: { name: "LF Governing Board Member" },
  [DeveloperRoleType.TSC_MEMBER]: { name: "TSC Member" },
  [DeveloperRoleType.CNCF_TOC_MEMBER]: { name: "CNCF TOC Member" },
  [DeveloperRoleType.LINUX_FOUNDATION_FELLOW]: { name: "Linux Foundation Fellow" },

  // Corporate Membership Roles
  [DeveloperRoleType.STRATEGIC_MEMBER]: { name: "Strategic Member" },
  [DeveloperRoleType.CONTRIBUTING_MEMBER]: { name: "Contributing Member" },
  [DeveloperRoleType.ASSOCIATE_MEMBER]: { name: "Associate Member" },
};

export interface DeveloperRoleTypeSelectInputProps extends EnumSelectInputChildrenProps<DeveloperRoleType> {}

export const DeveloperRoleTypeSelectInput = forwardRef(function DeveloperRoleTypeSelectInput(
  props: DeveloperRoleTypeSelectInputProps,
  ref: Ref<GenericInputRef>,
) {
  return (
    // @ts-ignore
    <EnumSelectInput<DeveloperRoleType>
      label="Your role in this project"
      name="yourRole"
      enumObject={DeveloperRoleType}
      displayedEnums={displayedDeveloperRoles}
      {...props}
      ref={ref}
    />
  );
});
