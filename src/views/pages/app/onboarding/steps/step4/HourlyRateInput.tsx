import React, { useState } from "react";
import { Currency } from "@open-source-economy/api-types";

interface HourlyRateInputProps {
  hourlyRate: number | null;
  currency: Currency;
  onHourlyRateChange: (value: number | null) => void;
  onCurrencyChange: (currency: Currency) => void;
}

const currencies = [
  { code: 'EUR' as Currency, symbol: '€', label: '€ (EUR)' },
  { code: 'USD' as Currency, symbol: '$', label: '$ (USD)' },
  { code: 'GBP' as Currency, symbol: '£', label: '£ (GBP)' },
  { code: 'CAD' as Currency, symbol: 'C$', label: 'C$ (CAD)' },
];

export function HourlyRateInput(props: HourlyRateInputProps) {
  const { hourlyRate, currency, onHourlyRateChange, onCurrencyChange } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];
  
  const handleRateChange = (inputValue: string) => {
    if (inputValue === "") {
      onHourlyRateChange(null);
    } else {
      const numericValue = Number(inputValue);
      if (!isNaN(numericValue) && numericValue >= 0) {
        onHourlyRateChange(numericValue);
      }
    }
  };

  const handleCurrencySelect = (selectedCurrency: Currency) => {
    onCurrencyChange(selectedCurrency);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex h-12 items-center gap-2 w-full">
      {/* Currency Symbol + Rate Input */}
      <div className="flex w-40 px-0 pr-3 items-center gap-4 bg-[#202F45] rounded-md">
        <div className="flex px-4 py-3 items-center gap-3 rounded-md border border-[#202F45] bg-[#0E1F35]">
          <span className="text-white font-montserrat text-base leading-[1.5]">
            {currentCurrency.symbol}
          </span>
        </div>
        <input
          type="number"
          value={hourlyRate === null ? "" : hourlyRate}
          onChange={e => handleRateChange(e.target.value)}
          placeholder="e.g. 100"
          className="text-white font-montserrat text-base leading-[1.5] opacity-60 bg-transparent outline-none placeholder:opacity-60 flex-1"
          min="0"
        />
      </div>

      {/* Currency Dropdown */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex px-0 pr-3 items-center gap-3 w-full h-12 rounded-md bg-[#202F45] text-white font-montserrat text-base leading-[1.5] hover:bg-[#2a3f56] transition-colors"
        >
          <span className="flex-1 text-left pl-3">{currentCurrency.label}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z" fill="white"/>
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-[#202F45] rounded-md shadow-lg z-10 overflow-hidden">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencySelect(curr.code)}
                className="flex px-3.5 py-3 items-center gap-2.5 w-full text-left hover:bg-[#2a3f56] transition-colors text-white font-montserrat text-base leading-[1.5]"
              >
                {curr.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
