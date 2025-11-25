import React, { forwardRef, Ref } from "react";
import { DeveloperRoleType } from "@open-source-economy/api-types";
import { SelectInput, SelectInputRef, SelectOption } from "../SelectInput";
import { BaseProps } from "../../Base";

interface DeveloperRoleTypeSelectInputProps extends Omit<BaseProps, "label"> {
  value: DeveloperRoleType | null;
  onChange: (value: DeveloperRoleType | null) => void;
  required?: boolean;
}

const options: SelectOption[] = Object.values(DeveloperRoleType).map(value => ({
  value,
  label: value,
}));

export const DeveloperRoleTypeSelectInput = forwardRef(function DeveloperRoleTypeSelectInput(
  props: DeveloperRoleTypeSelectInputProps,
  ref: Ref<SelectInputRef>,
) {
  return (
    <SelectInput
      ref={ref}
      label={props.label || "Developer Role"}
      required={props.required}
      value={props.value || ""}
      onChange={e => props.onChange(e.target.value ? (e.target.value as DeveloperRoleType) : null)}
      options={options}
    />
  );
});
