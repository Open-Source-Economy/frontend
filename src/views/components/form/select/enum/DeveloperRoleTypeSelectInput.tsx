import React, { forwardRef, Ref } from "react";
import { DeveloperRoleType } from "@open-source-economy/api-types";
import { GenericInputRef } from "../../GenericInput";
import { DisplayedEnum, EnumSelectInput, EnumSelectInputChildrenProps } from "./EnumSelectInput"; // Import GenericInputRef

export const displayedDeveloperRoles: Record<DeveloperRoleType, DisplayedEnum> = {
  [DeveloperRoleType.CREATOR_FOUNDER]: { name: "Lead Maintainer" },
  [DeveloperRoleType.CORE_DEVELOPER]: { name: "Co-developer" },
  [DeveloperRoleType.MAINTAINER]: { name: "Contributor" },
  [DeveloperRoleType.PROJECT_LEAD]: { name: "Project Lead" },
};

export interface DeveloperRoleTypeSelectInputProps extends EnumSelectInputChildrenProps<DeveloperRoleType> {}

export const DeveloperRoleTypeSelectInput = forwardRef(function DeveloperRoleTypeSelectInput(
  props: DeveloperRoleTypeSelectInputProps,
  ref: Ref<GenericInputRef>,
) {
  return (
    // @ts-ignore
    <EnumSelectInput<DeveloperRoleType> label="Developer Role" enumObject={DeveloperRoleType} displayedEnums={displayedDeveloperRoles} {...props} ref={ref} />
  );
});
