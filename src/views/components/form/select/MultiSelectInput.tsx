import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { BaseProps, BaseRef } from "../Base";

export interface SelectOption {
  value: string;
  label: string;
  isCategory?: boolean;
}

export interface MultiSelectInputRef extends BaseRef {}

interface MultiSelectInputProps extends BaseProps {
  options: SelectOption[];
  value: string[];
  onChange: (selectedValues: string[]) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const MultiSelectInput = forwardRef(function MultiSelectInput(props: MultiSelectInputProps, ref: Ref<MultiSelectInputRef>) {
  const { options, value, onChange, id, name, placeholder = "Select...", isOpen: controlledIsOpen, onToggle, ...rest } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;

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
        setIsOpen(false);
        runValidation(value, true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, setIsOpen]);

  const handleOptionClick = (optionValue: string) => {
    // Don't allow selection of category headers
    const option = options.find(opt => opt.value === optionValue);
    if (option?.isCategory) return;

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

  const selectedLabels = value
    .map(selectedValue => options.find(opt => opt.value === selectedValue && !opt.isCategory)?.label)
    .filter(Boolean) as string[];

  const selectDisplayClasses = `
    flex justify-between items-center flex-1 border-radius-md bg-[#202F45] px-3 py-3 rounded-md cursor-pointer
    ${internalError ? "border border-red-500" : ""}
  `;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Display */}
      <div
        className={selectDisplayClasses}
        onClick={() => {
          setIsOpen(!isOpen);
          runValidation(value, true);
        }}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
        {...rest}
      >
        <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">
          {placeholder}
        </span>
        
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z" fill="white"/>
        </svg>
      </div>

      {/* Hidden inputs for form submission */}
      {value.map((val, index) => (
        <input type="hidden" key={index} name={`${name || "multiSelect"}[${index}]`} value={val} />
      ))}

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#202F45] rounded-md mt-1 max-h-[400px] overflow-y-auto z-50 border border-[#202F45]">
          {options.map((option, index) => {
            const isSelected = value.includes(option.value);
            const isCategory = option.isCategory;
            
            if (isCategory) {
              // Category header - non-selectable
              return (
                <div
                  key={option.value}
                  className="flex px-6 py-2 items-center bg-[#202F45]"
                >
                  <span className="flex-1 text-white font-montserrat text-[16px] leading-[150%] font-medium opacity-40">
                    {option.label}
                  </span>
                </div>
              );
            }

            // Regular selectable option
            return (
              <div
                key={option.value}
                className={`flex px-6 py-3 items-center gap-2.5 cursor-pointer transition-colors ${
                  isSelected 
                    ? 'bg-gradient-to-r from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.08)] border-white border' 
                    : 'bg-[#202F45] hover:bg-[rgba(255,255,255,0.05)]'
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {/* Checkbox */}
                <div className="w-[18px] h-[18px] border border-white rounded-sm bg-[#202F45] flex items-center justify-center">
                  {isSelected && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                
                {/* Label */}
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
      {internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
