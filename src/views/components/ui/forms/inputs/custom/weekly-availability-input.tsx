import React from "react";
import { Input } from "src/views/components/ui/forms/inputs/input";
import { FormField } from "src/views/components/ui/forms/form-field";
import { ValidationError } from "src/views/components/ui/forms/validation-requirements";

interface WeeklyAvailabilityInputProps {
  value?: number;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export const WeeklyAvailabilityInput: React.FC<WeeklyAvailabilityInputProps> = ({ value, onChange, error }) => {
  const validationResult: ValidationError | undefined = error ? { error } : undefined;

  return (
    <FormField label="Weekly Hours" required error={validationResult} hint="Approximate hours per week you're typically available (for planning purposes)">
      <div className="relative w-fit">
        <Input
          type="number"
          min={0}
          max={45}
          value={value === undefined || Number.isNaN(value) ? "" : value}
          onChange={e => {
            const inputValue = e.target.value;
            if (inputValue === "") {
              onChange(undefined);
              return;
            }

            const parsedValue = Number(inputValue);
            onChange(Number.isNaN(parsedValue) ? undefined : parsedValue);
          }}
          placeholder="20"
          className="w-48 pr-28"
          variant={error ? "error" : "default"}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-neutral-500 text-sm pointer-events-none">hours/week</span>
      </div>
    </FormField>
  );
};
