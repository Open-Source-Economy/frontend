import React, { forwardRef, Ref, TextareaHTMLAttributes, useImperativeHandle, useState } from "react";
import { BaseProps, BaseRef } from "./Base";

export interface TextAreaRef extends BaseRef {}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {}

export const TextArea = forwardRef(function TextArea(props: TextAreaProps, ref: Ref<TextAreaRef>) {
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);

  const runValidation = (value: string, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;

    if (props.required && !value.trim()) {
      errorMessage = `${props.label || "Field"} is required.`;
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
    [props.value, props.required, props.validator, props.label],
  );

  const textAreaClasses = `
    ${props.className || ""}
    ${internalError ? "border border-red-500" : ""}
  `;

  return (
    <div className="w-full">
      {props.label && (
        <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0">
          <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
            <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
              <p className="block leading-[1.5] whitespace-pre">
                {props.label} {props.required && <span className="text-red-500">*</span>}
              </p>
            </div>
          </div>
        </div>
      )}
      <textarea
        className={textAreaClasses}
        {...props}
        onBlur={e => {
          setIsTouched(true);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
        onChange={e => {
          if (isTouched) {
            runValidation(e.target.value, false);
          }
          if (props.onChange) {
            props.onChange(e);
          }
        }}
      />
      {props.renderError ? props.renderError(internalError) : internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
