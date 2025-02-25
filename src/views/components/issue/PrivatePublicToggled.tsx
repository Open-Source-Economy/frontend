import React, { useState } from "react";

interface ToggleSwitchProps {
  labels?: { on?: string; off?: string };
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
  bgSwitchColor: string;
}

export function ToggleSwitch({ labels = {}, initialState = false, onToggle, bgSwitchColor }: ToggleSwitchProps) {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggleSwitch = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {labels.off && <h2 className={isToggled ? "text-gray-600" : "text-white"}>{labels.off}</h2>}
      <div className="relative inline-flex items-center cursor-pointer bg-[rgba(255,255,255,0.30)] rounded-full w-8 sm:w-11 h-4 sm:h-6" onClick={toggleSwitch}>
        <span
          className={`absolute w-5 h-5 sm:w-8 sm:h-8 -left-[5px] sm:left-[-10px] ${bgSwitchColor} rounded-full shadow transform transition-transform duration-300 ${
            isToggled ? "translate-x-1 sm:translate-x-[-1px]" : "translate-x-full"
          }`}
        />
      </div>
      {labels.on && <h2 className={isToggled ? "text-white" : "text-gray-600"}>{labels.on}</h2>}
    </div>
  );
}
