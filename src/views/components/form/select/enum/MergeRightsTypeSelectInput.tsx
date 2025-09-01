import React, { forwardRef, Ref } from "react";
import { GenericInputRef } from "../../input";
import { DisplayedEnum, EnumSelectInput, EnumSelectInputChildrenProps } from "./EnumSelectInput";
import { MergeRightsType } from "@open-source-economy/api-types";

export const displayedMergeRights: Record<MergeRightsType, DisplayedEnum> = {
  [MergeRightsType.FULL_RIGHTS]: { name: "Full rights" },
  [MergeRightsType.SPECIFIC_AREAS]: { name: "Specific areas" },
  [MergeRightsType.NO_RIGHTS]: { name: "No direct rights" },
  [MergeRightsType.FORMAL_PROCESS]: { name: "Formal process" },
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
