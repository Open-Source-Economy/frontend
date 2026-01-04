import React from "react";
import { Input } from "../input";
import { cn } from "../../../../utils";

interface AmountSelectorProps {
  suggestedAmounts: number[];
  selectedAmount: number | null;
  customAmount: string;
  currencySymbol: string;
  onSelectAmount: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
  className?: string;
}

export function AmountSelector({
  suggestedAmounts,
  selectedAmount,
  customAmount,
  currencySymbol,
  onSelectAmount,
  onCustomAmountChange,
  className,
}: AmountSelectorProps) {
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || parseFloat(value) > 0) {
      onCustomAmountChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const getButtonClasses = (isActive: boolean) => {
    return cn(
      "p-3 rounded-lg border-2 transition-all duration-300",
      isActive
        ? "border-brand-accent bg-brand-accent/10 text-brand-accent shadow-lg shadow-brand-accent/20"
        : "border-brand-neutral-300 text-brand-neutral-700 hover:border-brand-accent/50 hover:bg-brand-accent/5",
    );
  };

  return (
    <div className={cn("grid grid-cols-3 gap-2.5", className)}>
      {suggestedAmounts.map(amount => (
        <button
          key={amount}
          onClick={() => onSelectAmount(amount)}
          className={`${getButtonClasses(selectedAmount === amount && !customAmount)} cursor-pointer`}
        >
          <div className="text-xl">
            {currencySymbol}
            {amount}
          </div>
        </button>
      ))}
      <div
        className={cn(
          "p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center",
          customAmount ? "border-brand-accent bg-brand-accent/10 shadow-lg shadow-brand-accent/20" : "border-brand-neutral-300 hover:border-brand-accent/50",
        )}
      >
        <div className="flex items-center justify-center w-full">
          <span className="text-brand-neutral-600 text-lg">{currencySymbol}</span>
          <Input
            type="number"
            min="1"
            step="1"
            value={customAmount}
            onChange={handleCustomAmountChange}
            onKeyDown={handleKeyDown}
            placeholder="Custom"
            className="flex-1 text-center border-0 bg-transparent p-0 px-1 h-auto text-xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sm placeholder:text-brand-neutral-400"
          />
        </div>
      </div>
    </div>
  );
}
