import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { Link } from "react-router-dom";
import { CheckboxInput } from "./CheckboxInput";
import { BaseProps, BaseRef } from "../Base";

export interface TermsAndConditionsCheckboxRef extends BaseRef {}

interface TermsAndConditionsCheckboxProps extends InputHTMLAttributes<HTMLInputElement>, Omit<BaseProps, "label"> {}

export const TermsAndConditionsCheckbox = forwardRef(function TermsAndConditionsCheckbox(
  props: TermsAndConditionsCheckboxProps,
  ref: Ref<TermsAndConditionsCheckboxRef>,
) {
  const { ...rest } = props;

  const termsLabel = (
    <>
      By submitting this form, I agree to the{" "}
      <Link
        to="/terms-and-conditions"
        target="_blank"
        className="bg-clip-text bg-gradient-to-r flex flex-col font-montserrat font-medium from-[#ff7e4b] justify-center relative shrink-0 to-[#66319b] via-50% via-[#ff518c] underline"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        <p className="block leading-[1.1] text-nowrap whitespace-pre">Terms and Conditions</p>
      </Link>
    </>
  );

  const renderCustomError = (errorMessage: string | undefined) => {
    if (errorMessage) {
      return <div className="text-red-400 text-sm mt-1">You must agree to the Terms and Conditions to proceed.</div>;
    }
    return null;
  };

  return <CheckboxInput id="agreedToTerms" label={termsLabel} ref={ref} renderError={renderCustomError} {...rest} />;
});
