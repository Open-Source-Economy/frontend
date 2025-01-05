import React from "react";
import { FormInput } from "./FormInput";

interface CardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export function CardNumberInput(props: CardNumberInputProps) {
  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(\d{4})/g, "$1 ").trim();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(event.target.value);
    props.onChange(formatted);
  };

  return (
    <FormInput label="Card Number" errorMessage="Please enter a valid 16-digit card number" isValid={props.isValid}>
      <input
        type="text"
        value={props.value}
        onChange={handleChange}
        placeholder="1234 1234 1234 1234"
        className="p-3 w-full bg-transparent outline-none text-white"
        maxLength={19}
      />
    </FormInput>
  );
}
