import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from "react";
import { OpenToOtherOpportunityType } from "@open-source-economy/api-types";

export interface OpportunitySelectorRef {
  validate: () => boolean;
}

interface OpportunitySelectorProps {
  id: string;
  label: string;
  value: OpenToOtherOpportunityType | null;
  onChange: (value: OpenToOtherOpportunityType) => void;
  required?: boolean;
  forceValidate?: boolean;
}

export const OpportunitySelector = forwardRef(function OpportunitySelector(props: OpportunitySelectorProps, ref: Ref<OpportunitySelectorRef>) {
  const { id, label, value, onChange, required, forceValidate } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);

  const runValidation = (currentValue: OpenToOtherOpportunityType | null, showImmediately: boolean = false): boolean => {
    let errorMessage: string | undefined = undefined;
    if (required && currentValue === null) {
      errorMessage = `${label} is required.`;
    }

    if (showImmediately || forceValidate) {
      setInternalError(errorMessage);
    }
    return !errorMessage;
  };

  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        return runValidation(value, true);
      },
    }),
    [value, required, label],
  );

  useEffect(() => {
    if (forceValidate) {
      runValidation(value, true);
    }
  }, [forceValidate, value]);

  const handleButtonClick = (option: OpenToOtherOpportunityType) => {
    onChange(option);
    // Clear error immediately on change if it was showing and input is now valid
    if (internalError && runValidation(option, false)) {
      setInternalError(undefined);
    }
  };

  return (
    <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
      <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
        <p id={`${id}-label`} className="block leading-[1.3]">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      </div>
      <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[14px] text-left opacity-70">
        <p className="block leading-[1.5]">Are you interested in taking on larger projects or full-time opportunities?</p>
      </div>
      <div
        className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
        role="radiogroup"
        aria-labelledby={`${id}-label`}
      >
        <button
          onClick={() => handleButtonClick(OpenToOtherOpportunityType.YES)}
          className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
            value === OpenToOtherOpportunityType.YES
              ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]"
              : "bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]"
          }`}
          aria-checked={value === OpenToOtherOpportunityType.YES}
          role="radio"
        >
          Yes
        </button>
        <button
          onClick={() => handleButtonClick(OpenToOtherOpportunityType.MAYBE)}
          className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
            value === OpenToOtherOpportunityType.MAYBE
              ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]"
              : "bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]"
          }`}
          aria-checked={value === OpenToOtherOpportunityType.MAYBE}
          role="radio"
        >
          Maybe
        </button>
        <button
          onClick={() => handleButtonClick(OpenToOtherOpportunityType.NO)}
          className={`px-6 py-3 rounded-md font-montserrat font-normal text-[16px] transition-all ${
            value === OpenToOtherOpportunityType.NO
              ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] text-[#ffffff]"
              : "bg-[#202f45] text-[#ffffff] hover:bg-[#2a3f56]"
          }`}
          aria-checked={value === OpenToOtherOpportunityType.NO}
          role="radio"
        >
          No
        </button>
      </div>
      {internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
