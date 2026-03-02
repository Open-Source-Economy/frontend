import React, { forwardRef, Ref } from "react";
import * as dto from "@open-source-economy/api-types";
import { SelectInput, SelectInputRef, SelectOption } from "../SelectInput";
import { BaseProps } from "../../Base";

interface ResponseTimeTypeSelectInputProps extends Omit<BaseProps, "label"> {
  value: dto.ResponseTimeType | null;
  onChange: (value: dto.ResponseTimeType | null) => void;
  required?: boolean;
  label?: string;
}

const options: SelectOption[] = Object.values(dto.ResponseTimeType).map((value) => ({
  value,
  label: value,
}));

export const ResponseTimeTypeSelectInput = forwardRef(function ResponseTimeTypeSelectInput(
  props: ResponseTimeTypeSelectInputProps,
  ref: Ref<SelectInputRef>
) {
  return (
    <SelectInput
      ref={ref}
      label={props.label || "Response Time"}
      required={props.required}
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value ? (e.target.value as dto.ResponseTimeType) : null)}
      options={options}
    />
  );
});
