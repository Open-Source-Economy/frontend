import React from "react";
import { FormField } from "src/views/components/ui/forms/form-field";
import { RadioGroup } from "src/views/components/ui/radio-group";
import { RadioOption } from "src/views/components/ui/forms/RadioOption";
import { ValidationError } from "src/views/components/ui/forms/validation-requirements";

interface BiggerOpportunitiesRadioGroupProps {
  value: boolean | null | undefined;
  onChange: (value: boolean | null) => void;
  error?: string | ValidationError;
}

export const BiggerOpportunitiesRadioGroup: React.FC<BiggerOpportunitiesRadioGroupProps> = ({ value, onChange, error }) => {
  const getRadioValue = () => {
    if (value === true) return "yes";
    if (value === false) return "no";
    if (value === null) return "maybe";
    return undefined;
  };

  const handleValueChange = (radioValue: string) => {
    if (radioValue === "yes") onChange(true);
    else if (radioValue === "no") onChange(false);
    else if (radioValue === "maybe") onChange(null);
  };

  const validationError: ValidationError | undefined = typeof error === "string" ? { error } : error;

  return (
    <FormField label="Are you open to bigger opportunities if we encounter some?" required error={validationError}>
      <RadioGroup value={getRadioValue()} onValueChange={handleValueChange}>
        <div className="flex gap-4">
          <RadioOption value="yes" id="bigger-opportunities-yes" label="Yes, I'm interested" />
          <RadioOption value="maybe" id="bigger-opportunities-maybe" label="Maybe" />
          <RadioOption value="no" id="bigger-opportunities-no" label="No, prefer smaller projects" />
        </div>
      </RadioGroup>
    </FormField>
  );
};
