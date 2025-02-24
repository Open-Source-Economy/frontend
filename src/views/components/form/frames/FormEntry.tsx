import React from "react";

interface FormEntryProps {
  label?: string;
  children: React.ReactNode;
}

export function FormEntry(props: FormEntryProps) {
  return (
    <div className="flex w-full flex-col gap-y-[5px]">
      {props.label && <label className="text-[#FFFFFF99]  3xl:text-lg font-medium">{props.label}</label>}
      {props.children}
    </div>
  );
}
