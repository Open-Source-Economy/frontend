import React from "react";

interface FormInputProps {
  label?: string;
  errorMessage?: string;
  isValid?: boolean;
  children: React.ReactNode;
}

export function FormInput(props: FormInputProps) {
  return (
    <div className="flex flex-col gap-3">
      {props.label && <label className="text-white">{props.label}</label>}
      <div className={`bg-[rgba(255,255,255,0.1)] rounded-lg ${!props.isValid ? "border-red-500 border" : "border-0"}`}>{props.children}</div>
      {!props.isValid && <span className="text-red-500 text-sm">{props.errorMessage}</span>}
    </div>
  );
}
