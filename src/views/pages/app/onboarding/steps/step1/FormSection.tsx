import React from "react";

interface FormSectionProps {
  children: React.ReactNode;
}

export function FormSection(props: FormSectionProps) {
  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      <div className="flex p-2 flex-col items-start gap-2.5 self-stretch rounded-[30px]">
        <div className="flex flex-col items-start gap-6 self-stretch">
          {props.children}
        </div>
      </div>
    </div>
  );
}
