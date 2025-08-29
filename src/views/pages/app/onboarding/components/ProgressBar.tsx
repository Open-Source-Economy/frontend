import React from "react";

interface ProgressBarProps {
  currentStep: number;
}

interface ProgressStepProps {
  step: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  showConnector?: boolean;
}

function ProgressStep({ step, label, isActive, isCompleted, showConnector = true }: ProgressStepProps) {
  const stepClasses = isActive || isCompleted ? "bg-[#FF7E4B]" : "bg-white bg-opacity-30";

  const labelClasses = isActive || isCompleted ? "text-white" : "text-white text-opacity-30";

  return (
    <div className="flex flex-col justify-center items-start gap-1 flex-1">
      <div className="flex items-center gap-2 self-stretch">
        <div className={`w-4 h-4 rounded-full ${stepClasses}`} />
        {showConnector && (
          <svg className="flex-1 h-0.5" viewBox="0 0 195 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.0001L194.5 1.00002" stroke="#202F45" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div className={`font-montserrat text-sm font-normal leading-[150%] ${labelClasses}`}>{label}</div>
    </div>
  );
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = [
    { step: 1, label: "Your Details" },
    { step: 2, label: "Your Involvement" },
    { step: 3, label: "Active Income" },
    { step: 4, label: "Availability & Rate" },
    { step: 5, label: "Tasks & Preferences" },
  ];

  return (
    <div className="flex items-center gap-2 self-stretch">
      {steps.map((stepData, index) => (
        <ProgressStep
          key={stepData.step}
          step={stepData.step}
          label={stepData.label}
          isActive={currentStep === stepData.step}
          isCompleted={currentStep > stepData.step}
          showConnector={index < steps.length - 1}
        />
      ))}
    </div>
  );
}
