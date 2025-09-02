import React from "react";
import { CommentInput } from "../../../step4/CommentInput";

interface CommentSectionProps {
  show: boolean;
  onToggle: () => void;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function CommentSection(props: CommentSectionProps) {
  return (
    <div className="flex p-9 px-8 flex-col justify-end items-end gap-2.5 self-stretch rounded-[30px] bg-[#14233A] relative">
      {/* Close Button */}
      <button
        onClick={props.onClose}
        className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Close comments"
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.5 4.5L4.5 20.5" stroke="white" strokeLinecap="round" />
          <path d="M4.5 4.5L20.5 20.5" stroke="white" strokeLinecap="round" />
        </svg>
      </button>

      {/* Content */}
      <div className="flex flex-col items-start gap-3 self-stretch">
        {/* Labels */}
        <div className="flex w-full items-start gap-1">
          <div className="flex flex-col items-start">
            <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">{props.label || "Comments"}</label>
            <div className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">(only visible to Open Source Economy team)</div>
          </div>
        </div>

        {/* Comment Input Area */}
        <div className="flex items-start gap-2.5 self-stretch">
          <CommentInput
            isExpanded={true}
            onToggle={props.onToggle}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder || "Add any additional comments about this service"}
          />
        </div>
      </div>
    </div>
  );
}
