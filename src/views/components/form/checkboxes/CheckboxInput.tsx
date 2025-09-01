import React, { forwardRef, InputHTMLAttributes, Ref, useImperativeHandle, useState } from "react";
import { BaseProps, BaseRef } from "../Base";
import { formError } from "../styles";

export interface CheckboxInputRef extends BaseRef {}

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {}

export const CheckboxInput = forwardRef(function CheckboxInput(props: CheckboxInputProps, ref: Ref<CheckboxInputRef>) {
  const { label, required, renderError, className, checked, ...rest } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);

  const runValidation = (isChecked: boolean, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;

    if (required && !isChecked) {
      errorMessage = `This field is required.`;
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
        return runValidation(Boolean(checked), showInputError);
      },
    }),
    [checked, required],
  );

  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
      <div
        className={`relative bg-[#202f45] rounded-sm shrink-0 size-[18px] flex items-center justify-center cursor-pointer overflow-hidden ${
          internalError ? "border border-[#FF8C8C]" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 ${className || ""}`}
          {...rest}
          onChange={e => {
            setIsTouched(true);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          onBlur={e => {
            setIsTouched(true);
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
        <div className="flex flex-col font-montserrat font-normal justify-center relative shrink-0 text-[#ffffff]">
          <p className="block leading-[1.1] text-nowrap whitespace-pre">{label}</p>
        </div>
      </div>
      {renderError ? renderError(internalError) : internalError && <div className={formError}>{internalError}</div>}
    </div>
  );
});
