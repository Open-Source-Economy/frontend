import { FormField } from "src/views/components/ui/forms/form-field";
import { SelectField } from "src/views/components/ui/forms/select/select-field";
import { Input } from "src/views/components/ui/forms/inputs/input";
import { ValidationError } from "src/views/components/ui/forms/validation-requirements";
import * as dto from "@open-source-economy/api-types";
import { CurrencyCompanion } from "src/utils/companions";

interface ServiceRateInputProps {
  currency: dto.Currency;
  rate: number;
  onCurrencyChange: (currency: dto.Currency) => void;
  onRateChange: (rate: number) => void;
  error?: string;
}

// Currency symbol component that renders text instead of icon
function CurrencySymbol(props: { currency: dto.Currency }) {
  return <span className="text-brand-accent font-medium">{CurrencyCompanion.symbol(props.currency)}</span>;
}

export function ServiceRateInput(props: ServiceRateInputProps) {
  const validationResult: ValidationError | undefined = props.error ? { error: props.error } : undefined;

  return (
    <FormField label="Hourly Rate" required error={validationResult}>
      <div className="flex gap-2">
        <div className="w-32">
          <SelectField
            options={CurrencyCompanion.selectOptions()}
            value={props.currency}
            onChange={(value) => props.onCurrencyChange(value as dto.Currency)}
          />
        </div>
        <div className="flex-1">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <CurrencySymbol currency={props.currency} />
            </div>
            <Input
              type="number"
              min={0}
              step={5}
              value={props.rate || ""}
              onChange={(e) => props.onRateChange(parseFloat(e.target.value) || 0)}
              placeholder="150"
              className="w-36 pl-10"
              variant={props.error ? "error" : "default"}
            />
          </div>
        </div>
      </div>
    </FormField>
  );
}
