import React from "react";

interface BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  type: HTMLInputElement["type"];
  placeholder?: string;
  isValid?: boolean;
  disabled?: boolean;
}

export function BaseInput(props: BaseInputProps) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={`w-full outline-none bg-[#202F45] text-white text-base rounded-[10px] p-3 3xl:h-[60px] flex justify-center items-center 
        border-transparent focus:border-white focus:ring-2 focus:ring-[rgba(255,255,255,0.60)] transition-all duration-300
        ${props.disabled ? "bg-opacity-50 opacity-50" : ""}
        ${props.isValid === false ? "!border-red-500 focus:!border-red-500 focus:ring-red-500" : ""}
      `}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      disabled={props.disabled}
    />
  );
}
