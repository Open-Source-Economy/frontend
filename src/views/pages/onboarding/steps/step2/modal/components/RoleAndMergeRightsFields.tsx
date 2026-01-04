import React from "react";
import { DeveloperRoleType, MergeRightsType } from "@open-source-economy/api-types";
import { SelectField } from "src/views/components/ui/forms/select/select-field";
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion } from "src/ultils/companions";

interface RoleAndMergeRightsFieldsProps {
  isBulkMode: boolean;
  selectedRole: DeveloperRoleType | null;
  selectedMergeRights: MergeRightsType | null;
  onRoleChange: (role: DeveloperRoleType | null) => void;
  onMergeRightsChange: (mergeRights: MergeRightsType | null) => void;
  roleError?: string;
  mergeRightsError?: string;
}

export function RoleAndMergeRightsFields({
  isBulkMode,
  selectedRole,
  selectedMergeRights,
  onRoleChange,
  onMergeRightsChange,
  roleError,
  mergeRightsError,
}: RoleAndMergeRightsFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SelectField
        label={isBulkMode ? "Your Role (for all projects)" : "Your Role"}
        required
        options={DeveloperRoleTypeCompanion.options()}
        value={selectedRole || ""}
        onChange={value => onRoleChange(value as DeveloperRoleType)}
        error={roleError}
      />

      <SelectField
        label={isBulkMode ? "Merge Rights (for all projects)" : "Merge Rights to Main Branch"}
        required
        options={MergeRightsTypeCompanion.options()}
        value={selectedMergeRights || ""}
        onChange={value => onMergeRightsChange(value as MergeRightsType)}
        error={mergeRightsError}
      />
    </div>
  );
}
