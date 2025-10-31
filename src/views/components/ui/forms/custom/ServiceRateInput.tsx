import React from "react";
import { FormField } from "src/views/components/ui/forms/form-field";
import { SelectField } from "src/views/components/ui/forms/select-field";
import { Input } from "src/views/components/ui/forms/input";
import { Currency } from "@open-source-economy/api-types";
import { CurrencyCompanion } from "src/ultils/companions";

interface ServiceRateInputProps {
  currency: Currency;
  rate: number;
  onCurrencyChange: (currency: Currency) => void;
  onRateChange: (rate: number) => void;
  error?: string;
}

// Currency symbol component that renders text instead of icon
const CurrencySymbol: React.FC<{ currency: Currency }> = ({ currency }) => {
  return <span className="text-brand-accent font-medium">{CurrencyCompanion.symbol(currency)}</span>;
};

export const ServiceRateInput: React.FC<ServiceRateInputProps> = ({ currency, rate, onCurrencyChange, onRateChange, error }) => {
  return (
    <FormField label="Hourly Rate" required error={error}>
      <div className="flex gap-2">
        <div className="w-32">
          <SelectField options={CurrencyCompanion.selectOptions()} value={currency} onChange={value => onCurrencyChange(value as Currency)} />
        </div>
        <div className="flex-1">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <CurrencySymbol currency={currency} />
            </div>
            <Input
              type="number"
              min={0}
              step={5}
              value={rate || ""}
              onChange={e => onRateChange(parseFloat(e.target.value) || 0)}
              placeholder="150"
              className="w-36 pl-10"
              variant={error ? "error" : "default"}
            />
          </div>
        </div>
      </div>
    </FormField>
  );
};
