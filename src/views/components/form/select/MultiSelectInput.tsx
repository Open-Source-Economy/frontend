import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { GenericInputRef } from "../GenericInput"; // Removed InputHTMLAttributes as it's no longer extended

interface SelectOption {
  value: string;
  label: string;
}

// FIX: Removed extends InputHTMLAttributes<HTMLInputElement>
// Instead, explicitly define common HTML attributes like `name`, `id`, `className`, etc.,
// that are relevant and directly consumed by the MultiSelectInput's root div or hidden inputs.
interface MultiSelectInputProps {
  // No longer extending HTML attributes directly
  label: string;
  options: SelectOption[];
  required?: boolean;
  value: string[]; // Value is now an array of strings for multiple selections
  onChange: (selectedValues: string[]) => void; // onChange directly passes the array of selected values
  forceValidate?: boolean; // Prop to trigger validation externally

  // Explicitly add common HTML attributes that might be passed
  id?: string;
  name?: string;
  className?: string; // For styling the root div if needed
  // Any other standard HTML attributes like `aria-` properties should be passed via `...rest`
  // but their types won't be automatically inferred without extending a base HTMLAttributes interface.
  // For simplicity and direct control, we'll keep it minimal here.
}

export const MultiSelectInput = forwardRef(function MultiSelectInput(
  props: MultiSelectInputProps,
  ref: Ref<GenericInputRef>, // The ref is typed as GenericInputRef, as it exposes a validate() method
) {
  const { label, options, required, value, onChange, className, forceValidate, id, name, ...rest } = props; // Destructure id and name
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for closing dropdown on outside click

  // Helper function to run validation and update internal error state
  const runValidation = (currentValues: string[], showImmediately: boolean = false): boolean => {
    let errorMessage: string | undefined = undefined;
    if (required && currentValues.length === 0) {
      // Check if the array is empty for required validation
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
        return runValidation(value, true); // Pass the array value to validation
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
  }, [value]); // Depend on value to ensure validation uses latest state

  const handleOptionClick = (optionValue: string) => {
    const isSelected = value.includes(optionValue);
    let newSelectedValues: string[];

    if (isSelected) {
      newSelectedValues = value.filter(val => val !== optionValue); // Deselect
    } else {
      newSelectedValues = [...value, optionValue]; // Select
    }

    onChange(newSelectedValues); // Notify parent of change with the new array
    // We don't close the dropdown here to allow multiple selections
    runValidation(newSelectedValues); // Validate immediately after selection/deselection
  };

  // Get labels for currently selected options to display as pills
  const selectedLabels = value.map(selectedValue => options.find(opt => opt.value === selectedValue)?.label).filter(Boolean) as string[]; // Filter out undefined and cast

  // Classes for the main container div
  const inputContainerClasses = `
    box-border content-stretch flex flex-col gap-2 items-start justify-start
    p-0 relative shrink-0 w-full
  `;

  // Classes for the custom select display area
  const selectDisplayClasses = `
    basis-0 bg-[#202f45] box-border content-stretch flex flex-row flex-wrap gap-2
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
            <p className="block leading-[1.5] whitespace-pre">
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
            // On opening, validate to update error state if needed
            runValidation(value, true);
          }}
          tabIndex={0} // Make div focusable for accessibility
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
          aria-labelledby={`${id}-label`} // Use id prop here
          {...rest} // Pass any remaining props to the main interactive div
        >
          {/* Display selected items as pills or "Select..." placeholder */}
          {selectedLabels.length > 0 ? (
            <div className="flex flex-wrap gap-1 flex-grow">
              {selectedLabels.map((label, index) => (
                <span key={index} className="bg-[#ff7e4b] text-white text-xs px-2 py-1 rounded-full">
                  {label}
                </span>
              ))}
            </div>
          ) : (
            <span className="font-montserrat font-normal text-[#8a8a8a] text-[16px] flex-grow">Select...</span>
          )}

          {/* Dropdown arrow icon */}
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

      {/* Hidden inputs to hold the actual values for form submission */}
      {value.map((val, index) => (
        <input type="hidden" key={index} name={`${name || "multiSelect"}[${index}]`} value={val} />
      ))}

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-10 w-full">
          {options.map(option => {
            const isSelected = value.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`w-full px-3 py-2 text-left font-montserrat font-normal text-[16px] transition-colors
                  ${isSelected ? "bg-[#ff518c] text-white" : "text-[#ffffff] hover:bg-[#2a3f56]"}`}
              >
                {option.label}
                {isSelected && ( // Optional: Add a checkmark for selected items
                  <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
      {internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
