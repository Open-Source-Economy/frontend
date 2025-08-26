import React, { forwardRef, Ref } from "react";
import { GenericInputRef } from "../../GenericInput";
import { SelectInput, SelectOption } from "../SelectInput";

export interface DisplayedEnum {
  name: string;
}

export interface EnumSelectInputProps<T extends string | number> {
  // Exported for extension
  value: T | null;
  onChange: (value: T | null) => void;
  required?: boolean;
  forceValidate?: boolean;
  name?: string;
  label: string;
  displayedEnums: Record<T, DisplayedEnum>;
  enumObject: any; // The actual enum object (e.g., ResponseTimeType, Month)
}

export interface EnumSelectInputChildrenProps<T extends string | number> extends Omit<EnumSelectInputProps<T>, "displayedEnums" | "enumObject" | "label"> {}

export const EnumSelectInput = forwardRef(function EnumSelectInput<T extends string | number>(props: EnumSelectInputProps<T>, ref: Ref<GenericInputRef>) {
  // Generate options from the enum object and the displayedEnums mapping
  const enumOptions: SelectOption[] = Object.values(props.enumObject)
    .filter((v): v is string | number => typeof v === "string" || typeof v === "number") // Narrow the type for the filter
    .map((enumValue: string | number) => ({
      // Explicitly type enumValue as string | number
      value: enumValue,
      label: props.displayedEnums[enumValue as T]?.name || String(enumValue), // Use mapped name or fallback to stringified enum value
    }));

  // Add an initial "Select..." placeholder option
  const optionsWithPlaceholder = [{ value: "", label: `Select ${props.label.toLowerCase()}`, disabled: true }, ...enumOptions];

  // Handle change event and cast the selected value back to the generic enum type T
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    props.onChange(selectedValue === "" ? null : (selectedValue as T));
  };

  return (
    <SelectInput
      id={`${props.name || props.label.toLowerCase().replace(/\s/g, "-")}-select`} // Unique ID
      name={props.name || props.label.toLowerCase().replace(/\s/g, "-")} // Use provided name or default
      label={props.label}
      options={optionsWithPlaceholder}
      value={props.value || ""} // Set current value, or empty string for placeholder
      onChange={handleSelectChange}
      required={props.required}
      forceValidate={props.forceValidate}
      className="bg-[#202f45] px-4 py-3 rounded-md font-montserrat font-normal text-[#ffffff] text-[16px] outline-none cursor-pointer hover:bg-[#2a3f56] transition-colors"
      ref={ref} // Forward the ref
    />
  );
});
