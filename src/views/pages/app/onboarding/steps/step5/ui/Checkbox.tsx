import React from "react";
import { CheckIcon } from "../icons/CheckIcon";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <>
      <div
        className={`relative w-[18px] h-[18px] rounded-sm border border-white bg-[#14233A] cursor-pointer ${props.className || ""}`}
        onClick={props.onChange}
      >
        {props.checked && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rounded-sm flex items-center justify-center">
            <CheckIcon />
          </div>
        )}
      </div>
    </>
  );
}
