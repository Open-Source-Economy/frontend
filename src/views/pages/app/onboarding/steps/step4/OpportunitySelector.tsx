import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState, ReactNode } from "react";
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
  commentButton?: ReactNode;
}

export const OpportunitySelector = forwardRef(function OpportunitySelector(props: OpportunitySelectorProps, ref: Ref<OpportunitySelectorRef>) {
  const { id, label, value, onChange, required, forceValidate, commentButton } = props;
  const [internalError, setInternalError] = useState<string | undefined>(undefined);

  const runValidation = (currentValue: OpenToOtherOpportunityType | null, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;
    if (required && currentValue === null) {
      errorMessage = `${label} is required.`;
    }

    if (showInputError || forceValidate) {
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

  const RadioOption = ({ option, label: optionLabel }: { option: OpenToOtherOpportunityType; label: string }) => {
    const isSelected = value === option;

    return (
      <div className="flex items-start gap-3">
        <button
          onClick={() => handleButtonClick(option)}
          className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${isSelected ? "bg-[#202F45] p-0.5" : "bg-[#202F45]"}`}
          aria-checked={isSelected}
          role="radio"
        >
          {isSelected && <div className="w-[14px] h-[14px] rounded-full bg-[#FF7E4B]" />}
        </button>
        <button
          onClick={() => handleButtonClick(option)}
          className="text-white font-montserrat text-base leading-[1.1] hover:text-[#FF7E4B] transition-colors"
          role="radio"
          aria-checked={isSelected}
        >
          {optionLabel}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-white font-montserrat text-base leading-[1.5] opacity-60">
        Should Open Source Economy team privately contact you when a major opportunity arises?
      </div>

      <div className="flex items-center gap-8" role="radiogroup" aria-labelledby={`${id}-label`}>
        <RadioOption option={OpenToOtherOpportunityType.YES} label="Yes" />
        <RadioOption option={OpenToOtherOpportunityType.MAYBE} label="Maybe" />
        <RadioOption option={OpenToOtherOpportunityType.NO} label="No" />
        {commentButton}
      </div>

      {internalError && <div className="text-red-400 text-sm mt-1">{internalError}</div>}
    </div>
  );
});
