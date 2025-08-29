import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { BaseProps, BaseRef } from "../Base";

export interface SelectOption {
  value: string;
  label: string;
}

export interface MultiSelectInputRef extends BaseRef {}

interface MultiSelectInputProps extends BaseProps {
  options: SelectOption[];
  value: string[];
  onChange: (selectedValues: string[]) => void;
  id?: string;
  name?: string;
}

export const MultiSelectInput = forwardRef(function MultiSelectInput(props: MultiSelectInputProps, ref: Ref<MultiSelectInputRef>) {
  const { options, value, onChange, id, name, ...rest } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const runValidation = (currentValues: string[], showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;
    if (props.required && currentValues.length === 0) {
      errorMessage = `${props.label} is required.`;
    }

    if (showInputError) {
      setInternalError(errorMessage);
    }
    return !errorMessage;
  };

  useImperativeHandle(
    ref,
    () => ({
      validate: (showInputError: boolean) => {
        return runValidation(value, showInputError);
      },
    }),
    [value, props.required, props.label],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        runValidation(value, true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]);

  const handleOptionClick = (optionValue: string) => {
    const isSelected = value.includes(optionValue);
    let newSelectedValues: string[];

    if (isSelected) {
      newSelectedValues = value.filter(val => val !== optionValue);
    } else {
      newSelectedValues = [...value, optionValue];
    }

    onChange(newSelectedValues);
    runValidation(newSelectedValues, false);
  };

  const selectedLabels = value.map(selectedValue => options.find(opt => opt.value === selectedValue)?.label).filter(Boolean) as string[];

  const inputContainerClasses = `
    box-border content-stretch flex flex-col gap-2 items-start justify-start
    p-0 relative shrink-0 w-full
  `;

  const selectDisplayClasses = `
    basis-0 bg-[#202f45] box-border content-stretch flex flex-row flex-wrap gap-2
    grow items-center justify-between min-h-px min-w-px p-[12px] relative rounded-md shrink-0
    cursor-pointer
    ${internalError ? "border border-red-500" : "border border-[#202f45]"}
  `;

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
              {props.label} {props.required && <span className="text-red-500">*</span>}
            </p>
          </div>
        </div>
      </div>

      <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
        <div
          className={selectDisplayClasses}
          onClick={() => {
            setShowDropdown(!showDropdown);
            runValidation(value, true);
          }}
          tabIndex={0}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
          aria-labelledby={`${id}-label`}
          {...rest}
        >
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
                {isSelected && (
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
