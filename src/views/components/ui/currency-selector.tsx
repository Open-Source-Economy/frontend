import React from "react";
import * as dto from "@open-source-economy/api-types";
import { CurrencyCompanion, CurrencyDisplay } from "src/ultils/companions/Currency.companion";
import { useAuth } from "src/views/auth/AuthContext";
import { PreferredCurrency } from "src/ultils/PreferredCurrency";
import { SelectField, SelectOption } from "./forms/select-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./forms/select";

interface CurrencySelectorProps {
  variant?: "default" | "compact";
  label?: string;
  className?: string;
}

function CurrencyItem({ display }: { display: CurrencyDisplay }) {
  return (
    <div className="flex items-center gap-2">
      <span>{display.flag}</span>
      <span>{display.name}</span>
      <span className="text-muted-foreground">({display.symbol})</span>
    </div>
  );
}

export function CurrencySelector({ variant = "default", label, className }: CurrencySelectorProps) {
  const authState = useAuth();
  const value = PreferredCurrency.get(authState);
  const onValueChange = (currency: dto.Currency) => {
    PreferredCurrency.set(authState, currency);
  };

  const displays = CurrencyCompanion.displays();
  const currentDisplay = CurrencyCompanion.display(value);
  const currencies = Object.keys(displays) as dto.Currency[];

  // Use SelectField for default variant (with label support)
  if (variant === "default") {
    // Note: SelectField expects { value: string, label: string }
    const currencyOptions: SelectOption[] = currencies.map(currencyCode => {
      const display = displays[currencyCode];
      return {
        value: currencyCode,
        label: `${display.flag} ${currencyCode} - ${display.name || display.code.split(" ")[0]}`, // Fallback logic if name isn't explicit in label
      };
    });

    return (
      <SelectField
        label={label}
        value={value}
        onChange={val => onValueChange(val as dto.Currency)}
        options={currencyOptions}
        placeholder="Select currency"
        className={className}
      />
    );
  }

  // Compact variant with custom rendering for minimal footer display
  return (
    <div>
      {label && <label className="text-xs text-muted-foreground mb-1">{label}</label>}
      <Select value={value} onValueChange={val => onValueChange(val as dto.Currency)}>
        <SelectTrigger className={`cursor-pointer ${className}`} variant="ghost" size="sm">
          <SelectValue>
            <CurrencyItem display={currentDisplay} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {currencies.map(currency => {
            const display = displays[currency];
            return (
              <SelectItem key={display.code} value={currency} className="cursor-pointer">
                <CurrencyItem display={display} />
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
