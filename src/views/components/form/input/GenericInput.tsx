import React, { forwardRef, InputHTMLAttributes, Ref, useImperativeHandle, useState } from "react";
import { BaseProps, BaseRef } from "../Base";
import { buildInputWrapperClass, formContainer, formError, formLabel } from "../styles";

export interface GenericInputRef extends BaseRef {}

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  variant?: "default" | "compact";
}

export const GenericInput = forwardRef(function GenericInput(props: GenericInputProps, ref: Ref<GenericInputRef>) {
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Destructure custom props that shouldn't be passed to DOM
  const { label, validator, renderError, required, className, onFocus, onBlur, onChange, variant = "default", ...domProps } = props;

  const runValidation = (value: string, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;

    if (props.required && !value.trim()) {
      errorMessage = `${props.label} is required.`;
    } else if (props.validator) {
      errorMessage = props.validator(value);
    }

    if (showInputError || isTouched) {
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
    [props.value, required, validator, label],
  );

  const hasValue = Boolean(props.value);
  const hasError = Boolean(internalError);

  const inputClasses = `
    w-full bg-transparent outline-none
    font-montserrat font-normal text-base leading-[150%]
    text-white placeholder:text-white placeholder:opacity-60
    ${className || ""}
  `;

  const inputContainerClasses = variant === "compact" ? "" : formContainer;

  const inputWrapperBase =
    variant === "compact"
      ? `flex items-center gap-1 rounded-none bg-transparent px-0 py-0 h-10`
      : `flex items-center gap-1 flex-1 w-full bg-[#202F45] rounded-md p-3`;

  const inputWrapperClasses = buildInputWrapperClass(inputWrapperBase, {
    hasError,
    isActiveOrFilled: isFocused || hasValue,
  });

  const labelClasses = formLabel;

  const errorMessageClasses = formError;

  return (
    <div className={inputContainerClasses}>
      {/* Label */}
      {label && (
        <div className="flex items-start gap-1 w-full">
          <div className="flex flex-col items-start">
            <div className={labelClasses}>
              {label} {required && <span className="text-red-500">*</span>}
            </div>
          </div>
        </div>
      )}

      {/* Input Container */}
      <div className={variant === "compact" ? "flex items-center" : "flex items-start gap-2.5 self-stretch"}>
        <div className={inputWrapperClasses}>
          <input
            className={inputClasses}
            {...domProps}
            onFocus={e => {
              setIsFocused(true);
              if (onFocus) {
                onFocus(e);
              }
            }}
            onBlur={e => {
              setIsFocused(false);
              setIsTouched(true);
              if (onBlur) {
                onBlur(e);
              }
            }}
            onChange={e => {
              if (isTouched) {
                runValidation(e.target.value, false);
              }
              if (onChange) {
                onChange(e);
              }
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {hasError && !renderError && <div className={errorMessageClasses}>{internalError}</div>}

      {/* Custom Error Renderer */}
      {renderError && renderError(internalError)}
    </div>
  );
});
