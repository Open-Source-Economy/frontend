import React from "react";
import { ServiceModelStep } from "./ServiceModelStep";

interface ServiceModelStepsProps {
  onClose: () => void;
}

export function ServiceModelSteps(props: ServiceModelStepsProps) {
  const { onClose } = props;

  const steps = [
    {
      stepNumber: "1.",
      description: "You define your service offering, pricing, and terms."
    },
    {
      stepNumber: "2.", 
      description: "Companies subscribe to monthly hours or request one-off tasks."
    },
    {
      stepNumber: "3.",
      description: "We handle sales, marketing, contracts, billing, and expectations."
    },
    {
      stepNumber: "4.",
      description: "Every payment includes a donation to your project and its ecosystem."
    }
  ];

  return (
    <div className="flex flex-col items-center gap-6 self-stretch py-6 rounded-md">
      {/* Header with Close Button */}
      <div className="flex justify-center items-center gap-2.5 self-stretch">
        <div className="flex-1 text-white font-michroma text-[28px] font-normal leading-[1.3]">
          The Service Model
        </div>
        <button
          onClick={onClose}
          className="flex flex-col justify-center items-center gap-2.5 w-6 h-6 hover:opacity-70 transition-opacity"
          aria-label="Close Service Model"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 4L4 20" stroke="white" strokeLinecap="round"/>
            <path d="M4 4L20 20" stroke="white" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Service Model Steps Grid */}
      <div className="flex justify-center items-start gap-5 self-stretch">
        {steps.map((step, index) => (
          <ServiceModelStep
            key={index}
            stepNumber={step.stepNumber}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
}
