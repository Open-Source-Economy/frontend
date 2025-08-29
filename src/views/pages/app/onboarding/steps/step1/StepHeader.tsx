import React from "react";

interface StepHeaderProps {
  stepNumber: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function StepHeader(props: StepHeaderProps) {
  return (
    <div className="flex justify-center items-start gap-12 self-stretch">
      {/* Step Number */}
      <div className="text-white text-center font-michroma text-[42px] font-normal leading-[130%] opacity-15">
        {props.stepNumber}
      </div>

      {/* Divider */}
      <div className="w-px h-[555px] opacity-15 bg-white"></div>

      {/* Content */}
      <div className="flex w-[864px] flex-col justify-center items-center gap-12">
        {/* Section Title */}
        <div className="flex flex-col items-center gap-4 self-stretch">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="self-stretch text-white font-michroma text-[42px] font-normal leading-[130%]">
              {props.title}
            </div>
            <div className="self-stretch text-white font-montserrat text-xl font-normal leading-[130%] opacity-60">
              {props.subtitle}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {props.children}
      </div>
    </div>
  );
}
