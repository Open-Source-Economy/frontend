import React from "react";
import { RadioGroupItem } from "../radio-group";
import { Label } from "./label";

interface RadioOptionProps {
  value: string;
  id: string;
  label: string;
  className?: string;
}

export const RadioOption: React.FC<RadioOptionProps> = ({ value, id, label, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <RadioGroupItem value={value} id={id} />
      <Label
        htmlFor={id}
        className="cursor-pointer text-brand-neutral-900 mb-0 leading-none transition-colors group-has-[[data-state=checked]]:text-brand-accent"
      >
        {label}
      </Label>
    </div>
  );
};
