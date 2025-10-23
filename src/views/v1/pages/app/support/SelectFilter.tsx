"use client";
import { Check, CrownIcon } from "lucide-react";
import * as React from "react";
import { ToolTipIcon } from "src/ultils/Icons";
import { cn } from "src/views/v1/components";
import IsUpgraded from "./IsUpgraded";
import { DropdownOption } from "./DropdownOption";

interface SelectFilterProps {
  ariaLabel: string;
  labelValues: DropdownOption[];
  onFilterChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  tooltip?: string;
  isUpgraded?: boolean;
  disabled?: boolean;
}

export function SelectFilter({ ariaLabel, labelValues, onFilterChange, placeholder, label, tooltip, isUpgraded, disabled = false }: SelectFilterProps) {
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

  // Only reset selected value when options change completely
  // Don't reset when a value is intentionally selected
  React.useEffect(() => {
    // Skip initial render
    if (labelValues.length > 0) {
      setSelectedValue("");
    }
  }, [JSON.stringify(labelValues.map(item => item.value))]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onFilterChange(value);
    setIsOpen(false);
  };

  // Update selectedValue if it comes from parent as a prop
  React.useEffect(() => {
    // Find if there's a pre-selected item in labelValues
    const preSelectedItem = labelValues.find(item => item.isSelected);
    if (preSelectedItem) {
      setSelectedValue(preSelectedItem.value);
    }
  }, []);

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <div className="flex items-center justify-between gap-2 mb-1">
          <label className="text-[#FFFFFF99] 3xl:text-lg font-medium">{label}</label>
          {tooltip && (
            <div className="relative flex items-center">
              <div className="text-primary-user flex items-center gap-1 justify-center text-sm">
                Beta Function
                <div className="group relative cursor-help inline-block duration-300">
                  <ToolTipIcon />
                  <div
                    className="absolute z-50  md:left-1/2 top-full transform -right-4 md:-translate-x-1/2 mt-2  !duration-300 transition-all
                    min-w-[200px] sm:min-w-[287px] max-w-[287px] 
                    hidden group-hover:block 
                    !p-3 3xl:!p-4 
                    bg-primary-user text-white rounded-lg 
                    text-[11px] !leading-[160%]"
                  >
                    {/* Arrow - centered */}
                    <div
                      className="absolute -top-2 md:left-1/2 transform right-[15px] md:-translate-x-1/2
                      w-0 h-0 
                      border-l-8 border-l-transparent 
                      border-r-8 border-r-transparent 
                      border-b-8 border-b-primary-user"
                    ></div>
                    {tooltip}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={`relative ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`} onClick={handleDropdownClick} aria-label={ariaLabel}>
        <div className="bg-[#202F45] w-full rounded-[10px] p-3 flex items-center justify-between">
          <span className={`${selectedValue ? "text-white" : "text-[#8693A4] "} 3xl:text-lg`}>
            {selectedValue ? labelValues.find(item => item.value === selectedValue)?.label : placeholder}
          </span>

          <svg
            className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")}
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="6"
            viewBox="0 0 11 6"
            fill="none"
          >
            <path
              d="M9.74989 0.164062C10.3534 0.164062 10.6686 0.862479 10.3045 1.31369L10.2507 1.37319L6.00068 5.62319C5.87871 5.74515 5.71643 5.81841 5.54428 5.82923C5.37214 5.84006 5.20196 5.7877 5.06568 5.68198L4.99909 5.62319L0.749094 1.37319L0.690302 1.3066L0.652052 1.25206L0.613802 1.18406L0.601761 1.15856L0.582636 1.1111L0.559969 1.0346L0.552885 0.997062L0.545802 0.954563L0.542969 0.914187V0.830604L0.54651 0.789521L0.552885 0.747021L0.559969 0.710187L0.582636 0.633688L0.601761 0.586229L0.651344 0.492729L0.697385 0.428979L0.749094 0.371604L0.815677 0.312813L0.870219 0.274563L0.938219 0.236313L0.963719 0.224271L1.01118 0.205146L1.08768 0.182479L1.12522 0.175396L1.16772 0.168312L1.20809 0.165479L9.74989 0.164062Z"
              fill="white"
            />
          </svg>
        </div>
        {isOpen && !disabled && labelValues.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-[#202F45] rounded-[10px] shadow-lg overflow-hidden max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#6E7591] scrollbar-track-[#202F45]">
            {labelValues.map((item, index) => (
              <div
                key={index}
                className="flex items-center group justify-between py-2.5 px-3 font-medium hover:bg-[rgba(255,255,255,0.10)] cursor-pointer"
                onClick={() => handleSelect(item.value)}
              >
                <span
                  className={`bg-white text-transparent bg-clip-text 
                   ${selectedValue === item.value ? "bg-gradient-custom" : "group-hover:bg-gradient-custom"}
                  `}
                >
                  {item.label}
                </span>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gradient-custom font-medium text-white flex items-center gap-1">
                      <CrownIcon width={14} /> {item.badge}
                    </span>
                  )}
                  {selectedValue === item.value && (
                    <span>
                      <Check className="w-4 h-4 text-[#FF518C]" />
                    </span>
                  )}
                  {selectedValue !== item.value && !item.badge && (
                    <span className="hidden group-hover:block">
                      <Check className="w-4 h-4 text-[#FF518C]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isUpgraded && <IsUpgraded />}
    </div>
  );
}
