import React from "react";

interface ToggleProps {
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function Toggle(props: ToggleProps) {
  const { isEnabled, onChange } = props;

  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative">
      <div
        className="font-montserrat font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap"
        style={{ color: isEnabled ? "rgba(255,255,255,0.5)" : "#ffffff" }}
      >
        <p className="block leading-[1.5] whitespace-pre">No</p>
      </div>
      <button
        onClick={() => onChange(!isEnabled)}
        className={`h-8 w-[52px] flex items-center px-1 py-0.5 relative rounded-[100px] transition-all ${
          isEnabled ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] justify-end" : "bg-[#202f45] justify-start"
        }`}
      >
        <div className={`bg-[#ffffff] rounded-full transition-all ${isEnabled ? "w-6 h-6" : "w-6 h-6"}`} />
      </button>
      <div
        className="font-montserrat font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap"
        style={{ color: isEnabled ? "#ffffff" : "rgba(255,255,255,0.5)" }}
      >
        <p className="block leading-[1.5] whitespace-pre">Yes</p>
      </div>
    </div>
  );
}
