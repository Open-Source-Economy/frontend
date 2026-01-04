import React from "react";

interface PasswordMatchIndicatorProps {
  passwordConfirm: string;
  passwordsMatch: boolean;
}

export function PasswordMatchIndicator({ passwordConfirm, passwordsMatch }: PasswordMatchIndicatorProps) {
  if (!passwordConfirm) return null;

  return (
    <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${passwordsMatch ? "text-brand-success" : "text-brand-error"}`}>
      {passwordsMatch ? "Passwords match" : "Passwords do not match"}
    </div>
  );
}
