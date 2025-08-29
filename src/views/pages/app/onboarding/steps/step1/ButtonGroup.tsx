import React from "react";

interface ButtonGroupProps {
  onBack: () => void;
  onNext: () => void;
  isLoading: boolean;
  showErrorMessage?: boolean;
  errorMessage?: string;
}

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <div className="flex flex-col items-start gap-4 self-stretch">
      <div className="flex h-12 items-center gap-2.5 self-stretch">
        <div className="flex items-start gap-4">
          {/* Back Button */}
          <button
            onClick={props.onBack}
            className="flex justify-center items-center gap-2.5 rounded-md border border-white"
          >
            <div className="flex p-3 justify-center items-center gap-2.5 rounded-md border border-white">
              <div className="text-white font-michroma text-base font-normal leading-[150%]">
                Back
              </div>
            </div>
          </button>
          
          {/* Next Button */}
          <button
            onClick={props.onNext}
            disabled={props.isLoading}
            className="flex justify-center items-center gap-2.5 rounded-md opacity-50"
          >
            <div className="flex p-3 justify-center items-center gap-2.5 rounded-md bg-[#FF7E4B]">
              <div className="text-white font-michroma text-base font-normal leading-[150%]">
                {props.isLoading ? "Saving..." : "Next"}
              </div>
            </div>
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
