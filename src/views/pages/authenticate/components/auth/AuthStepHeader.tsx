import React from "react";

interface AuthStepHeaderProps {
  title: string;
  description: string;
}

export function AuthStepHeader({ title, description }: AuthStepHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-brand-neutral-900 mb-2 font-display">{title}</h1>
      <p className="text-brand-neutral-600">{description}</p>
    </div>
  );
}
