import React from "react";

interface ToggleProps {
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function Toggle(props: ToggleProps) {
  const { isEnabled, onChange } = props;

  return (
    <div className="flex items-center gap-2.5">
      <div className={`font-montserrat text-sm leading-[1.5] transition-colors ${isEnabled ? "text-white/50" : "text-white"}`}>No</div>
      <button
        onClick={() => onChange(!isEnabled)}
        className={`w-[52px] h-8 px-1 py-0.5 rounded-full flex items-center transition-all duration-300 ${
          isEnabled ? "bg-[#FF7E4B] justify-end" : "bg-[#202F45] justify-start"
        }`}
      >
        <div className="w-6 h-6 bg-white rounded-full transition-all duration-300" />
      </button>
      <div className={`font-montserrat text-sm leading-[1.5] transition-colors ${isEnabled ? "text-white" : "text-white/50"}`}>Yes</div>
    </div>
  );
}
