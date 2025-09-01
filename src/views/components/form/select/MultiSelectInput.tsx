import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { BaseProps, BaseRef } from "../Base";

export interface SelectOption {
  value: string;
  label: string;
  isCategory?: boolean;
  hasIcon?: boolean;
  isAddOption?: boolean;
  isAllOption?: boolean;
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
  onAddProject?: () => void;
}

export const MultiSelectInput = forwardRef(function MultiSelectInput(props: MultiSelectInputProps, ref: Ref<MultiSelectInputRef>) {
  const { options, value, onChange, id, name, placeholder = "Select...", isOpen: controlledIsOpen, onToggle, onAddProject, ...rest } = props;
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
    const option = options.find(opt => opt.value === optionValue);

    // Don't allow selection of category headers
    if (option?.isCategory) return;

    // Handle "Add different project" option
    if (option?.isAddOption) {
      onAddProject?.();
      setIsOpen(false);
      return;
    }

    // Handle "All projects" option
    if (option?.isAllOption) {
      const allProjectValues = options
        .filter(opt => !opt.isCategory && !opt.isAddOption && !opt.isAllOption)
        .map(opt => opt.value);

      const isAllSelected = allProjectValues.every(val => value.includes(val));

      if (isAllSelected) {
        onChange([]);
      } else {
        onChange(allProjectValues);
      }
      runValidation(isAllSelected ? [] : allProjectValues, false);
      return;
    }

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

  const selectedLabels = value.map(selectedValue => options.find(opt => opt.value === selectedValue && !opt.isCategory && !opt.isAddOption && !opt.isAllOption)?.label).filter(Boolean) as string[];

  const allProjectOptions = options.filter(opt => !opt.isCategory && !opt.isAddOption && !opt.isAllOption);
  const isAllSelected = allProjectOptions.length > 0 && allProjectOptions.every(opt => value.includes(opt.value));

  const selectDisplayClasses = `
    flex justify-between items-center flex-1 bg-[#202F45] px-3 py-3 rounded-md cursor-pointer border
    ${internalError ? "border-red-500" : "border-white"}
  `;

  return (
    <div className="flex flex-col items-start gap-0 relative w-full" ref={dropdownRef}>
      {/* Input Display */}
      <div className="flex flex-col items-start gap-0 w-full">
        <div className="flex items-start gap-2.5 w-full">
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
            <div className="flex-1 overflow-hidden">
              {selectedLabels.length > 0 ? (
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal truncate">
                  {selectedLabels.join(", ")}
                </span>
              ) : (
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">|
                </span>
              )}
            </div>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            >
              <path d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hidden inputs for form submission */}
      {value.map((val, index) => (
        <input type="hidden" key={index} name={`${name || "multiSelect"}[${index}]`} value={val} />
      ))}

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#202F45] rounded-md z-50 border border-[#202F45] max-h-[400px] overflow-y-auto">
          {options.map((option, index) => {
            let isSelected = value.includes(option.value);

            // For "All projects" option, check if all projects are selected
            if (option.isAllOption) {
              isSelected = isAllSelected;
            }

            const isCategory = option.isCategory;
            const isAddOption = option.isAddOption;
            const hasIcon = option.hasIcon;

            if (isCategory) {
              // Category header - non-selectable
              return (
                <div key={option.value} className="flex px-6 py-2 items-center bg-[#202F45]">
                  <span className="flex-1 text-white font-montserrat text-[16px] leading-[150%] font-medium opacity-40">{option.label}</span>
                </div>
              );
            }

            if (isAddOption) {
              // "Add different project" option with shadow
              return (
                <div
                  key={option.value}
                  className="flex px-6 py-3 items-center gap-2.5 cursor-pointer bg-[#202F45] hover:bg-[rgba(255,255,255,0.05)] shadow-[0_-2px_4px_0_rgba(20,35,58,0.50)] transition-colors"
                  onClick={() => handleOptionClick(option.value)}
                  style={{ paddingLeft: '25px' }}
                >
                  {/* Plus Icon */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1V13M1 7H13" stroke="white" strokeLinecap="round"/>
                  </svg>

                  {/* Label */}
                  <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">{option.label}</span>
                </div>
              );
            }

            // Regular selectable option
            return (
              <div
                key={option.value}
                className={`flex py-3 items-center gap-2.5 cursor-pointer transition-colors ${
                  isSelected && !option.isAllOption
                    ? "bg-gradient-to-r from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.08)]"
                    : "bg-[#202F45] hover:bg-[rgba(255,255,255,0.05)]"
                }`}
                onClick={() => handleOptionClick(option.value)}
                style={{ paddingLeft: '25px', paddingRight: '12px' }}
              >
                {/* Checkbox */}
                <div className={`w-[18px] h-[18px] border border-white rounded-sm bg-[#202F45] flex items-center justify-center relative ${
                  isSelected ? 'bg-[#202F45]' : ''
                }`}>
                  {isSelected && (
                    <div className="w-[14px] h-[14px] bg-[#FF7E4B] rounded-sm absolute" style={{ left: '2px', top: '2px' }} />
                  )}
                </div>

                {/* GitHub Icon (if applicable) */}
                {hasIcon && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 1.75903C6.19875 1.75903 1.5 6.45778 1.5 12.259C1.5 16.9053 4.50562 20.8297 8.67937 22.2209C9.20437 22.3128 9.40125 21.9978 9.40125 21.7222C9.40125 21.4728 9.38813 20.6459 9.38813 19.7665C6.75 20.2522 6.0675 19.1234 5.8575 18.5328C5.73938 18.2309 5.2275 17.299 4.78125 17.0497C4.41375 16.8528 3.88875 16.3672 4.76813 16.354C5.595 16.3409 6.18563 17.1153 6.3825 17.4303C7.3275 19.0184 8.83688 18.5722 9.44063 18.2965C9.5325 17.614 9.80812 17.1547 10.11 16.8922C7.77375 16.6297 5.3325 15.724 5.3325 11.7078C5.3325 10.5659 5.73938 9.62091 6.40875 8.88591C6.30375 8.62341 5.93625 7.54716 6.51375 6.10341C6.51375 6.10341 7.39313 5.82778 9.40125 7.17966C10.2413 6.94341 11.1338 6.82528 12.0263 6.82528C12.9188 6.82528 13.8113 6.94341 14.6513 7.17966C16.6594 5.81466 17.5387 6.10341 17.5387 6.10341C18.1163 7.54716 17.7488 8.62341 17.6438 8.88591C18.3131 9.62091 18.72 10.5528 18.72 11.7078C18.72 15.7372 16.2656 16.6297 13.9294 16.8922C14.31 17.2203 14.6381 17.8503 14.6381 18.8347C14.6381 20.239 14.625 21.3678 14.625 21.7222C14.625 21.9978 14.8219 22.3259 15.3469 22.2209C19.4944 20.8297 22.5 16.8922 22.5 12.259C22.5 6.45778 17.8013 1.75903 12 1.75903Z" fill="white"/>
                  </svg>
                )}

                {/* Label */}
                <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">{option.label}</span>
              </div>
            );
          })}

          {/* Scroll Bar */}
          {options.length > 6 && (
            <div className="absolute right-0 top-0 w-[3px] h-full bg-[#0E1F35] rounded-full">
              <div className="w-[3px] h-[115px] bg-white rounded-full" />
            </div>
          )}
        </div>
      )}

      {internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
