import React from "react";
import { Countries } from "src/views/pages/app/payment/elements/Countries";
import { FormInput } from "./To-refector/FormInput";
import { FormEntry } from "./frames/FormEntry";
import { BaseSelect } from "./frames/BaseSelect";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelect(props: CountrySelectProps) {
  return (
    <BaseSelect value={props.value} onChange={props.onChange}>
      <Countries />
    </BaseSelect>
  );
}