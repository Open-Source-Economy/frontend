import React from "react";

interface ModalFooterProps {
  onSubmit: () => void;
  isLoading: boolean;
  buttonText: string;
}

export function ModalFooter(props: ModalFooterProps) {
  return (
    <button
      onClick={props.onSubmit}
      disabled={props.isLoading}
      className={`flex justify-center items-center gap-2.5 rounded-md transition-opacity ${
        props.isLoading ? "opacity-50 cursor-not-allowed" : " hover:opacity-50"
      }`}
    >
      <div className="flex p-3 justify-center items-center gap-2 rounded-md border border-[#FF7E4B]">
        <div className="text-white font-michroma text-xs font-normal leading-[150%]">{props.isLoading ? "Saving..." : props.buttonText}</div>
      </div>
    </button>
  );
}
