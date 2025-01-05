import React from "react";
import { FormInput } from "./FormInput";

interface ExpiryInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export function ExpiryInput(props: ExpiryInputProps) {
  const formatExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(event.target.value);
    props.onChange(formatted);
  };

  return (
    <FormInput label="Expiry Date" errorMessage="Enter valid date (MM/YY)" isValid={props.isValid}>
      <input
        type="text"
        value={props.value}
        onChange={handleChange}
        placeholder="MM/YY"
        className="p-3 w-full bg-transparent outline-none text-white"
        maxLength={5}
      />
    </FormInput>
  );
}
