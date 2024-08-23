import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FormInput } from "./FormInput";
import { CheckInputHandle } from "./CheckInputHandle";

interface EmailInputProps {
  label?: string;
}

// We need to wrap component in `forwardRef` in order to gain access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
export const EmailInput = forwardRef<CheckInputHandle, EmailInputProps>((props, ref) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  // The component instance will be extended with whatever you return from the callback passed as the second argument
  useImperativeHandle(ref, () => ({
    check() {
      const isValid = validateEmail(email);
      setIsValid(isValid);
      return isValid;
    },
    clear() {
      setEmail("");
      setIsValid(true);
    },
  }));

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  return (
    <FormInput label={props.label} errorMessage={"Please enter a valid email."} fontAwesomeClassName={"fa-envelope"} isValid={isValid}>
      <input type="email" placeholder="Email" value={email} onChange={handleChange} />
    </FormInput>
  );
});
