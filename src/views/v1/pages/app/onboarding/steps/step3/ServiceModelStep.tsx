import React from "react";

interface ServiceModelStepProps {
  stepNumber: string;
  description: string;
}

export function ServiceModelStep(props: ServiceModelStepProps) {
  const { stepNumber, description } = props;

  return (
    <div className="flex flex-col items-start gap-3 flex-1 p-5 rounded-[30px] bg-primaryBg">
      <div className="text-white font-michroma text-[28px] font-normal leading-[1.3] opacity-20">{stepNumber}</div>
      <div className="text-white font-montserrat text-lg font-normal leading-[1.3] opacity-80">{description}</div>
    </div>
  );
}
