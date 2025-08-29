import React, { forwardRef, InputHTMLAttributes, Ref, useImperativeHandle, useState } from "react";
import { BaseProps, BaseRef } from "../Base";

export interface GenericInputRef extends BaseRef {}

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {}

export const GenericInput = forwardRef(function GenericInput(props: GenericInputProps, ref: Ref<GenericInputRef>) {
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);

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
    [props.value, props.required, props.validator, props.label],
  );

  const inputClasses = `
    w-full
    bg-transparent font-montserrat font-normal leading-[0]
    text-[#ffffff] text-[16px] text-left outline-none
    placeholder:opacity-60 placeholder:text-[#ffffff]
    ${props.className || ""}
  `;

  const inputContainerClasses = `
    box-border content-stretch flex flex-col gap-2 items-start justify-start
    p-0 relative shrink-0 w-full
  `;

  const inputWrapperClasses = `
    basis-0 bg-[#202f45] box-border content-stretch flex flex-row gap-1
    grow items-center justify-start min-h-px min-w-px p-[12px] relative rounded-md shrink-0
    ${internalError ? "border border-red-500" : "border border-[#202f45]"}
  `;

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
              {props.label} {props.required && <span className="text-red-500">*</span>}
            </p>
          </div>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
        <div className={inputWrapperClasses}>
          <input
            className={inputClasses}
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
        </div>
      </div>
      {props.renderError ? props.renderError(internalError) : internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
