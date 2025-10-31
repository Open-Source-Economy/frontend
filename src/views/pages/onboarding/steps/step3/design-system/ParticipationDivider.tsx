import React from "react";

export const ParticipationDivider: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-brand-neutral-300/20" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 py-1 bg-brand-secondary text-brand-neutral-600 text-sm rounded-full border border-brand-neutral-300/20">or</span>
      </div>
    </div>
  );
};
