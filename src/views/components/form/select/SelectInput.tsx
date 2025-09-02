import React, { forwardRef, Ref, SelectHTMLAttributes, useEffect, useImperativeHandle, useRef, useState } from "react";
import { BaseProps, BaseRef } from "../Base";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectInputRef extends BaseRef {}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseProps {
  options: SelectOption[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput = forwardRef(function SelectInput(props: SelectInputProps, ref: Ref<SelectInputRef>) {
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const runValidation = (currentValue: string | number, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;
    if (props.required && !currentValue) {
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
        return runValidation(props.value, showInputError);
      },
    }),
    [props.value, props.required, props.label],
  );

  const selectedOptionLabel = props.options.find(option => option.value === props.value)?.label || "Select...";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.value]);

  const handleOptionClick = (optionValue: string | number) => {
    const syntheticEvent = {
      target: {
        value: optionValue,
        name: props.name,
      } as HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>;

    props.onChange(syntheticEvent);
    setShowDropdown(false);
  };

  const inputContainerClasses = `
    box-border content-stretch flex flex-col gap-2 items-start justify-start
    p-0 relative shrink-0 w-full
  `;

  const selectDisplayClasses = `
    basis-0 bg-[#202f45] box-border content-stretch flex flex-row gap-1
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
      {props.label && (
        <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0">
          <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
            <div className={labelTextContainerClasses}>
              <p id={`${props.id}-label`} className="block leading-[1.5] whitespace-pre">
                {" "}
                {props.label} {props.required && <span className="text-red-500">*</span>}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
        <div
          className={selectDisplayClasses}
          onClick={() => {
            setShowDropdown(!showDropdown);
            if (props.required && !props.value && !internalError) {
              setInternalError(undefined);
            }
          }}
          tabIndex={0}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
          aria-labelledby={`${props.id}-label`}
        >
          <span className="font-montserrat font-normal text-[#ffffff] text-[16px] flex-grow">{selectedOptionLabel}</span>
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

      <input type="hidden" name={props.name} value={props.value} />

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-[#202f45] border border-[#2a3f56] rounded-md mt-1 max-h-[200px] overflow-y-auto z-[100] w-full">
          {props.options.map(option => (
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
