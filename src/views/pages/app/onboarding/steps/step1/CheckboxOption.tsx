import React from "react";

interface CheckboxOptionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  text: string;
  linkText: string;
  onLinkClick?: () => void;
}

export function CheckboxOption(props: CheckboxOptionProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Checkbox */}
      <button
        onClick={() => props.onChange(!props.checked)}
        className="w-[18px] h-[18px] rounded-sm bg-[#202F45] flex items-center justify-center"
      >
        {props.checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      
      {/* Label with Link */}
      <div className="flex items-center gap-1">
        <div className="text-white font-montserrat text-base font-normal leading-[110%]">
          {props.text}
        </div>
        <button
          onClick={props.onLinkClick}
          className="text-[#FF7E4B] font-montserrat text-base font-medium leading-[110%] underline"
        >
          {props.linkText}
        </button>
      </div>
    </div>
  );
}
