import React from "react";

interface SelectFilterProps {
  ariaLabel: string;
  labelValues: { value: string; label: string }[];
  onFilterChange: (value: string) => void;
}

export function SelectFilter(props: SelectFilterProps) {
  return (
    <select
      aria-label={props.ariaLabel}
      onChange={e => props.onFilterChange(e.target.value)}
      style={{ backgroundSize: "5%" }}
      className="form-select text-[#8693A4] w-100 text-lg cursor-pointer border-1 border-[#8693A4] rounded-[9px] outline-none bg-transparent p-3 lg:w-[196px] w-[260px]"
    >
      {props.labelValues.map((category, index) => (
        <option key={index} value={category.value} className="text-black">
          {category.label}
        </option>
      ))}
    </select>
  );
}
