import React, { forwardRef, Ref } from "react";
import * as dto from "@open-source-economy/api-types";
import { SelectInput, SelectInputRef, SelectOption } from "../SelectInput";
import { BaseProps } from "../../Base";

interface ProjectItemTypeSelectInputProps extends Omit<BaseProps, "label"> {
  value: dto.ProjectItemType | null;
  onChange: (value: dto.ProjectItemType | null) => void;
  required?: boolean;
  label?: string;
}

const options: SelectOption[] = Object.values(dto.ProjectItemType).map((value) => ({
  value,
  label: value,
}));

export const ProjectItemTypeSelectInput = forwardRef(function ProjectItemTypeSelectInput(
  props: ProjectItemTypeSelectInputProps,
  ref: Ref<SelectInputRef>
) {
  return (
    <SelectInput
      ref={ref}
      label={props.label || "Project Item Type"}
      required={props.required}
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value ? (e.target.value as dto.ProjectItemType) : null)}
      options={options}
    />
  );
});
