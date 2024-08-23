import React from "react";

interface SelectFilterProps {
  ariaLabel: string;
  labelValues: { value: string; label: string }[];
  onFilterChange: (value: string) => void;
}

export function SelectFilter(props: SelectFilterProps) {
  return (
    <select className="form-select c-select" id="ddlProducts" aria-label={props.ariaLabel} onChange={e => props.onFilterChange(e.target.value)}>
      {props.labelValues.map((category, index) => (
        <option key={index} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
}
