import React from "react";

interface PasswordMatchIndicatorProps {
  passwordConfirm: string;
  passwordsMatch: boolean;
}

export function PasswordMatchIndicator(props: PasswordMatchIndicatorProps) {
  if (!props.passwordConfirm) return null;

  return (
    <div
      className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${props.passwordsMatch ? "text-brand-success" : "text-brand-error"}`}
    >
      {props.passwordsMatch ? "Passwords match" : "Passwords do not match"}
    </div>
  );
}
