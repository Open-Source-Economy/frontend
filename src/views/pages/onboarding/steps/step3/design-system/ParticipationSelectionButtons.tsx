import React from "react";
import { PreferenceType } from "@open-source-economy/api-types";

interface ParticipationSelectionButtonsProps {
  selectedState: PreferenceType | null | undefined;
  onSelect: (state: PreferenceType) => void;
}

// Button configuration for DRY implementation
const BUTTON_CONFIGS = [
  { state: PreferenceType.YES, label: "Yes" },
  { state: PreferenceType.MAYBE_LATER, label: "Maybe later" },
  { state: PreferenceType.NOT_INTERESTED, label: "Not interested" },
] as const;

export const ParticipationSelectionButtons: React.FC<ParticipationSelectionButtonsProps> = ({ selectedState, onSelect }) => {
  const getButtonClasses = (state: PreferenceType) => {
    const isSelected = selectedState === state;

    // Map each state to its full Tailwind classes (Tailwind JIT requires complete class names)
    const styleMap = {
      [PreferenceType.YES]: {
        selected: "bg-brand-success text-white border-brand-success shadow-md",
        unselected: "bg-brand-card-blue text-brand-neutral-700 border-brand-neutral-300 hover:border-brand-success hover:bg-brand-success/5",
      },
      [PreferenceType.MAYBE_LATER]: {
        selected: "bg-brand-warning text-white border-brand-warning shadow-md",
        unselected: "bg-brand-card-blue text-brand-neutral-700 border-brand-neutral-300 hover:border-brand-warning hover:bg-brand-warning/5",
      },
      [PreferenceType.NOT_INTERESTED]: {
        selected: "bg-brand-neutral-400 text-white border-brand-neutral-400 shadow-md",
        unselected: "bg-brand-card-blue text-brand-neutral-700 border-brand-neutral-300 hover:border-brand-neutral-400 hover:bg-brand-neutral-100",
      },
    };

    return isSelected ? styleMap[state].selected : styleMap[state].unselected;
  };

  return (
    <div className="flex gap-2">
      {BUTTON_CONFIGS.map(({ state, label }) => (
        <button
          key={state}
          type="button"
          onClick={e => {
            e.stopPropagation();
            onSelect(state);
          }}
          className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm transition-all duration-200 cursor-pointer ${getButtonClasses(state)}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
