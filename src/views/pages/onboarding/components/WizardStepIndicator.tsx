import React from "react";
import { Check } from "lucide-react";

export interface WizardStep {
  number: number;
  title: string;
  description: string;
}

export interface WizardStepIndicatorProps {
  steps: WizardStep[];
  currentStep: number;
  completedSteps: number[];
  highestStepReached: number;
  onStepClick?: (stepNumber: number) => void;
}

/**
 * WizardStepIndicator - Visual progress indicator for multi-step wizard
 * Shows current position, completed steps, and upcoming steps
 */
export const WizardStepIndicator: React.FC<WizardStepIndicatorProps> = ({ steps, currentStep, completedSteps, highestStepReached, onStepClick }) => {
  return (
    <div className="w-full pt-10 pb-4">
      {/* Mobile: Enhanced progress bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-accent to-brand-highlight flex items-center justify-center shadow-lg shadow-brand-accent/20">
              <span className="text-xs text-white">{currentStep}</span>
            </div>
            <span className="text-sm text-brand-neutral-700">of {steps.length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-card-blue-dark rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs text-brand-neutral-600">{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
        </div>

        {/* Progress bar with animated gradient */}
        <div className="relative h-2.5 bg-brand-neutral-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-accent via-brand-highlight to-brand-accent bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] transition-all duration-700 ease-out rounded-full shadow-sm"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>

        {/* Current step title */}
        <div className="mt-4 p-4 bg-brand-card-blue rounded-lg border border-brand-neutral-300/20">
          <p className="text-xs text-brand-neutral-600 uppercase tracking-wider mb-1">Current Step</p>
          <p className="text-brand-neutral-900">{steps[currentStep - 1]?.title}</p>
          {steps[currentStep - 1]?.description && <p className="text-sm text-brand-neutral-600 mt-1">{steps[currentStep - 1]?.description}</p>}
        </div>
      </div>

      {/* Desktop: Enhanced step indicator */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between relative px-4 min-h-[160px]">
          {/* Background connection line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-brand-neutral-200 rounded-full" style={{ zIndex: 0 }} />

          {/* Animated progress line */}
          <div
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-brand-accent via-brand-highlight to-brand-accent bg-[length:200%_100%] rounded-full shadow-lg shadow-brand-accent/20 transition-all duration-700 ease-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              zIndex: 1,
            }}
          />

          {/* Step circles */}
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = completedSteps.includes(stepNumber);
            const isCurrent = stepNumber === currentStep;
            const isPast = stepNumber < currentStep;
            const isInProgress = stepNumber > currentStep && stepNumber <= highestStepReached;
            const isClickable = (isPast || isCompleted || isInProgress) && onStepClick;

            return (
              <div key={stepNumber} className="flex flex-col items-center relative" style={{ zIndex: 2 }}>
                {/* Fixed height container for alignment */}
                <div className="h-12 flex items-center justify-center">
                  {/* Circle with enhanced states */}
                  <button
                    onClick={() => isClickable && onStepClick(stepNumber)}
                    disabled={!isClickable}
                    className={`
                      relative rounded-full flex items-center justify-center
                      transition-all duration-500 ease-out
                      ${
                        isCurrent
                          ? "w-12 h-12 bg-gradient-to-br from-brand-accent to-brand-highlight shadow-xl shadow-brand-accent/40 scale-110"
                          : isPast || isCompleted
                            ? "w-11 h-11 bg-brand-accent shadow-md shadow-brand-accent/20 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-brand-accent/30"
                            : isInProgress
                              ? "w-11 h-11 bg-brand-card-blue border-2 border-brand-accent/50 shadow-md shadow-brand-accent/10 cursor-pointer hover:scale-105 hover:border-brand-accent hover:shadow-lg hover:shadow-brand-accent/20"
                              : "w-10 h-10 bg-brand-neutral-200 shadow-sm cursor-default"
                      }
                      ${!isClickable ? "cursor-default" : ""}
                    `}
                  >
                    {/* Pulse effect for current step */}
                    {isCurrent && <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-accent to-brand-highlight opacity-40" />}

                    {/* Pulsing ring for in-progress steps */}
                    {isInProgress && <div className="absolute inset-0 rounded-full border-2 border-brand-accent/30 animate-pulse" />}

                    {/* Icon/Number */}
                    <div className="relative">
                      {isPast || isCompleted ? (
                        <Check className={`${isCurrent ? "w-6 h-6" : "w-5 h-5"} text-white`} />
                      ) : (
                        <span
                          className={`font-semibold ${isCurrent ? "text-base text-white" : isInProgress ? "text-sm text-brand-accent" : "text-sm text-brand-neutral-600"}`}
                        >
                          {stepNumber}
                        </span>
                      )}
                    </div>
                  </button>
                </div>

                {/* Label with enhanced typography */}
                <div className="mt-4 text-center max-w-36">
                  {/* Step title */}
                  <p
                    className={`transition-all duration-300 ${
                      isCurrent
                        ? "text-brand-neutral-900"
                        : isPast || isCompleted
                          ? "text-brand-neutral-700"
                          : isInProgress
                            ? "text-brand-accent-light"
                            : "text-brand-neutral-600"
                    }`}
                  >
                    {step.title}
                  </p>

                  {/* Description - only show for current step */}
                  {isCurrent && step.description && (
                    <p className="text-xs text-brand-neutral-600 mt-2 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
};
