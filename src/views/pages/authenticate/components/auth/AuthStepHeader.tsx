import React from "react";

interface AuthStepHeaderProps {
  title: string;
  description: string;
}

export function AuthStepHeader(props: AuthStepHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-brand-neutral-900 mb-2 font-display">{props.title}</h1>
      <p className="text-brand-neutral-600">{props.description}</p>
    </div>
  );
}
