import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { Link } from "react-router-dom"; // Assuming you have react-router-dom installed
import { CheckboxInput, CheckboxInputRef } from "./CheckboxInput"; // Import the base CheckboxInput and its ref type

interface TermsAndConditionsCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  // checked and onChange will be passed down from parent
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const TermsAndConditionsCheckbox = forwardRef(function TermsAndConditionsCheckbox(
  props: TermsAndConditionsCheckboxProps,
  ref: Ref<CheckboxInputRef> // The ref is typed for CheckboxInputRef
) {
  const { required, ...rest } = props;

  // The label is composed here, including the Link component.
  // This is a React.ReactNode, which CheckboxInput's label prop now accepts.
  const termsLabel = (
    <>
      By submitting this form, I agree to the{' '}
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

  // You can also provide a custom renderError if you want a more specific message
  // than the default "This field is required." from CheckboxInput.
  const renderCustomError = (errorMessage: string | undefined) => {
    if (errorMessage) {
      return <div className="text-red-400 text-sm mt-1">You must agree to the Terms and Conditions to proceed.</div>;
    }
    return null;
  };

  return (
    <CheckboxInput
      id="agreedToTerms"
      label={termsLabel} // Pass the composed label (React.ReactNode)
      required={required}
      ref={ref} // Forward the ref to CheckboxInput
      renderError={renderCustomError} // Pass custom error renderer
      {...rest}
    />
  );
});
