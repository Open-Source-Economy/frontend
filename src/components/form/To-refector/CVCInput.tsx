import React from "react";
import { FormInput } from "./FormInput";

interface CVCInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export function CVCInput(props: CVCInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    props.onChange(value);
  };

  return (
    <FormInput label="CVC" errorMessage="Enter valid CVC" isValid={props.isValid}>
      <input
        type="text"
        value={props.value}
        onChange={handleChange}
        placeholder="123"
        className="p-3 w-full bg-transparent outline-none text-white"
        maxLength={4}
      />
    </FormInput>
  );
}
