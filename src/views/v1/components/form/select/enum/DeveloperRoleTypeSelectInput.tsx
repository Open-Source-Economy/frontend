import React, { forwardRef, Ref } from "react";
import * as dto from "@open-source-economy/api-types";
import { SelectInput, SelectInputRef, SelectOption } from "../SelectInput";
import { BaseProps } from "../../Base";

interface DeveloperRoleTypeSelectInputProps extends Omit<BaseProps, "label"> {
  value: dto.DeveloperRoleType | null;
  onChange: (value: dto.DeveloperRoleType | null) => void;
  required?: boolean;
  label?: string;
}

const options: SelectOption[] = Object.values(dto.DeveloperRoleType).map((value) => ({
  value,
  label: value,
}));

export const DeveloperRoleTypeSelectInput = forwardRef(function DeveloperRoleTypeSelectInput(
  props: DeveloperRoleTypeSelectInputProps,
  ref: Ref<SelectInputRef>
) {
  return (
    <SelectInput
      ref={ref}
      label={props.label || "Developer Role"}
      required={props.required}
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value ? (e.target.value as dto.DeveloperRoleType) : null)}
      options={options}
    />
  );
});
