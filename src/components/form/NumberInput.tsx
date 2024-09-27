import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FormInput } from "./FormInput";
import { CheckInputHandle } from "./CheckInputHandle";

interface NumberInputProps {
  label?: string;
  fontAwesomeClassName: string;
}

// We need to wrap component in `forwardRef` in order to gain access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
export const NumberInput = forwardRef<CheckInputHandle, NumberInputProps>((props, ref) => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  // The component instance will be extended with whatever you return from the callback passed as the second argument
  useImperativeHandle(ref, () => ({
    check() {
      const isValid = validateNumber(number);
      setIsValid(isValid);
      return isValid;
    },
    clear() {
      setNumber("");
      setIsValid(true);
    },
  }));

  function validateNumber(number: string): boolean {
    return !Number.isNaN(number);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = event.target.value;
    setNumber(newNumber);
  };

  return (
    <FormInput label={props.label} errorMessage={"Please enter a valid number."} fontAwesomeClassName={props.fontAwesomeClassName} isValid={isValid}>
      <input type="number" placeholder="0" value={number} onChange={handleChange} />
    </FormInput>
  );
});
