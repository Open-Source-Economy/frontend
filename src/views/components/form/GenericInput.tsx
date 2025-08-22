import React, { forwardRef, InputHTMLAttributes, Ref, useEffect, useImperativeHandle, useState } from "react";

// Define the interface for the methods exposed via ref
export interface GenericInputRef {
  validate: () => boolean; // Method to programmatically validate the input
}

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validator?: (value: string) => string | undefined;
  required?: boolean;
  renderError?: (genericError: string | undefined) => React.ReactNode;
  forceValidate?: boolean;
}

export const GenericInput = forwardRef(function GenericInput(
  props: GenericInputProps,
  ref: Ref<GenericInputRef>, // <--- FIX: Corrected type to Ref<GenericInputRef>
) {
  const { label, className, required, validator, renderError, forceValidate, ...rest } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false); // Tracks if input has been focused and then blurred

  // Helper function to run validation and update internal error state
  const runValidation = (value: string, showImmediately: boolean = false): boolean => {
    let errorMessage: string | undefined = undefined;

    if (required && !value.trim()) {
      errorMessage = `${label} is required.`;
    } else if (validator) {
      errorMessage = validator(value);
    }

    if (showImmediately || isTouched || forceValidate) {
      setInternalError(errorMessage);
    }
    return !errorMessage; // Returns true if valid, false if invalid
  };

  // Expose methods via ref for parent components.
  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        // When validate() is called, run validation and ensure errors are shown immediately.
        return runValidation(String(props.value || ""), true);
      },
    }),
    [props.value, required, validator, label],
  );

  // Effect to trigger validation when `forceValidate` becomes true or value changes (if forced).
  useEffect(() => {
    if (forceValidate) {
      runValidation(String(props.value || ""), true); // Force display of errors
    }
  }, [forceValidate, props.value]);

  // Tailwind classes for the input field, conditionally styled for errors
  const inputClasses = `
    w-full
    bg-transparent font-montserrat font-normal leading-[0]
    text-[#ffffff] text-[16px] text-left outline-none
    placeholder:opacity-60 placeholder:text-[#ffffff]
    ${className || ""}
  `;

  // Classes for the input container, matching your provided structure
  const inputContainerClasses = `
    box-border content-stretch flex flex-col gap-2 items-start justify-start
    p-0 relative shrink-0 w-full
  `;

  // Classes for the input wrapper (the background div)
  const inputWrapperClasses = `
    basis-0 bg-[#202f45] box-border content-stretch flex flex-row gap-1
    grow items-center justify-start min-h-px min-w-px p-[12px] relative rounded-md shrink-0
    ${internalError ? "border border-red-500" : "border border-[#202f45]"}
  `;

  // Classes for the label text container
  const labelTextContainerClasses = `
    font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff]
    text-[16px] text-left text-nowrap
  `;

  return (
    <div className={inputContainerClasses}>
      <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
          <div className={labelTextContainerClasses}>
            <p className="block leading-[1.5] whitespace-pre">
              {label} {required && <span className="text-red-500">*</span>}
            </p>
          </div>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
        <div className={inputWrapperClasses}>
          <input
            // If you needed a ref to the actual HTMLInputElement, you'd define an
            // internal ref here (e.g., `const htmlInputRef = useRef<HTMLInputElement>(null);`)
            // and pass it to the input: `ref={htmlInputRef}`.
            className={inputClasses}
            {...rest}
            onBlur={e => {
              setIsTouched(true); // Mark as touched on blur
              runValidation(e.target.value, true); // Validate and show error on blur
              if (rest.onBlur) {
                rest.onBlur(e);
              }
            }}
            onChange={e => {
              // Validate on change only if input has been touched OR if forceValidate is active
              if (isTouched || forceValidate) {
                runValidation(e.target.value);
              }
              if (rest.onChange) {
                rest.onChange(e);
              }
            }}
          />
        </div>
      </div>
      {renderError ? renderError(internalError) : internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
