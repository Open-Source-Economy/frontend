import * as dto from "@open-source-economy/api-types";
import { FormField } from "src/views/components/ui/forms/form-field";
import { RadioGroup } from "src/views/components/ui/radio-group";
import { RadioOption } from "src/views/components/ui/forms/RadioOption";
import { ValidationError } from "src/views/components/ui/forms/validation-requirements";

interface BiggerOpportunitiesRadioGroupProps {
  value: boolean | null | undefined;
  onChange: (value: boolean | null) => void;
  error?: string | ValidationError;
}

export function BiggerOpportunitiesRadioGroup(props: BiggerOpportunitiesRadioGroupProps) {
  const getRadioValue = () => {
    if (props.value === true) return dto.OpenToOtherOpportunityType.YES;
    if (props.value === false) return dto.OpenToOtherOpportunityType.NO;
    if (props.value === null) return dto.OpenToOtherOpportunityType.MAYBE;
    return undefined;
  };

  const handleValueChange = (radioValue: string) => {
    if (radioValue === dto.OpenToOtherOpportunityType.YES) props.onChange(true);
    else if (radioValue === dto.OpenToOtherOpportunityType.NO) props.onChange(false);
    else if (radioValue === dto.OpenToOtherOpportunityType.MAYBE) props.onChange(null);
  };

  const validationError: ValidationError | undefined =
    typeof props.error === "string" ? { error: props.error } : props.error;

  return (
    <FormField label="Are you open to bigger opportunities if we encounter some?" required error={validationError}>
      <RadioGroup value={getRadioValue()} onValueChange={handleValueChange}>
        <div className="flex gap-4">
          <RadioOption value={dto.OpenToOtherOpportunityType.YES} id="bigger-opportunities-yes" label="Yes, I'm interested" />
          <RadioOption value={dto.OpenToOtherOpportunityType.MAYBE} id="bigger-opportunities-maybe" label="Maybe" />
          <RadioOption value={dto.OpenToOtherOpportunityType.NO} id="bigger-opportunities-no" label="No, prefer smaller projects" />
        </div>
      </RadioGroup>
    </FormField>
  );
}
