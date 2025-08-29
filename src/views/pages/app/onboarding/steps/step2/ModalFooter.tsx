import React from "react";

interface ModalFooterProps {
  onSubmit: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  buttonText: string;
}

export function ModalFooter(props: ModalFooterProps) {
  return (
    <button
      onClick={props.onSubmit}
      disabled={props.isLoading || props.isDisabled}
      className={`flex justify-center items-center gap-2.5 rounded-md transition-opacity ${
        props.isLoading || props.isDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-50 hover:opacity-100'
      }`}
    >
      <div className="flex p-3 justify-center items-center gap-2 rounded-md border border-[#FF7E4B]">
        <div className="text-white font-michroma text-xs font-normal leading-[150%]">
          {props.isLoading ? "Saving..." : props.buttonText}
        </div>
      </div>
    </button>
  );
}
