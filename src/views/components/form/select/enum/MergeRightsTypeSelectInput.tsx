import React, { forwardRef, Ref } from "react";
import { GenericInputRef } from "../../input";
import { DisplayedEnum, EnumSelectInput, EnumSelectInputChildrenProps } from "./EnumSelectInput";
import { MergeRightsType } from "@open-source-economy/api-types";

export const displayedMergeRights: Record<MergeRightsType, DisplayedEnum> = {
  [MergeRightsType.NONE]: { name: "No merge rights" },
  [MergeRightsType.REVIEWER]: { name: "Code reviewer" },
  [MergeRightsType.LIMITED]: { name: "Limited rights (e.g., docs)" },
  [MergeRightsType.MAINTAINER]: { name: "Maintainer" },
  [MergeRightsType.FULL_COMMITTER]: { name: "Full committer" },
  [MergeRightsType.SUBSYSTEM_MAINTAINER]: { name: "Subsystem maintainer" },
  [MergeRightsType.DELEGATED_COMMITTER]: { name: "Delegated committer" },
  [MergeRightsType.VOTE_BASED_COMMITTER]: { name: "Vote-based committer" },
  [MergeRightsType.RELEASE_MANAGER]: { name: "Release manager" },
  [MergeRightsType.EMERITUS]: { name: "Emeritus" },
};

export interface MergeRightsTypeSelectInputProps extends EnumSelectInputChildrenProps<MergeRightsType> {}

export const MergeRightsTypeSelectInput = forwardRef(function MergeRightsTypeSelectInput(props: MergeRightsTypeSelectInputProps, ref: Ref<GenericInputRef>) {
  return (
    // @ts-ignore
    <EnumSelectInput<MergeRightsType>
      label="Merge Rights to Main Branch"
      name="mergeRights"
      enumObject={MergeRightsType}
      displayedEnums={displayedMergeRights}
      {...props}
      ref={ref}
    />
  );
});
