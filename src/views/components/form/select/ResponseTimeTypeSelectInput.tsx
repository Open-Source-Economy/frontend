import React, { forwardRef, Ref } from "react";
import { SelectInput } from "./SelectInput"; // Adjust path if SelectInput is not in the same directory
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model"; // Import ResponseTimeType enum
import { GenericInputRef } from "../GenericInput";
import { displayedResponseTimes } from "../../../data"; // Import GenericInputRef

interface ResponseTimeTypeSelectInputProps {
  value: ResponseTimeType | null; // Value can be null for initial state
  onChange: (responseTime: ResponseTimeType | null) => void;
  required?: boolean;
  forceValidate?: boolean;
  name?: string; // Add name prop for consistent form handling
}

export const ResponseTimeTypeSelectInput = forwardRef(function ResponseTimeTypeSelectInput(props: ResponseTimeTypeSelectInputProps, ref: Ref<GenericInputRef>) {
  const { value, onChange, required, forceValidate, name } = props;

  // Map the ResponseTimeType enum values to SelectOption format
  const responseTimeOptions = Object.values(ResponseTimeType).map(time => ({
    value: time,
    label: displayedResponseTimes[time]?.name || time, // Use the name from displayedResponseTimes
  }));

  // Add an initial "Select..." option if not required or if the current value is null
  const optionsWithPlaceholder = [{ value: "", label: "Select response time", disabled: true }, ...responseTimeOptions];

  // Handle the change event from the underlying SelectInput and cast the value to ResponseTimeType
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue === "" ? null : (selectedValue as ResponseTimeType));
  };

  return (
    <SelectInput
      id="response-time-select" // A unique ID is crucial for accessibility
      name={name || "responseTime"} // Use provided name prop or default
      label="Response Time" // The label displayed above the select input
      options={optionsWithPlaceholder} // The dynamically generated response time options
      value={value || ""} // The currently selected response time value, or empty string for placeholder
      onChange={handleSelectChange} // The handler for when the response time changes
      required={required} // Prop indicating if a selection is required
      forceValidate={forceValidate} // Prop to force validation display
      // Tailwind CSS for styling - make sure these classes are available in your project
      className="bg-[#202f45] px-4 py-3 rounded-md font-montserrat font-normal text-[#ffffff] text-[16px] outline-none cursor-pointer hover:bg-[#2a3f56] transition-colors"
      ref={ref} // Forward the ref from this component to the underlying SelectInput component
    />
  );
});
