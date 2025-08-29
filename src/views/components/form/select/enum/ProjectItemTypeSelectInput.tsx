import React, { forwardRef, Ref } from "react";
import { GenericInputRef } from "../../input";
import { DisplayedEnum, EnumSelectInput, EnumSelectInputChildrenProps } from "./EnumSelectInput";
import { ProjectItemType } from "../../../../pages/app/onboarding/steps/step2/ProjectItemType";

export const displayedProjectItemTypes: Record<ProjectItemType, DisplayedEnum> = {
  [ProjectItemType.URL]: { name: "Single URL" },
  [ProjectItemType.GITHUB_REPOSITORY]: { name: "Repositories" },
  [ProjectItemType.GITHUB_OWNER]: { name: "Organisation" },
};

export interface ProjectItemTypeSelectInputProps extends EnumSelectInputChildrenProps<ProjectItemType> {}

export const ProjectItemTypeSelectInput = forwardRef(function ProjectItemTypeSelectInput(
  props: ProjectItemTypeSelectInputProps,
  ref: Ref<GenericInputRef>,
) {
  return (
    // @ts-ignore
    <EnumSelectInput<ProjectItemType>
      label="Project Type"
      name="projectType"
      enumObject={ProjectItemType}
      displayedEnums={displayedProjectItemTypes}
      {...props}
      ref={ref}
    />
  );
});
