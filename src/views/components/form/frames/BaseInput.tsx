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
      className={`
        w-full border outline-none bg-[#202F45] text-white text-base rounded-[10px] p-3
        ${props.isValid ? "border-0" : "!border-red-500"}
        ${props.disabled ? "bg-opacity-50 opacity-50" : ""}
      `}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      disabled={props.disabled}
    />
  );
}
