import React, { forwardRef, InputHTMLAttributes, Ref, useImperativeHandle, useState } from "react";

// Define the interface for the methods exposed via ref for a checkbox
export interface CheckboxInputRef {
  validate: () => boolean; // Method to programmatically validate the checkbox
  isValid: () => boolean; // New: This one just checks without showing errors
}

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode; // FIX: Changed type from 'string' to 'React.ReactNode'
  required?: boolean; // If the checkbox must be checked
  renderError?: (errorMessage: string | undefined) => React.ReactNode; // Custom error renderer
}

export const CheckboxInput = forwardRef(function CheckboxInput(props: CheckboxInputProps, ref: Ref<CheckboxInputRef>) {
  const { label, required, renderError, className, checked, ...rest } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);

  // Helper function to run validation and update internal error state
  const runValidation = (isChecked: boolean, showImmediately: boolean = false): boolean => {
    let errorMessage: string | undefined = undefined;

    if (required && !isChecked) {
      errorMessage = `This field is required.`; // Generic message, can be overridden by renderError
    }

    // Show error if explicitly told to, or if the input has been interacted with.
    if (showImmediately || isTouched) {
      setInternalError(errorMessage);
    }
    return !errorMessage; // Returns true if valid, false if invalid
  };

  // Expose methods via ref for parent components
  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        // When validate() is called, run validation and ensure errors are shown immediately.
        return runValidation(Boolean(checked), true);
      },
      isValid: () => {
        // This new function runs the same logic but doesn't set the error state.
        let errorMessage: string | undefined = undefined;
        if (required && !checked) {
          errorMessage = `This field is required.`;
        }
        return !errorMessage; // Return true if valid, false if not
      },
    }),
    [checked, required],
  );

  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
      <div className="relative bg-[#202f45] rounded-sm shrink-0 size-[18px] flex items-center justify-center cursor-pointer overflow-hidden">
        <input
          type="checkbox"
          checked={checked}
          className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 ${className || ""}`}
          {...rest}
          onChange={e => {
            setIsTouched(true); // Mark as touched on change
            runValidation(e.target.checked); // Validate on change
            if (props.onChange) {
              props.onChange(e); // Pass the event up to the parent
            }
          }}
          onBlur={e => {
            setIsTouched(true); // Mark as touched on blur
            runValidation(e.target.checked, true); // Validate and show error on blur
            if (props.onBlur) {
              props.onBlur(e);
            }
          }}
        />
        {checked && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-sm flex items-center justify-center">
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left text-nowrap">
        {/* Render the label directly, now that its type is React.ReactNode */}
        <div className="flex flex-col font-montserrat font-normal justify-center relative shrink-0 text-[#ffffff]">
          <p className="block leading-[1.1] text-nowrap whitespace-pre">{label}</p>
        </div>
      </div>
      {renderError ? renderError(internalError) : internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
