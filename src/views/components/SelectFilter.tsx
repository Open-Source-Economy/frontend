import React from "react";

interface SelectFilterProps {
  ariaLabel: string;
  labelValues: { value: string; label: string }[];
  onFilterChange: (value: string) => void;
  placeholder?: string;
  showBorder?: boolean;
}

export function SelectFilter({ ariaLabel, labelValues, onFilterChange, placeholder, showBorder = true }: SelectFilterProps) {
  return (
    <select
      aria-label={ariaLabel}
      onChange={e => onFilterChange(e.target.value)}
      style={{ backgroundSize: "10px" }}
      className={`form-select text-[#8693A4] w-100 text-lg cursor-pointer rounded-[9px] outline-none p-3 lg:w-[196px] w-[260px] ${
        showBorder ? "border-1 bg-transparent border-[#8693A4]" : "border-none bg-[#202F45]"
      }`}
      defaultValue=""
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {labelValues.map((category, index) => (
        <option key={index} value={category.value} className="text-black">
          {category.label}
        </option>
      ))}
    </select>
  );
}
