import React from "react";

interface ProgressBarProps {
  currentStep: number;
}

interface ProgressStepProps {
  step: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

function ProgressStep({ step, label, isActive, isCompleted }: ProgressStepProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-center p-0 relative shrink-0 w-[140px]">
      <div
        className={`box-border content-stretch flex flex-col items-center justify-center overflow-clip p-0 rounded-[48px] shrink-0 size-4 ${
          isActive || isCompleted ? "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b]" : "bg-[rgba(255,255,255,0.3)]"
        }`}
      />
      <div
        className={`font-montserrat font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap ${
          isActive || isCompleted ? "text-[#ffffff]" : "text-[rgba(255,255,255,0.3)]"
        }`}
      >
        <p className="block leading-[1.5] whitespace-pre">{label}</p>
      </div>
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
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative w-[900px] mx-auto">
      {steps.map((stepData, index) => (
        <React.Fragment key={stepData.step}>
          <ProgressStep step={stepData.step} label={stepData.label} isActive={currentStep === stepData.step} isCompleted={currentStep > stepData.step} />
        </React.Fragment>
      ))}
    </div>
  );
}
