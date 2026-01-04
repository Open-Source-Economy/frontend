import React, { forwardRef, Ref } from "react";
import { MergeRightsType } from "@open-source-economy/api-types";
import { SelectInput, SelectInputRef, SelectOption } from "../SelectInput";
import { BaseProps } from "../../Base";

interface MergeRightsTypeSelectInputProps extends Omit<BaseProps, "label"> {
  value: MergeRightsType | null;
  onChange: (value: MergeRightsType | null) => void;
  required?: boolean;
  label?: string;
}

const options: SelectOption[] = Object.values(MergeRightsType).map(value => ({
  value,
  label: value,
}));

export const MergeRightsTypeSelectInput = forwardRef(function MergeRightsTypeSelectInput(props: MergeRightsTypeSelectInputProps, ref: Ref<SelectInputRef>) {
  return (
    <SelectInput
      ref={ref}
      label={props.label || "Merge Rights"}
      required={props.required}
      value={props.value || ""}
      onChange={e => props.onChange(e.target.value ? (e.target.value as MergeRightsType) : null)}
      options={options}
    />
  );
});
