import React from "react";
import { Input } from "src/views/components/ui/forms/input";
import { FormField } from "src/views/components/ui/forms/form-field";

interface WeeklyAvailabilityInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export const WeeklyAvailabilityInput: React.FC<WeeklyAvailabilityInputProps> = ({ value, onChange, error }) => {
  return (
    <FormField label="Weekly Hours" required error={error} hint="Approximate hours per week you're typically available (for planning purposes)">
      <div className="relative w-fit">
        <Input
          type="number"
          min={1}
          max={168}
          value={value || ""}
          onChange={e => onChange(parseInt(e.target.value) || 0)}
          placeholder="20"
          className="w-48 pr-28"
          variant={error ? "error" : "default"}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-neutral-500 text-sm pointer-events-none">hours/week</span>
      </div>
    </FormField>
  );
};
