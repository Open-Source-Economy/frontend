import React, { forwardRef, Ref } from "react";
import { SelectInput } from "../SelectInput"; // Adjust path if SelectInput is not in the same directory
import { Currency } from "@open-source-economy/api-types"; // Import Currency enum from your API types
import { displayedCurrencies } from "../../../../data";
import { GenericInputRef } from "../../GenericInput"; // Import displayedCurrencies from your data file (adjust path as needed)

interface CurrencySelectInputProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  required?: boolean;
  forceValidate?: boolean;
  name?: string; // Add name prop for consistent form handling
}

export const CurrencySelectInput = forwardRef(function CurrencySelectInput(props: CurrencySelectInputProps, ref: Ref<GenericInputRef>) {
  const { value, onChange, required, forceValidate, name } = props;

  // Map the Currency enum values to SelectOption format
  const currencyOptions = Object.values(Currency).map(currency => ({
    value: currency,
    // Use the symbol from displayedCurrencies, with a fallback to the currency string itself
    label: `${currency} - ${displayedCurrencies[currency]?.symbol || currency}`,
  }));

  // Handle the change event from the underlying SelectInput and cast the value to Currency
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Currency);
  };

  return (
    <SelectInput
      id="currency-select" // A unique ID is crucial for accessibility and is now required by SelectInput
      name={name || "currency"} // Use provided name prop or default to "currency"
      label="Currency" // The label displayed above the select input
      options={currencyOptions} // The dynamically generated currency options
      value={value} // The currently selected currency value
      onChange={handleSelectChange} // The handler for when the currency changes
      required={required} // Prop indicating if a selection is required
      forceValidate={forceValidate} // Prop to force validation display
      // Tailwind CSS for styling - make sure these classes are available in your project
      className="bg-[#202f45] px-4 py-3 rounded-md font-montserrat font-normal text-[#ffffff] text-[16px] outline-none cursor-pointer hover:bg-[#2a3f56] transition-colors"
      ref={ref} // Forward the ref from this component to the underlying SelectInput component
    />
  );
});
