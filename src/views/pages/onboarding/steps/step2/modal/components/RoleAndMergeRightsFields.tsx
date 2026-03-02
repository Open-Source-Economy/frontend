import React from "react";
import * as dto from "@open-source-economy/api-types";
import { SelectField } from "src/views/components/ui/forms/select/select-field";
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion } from "src/utils/companions";

interface RoleAndMergeRightsFieldsProps {
  isBulkMode: boolean;
  selectedRole: dto.DeveloperRoleType | null;
  selectedMergeRights: dto.MergeRightsType | null;
  onRoleChange: (role: dto.DeveloperRoleType | null) => void;
  onMergeRightsChange: (mergeRights: dto.MergeRightsType | null) => void;
  roleError?: string;
  mergeRightsError?: string;
}

export function RoleAndMergeRightsFields(props: RoleAndMergeRightsFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SelectField
        label={props.isBulkMode ? "Your Role (for all projects)" : "Your Role"}
        required
        options={DeveloperRoleTypeCompanion.options()}
        value={props.selectedRole || ""}
        onChange={(value) => props.onRoleChange(value as dto.DeveloperRoleType)}
        error={props.roleError}
      />

      <SelectField
        label={props.isBulkMode ? "Merge Rights (for all projects)" : "Merge Rights to Main Branch"}
        required
        options={MergeRightsTypeCompanion.options()}
        value={props.selectedMergeRights || ""}
        onChange={(value) => props.onMergeRightsChange(value as dto.MergeRightsType)}
        error={props.mergeRightsError}
      />
    </div>
  );
}
