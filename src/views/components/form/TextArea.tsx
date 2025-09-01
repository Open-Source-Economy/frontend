import React, { forwardRef, Ref, TextareaHTMLAttributes, useImperativeHandle, useState } from "react";
import { BaseProps, BaseRef } from "./Base";
import { buildInputWrapperClass, formContainer, formError, formLabel } from "./styles";

export interface TextAreaRef extends BaseRef {}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {}

export const TextArea = forwardRef(function TextArea(props: TextAreaProps, ref: Ref<TextAreaRef>) {
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Destructure custom props that shouldn't be passed to DOM
  const { label, validator, renderError, required, className, onFocus, onBlur, onChange, ...domProps } = props;

  const runValidation = (value: string, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;

    if (required && !value.trim()) {
      errorMessage = `${label || "Field"} is required.`;
    } else if (validator) {
      errorMessage = validator(value);
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


  const textAreaClasses = `
    w-full bg-transparent outline-none
    font-montserrat font-normal text-base leading-[150%]
    text-white placeholder:text-white placeholder:opacity-60
    resize-none
    ${className || ""}
  `;

  const textAreaContainerClasses = formContainer;

  const textAreaWrapperClasses = buildInputWrapperClass(
    `flex items-start gap-2.5 flex-1 w-full bg-[#202F45] rounded-md p-3 relative`,
    { hasError, isActiveOrFilled: isFocused || hasValue },
  );

  const labelClasses = formLabel;

  const errorMessageClasses = formError;

  return (
    <div className={textAreaContainerClasses}>
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

      {/* TextArea Container */}
      <div className="flex items-start gap-2.5 self-stretch">
        <div className={textAreaWrapperClasses}>
          <textarea
            className={textAreaClasses}
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
          {/* Resize handle */}
          <div className="absolute bottom-2 right-2 opacity-20 pointer-events-none">
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L1 1" stroke="white" strokeLinecap="round" />
              <path d="M4 6L1 3" stroke="white" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {hasError && !renderError && <div className={errorMessageClasses}>{internalError}</div>}

      {/* Custom Error Renderer */}
      {renderError && renderError(internalError)}
    </div>
  );
});
