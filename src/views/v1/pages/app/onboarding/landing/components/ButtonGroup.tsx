import React from "react";

interface ButtonGroupProps {
  onBack: () => void;
  onNext: () => void;
  isLoading: boolean;
  isNextDisabled?: boolean;
  showErrorMessage?: boolean;
  errorMessage?: string;
}

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <div className="flex flex-col items-start gap-4 self-stretch">
      <div className="flex h-12 items-center gap-2.5 self-stretch">
        <div className="flex items-start gap-4">
          <button
            onClick={props.onBack}
            className="flex justify-center items-center gap-2.5 rounded-md border border-white px-5 py-3 hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            <div className="text-white font-michroma text-base font-normal leading-[150%]">Back</div>
          </button>

          {/* Next Button */}
          <button
            onClick={props.onNext}
            disabled={props.isLoading || props.isNextDisabled}
            className={`flex justify-center items-center gap-2.5 rounded-md px-5 py-3 bg-[#FF7E4B] transition-opacity ${
              props.isLoading || props.isNextDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-50"
            }`}
          >
            <div className="text-white font-michroma text-base font-normal leading-[150%]">{props.isLoading ? "Saving..." : "Next"}</div>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {props.showErrorMessage && (
        <div className="self-stretch text-[#FF8C8C] font-montserrat text-base font-normal leading-[150%]">
          {props.errorMessage || "* Fill in required fields"}
        </div>
      )}
    </div>
  );
}
