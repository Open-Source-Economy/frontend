import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { OpenToOtherOpportunityType } from "@open-source-economy/api-types";
import { BaseRef } from "../../../../../components/form/Base";

export interface OpportunitySelectorRef extends BaseRef {}

interface OpportunitySelectorProps {
  id: string;
  value: OpenToOtherOpportunityType | null;
  onChange: (value: OpenToOtherOpportunityType) => void;
  required?: boolean;
}

export const OpportunitySelector = forwardRef(function OpportunitySelector(props: OpportunitySelectorProps, ref: Ref<OpportunitySelectorRef>) {
  const [error, setError] = useState<string | undefined>(undefined);

  const runValidation = (currentValue: OpenToOtherOpportunityType | null, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;
    if (props.required && currentValue === null && showInputError) {
      setError(`Please select an option`);
    }
    return !errorMessage;
  };

  useImperativeHandle(
    ref,
    () => ({
      validate: (showInputError: boolean) => {
        return runValidation(props.value, showInputError);
      },
    }),
    [props.value, props.required],
  );

  const handleButtonClick = (option: OpenToOtherOpportunityType) => {
    props.onChange(option);
    // Clear error immediately on change if it was showing and input is now valid
    if (error && runValidation(option, false)) {
      setError(undefined);
    }
  };

  const RadioOption = ({ option, label: optionLabel }: { option: OpenToOtherOpportunityType; label: string }) => {
    const isSelected = props.value === option;

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
    <>
      <div className="flex items-center gap-8" role="radiogroup" aria-labelledby={`${props.id}-label`}>
        <RadioOption option={OpenToOtherOpportunityType.YES} label="Yes" />
        <RadioOption option={OpenToOtherOpportunityType.MAYBE} label="Maybe" />
        <RadioOption option={OpenToOtherOpportunityType.NO} label="No" />
      </div>

      {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
    </>
  );
});
