import React from "react";

interface ToggleProps {
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function Toggle(props: ToggleProps) {
  const { isEnabled, onChange } = props;

  return (
    <div className="flex items-center gap-2.5">
      {/* No Label */}
      <div className={`font-montserrat text-sm font-normal leading-[1.5] transition-colors duration-300 ${
        isEnabled ? "text-white/50" : "text-white"
      }`}>
        No
      </div>
      
      {/* Toggle Switch */}
      <button
        onClick={() => onChange(!isEnabled)}
        className={`flex w-[52px] h-8 p-1 items-center rounded-full transition-all duration-300 ${
          isEnabled 
            ? "bg-primary-developer justify-end" 
            : "bg-[#202F45] justify-start"
        }`}
        aria-label={`Toggle ${isEnabled ? 'on' : 'off'}`}
      >
        {/* Toggle Handle */}
        <div className="flex justify-center items-center w-6 h-6 bg-white rounded-full transition-all duration-300">
          <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
            isEnabled ? "bg-transparent" : "bg-transparent"
          }`} />
        </div>
      </button>
      
      {/* Yes Label */}
      <div className={`font-montserrat text-sm font-normal leading-[1.5] transition-colors duration-300 ${
        isEnabled ? "text-white" : "text-white/50"
      }`}>
        Yes
      </div>
    </div>
  );
}
