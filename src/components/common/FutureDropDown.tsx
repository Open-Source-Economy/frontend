import React, { useState, useRef, useEffect } from "react";
import { ArrowIcon } from "../common/icons";

interface Option {
  id: string | number;
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  defaultValue: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

export const FutureDropDown: React.FC<DropdownProps> = ({ options, defaultValue, onChange, className = "", required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    onChange(value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-100">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex text-left items-center justify-between border-bottom border-[#fff] bg-transparent text-sm md:text-[16px] lg:text-[23px] pb-3 outline-none text-[#FCFEFD] w-100 ff_michroma ${className}`}
      >
        <span>{selectedOption}</span>
        <ArrowIcon />
      </button>

      {isOpen && (
        <div className="absolute z-[999] top-12 cursor-pointer left-0 mb-2 w-full bg-[#0e1f35] border border-gray-300 mt-2 shadow-lg">
          <div className="p-2">
            {options.map(option => (
              <h1 key={option.id} onClick={() => handleSelect(option.value)} className="block px-4 py-2 text-white hover:bg-[#1a2b41] transition-colors">
                {option.label}
              </h1>
            ))}
          </div>
        </div>
      )}
      {required && (
        <select className="opacity-0 h-0 w-0 absolute" required value={selectedOption === defaultValue ? "" : selectedOption}>
          <option value="">{defaultValue}</option>
          {options.map(option => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
