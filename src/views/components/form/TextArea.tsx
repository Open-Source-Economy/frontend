import React, { forwardRef, TextareaHTMLAttributes, Ref, useEffect, useImperativeHandle, useState } from "react";

// Define the interface for the methods exposed via ref
export interface TextAreaRef {
  validate: (showInputError: boolean) => boolean;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; // Keep label for validation message, but make it optional
  validator?: (value: string) => string | undefined;
  required?: boolean;
  renderError?: (genericError: string | undefined) => React.ReactNode;
  forceValidate?: boolean;
}

export const TextArea = forwardRef(function TextArea(props: TextAreaProps, ref: Ref<TextAreaRef>) {
  const { label, className, required, validator, renderError, forceValidate, ...rest } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);

  const runValidation = (value: string, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;

    if (required && !value.trim()) {
      errorMessage = `${label || "Field"} is required.`;
    } else if (validator) {
      errorMessage = validator(value);
    }

    if (showInputError || isTouched || forceValidate) {
      setInternalError(errorMessage);
    }
    return !errorMessage;
  };

  useImperativeHandle(
    ref,
    () => ({
      validate: (showInputError: boolean) => {
        return runValidation(String(props.value || ""), showInputError);
      },
    }),
    [props.value, props.required, props.validator, label],
  );

  useEffect(() => {
    if (forceValidate) {
      runValidation(String(props.value || ""), true);
    }
  }, [forceValidate, props.value]);

  const textAreaClasses = `
    ${className || ""}
    ${internalError ? "border border-red-500" : ""}
  `;

  return (
    <div className="w-full">
      <textarea
        className={textAreaClasses}
        {...rest}
        onBlur={e => {
          setIsTouched(true);
          if (rest.onBlur) {
            rest.onBlur(e);
          }
        }}
        onChange={e => {
          if (isTouched || forceValidate) {
            runValidation(e.target.value, false);
          }
          if (rest.onChange) {
            rest.onChange(e);
          }
        }}
      />
      {renderError ? renderError(internalError) : internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
