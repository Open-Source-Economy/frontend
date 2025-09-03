import React, { forwardRef, Ref } from "react";
import { BaseProps, BaseRef } from "../../Base";
import { SelectInput, SelectOption } from "../SelectInput";

export interface EnumSelectInputChildrenProps<T extends string | number>
  extends Omit<EnumSelectInputProps<T>, "displayedEnums" | "enumObject" | "label" | "name"> {}

export interface DisplayedEnum {
  name: string;
}

export interface EnumSelectInputRef extends BaseRef {}

interface EnumSelectInputProps<T extends string | number> extends BaseProps {
  value: T | null;
  onChange: (value: T | null) => void;
  name?: string;
  includePlaceholder?: boolean;
  displayedEnums: Record<T, DisplayedEnum>;
  enumObject: any;
}

export const EnumSelectInput = forwardRef(function EnumSelectInput<T extends string | number>(props: EnumSelectInputProps<T>, ref: Ref<EnumSelectInputRef>) {
  let enumOptions: SelectOption[] = Object.values(props.enumObject)
    .filter((v): v is string | number => typeof v === "string" || typeof v === "number")
    .map((enumValue: string | number) => ({
      value: enumValue,
      label: props.displayedEnums[enumValue as T]?.name || String(enumValue),
    }));

  if (props.includePlaceholder) {
    enumOptions = [{ value: "", label: `Select ${String(props.label).toLowerCase()}` }, ...enumOptions];
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    props.onChange(selectedValue === "" ? null : (selectedValue as T));
  };

  return (
    <SelectInput
      id={`${props.name || String(props.label).toLowerCase().replace(/\s/g, "-")}-select`}
      name={props.name || String(props.label).toLowerCase().replace(/\s/g, "-")}
      label={props.label}
      options={enumOptions}
      value={props.value || ""}
      onChange={handleSelectChange}
      required={props.required}
      className="bg-[#202f45] px-4 py-3 rounded-md font-montserrat font-normal text-[#ffffff] text-[16px] outline-none cursor-pointer hover:bg-[#2a3f56] transition-colors"
      ref={ref}
    />
  );
});
