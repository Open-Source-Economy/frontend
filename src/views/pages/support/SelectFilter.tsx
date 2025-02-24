"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "src/views/components";
import { ToolTipIcon } from "src/Utils/Icons";

interface SelectFilterProps {
  ariaLabel: string;
  labelValues: {
    value: string;
    label: string;
    badge?: string;
    isSelected?: boolean;
  }[];
  onFilterChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  tooltip?: string;
}

export function SelectFilter({ ariaLabel, labelValues, onFilterChange, placeholder, label, tooltip }: SelectFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <div className="flex items-center justify-between gap-2 mb-2">
          <label className="text-[#FFFFFF99]  3xl:text-lg font-medium">{label}</label>
          {tooltip && (
            <div className="relative group flex items-center ">
              <div className=" rounded-full flex items-center gap-1 justify-center text-white cursor-help">
                Beta Function
                <ToolTipIcon />
              </div>
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-4 bg-[#FF518C] text-white rounded-lg text-sm">{tooltip}</div>
            </div>
          )}
        </div>
      )}
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-label={ariaLabel}>
        <div className="bg-[#202F45] text-[#8693A4] w-full rounded-xl p-3 flex items-center justify-between">
          <span>{selectedValue ? labelValues.find(item => item.value === selectedValue)?.label : placeholder}</span>
          <svg className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-[#202F45] rounded-xl shadow-lg overflow-hidden">
            {labelValues.map((item, index) => (
              <div
                key={index}
                className="flex items-center group justify-between py-2.5 px-3 font-medium hover:bg-[rgba(255,255,255,0.10)] cursor-pointer  "
                onClick={() => handleSelect(item.value)}
              >
                <span className="bg-white  group-hover:bg-gradient-custom text-transparent bg-clip-text "> {item.label}</span>
                <div className="flex items-center gap-2">
                  {item.badge && <span className="px-2 py-1 text-xs rounded-full bg-gradient-custom text-white">{item.badge}</span>}
                  <span className={item.badge ? "hidden" : "hidden group-hover:block"}>
                    <Check className="w-4 h-4 text-[#FF518C]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
