import React from "react";

interface FormDividerProps {
  text?: string;
}

export function FormDivider({ text = "or" }: FormDividerProps) {
  return (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-brand-neutral-400/30"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 text-xs text-brand-neutral-600">{text}</span>
      </div>
    </div>
  );
}
