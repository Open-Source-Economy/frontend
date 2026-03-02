import React from "react";
import { RadioGroupItem } from "src/views/components/ui/radio-group";
import { Label } from "src/views/components/ui/forms/label";

interface RadioOptionProps {
  value: string;
  id: string;
  label: string;
  className?: string;
}

export function RadioOption(props: RadioOptionProps) {
  const className = props.className ?? "";

  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <RadioGroupItem value={props.value} id={props.id} />
      <Label
        htmlFor={props.id}
        className="cursor-pointer text-brand-neutral-900 mb-0 leading-none transition-colors group-has-[[data-state=checked]]:text-brand-accent"
      >
        {props.label}
      </Label>
    </div>
  );
}
