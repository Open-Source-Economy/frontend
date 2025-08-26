import React, { forwardRef, Ref, SelectHTMLAttributes, useEffect, useImperativeHandle, useRef, useState } from "react";
import { GenericInputRef } from "../GenericInput";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string; // Add id to props to ensure aria-labelledby works
  label: string;
  options: SelectOption[];
  required?: boolean;
  value: string | number; // Ensure value is controlled by parent
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Pass the change event
  forceValidate?: boolean; // Prop to pass down for initial validation or external trigger
}

export const SelectInput = forwardRef(function SelectInput(
  props: SelectInputProps,
  ref: Ref<GenericInputRef>, // The ref is typed as Ref<GenericInputRef>
) {
  const { id, label, options, required, value, onChange, className, forceValidate, ...rest } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for closing dropdown on outside click

  // Helper function to run validation and update internal error state
  const runValidation = (currentValue: string | number, showImmediately: boolean = false): boolean => {
    let errorMessage: string | undefined = undefined;
    if (required && !currentValue) {
      errorMessage = `${label} is required.`;
    }

    // Only set the error state if it should be shown immediately or if forced
    if (showImmediately || forceValidate) {
      setInternalError(errorMessage);
    }
    return !errorMessage; // Return true if valid, false if invalid
  };

  // Expose validate method via ref for parent components
  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        // When validate() is called, run validation and ensure errors are shown immediately.
        return runValidation(value, true);
      },
    }),
    [value, required, label],
  ); // Dependencies for useImperativeHandle

  // Effect to trigger validation when forceValidate becomes true
  useEffect(() => {
    if (forceValidate) {
      runValidation(value, true); // Force display of errors
    }
  }, [forceValidate, value]); // Depend on forceValidate and value

  // Find the currently selected label
  const selectedOptionLabel = options.find(option => option.value === value)?.label || "Select...";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        runValidation(value, true); // Validate on dropdown close
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]);

  const handleOptionClick = (optionValue: string | number) => {
    const syntheticEvent = {
      target: {
        value: optionValue,
        name: props.name, // Pass the name from props
      } as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>;

    onChange(syntheticEvent); // Notify parent of change
    setShowDropdown(false); // Close dropdown after selection
    runValidation(optionValue, true); // Validate immediately after selection
  };

  // Classes for the main container div
  const inputContainerClasses = `
    box-border content-stretch flex flex-col gap-2 items-start justify-start
    p-0 relative shrink-0 w-full
  `;

  // Classes for the custom select display area
  const selectDisplayClasses = `
    basis-0 bg-[#202f45] box-border content-stretch flex flex-row gap-1
    grow items-center justify-between min-h-px min-w-px p-[12px] relative rounded-md shrink-0
    cursor-pointer
    ${internalError ? "border border-red-500" : "border border-[#202f45]"}
  `;

  // Classes for the label text container
  const labelTextContainerClasses = `
    font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff]
    text-[16px] text-left text-nowrap
  `;

  return (
    <div className={inputContainerClasses} ref={dropdownRef}>
      <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
          <div className={labelTextContainerClasses}>
            <p id={`${id}-label`} className="block leading-[1.5] whitespace-pre">
              {" "}
              {/* Added ID for accessibility */}
              {label} {required && <span className="text-red-500">*</span>}
            </p>
          </div>
        </div>
      </div>

      <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
        <div
          className={selectDisplayClasses}
          onClick={() => {
            setShowDropdown(!showDropdown);
            // On opening, if required and empty, don't show error yet (let onBlur/validate() handle it)
            if (required && !value && !internalError) {
              setInternalError(undefined);
            }
          }}
          tabIndex={0} // Make div focusable for accessibility
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
          aria-labelledby={`${id}-label`}
        >
          <span className="font-montserrat font-normal text-[#ffffff] text-[16px] flex-grow">{selectedOptionLabel}</span>
          {/* Dropdown arrow icon (using a simple caret) */}
          <svg
            className={`w-4 h-4 text-[#ffffff] transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {/* Hidden input to hold the actual value for form submission (important for native form behavior) */}
      <input type="hidden" name={props.name} value={value} />

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-10 w-full">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="w-full px-3 py-2 text-left font-montserrat font-normal text-[#ffffff] text-[16px] hover:bg-[#2a3f56] transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
