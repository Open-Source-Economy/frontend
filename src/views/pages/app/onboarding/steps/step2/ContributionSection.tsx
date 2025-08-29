import React from "react";
import { DeveloperRoleType, MergeRightsType } from "@open-source-economy/api-types";
import { DeveloperRoleTypeSelectInput, GenericInputRef, MergeRightsTypeSelectInput } from "../../../../../components/form";

interface ContributionSectionProps {
  selectedRole: DeveloperRoleType | null;
  selectedMergeRights: MergeRightsType | null;
  onRoleChange: (role: DeveloperRoleType | null) => void;
  onMergeRightsChange: (rights: MergeRightsType | null) => void;
  roleSelectRef: React.RefObject<GenericInputRef>;
  mergeRightsSelectRef: React.RefObject<GenericInputRef>;
}

export function ContributionSection(props: ContributionSectionProps) {
  return (
    <div className="flex p-9 flex-col justify-end items-end gap-2.5 self-stretch rounded-[30px] bg-[#14233A]">
      <div className="flex flex-col items-start gap-4 self-stretch">
        <div className="self-stretch text-white font-montserrat text-2xl font-normal leading-[130%]">Your Contribution</div>
      </div>

      {/* Two dropdowns side by side */}
      <div className="flex items-start gap-5 self-stretch">
        {/* Role Dropdown */}
        <div className="flex-1">
          <DeveloperRoleTypeSelectInput
            required
            value={props.selectedRole}
            onChange={props.onRoleChange}
            ref={props.roleSelectRef}
            label="Your role in this project *"
          />
        </div>

        {/* Merge Rights Dropdown */}
        <div className="flex-1">
          <MergeRightsTypeSelectInput
            required
            value={props.selectedMergeRights}
            onChange={props.onMergeRightsChange}
            ref={props.mergeRightsSelectRef}
            label="Merge Rights to Main Branch *"
          />
        </div>
      </div>
    </div>
  );
}
