import React, { forwardRef, Ref } from "react";
import { ResponseTimeType } from "@open-source-economy/api-types";
import { SelectInput, SelectInputRef, SelectOption } from "../SelectInput";
import { BaseProps } from "../../Base";

interface ResponseTimeTypeSelectInputProps extends Omit<BaseProps, "label"> {
  value: ResponseTimeType | null;
  onChange: (value: ResponseTimeType | null) => void;
  required?: boolean;
  label?: string;
}

const options: SelectOption[] = Object.values(ResponseTimeType).map(value => ({
  value,
  label: value,
}));

export const ResponseTimeTypeSelectInput = forwardRef(function ResponseTimeTypeSelectInput(props: ResponseTimeTypeSelectInputProps, ref: Ref<SelectInputRef>) {
  return (
    <SelectInput
      ref={ref}
      label={props.label || "Response Time"}
      required={props.required}
      value={props.value || ""}
      onChange={e => props.onChange(e.target.value ? (e.target.value as ResponseTimeType) : null)}
      options={options}
    />
  );
});
